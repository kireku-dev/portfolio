// Fuente de verdad de la historia: cada capítulo es una etapa real de la
// trayectoria de Daniel. De aquí se derivan los beats de la presentación 3D
// (src/data/presentation.ts) y el timeline del CV (src/data/portfolio.ts).

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

// Start months come from Daniel's own account (2026-11-16): two years of
// professional experience, one year and seven months of them at Vantum ST.
// Durations are computed from these dates, so they stay correct over time.
export interface MonthStamp {
  year: number;
  /** 1-12 */
  month: number;
}

export const CAREER_START: MonthStamp = { year: 2024, month: 11 };
export const VANTUM_START: MonthStamp = { year: 2025, month: 4 };

export function monthsSince(start: MonthStamp, now = new Date()) {
  const months = (now.getFullYear() - start.year) * 12 + (now.getMonth() + 1 - start.month);
  return Math.max(0, months);
}

export function formatDuration(totalMonths: number) {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const yearText = years > 0 ? `${years} ${years === 1 ? 'año' : 'años'}` : '';
  const monthText = months > 0 ? `${months} ${months === 1 ? 'mes' : 'meses'}` : '';
  if (yearText && monthText) return `${yearText} y ${monthText}`;
  return yearText || monthText || 'menos de un mes';
}

export function formatProfessionalExperience(now = new Date()) {
  return formatDuration(monthsSince(CAREER_START, now));
}

export function formatVantumTenure(now = new Date()) {
  return formatDuration(monthsSince(VANTUM_START, now));
}

export interface JourneyChapter {
  id: string;
  years: string;
  yearStart: number;
  title: string;
  subtitle: string;
  narrative: string;
  stack: string[];
  scene: SceneKey;
  weight: number;
  highlights?: JourneyHighlight[];
  metrics?: JourneyMetric[];
  links?: JourneyLink[];
  details?: JourneyDetails;
  cta?: { label: string; href: string };
}

