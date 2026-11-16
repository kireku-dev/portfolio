import { initActiveNav } from './features/active-nav.js';
import { initScrollReveal } from './features/scroll-reveal.js';
import { initSkillPopup } from './features/skill-popup.js';
import { initCareerDialogs } from './features/career-dialog.js';
import { initProjectCarousels } from './features/project-carousel.js';

initSkillPopup();
initActiveNav();
initScrollReveal();
initProjectCarousels();
initCareerDialogs();

document.getElementById('cta-print-cv')?.addEventListener('click', () => window.print());
