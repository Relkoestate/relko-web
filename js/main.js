const eur = n => n.toLocaleString('es-ES') + ' €';

// ---------- Navegación móvil ----------
function initNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

// ---------- Toggle de precios (vídeo suelto / suscripción) ----------
function initPricingToggle() {
  const toggleBtns = document.querySelectorAll('.pricing-toggle button');
  if (!toggleBtns.length) return;
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.price-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('panel-' + btn.dataset.panel).classList.add('active');
    });
  });
}

// ---------- Envío de formularios a Netlify Forms ----------
function pushConversion(formName) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'form_submission', form_name: formName });
}

function submitNetlifyForm(form, successEl, conversionName) {
  const body = new URLSearchParams(new FormData(form)).toString();
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  })
    .then(() => {
      form.reset();
      successEl.classList.add('visible');
      pushConversion(conversionName);
    })
    .catch(() => {
      alert('No se pudo enviar. Escribidnos directamente a relko.estate@gmail.com.');
    });
}

// ---------- Formulario de contacto general ----------
function initContactForm() {
  const form = document.getElementById('contactoForm');
  if (!form) return;
  const success = document.getElementById('c-success');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitNetlifyForm(form, success, 'consulta');
  });
}

// ---------- Formulario de vídeo de muestra ----------
function initSampleForm() {
  const form = document.getElementById('muestraForm');
  if (!form) return;
  const success = document.getElementById('m-success');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitNetlifyForm(form, success, 'video-muestra');
  });
}

// ---------- Escaparate: plegar/desplegar filtros en móvil ----------
function initFiltersToggle() {
  const escFilters = document.getElementById('escFilters');
  const toggle = document.getElementById('filtersToggle');
  if (!escFilters || !toggle) return;
  toggle.addEventListener('click', () => escFilters.classList.toggle('open'));
}

// ---------- Escaparate: filtros y listado ----------
function initEscaparate() {
  const cont = document.getElementById('esc-cards');
  if (!cont) return;

  const vacio = document.getElementById('esc-empty');
  const total = document.getElementById('esc-total');
  const visibles = document.getElementById('esc-visibles');
  const fTexto = document.getElementById('f-texto');
  const fZona = document.getElementById('f-zona');
  const fTipo = document.getElementById('f-tipo');
  const fHab = document.getElementById('f-hab');
  const fPrecio = document.getElementById('f-precio');
  const fOrden = document.getElementById('f-orden');

  total.textContent = PROPIEDADES.length;

  [...new Set(PROPIEDADES.map(p => p.zona))].sort()
    .forEach(z => fZona.insertAdjacentHTML('beforeend', `<option>${z}</option>`));
  [...new Set(PROPIEDADES.map(p => p.tipo))].sort()
    .forEach(t => fTipo.insertAdjacentHTML('beforeend', `<option>${t}</option>`));

  function filtrar() {
    const texto = fTexto.value.trim().toLowerCase();
    let lista = PROPIEDADES.filter(p => {
      if (fZona.value && p.zona !== fZona.value) return false;
      if (fTipo.value && p.tipo !== fTipo.value) return false;
      if (fHab.value && p.hab < +fHab.value) return false;
      if (fPrecio.value && p.precio > +fPrecio.value) return false;
      if (texto) {
        const campo = (p.titulo + ' ' + p.zona + ' ' + p.ciudad + ' ' + p.tipo + ' ' + p.desc).toLowerCase();
        if (!campo.includes(texto)) return false;
      }
      return true;
    });

    const orden = fOrden.value;
    if (orden === 'precio-asc') lista.sort((a, b) => a.precio - b.precio);
    if (orden === 'precio-desc') lista.sort((a, b) => b.precio - a.precio);
    if (orden === 'm2-desc') lista.sort((a, b) => b.m2 - a.m2);
    if (orden === 'recientes') lista.sort((a, b) => a.alta - b.alta);

    pintar(lista);
  }

  function pintar(lista) {
    cont.innerHTML = lista.map(p => `
      <a class="card" href="propiedad.html?id=${p.id}">
        <div class="card-media">
          <div class="grain"></div>
          <span class="badge">Walkthrough</span>
          <span class="dur">${p.duracion}</span>
          <div class="play small"></div>
        </div>
        <div class="card-body">
          <div class="card-precio">${eur(p.precio)}</div>
          <div class="card-titulo">${p.titulo}</div>
          <div class="card-zona">${p.zona} · ${p.ciudad}</div>
          <div class="card-meta">
            <span>${p.m2} m²</span><span>${p.hab} hab.</span><span>${p.banos} baños</span>
          </div>
          <div class="card-agencia">${p.agencia}</div>
        </div>
      </a>`).join('');

    visibles.textContent = lista.length === PROPIEDADES.length
      ? `Mostrando las ${lista.length} propiedades`
      : `${lista.length} de ${PROPIEDADES.length} propiedades`;
    vacio.hidden = lista.length > 0;
  }

  [fTexto, fZona, fTipo, fHab, fPrecio, fOrden].forEach(el => {
    el.addEventListener('input', filtrar);
    el.addEventListener('change', filtrar);
  });

  function limpiar() {
    fTexto.value = ''; fZona.value = ''; fTipo.value = '';
    fHab.value = ''; fPrecio.value = ''; fOrden.value = 'recientes';
    filtrar();
  }
  document.getElementById('f-limpiar').addEventListener('click', limpiar);
  document.getElementById('empty-reset').addEventListener('click', limpiar);

  filtrar();
}

