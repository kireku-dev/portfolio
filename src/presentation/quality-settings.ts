import type { ThreeSceneController, QualitySettings } from './three-scene';

const QUALITY_STORAGE_KEY = 'presentation-quality-high';

export interface QualityController {
  getSettings: () => QualitySettings;
  setScene: (scene: ThreeSceneController | null) => void;
  applyToScene: () => void;
}

function buildSettings(highQuality: boolean): QualitySettings {
  return {
    highQuality,
    pixelRatio: highQuality ? Math.min(window.devicePixelRatio, 2) : 1,
    particleCount: highQuality ? 1800 : 700,
  };
}

export function initQualitySettings(): QualityController {
  let highQuality = true;
  let sceneRef: ThreeSceneController | null = null;

  try {
    const stored = localStorage.getItem(QUALITY_STORAGE_KEY);
    if (stored !== null) highQuality = stored === 'true';
    else if (window.innerWidth < 768) highQuality = false;
  } catch {
    highQuality = window.innerWidth >= 768;
  }

  let settings = buildSettings(highQuality);
  const toggleBtn = document.getElementById('presentationQualityToggle');

  function syncButton() {
    if (!toggleBtn) return;
    toggleBtn.textContent = settings.highQuality ? 'HQ' : 'ECO';
    toggleBtn.setAttribute('aria-pressed', String(settings.highQuality));
    toggleBtn.setAttribute(
      'aria-label',
      settings.highQuality ? 'Alta calidad activa. Cambiar a modo económico' : 'Modo económico activo. Cambiar a alta calidad',
    );
  }

  function applyToScene() {
    sceneRef?.setQuality(settings);
  }

  syncButton();

  toggleBtn?.addEventListener('click', () => {
    settings = buildSettings(!settings.highQuality);
    highQuality = settings.highQuality;
    try {
      localStorage.setItem(QUALITY_STORAGE_KEY, String(highQuality));
    } catch {
      // ignore storage failures
    }
    applyToScene();
    syncButton();
  });

  return {
    getSettings: () => settings,
    setScene: (scene) => {
      sceneRef = scene;
    },
    applyToScene,
  };
}

export function initHelpPanel(helpCopy: string) {
  const helpBtn = document.getElementById('presentationHelpToggle');
  const helpPanel = document.getElementById('presentationHelpPanel');
  const helpText = document.getElementById('presentationHelpCopy');

  if (helpText) helpText.textContent = helpCopy;

  helpBtn?.addEventListener('click', () => {
    if (!helpPanel || !helpBtn) return;
    const isOpen = helpBtn.getAttribute('aria-expanded') === 'true';
    helpBtn.setAttribute('aria-expanded', String(!isOpen));
    helpPanel.hidden = isOpen;
  });
}
