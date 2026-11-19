// Retire the service worker left by the previous hosting provider.
// No fetch handler: requests go directly to the current site.
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        await self.clients.claim();
        await self.registration.unregister();
    })());
});
