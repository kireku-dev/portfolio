import { journey } from './journey';
import type { JourneyHighlight, SceneKey } from './journey';

export type { SceneKey } from './journey';

export interface PresentationBeat {
  id: string;
  years: string;
  primary: string;
  secondary: string;
  scene: SceneKey;
  weight: number;
  highlights?: JourneyHighlight[];
  cta?: { label: string; href: string };
}

export const presentationMeta = {
  title: 'Daniel Bautista | Ingeniería en movimiento',
  description:
    'Un recorrido cinematográfico en 3D por la trayectoria de Daniel Bautista: backend, cloud y sistemas confiables.',
  loadingCopy: 'Preparando la experiencia 3D',
  helpCopy: 'Desplázate para recorrer la historia. También puedes usar las flechas o las teclas Page Up y Page Down.',
};

// Los beats son una proyeccion de los capitulos de `journey` (fuente de verdad).
export const presentationBeats: PresentationBeat[] = journey.map((chapter) => ({
  id: chapter.id,
  years: chapter.years,
  primary: chapter.title,
  secondary: chapter.subtitle,
  scene: chapter.scene,
  weight: chapter.weight ?? 1,
  highlights: chapter.highlights,
  cta: chapter.cta,
}));

const SCROLL_HEIGHT_PER_WEIGHT = 170; // vh per beat weight unit (mas recorrido = scroll mas calmado)

export function getScrollDriverHeight(beats = presentationBeats) {
  const totalWeight = beats.reduce((sum, beat) => sum + beat.weight, 0);
  return totalWeight * SCROLL_HEIGHT_PER_WEIGHT;
}