export const journey: JourneyChapter[] = [
  {
    id: 'intro',
    years: '',
    yearStart: 2020,
    title: 'DANIEL\nBAUTISTA',
    subtitle: 'Backend & cloud engineer · plataforma, integraciones y producto',
    narrative:
      'Daniel Eduardo Bautista Fuentes. De los primeros programas universitarios a construir productos, integraciones e infraestructura en producción.',
    stack: [],
    scene: 'intro',
    weight: 1.2,
    highlights: [
      { tag: 'PRs', text: '600+ PRs mergeados' },
      { tag: 'REVIEWS', text: '140+ PRs revisados' },
      { tag: 'COMMITS', text: '1,400+ commits' },
    ],
  },
  {
    id: 'compile',
    years: '2020',
    yearStart: 2020,
    title: 'FIRST COMPILE',
    subtitle: 'los primeros programas · C# · Java',
    narrative:
      'Mis primeros repositorios: un simulador de compilador en C# y un resolvedor de sistemas de ecuaciones en Java. El inicio como estudiante de Ciencias y Sistemas en CUNOC, USAC.',
    stack: ['C#', 'Java', 'Algoritmos'],
    scene: 'compile',
    weight: 1.1,
    highlights: [
      { tag: 'BUILD', text: 'Simulador de compilador en C#' },
      { tag: 'CODE', text: 'Matrix-solver en Java' },
    ],
    metrics: [{ value: '2020', label: 'primer commit' }],
  },
  {
    id: 'datastructures',
    years: '2021 - 2022',
    yearStart: 2021,
    title: 'ESTRUCTURAS Y LENGUAJES',
    subtitle: 'AVL · juegos · compiladores · algoritmos',
    narrative:
      'Árboles AVL, juegos, un detector de plagio y cuatro compiladores. Entre los nueve proyectos de esta etapa consolidé algoritmos, programación orientada a objetos y los fundamentos de lenguajes.',
    stack: ['Java', 'C++', 'TypeScript', 'Compiladores'],
    scene: 'datastructures',
    weight: 1.3,
    highlights: [
      { tag: 'BUILD', text: 'Árboles AVL y estructuras desde cero' },
      { tag: 'CODE', text: '4 compiladores y detector de plagio' },
      { tag: 'BASE', text: '9+ proyectos académicos' },
    ],
    metrics: [{ value: '9+', label: 'proyectos académicos' }],
    links: [{ label: 'web-compiler', href: 'https://github.com/daniel-baf/web-compiler' }],
  },
  {
    id: 'lowlevel',
    years: '2023',
    yearStart: 2023,
    title: 'BAJO NIVEL',
    subtitle: 'Assembly · arquitectura · cambio a la URL',
    narrative:
      'Programas en ensamblador, arquitectura del computador y conversión de sistemas numéricos. Comprender la máquina por dentro mientras daba el paso de USAC a Universidad Rafael Landívar.',
    stack: ['Assembly', 'x86', 'Python', 'Arquitectura'],
    scene: 'lowlevel',
    weight: 1.1,
    highlights: [
      { tag: 'LOW', text: 'Programas en ensamblador' },
      { tag: 'CODE', text: 'Arquitectura y sistemas numéricos' },
      { tag: 'NEXT', text: 'Nueva etapa en la URL' },
    ],
    links: [{ label: 'arqui-1-assembler', href: 'https://github.com/daniel-baf/arqui-1-assembler' }],
  },
  {
    id: 'oracle',
    years: '2024',
    yearStart: 2024,
    title: 'BACKEND',
    subtitle: 'Oracle ONE · Java · APIs REST · datos',
    narrative:
      'Formación backend estructurada con Oracle Next Education: aplicaciones Java, diseño de APIs REST e integración con bases de datos. La base para convertir la programación en sistemas completos.',
    stack: ['Java', 'REST APIs', 'SQL', 'Oracle ONE'],
    scene: 'oracle',
    weight: 1.1,
    highlights: [
      { tag: 'API', text: 'Diseño de APIs REST' },
      { tag: 'DATA', text: 'Integración con bases de datos' },
      { tag: 'LEARN', text: 'Oracle Next Education' },
    ],
    links: [{ label: 'ONE-G7', href: 'https://github.com/daniel-baf/ONE-G7-daniel-baf' }],
  },
  {
    id: 'network',
    years: '2025',
    yearStart: 2025,
    title: 'PRIMEROS SISTEMAS REALES',
    subtitle: 'Business intelligence · nómina · producto',
    narrative:
      'Mi primera etapa profesional: creé Euro BI con BigQuery y Gemini para analizar ventas y participé en la nómina guatemalteca de un ERP escolar. Datos, reglas de negocio y despliegues para usuarios reales.',
    stack: ['FastAPI', 'React', 'BigQuery', 'Gemini', 'Cloud Run'],
    scene: 'network',
    weight: 1.3,
    highlights: [
      { tag: 'BI', text: 'Euro BI con BigQuery + Gemini' },
      { tag: 'SHIP', text: 'Nómina guatemalteca en ERP escolar' },
      { tag: 'CLOUD', text: 'Aplicaciones desplegadas en Cloud Run' },
    ],
    metrics: [{ value: formatProfessionalExperience(), label: 'experiencia profesional' }],
    details: {
      intro:
        'En julio de 2025 comencé a convertir necesidades de empresas en software operativo: primero inteligencia de negocio sobre ventas y después reglas de nómina dentro de un ERP escolar.',
      sections: [
        {
          title: 'Euro BI: datos e IA aplicada',
          copy:
            'Creé una aplicación de inteligencia de negocio para una empresa de materiales de construcción. FastAPI y React conectan BigQuery y Gemini para explorar información de ventas, con Firebase y despliegue en Cloud Run.',
        },
        {
          title: 'Nómina guatemalteca',
          copy:
            'Trabajé períodos con auditoría, ISR, prestaciones, Bono 14, aguinaldo, embargos y liquidaciones. También corregí falsos positivos del OCR de DTEs y desarrollé funcionalidades de gestión de personal.',
        },
      ],
      outcomes: [
        'Primer sistema profesional construido de punta a punta.',
        'Modelos de datos y reglas de negocio aplicados a operaciones reales.',
        'Experiencia inicial con analítica, IA y servicios administrados de GCP.',
      ],
    },
  },
  {
    id: 'cloud',
    years: '2026 H1',
    yearStart: 2026,
    title: 'PRODUCCIÓN',
    subtitle: 'Vantum ST · producto + integraciones · GCP',
    narrative:
      'Me hice cargo del CRM de admisiones de un colegio, construí un helpdesk SaaS multi-tenant y creé el gateway de WhatsApp de la empresa. En paralelo, mi primer PR en Engram fue mergeado.',
    stack: ['FastAPI', 'Django', 'TypeScript', 'React', 'BullMQ', 'Terraform'],
    scene: 'cloud',
    weight: 1.5,
    highlights: [
      { tag: 'CRM', text: '188 PRs mergeados · producto revendible' },
      { tag: 'SAAS', text: 'Helpdesk multi-tenant · 110 PRs mergeados' },
      { tag: 'QUEUE', text: 'Gateway WhatsApp · 68 PRs mergeados' },
      { tag: 'OSS', text: 'Engram #493 mergeado' },
    ],
    metrics: [
      { value: '3', label: 'productos centrales en producción' },
      { value: '#493', label: 'primer PR en Engram' },
    ],
    details: {
      intro:
        'La primera mitad de 2026 marcó el salto a productos completos: arquitectura de backend, frontend, integraciones, seguridad, pruebas y operación cloud como una sola responsabilidad.',
      sections: [
        {
          title: 'CRM de admisiones',
          copy:
            'Autor principal y luego único mantenedor del CRM de un colegio privado K-12: 200 PRs propios y 188 mergeados. Reorganicé el backend por dominios, tipé el contrato OpenAPI, integré Odoo y mensajería, y convertí el sistema en un producto configurable para otros colegios.',
        },
        {
          title: 'Helpdesk SaaS multi-tenant',
          copy:
            'Construí desde cero una plataforma con portal de clientes, RBAC, SLA con pausas, CSAT, widget embebido y bot de WhatsApp. Migramos el frontend a React + MUI; alcancé 110 PRs mergeados de 112 propios.',
        },
        {
          title: 'Gateway de WhatsApp',
          copy:
            'Creé un gateway para Meta Cloud API y Evolution con colas durables por tenant, Redis/BullMQ, callbacks firmados con HMAC y protección anti-SSRF. Las colas toleran aproximadamente un día sin consumidor; 68 de mis 72 PRs fueron mergeados.',
        },
      ],
      outcomes: [
        'Productos usados en producción, no solo entregas aisladas.',
        'Integraciones de mensajería confiables y auditables.',
        'Infraestructura GCP y Terraform incorporada al ciclo de producto.',
        'Primera contribución open source mergeada en Engram.',
      ],
      link: {
        label: 'Ver PR #493 en Engram',
        href: 'https://github.com/Gentleman-Programming/engram/pull/493',
      },
    },
  },
  {
    id: 'ai',
    years: '2026 H2',
    yearStart: 2026,
    title: 'PLATAFORMA',
    subtitle: '12 sistemas · Terraform · tooling · open source',
    narrative:
      'Producto y plataforma a escala de equipo: FEL desacoplada, verticales Odoo 18, Terraform, CLI interno y skills de IA. SIGA llegó a producción y sumé siete contribuciones externas en Go, kernel y MCP.',
    stack: ['Odoo 18', 'Terraform', 'GCP', 'Python', 'Go', 'MCP'],
    scene: 'ai',
    weight: 1.5,
    highlights: [
      { tag: 'PRs', text: '601 PRs mergeados · 24 repos' },
      { tag: 'REVIEW', text: '121 PRs de compañeros revisados' },
      { tag: 'SCALE', text: '12 sistemas en producción' },
      { tag: 'OSS', text: '7 PRs externos mergeados' },
    ],
    metrics: [
      { value: '#1', label: 'contribuidor en 21 de 24 repos' },
      { value: '12', label: 'sistemas en producción' },
    ],
    details: {
      intro:
        'En la segunda mitad de 2026 el foco se amplió: además de construir productos, convertí prácticas repetibles en plataforma, herramientas y estándares que otras personas pudieran usar.',
      sections: [
        {
          title: 'FEL y verticales Odoo 18',
          copy:
            'Diseñé una interfaz de facturación electrónica independiente del certificador y ejecuté el cambio de InFile a Digifact en producción. También construí funcionalidades académicas y financieras, conectores firmados y despliegues para verticales de colegios, una agencia de viajes y una empresa de materiales.',
        },
        {
          title: 'Plataforma y experiencia de desarrollo',
          copy:
            'Llevé Terraform, Cloud Run, Workload Identity Federation y releases automáticos a los productos. Creé vantum-cli con 139 tests bats para sincronizar Secret Manager, además de vantum-tools y guías de ingeniería y diseño adoptadas por el equipo.',
        },
        {
          title: 'SIGA y open source',
          copy:
            'Como tech lead de SIGA-INEBI combiné planificación, backend, frontend y DevOps hasta su puesta en producción. En open source sumé cinco PRs en Engram, LenovoLegionLinux #563 y MCP-Packet-Tracer #20.',
        },
      ],
      outcomes: [
        '601 PRs mergeados y 121 PRs de compañeros revisados en Vantum.',
        'Contribuidor #1 en 21 de 24 repositorios de la organización.',
        'Herramientas internas verificables y adoptadas por el equipo.',
        'Siete PRs open source externos mergeados.',
      ],
      link: {
        label: 'Ver SIGA-INEBI en GitHub',
        href: 'https://github.com/siga-inebi/siga-inebi',
      },
    },
  },
  {
    id: 'outro',
    years: '',
    yearStart: 2026,
    title: 'GRACIAS',
    subtitle: 'por recorrer la historia',
    narrative:
      'Backend, cloud, producto y open source. Si tienes un problema real que convertir en software, hablemos.',
    stack: [],
    scene: 'outro',
    weight: 1,
    cta: { label: 'VER CV', href: '/cv' },
  },
];
