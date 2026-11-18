(() => {
    document.querySelectorAll('.valma-form').forEach(form => {
        const button = form.querySelector('button[type="submit"]');
        const status = form.querySelector('.form-status');
        const cv = form.querySelector('input[type="file"]');
        if (cv) cv.addEventListener('change', () => {
            const file = cv.files[0];
            cv.setCustomValidity(file && (file.size > 5 * 1024 * 1024 || !/\.pdf$/i.test(file.name)) ? 'Selecciona un PDF de máximo 5 MB.' : '');
        });
        form.addEventListener('submit', async event => {
            event.preventDefault();
            if (!form.reportValidity()) return;
            const label = button.textContent;
            button.disabled = true;
            button.textContent = 'Enviando…';
            status.textContent = '';
            try {
                const response = await fetch(form.action, { method: 'POST', body: new FormData(form) });
                const result = await response.json().catch(() => ({}));
                if (!response.ok || !result.ok) throw new Error(result.error || 'No pudimos enviar el mensaje. Inténtalo de nuevo.');
                form.reset();
                if (cv) cv.setCustomValidity('');
                status.textContent = form.id === 'contact-form' ? '¡Listo! Recibimos tu mensaje.' : '¡Listo! Recibimos tu postulación.';
            } catch (error) {
                status.textContent = error instanceof TypeError ? 'No pudimos conectar. Inténtalo de nuevo o escribe a direccion@ingenieriavalma.com.' : error.message;
            } finally {
                button.disabled = false;
                button.textContent = label;
            }
        });
    });
})();
