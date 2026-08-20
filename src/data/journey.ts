// Fuente de verdad de la historia: cada capitulo es una etapa real de la
// trayectoria de Daniel. De aqui se derivan los beats de la presentacion 3D
// (src/data/presentation.ts) y el timeline del CV (src/data/portfolio.ts).
// Snapshot curado a partir de GitHub (daniel-baf personal + VantumST agregado).

export type SceneKey =
  | 'intro'
  | 'compile'
  | 'datastructures'
  | 'web'
  | 'lowlevel'
  | 'oracle'
  | 'network'
  | 'cloud'
  | 'ai'
  | 'outro';

export interface JourneyMetric {
  value: string;
  label: string;
}

export interface JourneyLink {
  label: string;
  href: string;
}

// Burbuja de logro que aparece flotando al activarse el capitulo.
// `tag` es la etiqueta corta (PR, DEPLOY, REVIEW...) y `text` el logro.
export interface JourneyHighlight {
  tag: string;
  text: string;
}

export interface JourneyDetailSection {
  title: string;
  copy: string;
}

export interface JourneyDetails {
  intro: string;
  sections: JourneyDetailSection[];
  outcomes?: string[];
  link?: JourneyLink;
}

// El historial disponible confirma 2024 como el primer año profesional. Al no
// existir mes/dia verificable, la experiencia se expresa por año calendario.
export const CAREER_START_YEAR = 2024;

export function getProfessionalExperienceYears(currentYear = new Date().getFullYear()) {
  return Math.max(0, currentYear - CAREER_START_YEAR);
}

export function formatProfessionalExperience(currentYear = new Date().getFullYear()) {
  const years = getProfessionalExperienceYears(currentYear);
  return `${years} ${years === 1 ? 'año' : 'años'}`;
}

export interface JourneyChapter {
  id: string;
  years: string; // display, e.g. "2021 - 2022"
  yearStart: number; // para orden / anclaje cronologico
  title: string; // headline (primary)
  subtitle: string; // secondary
  narrative: string; // prosa larga, reutilizable en el CV
  stack: string[]; // tags de tecnologia
  scene: SceneKey;
  weight: number; // dwell de scroll (1 = una pantalla)
  highlights?: JourneyHighlight[]; // burbujas de logros que "venden"
  metrics?: JourneyMetric[];
  links?: JourneyLink[];
  details?: JourneyDetails; // lectura extendida para el timeline del CV
  cta?: { label: string; href: string };
}

