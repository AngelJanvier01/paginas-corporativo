(() => {
    const section = document.querySelector('.product-showcase');
    if (!section) return;
    const viewport = section.querySelector('.product-showcase-viewport');
    const track = section.querySelector('.product-showcase-track');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const imageTypes = /\.(?:jpe?g|jfif|png|apng|webp|gif|avif|svg|bmp|ico)$/i;
    let sources = [...track.querySelectorAll('img')].map(image => image.getAttribute('src'));

    function draw() {
        section.hidden = sources.length === 0;
        const group = document.createElement('div');
        group.className = 'product-showcase-group';
        sources.forEach(source => {
            const item = document.createElement('div');
            item.className = 'product-showcase-item';
            const image = document.createElement('img');
            image.src = source;
            image.alt = '';
            image.loading = 'lazy';
            item.append(image);
            group.append(item);
        });
        track.replaceChildren(group);
        section.classList.remove('is-ready');
        if (sources.length < 2 || reducedMotion.matches) return;
        // If all products fit, leave them still instead of repeating a visible image.
        if (group.getBoundingClientRect().width <= viewport.clientWidth) return;
        const copy = group.cloneNode(true);
        copy.classList.add('product-showcase-copy');
        copy.setAttribute('aria-hidden', 'true');
        track.append(copy);
        track.style.setProperty('--product-duration', `${group.getBoundingClientRect().width / 106.1775}s`);
        section.classList.add('is-ready');
    }

    async function listImages() {
        try {
            const response = await fetch('images/', { cache: 'no-store' });
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
        try {
            const response = await fetch('images.json', { cache: 'no-store' });
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
    draw();
    listImages().then(files => { if (files) { sources = files; draw(); } });
})();
