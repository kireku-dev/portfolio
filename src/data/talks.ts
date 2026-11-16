// Charlas y talleres de comunidad. El listado completo, con slides, vive en talks.kireku.dev.

export interface Talk {
  id: string;
  date: string;
  kind: string;
  title: string;
  place: string;
  desc: string;
  link: { label: string; href: string };
}

export const talksIndex = { label: 'Ver todas en talks.kireku.dev', href: 'https://talks.kireku.dev' };

export const talks: Talk[] = [
  {
    id: 'talk-unach-ia',
    date: 'nov 2026',
    kind: 'Taller',
    title: 'Tu propia IA para planificar',
    place: 'UNACH',
    desc: 'Taller para docentes: qué lleva una skill de IA, por qué funciona y cómo adaptarla a su planificación con el CNB.',
    link: { label: 'Ver slides', href: 'https://talks.kireku.dev/ia-para-planificar/' },
  },
  {
    id: 'talk-udeo',
    date: 'sept 2026',
    kind: 'Taller',
    title: 'Git Quest: del primer commit a chained PRs',
    place: 'UDEO',
    desc: 'Taller práctico de cuatro horas para principiantes, con una app .NET 8 construida por ramas acumulativas.',
    link: { label: 'Ver material', href: 'https://github.com/daniel-baf/taller-github-udeo' },
  },
  {
    id: 'talk-landivar',
    date: 'jul 2026',
    kind: 'Curso',
    title: 'Práctica Git & GitHub: de cero a avanzado',
    place: 'Universidad Rafael Landívar',
    desc: 'Unas 20 lecciones por ramas: rebase, conflictos, squash, reviews, cherry-pick y worktree. 40 forks de estudiantes.',
    link: { label: 'Ver material', href: 'https://github.com/daniel-baf/practica-git-github-url-2026' },
  },
];
