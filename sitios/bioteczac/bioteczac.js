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

document.querySelectorAll('[data-current-year]').forEach(element => {
  element.textContent = String(new Date().getFullYear());
});

if (form) {
  form.hidden = false;
  let attempted = false;
  const fields = ['name', 'phone', 'email', 'interest', 'location', 'details', 'privacy'].map(name => form.elements[name]);
  const requiredMessages = {
    name: 'Escribe tu nombre para que podamos dirigirnos a ti.',
    interest: 'Elige si buscas compra, renta o ambas.',
    location: 'Indica la ciudad y el estado donde necesitas el servicio.',
    details: 'Cuéntanos qué necesitas con al menos 10 caracteres.',
    privacy: 'Necesitamos tu consentimiento para atender esta solicitud.'
  };

  function showError(field, message) {
    const error = document.getElementById(`${field.id}-error`);
    error.textContent = message;
    field.setAttribute('aria-invalid', String(Boolean(message)));
    const descriptions = new Set((field.getAttribute('aria-describedby') || '').split(' ').filter(Boolean));
    if (message) descriptions.add(error.id);
    else descriptions.delete(error.id);
    if (descriptions.size) field.setAttribute('aria-describedby', [...descriptions].join(' '));
    else field.removeAttribute('aria-describedby');
    return !message;
  }

  function validateField(field) {
    const value = field.value.trim();
    let valid;
    if (field.name === 'privacy') valid = field.checked;
    else if (field.name === 'interest') valid = Object.hasOwn(interestLabels, value);
    else valid = value.length >= (field.name === 'details' ? 10 : 1) && !field.validity.tooLong;
    return showError(field, valid ? '' : requiredMessages[field.name]);
  }

  function validateContact() {
    const phone = form.elements.phone;
    const email = form.elements.email;
    const phoneValue = phone.value.trim();
    const emailValue = email.value.trim();
    const missing = !phoneValue && !emailValue;
    const digits = phoneValue.replace(/\D/g, '');
    const phoneValid = !phoneValue || (/^\+?[\d\s().-]+$/.test(phoneValue) && digits.length >= 10 && digits.length <= 15);
    const emailValid = !emailValue || (email.validity.valid && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue));
    showError(phone, missing ? 'Comparte un teléfono o correo para poder responderte.' : phoneValid ? '' : 'Escribe entre 10 y 15 dígitos; puedes incluir el código de país.');
    showError(email, missing ? 'Comparte un teléfono o correo para poder responderte.' : emailValid ? '' : 'Escribe un correo válido, por ejemplo nombre@empresa.com.');
  }

  fields.forEach(field => {
    field.addEventListener(field.type === 'checkbox' || field.tagName === 'SELECT' ? 'change' : 'input', () => {
      if (!attempted) return;
      if (field.name === 'phone' || field.name === 'email') validateContact();
      else validateField(field);
      if (!fields.some(input => input.getAttribute('aria-invalid') === 'true')) status.textContent = '';
    });
  });

  function selectBrand(brand) {
    form.elements.brand.value = brand;
    document.getElementById('selected-brand').hidden = !brand;
    document.getElementById('brand-name').textContent = brand;
  }
  document.getElementById('clear-brand').addEventListener('click', () => {
    selectBrand('');
    form.elements.details.focus();
  });

  function selectTopic(topic) {
    form.elements.topic.value = topic;
    document.getElementById('selected-topic').hidden = !topic;
    document.getElementById('topic-name').textContent = topic;
  }
  document.getElementById('clear-topic').addEventListener('click', () => {
    selectTopic('');
    form.elements.details.focus();
  });

  document.querySelectorAll('[data-interest]:not(.brand-choice)').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      form.hidden = false;
      preview.hidden = true;
      form.elements.interest.value = link.dataset.interest;
      if (Object.hasOwn(link.dataset, 'brand')) selectBrand(link.dataset.brand);
      else selectTopic(link.dataset.topic || '');
      if (attempted) validateField(form.elements.interest);
      status.textContent = '';
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    attempted = true;
    fields.filter(field => !['phone', 'email'].includes(field.name)).forEach(validateField);
    validateContact();
    const invalid = fields.filter(field => field.getAttribute('aria-invalid') === 'true');
    if (invalid.length) {
      status.textContent = 'Revisa los campos señalados para preparar tu mensaje.';
      invalid[0].focus();
      return;
    }
    const values = Object.fromEntries(new FormData(form));
    const lines = [
      'Hola, BiotecZac. Visité su página web y me gustaría solicitar una cotización.',
      '',
      `Nombre: ${values.name.trim()}`,
      ...(values.organization.trim() ? [`Organización o negocio: ${values.organization.trim()}`] : []),
      ...(values.phone.trim() ? [`Teléfono de respuesta: ${values.phone.trim()}`] : []),
      ...(values.email.trim() ? [`Correo de respuesta: ${values.email.trim()}`] : []),
      `Me interesa: ${interestLabels[values.interest]}`,
      ...(values.brand ? [`Marca de interés: ${values.brand}`] : []),
      ...(values.topic ? [`Línea de interés: ${values.topic}`] : []),
      `Ciudad y estado: ${values.location.trim()}`,
      '',
      'Lo que necesito:',
      values.details.trim(),
      '',
      'He leído el aviso de privacidad de BiotecZac (20/11/2026) y autorizo el uso de mis datos para atender esta solicitud.'
    ];
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
