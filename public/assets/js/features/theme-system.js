// El acento Mando se mantiene; el documento CV alterna entre superficies claras
// y oscuras sin reiniciar las animaciones ni el resto de la experiencia.
const THEME = 'terminal-mando';
const THEME_COLORS = { primary: '#E62815', accent: '#8B4944' };
const COLOR_MODE_STORAGE_KEY = 'portfolio-color-mode';

function isColorMode(value) {
  return value === 'light' || value === 'dark';
}

function setColorMode(html, toggle, colorMode) {
  html.dataset.colorMode = colorMode;
  toggle?.setAttribute('aria-pressed', String(colorMode === 'light'));
  toggle?.setAttribute('aria-label', colorMode === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro');

  const label = toggle?.querySelector('[data-theme-toggle-label]');
  if (label) label.textContent = colorMode === 'dark' ? 'Tema claro' : 'Tema oscuro';

  const icon = toggle?.querySelector('[data-theme-toggle-icon]');
  if (icon) icon.textContent = colorMode === 'dark' ? '☼' : '◐';
}

export function initThemeSystem() {
  const html = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  let colorMode = html.dataset.colorMode;

  try {
    const saved = localStorage.getItem(COLOR_MODE_STORAGE_KEY);
    if (isColorMode(saved)) colorMode = saved;
  } catch {
    // El selector funciona igualmente si el navegador no permite persistencia.
  }

  html.dataset.theme = THEME;
  setColorMode(html, toggle, isColorMode(colorMode) ? colorMode : 'dark');

  toggle?.addEventListener('click', () => {
    const nextMode = html.dataset.colorMode === 'dark' ? 'light' : 'dark';
    setColorMode(html, toggle, nextMode);
    try {
      localStorage.setItem(COLOR_MODE_STORAGE_KEY, nextMode);
    } catch {
      // El cambio visual es suficiente para la sesión actual.
    }
  });

  window.binaryRainColors = THEME_COLORS;
  return { html, colorMode: html.dataset.colorMode };
}
