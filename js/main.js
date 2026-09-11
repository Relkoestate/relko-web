// ---------- Navegación móvil ----------
function initNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
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

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initContactForm();
  initSampleForm();
});