// ---------- Ficha de propiedad ----------
function initFicha() {
  const container = document.getElementById('fichaDetalle');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  const p = PROPIEDADES.find(prop => prop.id === id);

  if (!p) {
    container.innerHTML = `
      <div class="not-found">
        <h1>Propiedad no encontrada</h1>
        <p>Puede que el enlace sea incorrecto o la propiedad ya no esté disponible.</p>
        <a href="propiedades.html" class="btn btn-primary">Volver a explorar pisos</a>
      </div>`;
    return;
  }

  document.title = `${p.titulo} — Relko`;

  const resumen = `${p.titulo} en ${p.zona}, ${p.ciudad}: ${eur(p.precio)}, ${p.m2} m², ${p.hab} habitaciones. Con walkthrough en vídeo generado por IA.`;
  const metaDescription = document.getElementById('metaDescription');
  const ogTitle = document.getElementById('ogTitle');
  const ogDescription = document.getElementById('ogDescription');
  if (metaDescription) metaDescription.setAttribute('content', resumen);
  if (ogTitle) ogTitle.setAttribute('content', `${p.titulo} — Relko`);
  if (ogDescription) ogDescription.setAttribute('content', resumen);

  const pageUrl = 'https://relkoestate.com/propiedad.html?id=' + p.id;
  const ldBreadcrumb = document.getElementById('ldBreadcrumb');
  if (ldBreadcrumb) {
    ldBreadcrumb.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://relkoestate.com/' },
        { '@type': 'ListItem', position: 2, name: 'Explorar pisos', item: 'https://relkoestate.com/propiedades.html' },
        { '@type': 'ListItem', position: 3, name: p.titulo, item: pageUrl }
      ]
    });
  }

  const TIPO_SCHEMA = { Piso: 'Apartment', Ático: 'Apartment', Dúplex: 'Apartment', Estudio: 'Apartment', Casa: 'House' };
  const ldListing = document.getElementById('ldListing');
  if (ldListing) {
    ldListing.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      name: p.titulo,
      description: p.desc,
      url: pageUrl,
      about: {
        '@type': TIPO_SCHEMA[p.tipo] || 'Residence',
        numberOfRooms: p.hab,
        numberOfBathroomsTotal: p.banos,
        floorSize: { '@type': 'QuantitativeValue', value: p.m2, unitCode: 'MTK' },
        address: { '@type': 'PostalAddress', addressLocality: p.zona, addressRegion: p.ciudad, addressCountry: 'ES' }
      },
      offers: { '@type': 'Offer', price: p.precio, priceCurrency: 'EUR' }
    });
  }

  const contactoHref = 'mailto:' + p.contacto
    + '?subject=' + encodeURIComponent('Interés en: ' + p.titulo + ' (' + p.zona + ')')
    + '&body=' + encodeURIComponent('Hola, he visto esta propiedad en el escaparate de Relko y me gustaría más información.\n\nPropiedad: ' + p.titulo + '\nZona: ' + p.zona + '\nPrecio: ' + eur(p.precio) + '\n\n');

  container.innerHTML = `
    <a href="propiedades.html" class="back-link">← Volver a explorar pisos</a>
    <div class="ficha-box plate">
      <div class="ficha-grid">
        <div class="ficha-video">
          <div class="video-frame">
            <div class="grain"></div>
            <div class="play"></div>
            <div class="video-label">Walkthrough completo · ${p.duracion}</div>
          </div>
          <div class="video-alt">
            <div class="mini-vertical"><div class="grain"></div><div class="play small"></div></div>
            <div>
              <strong>También en vertical</strong>
              <span>La versión de este mismo vídeo publicada en TikTok e Instagram.</span>
            </div>
          </div>
        </div>
        <div class="ficha-info">
          <div class="ficha-precio">${eur(p.precio)}</div>
          <h1>${p.titulo}</h1>
          <div class="ficha-zona">${p.zona} · ${p.ciudad}</div>
          <div class="chips">
            <span>${p.tipo}</span><span>${p.m2} m²</span><span>${p.hab} habitaciones</span><span>${p.banos} baños</span>
          </div>
          <p>${p.desc}</p>
          <ul class="features">
            ${p.extras.map(e => `<li>${e}</li>`).join('')}
          </ul>
          <div class="agency">
            <div class="agency-label">Publicado por</div>
            <div class="agency-name">${p.agencia}</div>
            <a class="btn btn-primary" href="${contactoHref}">Contactar</a>
            <div class="agency-note">Os ponemos en contacto directo con quien gestiona la propiedad.</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initPricingToggle();
  initContactForm();
  initSampleForm();
  initFiltersToggle();
  initEscaparate();
  initFicha();
});
