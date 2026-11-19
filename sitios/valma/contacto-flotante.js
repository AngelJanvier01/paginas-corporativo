(() => {
    'use strict';
    const message = 'Hola, buen día. Visité la página web de VALMA y me gustaría recibir información sobre sus productos. ¿Podrían apoyarme, por favor?';
    // WhatsApp indica el prefijo 521 para números de México.
    const whatsapp = `https://wa.me/5218110050873?text=${encodeURIComponent(message)}`;
    const widget = document.createElement('div');
    widget.className = 'contact-widget';
    widget.innerHTML = `
        <div class="contact-panel" id="contact-panel" role="region" aria-labelledby="contact-title" hidden>
            <div class="contact-panel-heading">
                <h2 id="contact-title">¿En qué podemos ayudarte?</h2>
                <button class="contact-close" type="button" aria-label="Cerrar opciones de contacto">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
                </button>
            </div>
            <p>Habla con nuestra coordinadora sobre los productos que necesitas.</p>
            <a class="contact-whatsapp" href="${whatsapp}" target="_blank" rel="noopener noreferrer">Enviar mensaje por WhatsApp</a>
            <div class="contact-qr">
                <a href="${whatsapp}" target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp de VALMA">
                    <img src="assets/contacto/whatsapp-valma.png" width="225" height="225" loading="lazy" alt="Código QR para contactar a VALMA por WhatsApp">
                </a>
                <p>También puedes escanear el QR con tu celular.</p>
            </div>
            <a class="contact-email" href="mailto:direccion@ingenieriavalma.com?subject=Consulta%20desde%20la%20web%20de%20VALMA">Prefiero escribir por correo</a>
        </div>
        <button class="contact-launcher" type="button" aria-expanded="false" aria-controls="contact-panel">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a9 9 0 0 1-13.5 7.8L3 21l1.7-4.5A9 9 0 1 1 21 11.5Z"/><path d="M8.1 7.5c-.8 1.2.4 3.6 2 5.2s4 2.8 5.2 2l.7-1.4-2.3-1.2-.8.8a8.4 8.4 0 0 1-2.8-2.8l.8-.8-1.2-2.3Z"/></svg>
            <span>Contáctanos</span>
        </button>`;
    document.body.append(widget);
    const panel = widget.querySelector('.contact-panel');
    const launcher = widget.querySelector('.contact-launcher');
    const closeButton = widget.querySelector('.contact-close');
    function close(returnFocus = false) {
        panel.hidden = true;
        launcher.setAttribute('aria-expanded', 'false');
        if (returnFocus) launcher.focus({ preventScroll: true });
    }
    launcher.addEventListener('click', () => {
        const open = panel.hidden;
        panel.hidden = !open;
        launcher.setAttribute('aria-expanded', String(open));
        if (open) closeButton.focus({ preventScroll: true });
    });
    closeButton.addEventListener('click', () => close(true));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !panel.hidden) close(true);
    });
    document.addEventListener('pointerdown', event => {
        if (!panel.hidden && !widget.contains(event.target)) close();
    });
    // Mantener visibles los campos y el teclado en pantallas pequeñas.
    document.addEventListener('focusin', event => {
        widget.classList.toggle('is-editing', event.target.matches('input, textarea, select'));
    });
    document.addEventListener('focusout', () => {
        requestAnimationFrame(() => {
            widget.classList.toggle('is-editing', document.activeElement.matches('input, textarea, select'));
        });
    });
})();
