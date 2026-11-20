(() => {
    const section = document.querySelector('.product-showcase');
    if (!section) return;
    const viewport = section.querySelector('.product-showcase-viewport');
    const track = section.querySelector('.product-showcase-track');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const imageTypes = /\.(?:jpe?g|jfif|png|apng|webp|gif|avif|svg|bmp|ico)$/i;
    const initialSources = [...track.querySelectorAll('img')].map(image => image.getAttribute('src'));
    let images = [];
    let loadingFinished = false;
    let drawTimer;
    let viewportWidth = viewport.clientWidth;

    function scheduleDraw() {
        clearTimeout(drawTimer);
        drawTimer = setTimeout(draw, 100);
    }

    async function loadImage(source, retry = false) {
        const image = new Image();
        image.alt = '';
        image.loading = 'eager';
        image.decoding = 'async';
        image.fetchPriority = 'low';
        try {
            await new Promise((resolve, reject) => {
                let settled = false;
                // Bound both the download and decode; neither may hold up the gallery.
                const timeout = setTimeout(() => finish(new Error('Image timeout')), 20000);
                function finish(error) {
                    if (settled) return;
                    settled = true;
                    clearTimeout(timeout);
                    image.onload = image.onerror = null;
                    if (error) { image.removeAttribute('src'); reject(error); }
                    else resolve();
                }
                image.onload = () => {
                    if (image.decode) image.decode().then(() => finish(), finish);
                    else finish();
                };
                image.onerror = () => finish(new Error('Image unavailable'));
                image.src = retry ? `${source}?retry=1` : source;
            });
            return image.naturalWidth ? image : null;
        } catch {
            return retry ? null : loadImage(source, true);
        }
    }

    async function loadImages(sources) {
        const loaded = new Array(sources.length);
        let next = 0;
        // Leave bandwidth for the hero, fonts and the initial visible images.
        await Promise.all(Array.from({ length: Math.min(4, sources.length) }, async () => {
            while (next < sources.length) {
                const index = next++;
                loaded[index] = await loadImage(sources[index]);
                // Start with the decoded products; one slow file must not block all others.
                images = loaded.filter(Boolean);
                scheduleDraw();
            }
        }));
        return loaded.filter(Boolean);
    }

    function draw() {
        if (!images.length || !viewport.clientWidth) return;
        const currentItem = track.querySelector('.product-showcase-item');
        const currentGroup = track.querySelector('.product-showcase-group');
        const itemWidth = currentItem?.getBoundingClientRect().width || 0;
        const gap = currentGroup ? parseFloat(getComputedStyle(currentGroup).columnGap) || 0 : 0;
        // Keep the HTML fallback until enough decoded images can fill the viewport.
        if (!loadingFinished && images.length * (itemWidth + gap) <= viewport.clientWidth + itemWidth) return;
        const elapsed = track.getAnimations()[0]?.currentTime || 0;
        const group = document.createElement('div');
        group.className = 'product-showcase-group';
        images.forEach(image => {
            const item = document.createElement('div');
            item.className = 'product-showcase-item';
            item.append(image);
            group.append(item);
        });
        track.replaceChildren(group);
        const width = group.getBoundingClientRect().width;
        if (images.length < 2 || reducedMotion.matches || width <= viewport.clientWidth + itemWidth) {
            section.classList.remove('is-ready');
            return;
        }
        // Sources have already loaded and decoded; clones reuse those cached resources.
        const copy = group.cloneNode(true);
        copy.classList.add('product-showcase-copy');
        copy.setAttribute('aria-hidden', 'true');
        track.append(copy);
        track.style.setProperty('--product-duration', `${width / 106.1775}s`);
        section.classList.add('is-ready');
        // Preserve the travelled distance as more products arrive or the width changes.
        const animation = track.getAnimations()[0];
        if (animation) animation.currentTime = elapsed;
    }

    async function listImages() {
        // Production has no directory listing. Read its manifest directly.
        if (!['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) {
            return readManifest();
        }
        try {
            const response = await fetchList('images/');
            if (response.ok && (response.headers.get('content-type') || '').includes('text/html')) {
                const html = new DOMParser().parseFromString(await response.text(), 'text/html');
                const directory = new URL('images/', location.href);
                const files = [...html.querySelectorAll('a[href]')].map(link => {
                    try {
                        const url = new URL(link.getAttribute('href'), directory);
                        if (url.origin !== directory.origin || !url.pathname.startsWith(directory.pathname)) return null;
                        const name = decodeURIComponent(url.pathname.slice(directory.pathname.length));
                        return name && !name.includes('/') && imageTypes.test(name) ? `images/${encodeURIComponent(name)}` : null;
                    } catch { return null; }
                }).filter(Boolean);
                if (files.length) return [...new Set(files)];
            }
        } catch { /* Use the published list if folder browsing is disabled. */ }
        return readManifest();
    }

    async function fetchList(url) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        try { return await fetch(url, { cache: 'no-store', signal: controller.signal }); }
        finally { clearTimeout(timeout); }
    }

    async function readManifest() {
        try {
            const response = await fetchList('images.json');
            if (response.ok) {
                const files = await response.json();
                if (Array.isArray(files)) return [...new Set(files.filter(name => typeof name === 'string' && !name.includes('/') && !name.includes('\\') && imageTypes.test(name)).map(name => `images/${encodeURIComponent(name)}`))];
            }
        } catch { /* The HTML retains the initial images as a fallback. */ }
        return null;
    }

    function syncVisibility() {
        const bounds = section.getBoundingClientRect();
        section.classList.toggle('is-visible', bounds.bottom > 0 && bounds.top < window.innerHeight);
        section.classList.toggle('is-paused-tab', document.hidden);
    }
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(syncVisibility);
        observer.observe(section);
    } else window.addEventListener('scroll', syncVisibility, { passive: true });
    function resetPointerPause() { section.classList.remove('is-hovered'); }
    section.addEventListener('pointerenter', event => {
        section.classList.toggle('is-hovered', event.pointerType === 'mouse');
    });
    section.addEventListener('pointermove', event => {
        section.classList.toggle('is-hovered', event.pointerType === 'mouse');
    });
    section.addEventListener('pointerleave', resetPointerPause);
    section.addEventListener('pointercancel', resetPointerPause);
    section.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'mouse') resetPointerPause();
    });
    document.addEventListener('visibilitychange', () => { resetPointerPause(); syncVisibility(); });
    function checkSize() {
        // Mobile browser bars resize the height while scrolling; keep the animation intact.
        if (viewport.clientWidth !== viewportWidth) {
            viewportWidth = viewport.clientWidth;
            scheduleDraw();
        }
        syncVisibility();
    }
    window.addEventListener('resize', checkSize);
    window.addEventListener('pageshow', () => { resetPointerPause(); checkSize(); });
    reducedMotion.addEventListener('change', scheduleDraw);
    syncVisibility();
    // Native lazy loading cannot anticipate a moving track. Decode progressively instead.
    listImages().then(async files => {
        const sources = files === null ? initialSources : files;
        if (!sources.length) { section.hidden = true; return; }
        images = await loadImages(sources);
        loadingFinished = true;
        clearTimeout(drawTimer);
        draw();
    });
})();
