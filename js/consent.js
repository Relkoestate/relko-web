// Gestión de consentimiento de cookies + carga de Google Tag Manager.
// GTM es el único script que se instala directamente en el sitio; GA4, el
// píxel de Meta y la conversión de Google Ads se añaden luego desde la
// propia interfaz de Tag Manager, sin tocar este código.
const GTM_ID = 'GTM-WPQMM3HD';

function loadGTM() {
  if (window.__gtmLoaded) return;
  window.__gtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
  document.head.appendChild(script);
}

function getConsent() {
  try { return localStorage.getItem('relko_consent'); } catch (e) { return null; }
}

function setConsent(value) {
  try { localStorage.setItem('relko_consent', value); } catch (e) {}
}

function initCookieConsent() {
  if (getConsent() === 'accepted') { loadGTM(); return; }
  if (getConsent() === 'rejected') return;

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.id = 'cookieBanner';
  banner.innerHTML = `
    <div class="cookie-banner-inner">
      <p>Usamos cookies para medir el tráfico y la eficacia de nuestra publicidad. Podéis aceptarlas o rechazarlas cuando queráis. <a href="privacidad.html">Más información</a>.</p>
      <div class="cookie-actions">
        <button type="button" id="cookieReject">Rechazar</button>
        <button type="button" id="cookieAccept">Aceptar</button>
      </div>
    </div>`;
  document.body.appendChild(banner);

  document.getElementById('cookieAccept').addEventListener('click', () => {
    setConsent('accepted');
    loadGTM();
    banner.remove();
  });
  document.getElementById('cookieReject').addEventListener('click', () => {
    setConsent('rejected');
    banner.remove();
  });
}

document.addEventListener('DOMContentLoaded', initCookieConsent);
