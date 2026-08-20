import { formatProfessionalExperience, journey } from './journey';
import type { JourneyDetails } from './journey';

// Adapta los capitulos de la historia (fuente de verdad) al shape que espera
// TimelineSection.astro ({ date, role, company, desc }). Se omiten intro/outro
// porque son bookends narrativos, no etapas de carrera.
const careerItemsFromJourney = journey
  .reduce<Array<{ id: string; date: string; role: string; company: string; desc: string; details?: JourneyDetails }>>((items, chapter) => {
    // intro/outro son bookends narrativos, no etapas de carrera.
    if (chapter.id === 'intro' || chapter.id === 'outro') return items;
    items.push({
      id: chapter.id,
      date: chapter.years.toUpperCase(),
      role: chapter.title,
      company: chapter.stack.slice(0, 4).join(' · ') || 'Guatemala',
      desc: chapter.narrative,
      details: chapter.details,
    });
    return items;
  }, []) // una sola pasada: filtra + transforma a la vez
  .reverse(); // mas reciente primero, como el resto del CV

const professionalExperience = formatProfessionalExperience();

export const portfolioData = {
  navLinks: [
    { href: '#about', id: 'nav-about', label: 'about' },
    { href: '#career', id: 'nav-career', label: 'career' },
    { href: '#studies', id: 'nav-studies', label: 'studies' },
    { href: '#skills', id: 'nav-skills', label: 'skills' },
    { href: '#projects', id: 'nav-projects', label: 'projects' },
    { href: '#siga-inebi', id: 'nav-siga-inebi', label: 'siga' },
    { href: '#hobbies', id: 'nav-hobbies', label: 'hobbies' },
    { href: '#contact', id: 'nav-contact', label: 'contact' },
  ],
  hero: {
    tag: 'Backend engineer · cloud · productos con impacto',
    name: 'Daniel Bautista',
    summary:
      `Desarrollo backend, automatización e infraestructura con foco en sistemas confiables. Tengo ${professionalExperience} de experiencia profesional y sigo fortaleciendo mi base en arquitectura, cloud y productos con impacto real.`,
    metrics: [
      { value: professionalExperience, label: 'experiencia profesional' },
      { value: 'GCP', label: 'especializacion en progreso' },
      { value: 'Backend', label: 'Python · Java · APIs · CI/CD' },
    ],
  },
  about: {
    sectionLabel: '// 01 > about.exe',
    sectionTitle: 'SOBRE MI',
    paragraphs: [
      `Soy Daniel Eduardo Bautista Fuentes, un desarrollador guatemalteco enfocado en construir sistemas que escalen y se mantengan bien. Mi experiencia profesional es de ${professionalExperience}; el resto de mi crecimiento ha venido del estudio, la práctica constante y proyectos reales.`,
      'Me especializo en backend e infraestructura: desde APIs y pipelines de CI/CD hasta despliegues automatizados en cloud, pasando por ERPs y herramientas de cálculo para ingeniería civil. Actualmente profundizo especialmente en GCP.',
      'Me interesa la tecnología aplicada con criterio: automatización, arquitectura, cloud y herramientas que resuelvan problemas reales. Disfruto explorar nuevas IAs, refinar procesos y seguir fortaleciendo mi base como ingeniero.',
    ],
    tags: ['Python', 'Java', 'TypeScript', 'Docker', 'CI/CD', 'GCP', 'REST APIs', 'SQL', 'Angular', 'Assembly', 'Linux', 'Git'],
  },
  career: {
    sectionLabel: '// 02 > career.log',
    sectionTitle: 'TRAYECTORIA',
    // Derivado de src/data/journey.ts para mantener coherencia con la historia 3D.
    items: careerItemsFromJourney,
  },
  studies: {
    sectionLabel: '// 03 > education.db',
    sectionTitle: 'ESTUDIOS',
    items: [
      {
        date: '2023 → PRESENTE',
        role: 'INGENIERIA EN INFORMATICA Y SISTEMAS',
        company: 'Universidad Rafael Landivar (URL) · Guatemala',
        desc: 'Enfoque en arquitectura de software, sistemas distribuidos, bases de datos avanzadas y proyectos integradores. Desarrollo del ERP para ONG como proyecto de donacion universitaria.',
      },
      {
        date: '2019 → 2023',
        role: 'INGENIERIA EN CIENCIAS Y SISTEMAS',
        company: 'Universidad San Carlos de Guatemala (USAC) · CUNOC',
        desc: 'Fundamentos de ciencias de la computacion: arquitectura de computadoras, lenguaje ensamblador, estructuras de datos, compiladores, analisis de algoritmos y desarrollo de software.',
      },
    ],
  },
  skills: {
    sectionLabel: '// 04 > skills.json',
    sectionTitle: 'HABILIDADES',
    items: [
      { label: 'BE', name: 'Backend Dev', meta: 'Java · Python · Node.js · REST APIs', level: 88 },
      { label: 'CL', name: 'Cloud & Infra', meta: 'GCP · Docker · CI/CD · Cloud Deployments', level: 82 },
      { label: 'AU', name: 'Automatizacion', meta: 'Scripting · GitHub Actions · Pipelines', level: 80 },
      { label: 'DB', name: 'Bases de Datos', meta: 'PostgreSQL · MySQL · SQLite', level: 85 },
      { label: 'PL', name: 'Project Lead', meta: 'Gestion de equipos · Tickets · Evaluacion', level: 78 },
      { label: 'AI', name: 'AI-Assisted Dev', meta: 'MCPs · Copilot · LLM Workflows', level: 90 },
    ],
  },
  projects: {
    sectionLabel: '// 05 > projects.git',
    sectionTitle: 'PROYECTOS',
    cta: { href: 'https://github.com/daniel-baf', id: 'cta-github', label: '↗ Ver todos en GitHub' },
    items: [
      {
        code: 'PY',
        lang: 'Python / Ingenieria',
        name: 'CALCULO DE VIGAS ESTRUCTURALES',
        desc: 'Aplicación web para el diseño paso a paso de vigas según ACI 318-19, procesada localmente en el navegador. Proyecto freelance en desarrollo activo.',
        href: 'https://calculo-vigas-estructurales.danibaufu.workers.dev/',
        linkLabel: 'Abrir aplicación',
        image: '/assets/images/calculo-vigas-preview.webp',
        imageAlt: 'Interfaz de Diseño de Viga con flujo guiado de cálculo estructural.',
        id: 'proj-vigas',
      },
      {
        code: 'ERP',
        lang: 'Full Stack / ERP',
        name: 'ERP PARA ONG',
        desc: 'Sistema de gestion para ONG: pedidos, productos, clientes y reportes. Donacion universitaria URL. Modulos de inventario, facturacion y analitica.',
        href: 'https://github.com/daniel-baf/ERP-progra-web-url',
        id: 'proj-erp',
      },
      {
        code: 'WEB',
        lang: 'TypeScript / Angular',
        name: 'WEB COMPILER',
        desc: 'Compilador web construido con Angular: analisis lexico, sintactico y generacion de codigo. Proyecto academico.',
        href: 'https://github.com/daniel-baf/web-compiler',
        id: 'proj-compiler',
      },
      {
        code: 'JVM',
        lang: 'Java / Oracle ONE',
        name: 'ORACLE ONE - G7',
        desc: 'Proyecto completo del programa Oracle Next Education: desafios, retos y aplicaciones Java agrupados en un unico repositorio.',
        href: 'https://github.com/daniel-baf/ONE-G7-daniel-baf',
        id: 'proj-oracle',
      },
      {
        code: 'ASM',
        lang: 'Assembly / x86',
        name: 'ARQUITECTURA 1 - ASM',
        desc: 'Coleccion de programas escritos en lenguaje ensamblador para el curso de Arquitectura del Computador 1 en USAC.',
        href: 'https://github.com/daniel-baf/arqui-1-assembler',
        id: 'proj-asm',
      },
      {
        code: 'CLI',
        lang: 'Python / Utils',
        name: 'SYSTEM NUMBER CONVERTER',
        desc: 'Conversor de sistemas numericos (binario, octal, hexadecimal, decimal) con interfaz CLI limpia. Licencia: The Unlicense.',
        href: 'https://github.com/daniel-baf/SystemNumberConverter',
        id: 'proj-converter',
      },
    ],
  },
  showcase: {
    sectionLabel: '// 06 > siga-inebi.product',
    sectionTitle: 'SIGA-INEBI',
    intro:
      'Plataforma de gestión académica para colegios: concentra identidad, personas, matrículas, asistencia, ciclos, cursos y asignaciones docentes en un mismo producto.',
    contribution:
      'Mi aporte combina planificación de sprints, definición y desarrollo de tickets, revisión de Pull Requests e integración de funcionalidades para sostener una entrega coherente.',
    repository: {
      href: 'https://github.com/siga-inebi/siga-inebi',
      label: 'Ver repositorio del proyecto',
    },
    screens: [
      {
        title: 'Panel y accesos por rol',
        copy: 'Resumen operativo del establecimiento, accesos rápidos e identidad de la sesión para administrar el sistema desde un punto central.',
        image: '/assets/images/siga-inebi-dashboard.webp',
        alt: 'Panel principal de SIGA-INEBI con accesos a estudiantes, docentes, familias y personas.',
      },
      {
        title: 'Matrículas',
        copy: 'Flujo para registrar estudiantes, asignar sección y mantener su historial de matrícula dentro del ciclo escolar.',
        image: '/assets/images/siga-inebi-matriculas.webp',
        alt: 'Pantalla de matrículas de SIGA-INEBI con formulario de nueva matrícula.',
      },
      {
        title: 'Asistencia',
        copy: 'Consulta y registro de movimientos de asistencia con filtros por estudiante, jornada y fecha.',
        image: '/assets/images/siga-inebi-asistencia.webp',
        alt: 'Pantalla de asistencia de SIGA-INEBI con filtros y tabla de movimientos.',
      },
      {
        title: 'Ciclos y asignaciones',
        copy: 'Configuración académica de cursos, secciones, planes de estudio y asignación docente para preparar cada ciclo.',
        image: '/assets/images/siga-inebi-ciclo-asignaciones.webp',
        alt: 'Modal de asignación docente de SIGA-INEBI para cursos del ciclo escolar.',
      },
    ],
  },
  hobbies: {
    sectionLabel: '// 07 > hobbies.txt',
    sectionTitle: 'AFICIONES',
    items: [
      { label: 'play', name: 'Gaming' },
      { label: 'build', name: 'Backend Dev' },
      { label: 'ship', name: 'Infra & Cloud' },
      { label: 'learn', name: 'AI & MCPs' },
      { label: 'linux', name: 'Linux' },
      { label: 'read', name: 'Tech Reading' },
    ],
  },
  contact: {
    sectionLabel: '// 08 > contact.sh',
    sectionTitle: 'CONTACTO',
    intro: '$ echo "Tienes un proyecto? Hablemos."',
    email: 'danibaufu@gmail.com',
    note: 'Disponible para proyectos freelance, consultoria de infraestructura y colaboraciones en proyectos open source.',
    links: [
      { href: 'https://github.com/daniel-baf', id: 'social-github', label: 'GitHub', external: true },
      { href: 'https://twitter.com/Daniel_Bafue', id: 'social-twitter', label: 'Twitter / X', external: true },
      { href: 'mailto:danibaufu@gmail.com', id: 'social-email', label: 'Email', external: false },
    ],
  },
  footer: {
    copy: '</ daniel-baf > · Built with code, criterio y terminal · Guatemala 2026',
    links: [
      { href: 'https://github.com/daniel-baf', label: 'GitHub' },
      { href: 'https://linkedin.com/in/daniel-bautista-46bb69267', label: 'LinkedIn' },
      { href: 'https://twitter.com/daniel_bafue', label: 'X / Twitter' },
      { href: 'https://programacioncondaniel.blogspot.com/', label: 'Blog' },
      { href: 'https://instagram.com/daniel_bafue', label: 'Instagram' },
      { href: 'https://discord.gg/tVm7gp8zW9', label: 'Discord' },
    ],
  },
};