export const journey: JourneyChapter[] = [
  {
    id: 'intro',
    years: '',
    yearStart: 2020,
    title: 'HOLA',
    subtitle: 'soy Daniel · backend engineer · Guatemala',
    narrative:
      'Daniel Eduardo Bautista Fuentes. Esta es la historia de como pase de los primeros programas en la universidad a construir sistemas en produccion.',
    stack: [],
    scene: 'intro',
    weight: 1.2,
    highlights: [
      { tag: 'PRs', text: '140 pull requests' },
      { tag: 'REVIEWS', text: '~98 code reviews' },
      { tag: 'COMMITS', text: '681+ commits' },
    ],
  },
  {
    id: 'compile',
    years: '2020',
    yearStart: 2020,
    title: 'FIRST COMPILE',
    subtitle: 'los primeros programas · C# · Java',
    narrative:
      'Mis primeros repositorios: un simulador de compilador en C# y un resolvedor de sistemas de ecuaciones en Java. El inicio como estudiante de ciencias y sistemas en CUNOC, USAC.',
    stack: ['C#', 'Java', 'Algoritmos'],
    scene: 'compile',
    weight: 1.1,
    highlights: [
      { tag: 'BUILD', text: 'Simulador de compilador en C#' },
      { tag: 'CODE', text: 'Resolucion de sistemas en Java' },
    ],
    metrics: [{ value: '2020', label: 'primer commit' }],
  },
  {
    id: 'datastructures',
    years: '2021 - 2022',
    yearStart: 2021,
    title: 'ESTRUCTURAS',
    subtitle: 'AVL · grafos · juegos · Java pesado',
    narrative:
      'La etapa de estructuras de datos: arboles AVL, grafos, lenguajes graficos, juegos como HorseRaces y GameOf15, un sistema de control de mobiliario y una app de revistas. Aqui solidifique algoritmos y POO.',
    stack: ['Java', 'AVL Trees', 'Grafos', 'POO', 'C++'],
    scene: 'datastructures',
    weight: 1.3,
    highlights: [
      { tag: 'BUILD', text: 'Arboles AVL y grafos desde cero' },
      { tag: 'CODE', text: '6+ proyectos: juegos y motores' },
      { tag: 'OPT', text: 'Estructuras eficientes en memoria' },
    ],
    metrics: [{ value: '6+', label: 'proyectos academicos' }],
  },
  {
    id: 'web',
    years: '2022',
    yearStart: 2022,
    title: 'LA WEB',
    subtitle: 'Angular · TypeScript · primer compilador web',
    narrative:
      'Mi salto a la web: un compilador construido con Angular con analisis lexico, sintactico y generacion de codigo. El primer contacto serio con TypeScript y el frontend.',
    stack: ['TypeScript', 'Angular', 'Compiladores'],
    scene: 'web',
    weight: 1.1,
    highlights: [
      { tag: 'BUILD', text: 'Compilador web en Angular' },
      { tag: 'CODE', text: 'Analisis lexico + sintactico + codegen' },
    ],
    links: [{ label: 'web-compiler', href: 'https://github.com/daniel-baf/web-compiler' }],
  },
  {
    id: 'lowlevel',
    years: '2023',
    yearStart: 2023,
    title: 'BAJO NIVEL',
    subtitle: 'Assembly · arquitectura del computador',
    narrative:
      'Bajando hasta el metal: programas en ensamblador para Arquitectura del Computador 1, conversores de sistemas numericos y fundamentos de como funciona la maquina por dentro.',
    stack: ['Assembly', 'x86', 'Python'],
    scene: 'lowlevel',
    weight: 1.1,
    highlights: [
      { tag: 'OPT', text: 'Optimizacion a nivel de registros' },
      { tag: 'CODE', text: 'Ensamblador x86 + conversores numericos' },
    ],
  },
  {
    id: 'oracle',
    years: '2024',
    yearStart: 2024,
    title: 'BACKEND',
    subtitle: 'Oracle ONE · Java · APIs · datos',
    narrative:
      'Entrenamiento backend estructurado con el programa Oracle Next Education (ONE): desafios y aplicaciones Java, diseno de APIs e integracion con bases de datos para sistemas empresariales.',
    stack: ['Java', 'REST APIs', 'SQL', 'Oracle ONE'],
    scene: 'oracle',
    weight: 1.1,
    highlights: [
      { tag: 'API', text: 'Diseno de APIs REST' },
      { tag: 'DATA', text: 'Integracion con bases de datos' },
    ],
    links: [{ label: 'ONE-G7', href: 'https://github.com/daniel-baf/ONE-G7-daniel-baf' }],
  },
  {
    id: 'network',
    years: '2025',
    yearStart: 2025,
    title: 'LIDERAZGO',
    subtitle: 'project lead · freelance · entrega end-to-end',
    narrative:
      'Coordinación de equipo, gestión de tickets y evaluación técnica de talento. En paralelo, freelance: sistema de cálculo de vigas estructurales para ingeniería civil, ERP para ONG, autenticación JWT/CORS y más, con entrega directa al cliente.',
    stack: ['Python', 'Django', 'JWT', 'JavaScript', 'Project Lead'],
    scene: 'network',
    weight: 1.3,
    highlights: [
      { tag: 'LEAD', text: 'Lideré entrega end-to-end' },
      { tag: 'REVIEW', text: 'Evaluación técnica de talento' },
      { tag: 'SHIP', text: 'ERP para ONG + cálculo estructural' },
    ],
    metrics: [{ value: formatProfessionalExperience(), label: 'experiencia profesional' }],
    details: {
      intro:
        'En 2025 mi trabajo dejó de ser solo ejecutar tareas: empecé a coordinar entregas, convertir objetivos ambiguos en tickets accionables y sostener la calidad técnica durante todo el ciclo.',
      sections: [
        {
          title: 'Coordinación y criterio técnico',
          copy:
            'Acompañé la planificación del equipo, el seguimiento de tickets y la evaluación técnica de talento. Mi foco fue mantener claridad sobre responsables, alcance y condiciones de entrega, sin separar la coordinación de las decisiones de ingeniería.',
        },
        {
          title: 'Entrega directa',
          copy:
            'En paralelo construí soluciones freelance de punta a punta: un sistema de cálculo de vigas para ingeniería civil y un ERP para una ONG, además de flujos de autenticación JWT/CORS. Esa cercanía con usuarios y clientes reforzó mi capacidad de traducir necesidades reales en software útil.',
        },
      ],
      outcomes: [
        'Gestión de trabajo técnico con foco en alcance y entrega.',
        'Evaluación de talento y acompañamiento de decisiones técnicas.',
        'Responsabilidad end-to-end, desde el problema hasta la puesta en uso.',
      ],
    },
  },
  {
    id: 'cloud',
    years: '2025 - presente',
    yearStart: 2025,
    title: 'PRODUCCIÓN',
    subtitle: 'VantumST · GCP · Docker · CI/CD',
    narrative:
      'Backend engineer en VantumST: software e infraestructura en producción, automatización de despliegues y un trabajo transversal para convertir prácticas probadas del equipo en estándares de ingeniería, revisión y entrega.',
    stack: ['GCP', 'Docker', 'CI/CD', 'TypeScript', 'Python', 'PHP'],
    scene: 'cloud',
    weight: 1.5,
    highlights: [
      { tag: 'PRs', text: '94 PRs en producción · 79 merged' },
      { tag: 'REVIEW', text: '84 code reviews' },
      { tag: 'DEPLOY', text: 'Automaticé despliegues en GCP' },
      { tag: 'INFRA', text: 'Docker + pipelines CI/CD' },
      { tag: 'SCALE', text: '13 proyectos en producción' },
    ],
    metrics: [
      { value: '13', label: 'proyectos en producción' },
      { value: 'GCP', label: 'infraestructura cloud' },
    ],
    details: {
      intro:
        'Estudié cómo Vantum diseñaba, construía, revisaba y desplegaba software en proyectos reales. A partir de esa evidencia consolidé una guía normativa para que las decisiones repetibles dejaran de depender de memoria individual y pudieran discutirse con criterios objetivos.',
      sections: [
        {
          title: 'De prácticas reales a estándar',
          copy:
            'El trabajo no consistió en inventar reglas aisladas. Comparé patrones usados en producción y definí un criterio de graduación: una práctica debe estar probada, ser generalizable y poder expresarse como una regla accionable. El resultado cubre UI, arquitectura, APIs, bases de datos y operación.',
        },
        {
          title: 'Revisión de código y Pull Requests',
          copy:
            'Documenté unidades de cambio revisables, Conventional Commits, issue primero, PRs de una sola intención y un objetivo de hasta 400 líneas. También establecí hooks versionados, tests de flujos críticos, aprobación humana y revisión automatizada contra criterios verificables.',
        },
        {
          title: 'CI/CD como contrato de entrega',
          copy:
            'Unifiqué los comandos locales y de CI mediante Makefiles, con lint, typecheck y tests como controles compartidos. La guía separa develop como integración y main como entrega, y documenta despliegues disparados por Cloud Build hacia Cloud Run en lugar de comandos manuales.',
        },
      ],
      outcomes: [
        'Repositorio normativo con reglas respaldadas por código en producción.',
        'Plantillas de issues y PRs con validaciones y etiquetado automatizado.',
        'Definition of Done común para calidad, seguridad, pruebas y documentación.',
        'Base reutilizable para onboarding y revisiones con menos ambigüedad.',
      ],
    },
  },
  {
    id: 'ai',
    years: '2026',
    yearStart: 2026,
    title: 'ERA IA',
    subtitle: 'engram · agentes · Go · AI-assisted dev',
    narrative:
      'La IA se convirtió en una capa de ingeniería: memoria persistente, agentes con contexto, MCPs y flujos verificables. Exploro cómo acelerar el desarrollo sin delegar el criterio, la trazabilidad ni la calidad del resultado.',
    stack: ['Go', 'SQLite', 'MCP', 'LLMs', 'Three.js'],
    scene: 'ai',
    weight: 1.4,
    highlights: [
      { tag: 'AI', text: 'engram: memoria para agentes de IA' },
      { tag: 'BUILD', text: 'Go + SQLite + servidor MCP' },
      { tag: 'FLOW', text: 'Workflows con LLMs' },
    ],
    metrics: [{ value: 'AI', label: 'workflows asistidos' }],
    details: {
      intro:
        'En esta etapa uso IA como parte de un sistema de trabajo, no como un atajo para generar código. El objetivo es conservar contexto, hacer explícitas las decisiones y conectar investigación, implementación y verificación.',
      sections: [
        {
          title: 'Memoria y contexto persistente',
          copy:
            'Trabajo con Engram, una herramienta de memoria persistente para agentes de código construida con Go y SQLite. Su integración mediante MCP permite recuperar decisiones y aprendizajes entre sesiones, reduciendo explicaciones repetidas y pérdida de contexto.',
        },
        {
          title: 'Flujos con agentes',
          copy:
            'Diseño flujos donde la IA ayuda a explorar, implementar y verificar, pero las reglas del repositorio, la evidencia y las pruebas siguen siendo la autoridad. Esa misma combinación de narrativa, WebGL y arquitectura modular sostiene este portfolio.',
        },
      ],
      outcomes: [
        'Memoria persistente aplicada a sesiones de desarrollo.',
        'Integraciones MCP y workflows de agentes con contexto recuperable.',
        'Automatización con controles de calidad y trazabilidad explícitos.',
      ],
      link: {
        label: 'Ver Engram en GitHub',
        href: 'https://github.com/Gentleman-Programming/engram',
      },
    },
  },
  {
    id: 'outro',
    years: '',
    yearStart: 2026,
    title: 'GRACIAS',
    subtitle: 'por recorrer la historia',
    narrative: 'Gracias por llegar hasta aqui. Si tienes un proyecto, hablemos.',
    stack: [],
    scene: 'outro',
    weight: 1,
    cta: { label: 'VER CV', href: '/cv' },
  },
];
