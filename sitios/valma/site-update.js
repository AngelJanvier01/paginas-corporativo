// Update only the legacy root worker; never register one for new visitors.
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
            const worker = registration.active || registration.waiting;
            if (registration.scope === `${location.origin}/` && worker?.scriptURL === `${location.origin}/sw.js`) {
                registration.update().catch(() => {});
            }
        }
    }).catch(() => {});
}
