import { formatProfessionalExperience, journey } from './journey';
import type { JourneyDetails } from './journey';

const careerItemsFromJourney = journey
  .reduce<Array<{ id: string; date: string; role: string; company: string; desc: string; details?: JourneyDetails }>>((items, chapter) => {
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
  }, [])
  .reverse();

const professionalExperience = formatProfessionalExperience();

export const portfolioData = {
  navLinks: [
    { href: '#about', id: 'nav-about', label: 'about' },
    { href: '#career', id: 'nav-career', label: 'career' },
    { href: '#studies', id: 'nav-studies', label: 'studies' },
    { href: '#skills', id: 'nav-skills', label: 'skills' },
    { href: '#projects', id: 'nav-projects', label: 'projects' },
    { href: '#talks', id: 'nav-talks', label: 'talks' },
    { href: '#hobbies', id: 'nav-hobbies', label: 'comunidad' },
    { href: '#contact', id: 'nav-contact', label: 'contact' },
  ],
  hero: {
    tag: 'Backend & Cloud Engineer · plataforma, integraciones y producto',
    name: 'Daniel Bautista',
    summary:
      `Principal contribuidor de Vantum ST: construyo productos completos, integraciones y plataforma GCP/Terraform. Tengo ${professionalExperience} de experiencia profesional, contribuyo a open source y comparto lo que aprendo mediante talleres y documentación.`,
    metrics: [
      { value: '600+', label: 'PRs mergeados en producción durante 2026' },
      { value: '~60 %', label: 'de los PRs de la organización Vantum' },
      { value: '140+', label: 'PRs de otras personas revisados' },
      { value: '12', label: 'sistemas en producción' },
      { value: '#1', label: 'contribuidor en 21 de 24 repos de Vantum' },
      { value: '7', label: 'PRs open source externos mergeados' },
    ],
  },
  about: {
    sectionLabel: '// 01 > about.exe',
    sectionTitle: 'Sobre mí',
    paragraphs: [
      `Soy Daniel Eduardo Bautista Fuentes, backend y cloud engineer de Guatemala. Tengo ${professionalExperience} de experiencia profesional y soy el principal contribuidor de Vantum ST, con cerca del 60 % de los PRs de la organización y el mayor número de aportes en 21 de sus 24 repositorios.`,
      'Construyo productos de punta a punta: un helpdesk SaaS multi-tenant, un gateway de WhatsApp, un CRM de admisiones escolar, facturación electrónica FEL y verticales sobre Odoo 18. También desarrollo la plataforma GCP/Terraform, los flujos CI/CD y las herramientas internas que permiten operarlos.',
      'Fuera del trabajo diario contribuyo a Engram, LenovoLegionLinux y MCP-Packet-Tracer. Me interesa convertir el conocimiento en algo compartible: estándares de ingeniería, pruebas, documentación y talleres de Git, GitHub y seguridad.',
    ],
    tags: ['FastAPI', 'Django', 'TypeScript', 'Odoo 18', 'PostgreSQL', 'GCP', 'Terraform', 'React', 'BullMQ', 'WhatsApp', 'FEL', 'Testing'],
  },
  career: {
    sectionLabel: '// 02 > career.log',
    sectionTitle: 'Trayectoria',
    items: careerItemsFromJourney,
  },
  studies: {
    sectionLabel: '// 03 > education.db',
    sectionTitle: 'Estudios',
    items: [
      {
        date: '2023 → PRESENTE',
        role: 'INGENIERÍA EN INFORMÁTICA Y SISTEMAS · 5.º AÑO',
        company: 'Universidad Rafael Landívar (URL) · Guatemala',
        desc: 'Proyectos integradores con equipos y usuarios reales: SIGA-INEBI en producción, ERP del curso de Programación Web y ExamLock. Arquitectura, bases de datos, cloud, seguridad y entrega de software.',
      },
      {
        date: '2019 → 2023',
        role: 'INGENIERÍA EN CIENCIAS Y SISTEMAS',
        company: 'Universidad San Carlos de Guatemala (USAC) · CUNOC',
        desc: 'Fundamentos de ciencias de la computación: arquitectura de computadoras, ensamblador, estructuras de datos, compiladores, análisis de algoritmos y desarrollo de software.',
      },
      {
        date: '2024',
        role: 'ORACLE NEXT EDUCATION (ONE) · JAVA',
        company: 'Oracle + Alura',
        desc: 'Formación backend con Java, APIs REST y bases de datos mediante desafíos y aplicaciones agrupadas en el repositorio ONE-G7.',
      },
    ],
  },
  skills: {
    sectionLabel: '// 04 > skills.json',
    sectionTitle: 'Habilidades con evidencia',
    items: [
      {
        label: 'PY',
        name: 'Backend Python',
        meta: 'FastAPI · Django/DRF · SQLAlchemy · Alembic · Pydantic',
        evidence: 'CRM escolar, helpdesk SaaS, ERP de nómina y SIGA-INEBI en producción.',
      },
      {
        label: 'TS',
        name: 'TypeScript e integraciones',
        meta: 'Node · Fastify · Express · BullMQ · Socket.IO',
        evidence: 'Gateway WhatsApp multi-tenant, email transaccional y ExamLock.',
      },
      {
        label: 'CL',
        name: 'Cloud e infraestructura',
        meta: 'GCP · Cloud Run · Cloud SQL · Terraform · Docker · WIF',
        evidence: 'Plataforma y despliegues para 12 sistemas en producción.',
      },
      {
        label: 'DB',
        name: 'Datos y mensajería',
        meta: 'PostgreSQL · Redis · SQLite · BigQuery · migraciones',
        evidence: 'Nómina, triggers de carnés, colas durables y analítica con Gemini.',
      },
      {
        label: 'ERP',
        name: 'Odoo y FEL',
        meta: 'Odoo 18 · Python · OWL · QWeb · OCA · InFile · Digifact',
        evidence: 'Capa FEL neutral y cambio de certificador en un cliente real.',
      },
      {
        label: 'FE',
        name: 'Frontend de producto',
        meta: 'React 19 · TypeScript · MUI · Vite · PWA · Three.js',
        evidence: 'Migración del helpdesk, CRM, SIGA y visor 3D de vigas.',
      },
      {
        label: 'QA',
        name: 'Calidad y seguridad',
        meta: 'pytest · vitest · bats · HMAC · RBAC/ABAC · MFA',
        evidence: '179 archivos de test creados en el CRM; 139 tests bats en vantum-cli.',
      },
      {
        label: 'AI',
        name: 'IA aplicada',
        meta: 'MCP · Engram · Gemini/Vertex · Claude Code skills',
        evidence: 'Cinco PRs en Engram y un marketplace de skills usado por el equipo.',
      },
      {
        label: 'DX',
        name: 'Plataforma y equipo',
        meta: 'CI/CD · releases · Linux · Bash · documentación · review',
        evidence: 'CLI interno, estándares adoptados y 121 PRs de compañeros revisados.',
      },
    ],
  },
  projects: {
    sectionLabel: '// 05 > projects.git',
    sectionTitle: 'Trabajo seleccionado',
    cta: { href: 'https://github.com/daniel-baf', id: 'cta-github', label: 'Ver todos en GitHub ↗' },
    items: [
      {
        code: '01',
        lang: 'Privado · cliente real',
        name: 'CRM ESCOLAR',
        desc: 'CRM de admisiones y alumnado para un colegio privado K-12, convertido en producto revendible. Autor principal y único mantenedor desde agosto de 2026.',
        details: {
          intro: 'Un sistema completo para prospectos, admisiones, matrícula, agenda, carnés, comunicaciones y finanzas. Construí una base configurable para que otros colegios puedan adoptar el mismo núcleo.',
          sections: [
            {
              title: 'Arquitectura y producto',
              copy: 'Backend FastAPI organizado por dominios, contrato OpenAPI tipado, React 19 y una distribución configurable por tenant. Integración firmada con Odoo y callbacks de entrega para WhatsApp y email.',
            },
            {
              title: 'Calidad y operación',
              copy: 'Terraform, Cloud Run, Cloud Build y releases automáticos. Creé 179 archivos de test y validé su eficacia con mutation testing; también incorporé controles CSRF, permisos, rate limiting y validación de webhooks.',
            },
          ],
          outcomes: ['200 PRs propios · 188 mergeados.', '461 de 736 commits.', 'Producto central reutilizado por otra distribución escolar.'],
        },
        id: 'proj-crm',
      },
      {
        code: '02',
        lang: 'Privado · SaaS en producción',
        name: 'HELPDESK MULTI-TENANT',
        desc: 'Plataforma de soporte construida desde cero: portal, bandeja de agentes, SLA, CSAT, widget y bot de tickets por WhatsApp.',
        details: {
          intro: 'Un helpdesk SaaS para los clientes de Vantum, desarrollado desde la prueba de concepto hasta producción v0.7 con Django 6, React/MUI, PostgreSQL y Cloud Run.',
          sections: [
            {
              title: 'Dominio de soporte',
              copy: 'RBAC configurable, máquina de estados, asignación con auditoría, tiempo facturable y SLA que descuenta pausas. Bot sobre Meta Cloud API con mensajes interactivos, CSAT y WhatsApp Flows.',
            },
            {
              title: 'Frontend y plataforma',
              copy: 'Migración completa desde plantillas Django a React + MUI con carga diferida por rol. Entornos separados, Terraform, CI selectivo, releases automáticos y alertas por entorno.',
            },
          ],
          outcomes: ['112 PRs propios · 110 mergeados.', '179 de 206 commits.', 'De prueba de concepto a producción v0.7.'],
        },
        id: 'proj-helpdesk',
      },
      {
        code: '03',
        lang: 'Privado · infraestructura de producto',
        name: 'WHATSAPP STACK',
        desc: 'Gateway multi-tenant para Meta Cloud API y Evolution, con colas durables por tenant y una consola de operación.',
        details: {
          intro: 'La capa de mensajería compartida por los productos de Vantum. Diseñada para cambiar de proveedor por tenant sin ramificar la lógica del dominio.',
          sections: [
            {
              title: 'Confiabilidad',
              copy: 'TypeScript, Node, Redis y BullMQ con estado durable, backoff, redrive y colas que sobreviven aproximadamente un día de caída del consumidor. Callbacks HMAC y protección anti-SSRF.',
            },
            {
              title: 'Operación',
              copy: 'Plantillas, mensajes interactivos, WhatsApp Flows y panel React + MUI para conexión, credenciales, proveedores y auditoría. Terraform, GitHub Actions y Workload Identity Federation.',
            },
          ],
          outcomes: ['72 PRs propios · 68 mergeados.', '92 de 101 commits.', 'Dos proveedores detrás de una interfaz común.'],
        },
        id: 'proj-whatsapp',
      },
      {
        code: '04',
        lang: 'Privado · Odoo 18 / Guatemala',
        name: 'FACTURACIÓN ELECTRÓNICA FEL',
        desc: 'Capa de facturación desacoplada del certificador, usada para cambiar un cliente en producción de InFile a Digifact.',
        details: {
          intro: 'Una interfaz neutral para Odoo 18 que permite certificar, anular, auditar y configurar FEL sin acoplar el negocio a un proveedor concreto.',
          sections: [
            {
              title: 'Abstracción e implementación',
              copy: 'Módulo base einvoice_base, cliente HTTP para Digifact y proveedor FEL Guatemala en formato NUC. Configuración por capas y registro de auditoría.',
            },
            {
              title: 'Corte y validación',
              copy: 'Runbook para migrar el certificador en producción, smoke test contra el ambiente de pruebas de Digifact, CI y releases automáticos.',
            },
          ],
          outcomes: ['8 de 8 PRs creados y mergeados.', 'Adoptado por dos verticales Odoo.', 'Cambio InFile → Digifact ejecutado en producción.'],
        },
        id: 'proj-fel',
      },
      {
        code: 'SIGA',
        lang: 'Django · React · GCP',
        name: 'SIGA-INEBI',
        desc: 'Plataforma académica y administrativa de una escuela pública real. Tech lead, planificación y DevOps; en producción desde el 2 de noviembre de 2026.',
        href: 'https://github.com/siga-inebi/siga-inebi',
        demo: 'https://siga-inebi-prod-997189930810.us-central1.run.app/',
        details: {
          intro: 'SIGA-INEBI centraliza matrículas, asistencia, ciclos, cursos, asignación docente, documentos verificables y avisos a familias del INEBI de Salcajá.',
          sections: [
            {
              title: 'Liderazgo y trazabilidad',
              copy: 'Planifiqué ocho líneas de trabajo y un GitHub Project de 179 issues. Cada requisito quedó ligado a PRs o issues; también automaticé la gestión del Project con dry-run y pruebas.',
            },
            {
              title: 'Producto y plataforma',
              copy: 'Desarrollé dominios académicos, permisos y emisión idempotente de documentos; reconstruí flujos con MUI y desplegué QA y producción con Cloud Run, Cloud SQL, Terraform y WIF.',
            },
          ],
          outcomes: ['97 PRs propios · 89 mergeados.', '12 PRs de compañeros revisados.', 'Producción real desde el 2026-11-02.'],
          screenshots: [
            {
              image: '/assets/images/siga-inebi-dashboard.webp',
              alt: 'Panel principal de SIGA-INEBI con accesos a estudiantes, docentes, familias y personas.',
              caption: 'Panel operativo y accesos rápidos por rol.',
            },
            {
              image: '/assets/images/siga-inebi-matriculas.webp',
              alt: 'Pantalla de matrículas de SIGA-INEBI con formulario de nueva matrícula.',
              caption: 'Matrículas y registro de estudiantes por sección.',
            },
            {
              image: '/assets/images/siga-inebi-asistencia.webp',
              alt: 'Pantalla de asistencia de SIGA-INEBI con filtros y tabla de movimientos.',
              caption: 'Consulta y registro de asistencia.',
            },
            {
              image: '/assets/images/siga-inebi-ciclo-asignaciones.webp',
              alt: 'Modal de asignación docente de SIGA-INEBI para cursos del ciclo escolar.',
              caption: 'Ciclos, cursos y asignaciones docentes.',
            },
          ],
        },
        id: 'proj-siga-inebi',
      },
      {
        code: '3D',
        lang: 'React · TypeScript · Three.js',
        name: 'CÁLCULO DE VIGAS ESTRUCTURALES',
        desc: 'Asistente para diseñar vigas de concreto reforzado, con visor 3D, fórmulas y reportes. Proyecto freelance validado con un ingeniero civil.',
        href: 'https://calculo-vigas-estructurales.danibaufu.workers.dev/',
        linkLabel: 'Abrir aplicación',
        details: {
          intro: 'Una aplicación que guía cargas gravitacionales, flexión, corte, confinamiento y torsión. Todo el cálculo ocurre en el navegador y el resultado se puede compartir o importar mediante QR.',
          sections: [
            {
              title: 'Ingeniería y validación',
              copy: 'Revisé el flujo de flexión a partir del reporte de un ingeniero civil: el chequeo principal es φMn ≥ Mu con el brazo real de Whitney. También corregí torsión, confinamiento y casos degenerados.',
            },
            {
              title: 'Visualización y experiencia',
              copy: 'Visor 3D de la viga y su sección con Three.js, fórmulas KaTeX, biblioteca local de proyectos y flujo adaptable a móvil.',
            },
          ],
          outcomes: ['73 commits · 13 PRs mergeados.', 'Autor único.', 'Validado con un ingeniero civil.'],
          screenshots: [
            {
              image: '/assets/images/calculo-vigas-preview.webp',
              alt: 'Interfaz de Diseño de Viga con flujo guiado de cálculo estructural.',
              caption: 'Flujo guiado para diseño de vigas de concreto reforzado.',
            },
          ],
        },
        id: 'proj-vigas',
      },
      {
        code: 'OSS',
        lang: 'Go · SQLite · MCP',
        name: 'ENGRAM · OPEN SOURCE',
        desc: 'Cinco PRs mergeados en la memoria persistente para agentes, incluyendo #493: un registro declarativo para simplificar la integración de nuevos agentes.',
        href: 'https://github.com/Gentleman-Programming/engram/pull/493',
        linkLabel: 'Ver PR #493',
        details: {
          intro: 'Engram es una herramienta de memoria persistente para agentes de código construida con Go y SQLite e integrada mediante MCP.',
          sections: [
            {
              title: 'Configuración guiada por datos',
              copy: 'En #493 reemplacé un switch rígido de instaladores por un registro declarativo y un controlador genérico. Añadir compatibilidad se convirtió principalmente en un cambio de datos.',
            },
            {
              title: 'Contribución continuada',
              copy: 'Los PRs #493, #526, #527, #906 y #908 fueron mergeados. Sumé además LenovoLegionLinux #563 y MCP-Packet-Tracer #20 para llegar a siete aportes externos.',
            },
          ],
          outcomes: ['5 PRs mergeados en Engram.', '7 PRs open source externos en total.', 'Go, kernel Linux y MCP.'],
        },
        id: 'proj-engram',
      },
      {
        code: 'ERP',
        lang: 'Django · React · PostgreSQL',
        name: 'ERP PROGRA WEB',
        desc: 'ERP universitario de inventario, pedidos, clientes y emprendedores desarrollado por 19 estudiantes. Creé la organización y la arquitectura base.',
        href: 'https://github.com/URL-progra-web/ERP-progra-web-url',
        id: 'proj-erp',
      },
      {
        code: 'SEC',
        lang: 'Node · Socket.IO · Debian · GCP',
        name: 'EXAMLOCK',
        desc: 'Plataforma de exámenes controlados con ISO Debian Live, VM o kiosco, whitelist de red y monitoreo docente en vivo.',
        href: 'https://github.com/daniel-baf/virtua-ExamLock',
        id: 'proj-examlock',
      },
      {
        code: 'QR',
        lang: 'Node · Docker · Seguridad',
        name: 'QUISHING LAB',
        desc: 'Demo educativa de phishing por QR para feria universitaria, con panel de sesión, explicación de defensas y guía de uso responsable.',
        href: 'https://github.com/daniel-baf/quishing-lab',
        id: 'proj-quishing',
      },
      {
        code: 'AUTH',
        lang: 'Node · WebAuthn · SQLite',
        name: 'NOTAS SEGURAS',
        desc: 'Demo docente con MFA mediante TOTP o WebAuthn, RBAC, ABAC y revocación inmediata de JWT, acompañada de nueve documentos técnicos.',
        href: 'https://github.com/daniel-baf/demo-implementacion-auth-seguro',
        demo: 'https://demo-implementacion-auth-seguro.vercel.app',
        id: 'proj-notas',
      },
    ],
  },
  hobbies: {
    sectionLabel: '// 07 > community.md',
    sectionTitle: 'Comunidad y recursos',
    items: [
      {
        label: 'FERIA UNIVERSITARIA',
        name: 'Quishing Lab y Notas Seguras',
        description: 'Demos en vivo y material docente para explicar phishing por QR, autenticación MFA y control de acceso.',
        href: 'https://github.com/daniel-baf/quishing-lab',
      },
      {
        label: 'APUNTES ABIERTOS',
        name: 'url-notas',
        description: 'Apuntes del curso en Obsidian + MkDocs, mantenidos como recurso abierto con 241 commits.',
        href: 'https://github.com/daniel-baf/url-notas',
      },
    ],
  },
  contact: {
    sectionLabel: '// 08 > contact.sh',
    sectionTitle: 'Contacto',
    intro: 'Backend · cloud · producto · open source',
    email: 'danibaufu@gmail.com',
    note: 'Disponible para construir productos, integraciones y plataforma cloud, colaborar en open source y facilitar talleres técnicos.',
    links: [
      { href: 'https://github.com/daniel-baf', id: 'social-github', label: 'GitHub', external: true },
      { href: 'https://linkedin.com/in/daniel-bautista-46bb69267', id: 'social-linkedin', label: 'LinkedIn', external: true },
      { href: 'https://twitter.com/Daniel_Bafue', id: 'social-twitter', label: 'X / Twitter', external: true },
    ],
  },
  footer: {
    copy: `daniel-baf · Backend & Cloud · Guatemala · ${new Date().getFullYear()}`,
    links: [
      { href: 'https://github.com/daniel-baf', label: 'GitHub' },
      { href: 'https://linkedin.com/in/daniel-bautista-46bb69267', label: 'LinkedIn' },
      { href: 'https://twitter.com/daniel_bafue', label: 'X / Twitter' },
    ],
  },
};
