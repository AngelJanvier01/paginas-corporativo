'use strict';

(() => {
  const section = document.querySelector('#marcas');
  if (!section) return;

  const pageSize = 12;
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim();
  const entries = [...section.querySelectorAll('.brand-item')].map(item => {
    const link = item.querySelector('.brand-choice');
    return { item, link, name: link.dataset.brand, search: normalize(link.dataset.brand),
      description: link.dataset.description, lines: JSON.parse(link.dataset.lines) };
  });
  const search = section.querySelector('#brand-search');
  const clear = section.querySelector('#brand-clear');
  const count = section.querySelector('#brand-count');
  const pages = section.querySelector('#brand-pages');
  const previous = section.querySelector('#brand-prev');
  const next = section.querySelector('#brand-next');
  const detail = section.querySelector('#brand-detail');
  const title = section.querySelector('#brand-title');
  const quote = section.querySelector('#brand-quote');
  let page = 0;
  let selected = null;
  let visible = [];

  function closeDetail() {
    selected?.link.setAttribute('aria-pressed', 'false');
    selected = null;
    detail.hidden = true;
  }

  function select(entry, moveFocus = true) {
    closeDetail();
    selected = entry;
    entry.link.setAttribute('aria-pressed', 'true');
    title.textContent = entry.name;
    section.querySelector('#brand-description').textContent = entry.description;
    const lines = section.querySelector('#brand-lines');
    lines.replaceChildren(...entry.lines.map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
    lines.hidden = !entry.lines.length;
    quote.dataset.brand = entry.name;
    quote.textContent = `Consultar productos de ${entry.name}`;
    detail.hidden = false;
    if (moveFocus) {
      detail.scrollIntoView({ block: 'nearest' });
      title.focus({ preventScroll: true });
    }
  }

  function render() {
    const query = normalize(search.value);
    const matches = entries.filter(entry => entry.search.includes(query));
    const totalPages = Math.ceil(matches.length / pageSize);
    page = Math.min(page, Math.max(0, totalPages - 1));
    visible = matches.slice(page * pageSize, (page + 1) * pageSize);
    const visibleSet = new Set(visible);
    entries.forEach(entry => { entry.item.hidden = !visibleSet.has(entry); });
    if (selected && !visibleSet.has(selected)) closeDetail();
    const noun = matches.length === 1 ? 'marca' : 'marcas';
    count.textContent = matches.length > pageSize
      ? `${page * pageSize + 1}–${Math.min((page + 1) * pageSize, matches.length)} de ${matches.length} ${noun}`
      : `${matches.length} ${noun}${query ? (matches.length === 1 ? ' encontrada' : ' encontradas') : ''}`;
    clear.hidden = !search.value;
    section.querySelector('#brand-empty').hidden = matches.length > 0;
    pages.hidden = totalPages <= 1;
    previous.disabled = page === 0;
    next.disabled = page >= totalPages - 1;
    section.querySelector('#brand-page-number').textContent = `Página ${page + 1} de ${Math.max(1, totalPages)}`;
  }

  entries.forEach(entry => {
    entry.link.setAttribute('role', 'button');
    entry.link.setAttribute('aria-controls', 'brand-detail');
    entry.link.setAttribute('aria-pressed', 'false');
    entry.link.setAttribute('aria-label', `Ver información de ${entry.name}`);
    entry.link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      select(entry);
    });
    entry.link.addEventListener('keydown', event => {
      if (event.key === ' ') { event.preventDefault(); select(entry); }
    });
  });
  search.addEventListener('input', () => { page = 0; render(); });
  const reset = () => { search.value = ''; page = 0; render(); search.focus(); };
  clear.addEventListener('click', reset);
  section.querySelector('#brand-reset').addEventListener('click', reset);
  function changePage(direction) {
    page += direction;
    closeDetail();
    render();
    visible[0]?.link.focus();
  }
  previous.addEventListener('click', () => changePage(-1));
  next.addEventListener('click', () => changePage(1));
  section.querySelector('#brand-back').addEventListener('click', () => selected?.link.focus());
  section.querySelector('#brand-tools').hidden = false;
  render();
  if (visible.length) select(visible[0], false);
})();
