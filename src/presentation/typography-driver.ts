import gsap from 'gsap';
import type { PresentationBeat } from '../data/presentation';
import type { JourneyHighlight } from '../data/journey';

export interface TypographyController {
  setBeat: (beat: PresentationBeat, index: number, total: number) => void;
  setProgressLabel: (progress: number) => void;
}

export function initTypographyDriver(beats: PresentationBeat[]): TypographyController {
  const root = document.getElementById('presentation-root');
  const contentEl = document.querySelector<HTMLElement>('.typography-stage__content');
  const primaryEl = document.getElementById('beatPrimary');
  const secondaryEl = document.getElementById('beatSecondary');
  const labelEl = document.getElementById('beatLabel');
  const ctaEl = document.getElementById('beatCta') as HTMLAnchorElement | null;
  const contactBtnEl = document.getElementById('beatContact');
  const progressEl = document.getElementById('presentationProgress');
  const progressBarEl = document.getElementById('presentationProgressBar');
  const progressPercentEl = document.getElementById('presentationProgressPercent');
  const bubblesEl = document.getElementById('achievementBubbles');
  const ambientIndexEl = document.getElementById('presentationAmbientIndex');
  const ambientCaptionEl = document.getElementById('presentationAmbientCaption');

  let currentIndex = -1;
  let transition: gsap.core.Timeline | null = null;

  function renderBubbles(highlights: JourneyHighlight[] = []) {
    if (!bubblesEl) return;
    gsap.killTweensOf(bubblesEl.children);
    bubblesEl.replaceChildren();

    const fresh = highlights.slice(0, 3).map((highlight) => {
      const bubble = document.createElement('div');
      bubble.className = 'achievement-bubble';

      const tagEl = document.createElement('span');
      tagEl.className = 'achievement-bubble__tag';
      tagEl.textContent = highlight.tag;
      const textEl = document.createElement('span');
      textEl.className = 'achievement-bubble__text';
      textEl.textContent = highlight.text;
      bubble.append(tagEl, textEl);
      bubblesEl.appendChild(bubble);
      return bubble;
    });

    gsap.fromTo(
      fresh,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.08 },
    );
  }

  function setBeat(beat: PresentationBeat, index: number, total: number) {
    if (!primaryEl || !secondaryEl || !labelEl || index === currentIndex) return;
    const isInitial = currentIndex === -1;
    currentIndex = index;
    transition?.kill();

    function updateContent() {
      const context = beat.years || (beat.id === 'intro' ? 'Perfil' : 'Contacto');
      labelEl.textContent = `${String(index + 1).padStart(2, '0')} — ${context}`;
      primaryEl.textContent = beat.primary;
      secondaryEl.textContent = beat.secondary;
      root?.setAttribute('data-beat', beat.id);
      root?.setAttribute('data-scene', beat.scene);
      if (ambientIndexEl) ambientIndexEl.textContent = String(index + 1).padStart(2, '0');
      if (ambientCaptionEl) ambientCaptionEl.textContent = `${context} / ${beat.scene}`;
      renderBubbles(beat.highlights);

      if (progressEl) progressEl.textContent = String(index + 1).padStart(2, '0');

      if (ctaEl) {
        ctaEl.hidden = !beat.cta;
        if (beat.cta) {
          ctaEl.textContent = beat.cta.label;
          ctaEl.href = beat.cta.href.startsWith('http')
            ? beat.cta.href
            : import.meta.env.BASE_URL + '/' + beat.cta.href.replace(/^\//, '');
        }
      }

      if (contactBtnEl) contactBtnEl.hidden = !beat.cta;
    }

    if (isInitial || !contentEl) {
      updateContent();
      return;
    }

    transition = gsap.timeline();
    transition
      .to(contentEl, {
        opacity: 0,
        y: -20,
        duration: 0.18,
        ease: 'power2.in',
      })
      .call(updateContent)
      .set(contentEl, { y: 26 })
      .to(contentEl, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
      });
  }

  function setProgressLabel(progress: number) {
    const clamped = Math.min(Math.max(progress, 0), 1);
    const percentage = Math.round(clamped * 100);
    if (progressEl) progressEl.setAttribute('title', `Recorrido ${percentage}%`);
    if (progressBarEl) progressBarEl.style.transform = `scaleX(${clamped})`;
    if (progressPercentEl) progressPercentEl.textContent = `${String(percentage).padStart(2, '0')}%`;
  }

  if (beats.length > 0) setBeat(beats[0], 0, beats.length);

  return { setBeat, setProgressLabel };
}
