'use strict';

document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu(restoreFocus = false) {
  if (!navigation || !menuButton) return;
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('use')?.setAttribute('href', '#menu');
  if (restoreFocus) menuButton.focus();
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
  menuButton.querySelector('use')?.setAttribute('href', open ? '#close' : '#menu');
});
navigation?.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 901px)').addEventListener('change', () => closeMenu());

const form = document.querySelector('#quote-form');
const preview = document.querySelector('#message-preview');
const status = document.querySelector('#form-status');
const interestLabels = { venta: 'Compra de insumos o equipo', renta: 'Renta de equipo', ambos: 'Compra y renta de equipo' };

if (form) {
  form.hidden = false;
  const fields = [form.elements.name, form.elements.location, form.elements.details];
  const errorMessages = {
    name: 'Escribe tu nombre para que podamos dirigirnos a ti.',
    location: 'Indica la ciudad y el estado donde necesitas el servicio.',
    details: 'Cuéntanos qué necesitas con al menos 10 caracteres.'
  };

  function validateField(field) {
    const value = field.value.trim();
    const valid = value.length >= (field.name === 'details' ? 10 : 1);
    const error = document.getElementById(`${field.id}-error`);
    field.setAttribute('aria-invalid', String(!valid));
    if (valid) {
      error.textContent = '';
      field.removeAttribute('aria-describedby');
    } else {
      error.textContent = errorMessages[field.name];
      field.setAttribute('aria-describedby', error.id);
    }
    return valid;
  }

  fields.forEach(field => field.addEventListener('input', () => {
    if (field.getAttribute('aria-invalid') === 'true') validateField(field);
  }));

  document.querySelectorAll('[data-interest]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      form.hidden = false;
      preview.hidden = true;
      form.elements.interest.value = link.dataset.interest;
      if (link.dataset.topic && !form.elements.details.value.trim()) {
        form.elements.details.value = `Me interesa cotizar ${link.dataset.topic.toLowerCase()}. `;
      }
      status.textContent = '';
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const invalid = fields.map(field => ({ field, valid: validateField(field) })).filter(item => !item.valid);
    if (invalid.length) {
      status.textContent = 'Revisa los campos señalados para preparar tu mensaje.';
      invalid[0].field.focus();
      return;
    }
    const values = Object.fromEntries(new FormData(form));
    const lines = [
      'Hola, BiotecZac. Me gustaría solicitar una cotización.',
      '',
      `Nombre: ${values.name.trim()}`,
      values.organization.trim() ? `Empresa o institución: ${values.organization.trim()}` : '',
      `Me interesa: ${interestLabels[values.interest] || interestLabels.venta}`,
      `Ciudad y estado: ${values.location.trim()}`,
      '',
      'Lo que necesito:',
      values.details.trim()
    ].filter((line, index) => line || index === 1 || index === 6);
    const message = lines.join('\n');
    document.getElementById('message-content').textContent = message;
    document.getElementById('send-whatsapp').href = `https://wa.me/524922937465?text=${encodeURIComponent(message)}`;
    document.getElementById('send-email').href = `mailto:coord.zac@bioteczac.com?subject=${encodeURIComponent('Solicitud de cotización · BiotecZac')}&body=${encodeURIComponent(message)}`;
    status.textContent = '';
    preview.hidden = false;
    form.hidden = true;
    document.getElementById('preview-title').focus();
  });

  document.getElementById('edit-message').addEventListener('click', () => {
    preview.hidden = true;
    form.hidden = false;
    form.elements.details.focus();
  });
}
