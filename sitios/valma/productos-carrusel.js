(() => {
    const section = document.querySelector('.product-showcase');
    if (!section) return;
    const viewport = section.querySelector('.product-showcase-viewport');
    const track = section.querySelector('.product-showcase-track');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const imageTypes = /\.(?:jpe?g|jfif|png|apng|webp|gif|avif|svg|bmp|ico)$/i;
    const initialSources = [...track.querySelectorAll('img')].map(image => image.getAttribute('src'));
    let images = [];
    let drawing = 0;

    async function loadImage(source, retry = false) {
        const image = new Image();
        image.alt = '';
        image.loading = 'eager';
        image.decoding = 'async';
        image.fetchPriority = 'low';
        try {
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => finish(new Error('Image timeout')), 20000);
                function finish(error) {
                    clearTimeout(timeout);
                    image.onload = image.onerror = null;
                    error ? reject(error) : resolve();
                }
                image.onload = () => finish();
                image.onerror = () => finish(new Error('Image unavailable'));
                image.src = retry ? `${source}?retry=1` : source;
            });
            if (image.decode) await image.decode();
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
            }
        }));
        return loaded.filter(Boolean);
    }

    async function draw() {
        if (!images.length) return;
        const version = ++drawing;
        const group = document.createElement('div');
        group.className = 'product-showcase-group';
        images.forEach(image => {
            const item = document.createElement('div');
            item.className = 'product-showcase-item';
            item.append(image);
            group.append(item);
        });
        track.replaceChildren(group);
        section.classList.remove('is-ready');
        if (images.length < 2 || reducedMotion.matches) return;
        // If all products fit, leave them still instead of repeating a visible image.
        if (group.getBoundingClientRect().width <= viewport.clientWidth) return;
        const copy = group.cloneNode(true);
        copy.classList.add('product-showcase-copy');
        copy.setAttribute('aria-hidden', 'true');
        track.append(copy);
        // Do not move a card into view until both groups are decoded.
        await Promise.all([...copy.querySelectorAll('img')].map(image => image.decode ? image.decode().catch(() => {}) : Promise.resolve()));
        if (version !== drawing) return;
        track.style.setProperty('--product-duration', `${group.getBoundingClientRect().width / 106.1775}s`);
        section.classList.add('is-ready');
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

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => section.classList.toggle('is-visible', entries[0].isIntersecting), { threshold: 0.05 });
        observer.observe(section);
    } else section.classList.add('is-visible');
    document.addEventListener('visibilitychange', () => section.classList.toggle('is-paused-tab', document.hidden));
    let resizeTimer;
    window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(draw, 150); });
    reducedMotion.addEventListener('change', draw);
    // Keep the initial HTML visible while the complete set downloads.
    // Native lazy loading cannot reliably anticipate a fast CSS animation.
    listImages().then(async files => {
        const sources = files === null ? initialSources : files;
        if (!sources.length) { section.hidden = true; return; }
        images = await loadImages(sources);
        await draw();
    });
})();
