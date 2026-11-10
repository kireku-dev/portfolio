# Portfolio de Daniel Bautista: contenido fuente

> **Para el agente que convierta esto en UI.** Este documento es la fuente de verdad del contenido del portfolio y del CV. Está en español, igual que el sitio. Cada cifra se tomó de git o de la API de GitHub el **2026-11-09**, y la fuente aparece entre corchetes cuando ayuda. Lee primero la sección **0. Reglas**.

---

## 0. Reglas para la UI

1. **No enlazar repos de Vantum.** Los 33 repos de la org VantumST y `daniel-vantumst/trainee` son **privados**. Se pueden contar sus métricas y describir su trabajo, pero **nunca** se enlazan sus URLs de GitHub, PRs ni issues. Solo se enlazan las URLs marcadas como `público`.
2. **Cifras con criterio.** No uses sumas totales de líneas añadidas o borradas: están infladas por código vendorizado y por divisiones de repos. Usa PRs, reviews, commits, tests y repos.
3. **Tono.** Cada logro debe llevar un verbo, el resultado y la evidencia. Nada de adjetivos vacíos.
4. **Nombres de clientes.** Las Américas, Euromorteros, CEA y "Topax" (agencia de viajes) son clientes reales. Antes de publicarlos, ver la sección **14. Por confirmar con Daniel**. Si hay duda, usa la versión anónima que se da entre paréntesis.
5. **Datos del sitio.** El sitio actual lee `src/data/portfolio.ts` y `src/data/journey.ts`. Este documento sustituye los textos y métricas de esos archivos (ver la sección 13, *Correcciones*).
6. **Estructura de la página.** Cada sección trae, cuando aplica, un bloque `ui:` con una sugerencia de componente. Es una sugerencia, no una regla.

---

## 1. Identidad / hero

| Campo | Valor |
|---|---|
| Nombre | Daniel Eduardo Bautista Fuentes (firma: **Daniel Bautista**) |
| Ubicación | Guatemala |
| Rol (titular) | **Backend & Cloud Engineer** · plataforma, integraciones y producto |
| Rol actual | Backend Developer en **Vantum ST** (2025 → presente) |
| Estudios | Ingeniería en Informática y Sistemas, Universidad Rafael Landívar (URL), 5.º año |
| Disponibilidad | Abierto a freelance y colaboraciones |
| Email | danibaufu@gmail.com |
| GitHub personal | https://github.com/daniel-baf · `público` |
| GitHub de trabajo | `daniel-vantumst` (actividad casi toda privada; no destacar el enlace) |
| LinkedIn | https://linkedin.com/in/daniel-bautista-46bb69267 |
| X / Twitter | https://twitter.com/Daniel_Bafue |
| Portfolio | https://daniel-baf.github.io/portfolio/ |

### Headline (elegir una)
- **A:** "Construyo los sistemas que mantienen operando a una empresa: CRMs, ERPs, helpdesks, gateways de WhatsApp y la infraestructura que los despliega."
- **B:** "Backend & cloud engineer. 600+ PRs mergeados en producción en 2026, y la mayor parte de la plataforma de una software house."
- **C:** "Del compilador universitario al gateway multi-tenant en producción. Backend, GCP y criterio de ingeniería."

### Bio corta (≈60 palabras)
Soy backend & cloud engineer en Guatemala. En Vantum ST soy el principal contribuidor de la organización: escribo cerca del 60 % de los PRs. Construí productos completos (un CRM escolar, un helpdesk SaaS, un gateway de WhatsApp multi-tenant y facturación electrónica FEL sobre Odoo 18) y la plataforma que los despliega en GCP con Terraform y CI/CD. También contribuyo a open source y enseño Git.

### Bio larga (≈150 palabras)
Empecé escribiendo compiladores y estructuras de datos en la USAC. Hoy construyo y opero sistemas en producción para empresas reales.

En Vantum ST, una software house guatemalteca, soy el contribuidor #1 en 21 de los 24 repos donde he trabajado:
- **Productos:** levanté un helpdesk multi-tenant desde cero, mantengo como autor principal el CRM de admisiones de un colegio, creé el gateway de WhatsApp (Meta Cloud API y Evolution) y una capa de facturación electrónica desacoplada del certificador.
- **Plataforma:** Terraform, Cloud Run, Workload Identity Federation y releases automáticos.
- **Estándares:** una guía de ingeniería y diseño, un CLI interno y un marketplace de skills de Claude Code para el equipo.

Fuera del trabajo:
- Contribuyo a open source: 5 PRs mergeados en Engram (~7.9k ★), un fix al driver de kernel de LenovoLegionLinux y un fix de seguridad en MCP-Packet-Tracer.
- Lideré técnicamente SIGA-INEBI, que ya está en producción para una escuela pública.
- Doy talleres de Git a estudiantes.

### Métricas del hero (4 a 6 tiles)
| Valor | Etiqueta | Fuente |
|---|---|---|
| **600+** | PRs mergeados en producción (2026) | VantumST: 601 merged de 635 |
| **~60 %** | de todos los PRs de la org Vantum | 635 / 1,050 |
| **140+** | PRs de otros revisados | 121 en Vantum, 12 en SIGA, 10 en el ERP |
| **12** | sistemas en producción | ver la sección 3 |
| **#1** | contribuidor en 21 de 24 repos | VantumST |
| **7** | PRs mergeados en open source externo | Engram ×5, LenovoLegionLinux, MCP-Packet-Tracer |

`ui:` tiles grandes con contador animado; debajo, una línea fina con la fuente.

---

## 2. Números verificados (panel de "evidencia")

### Trabajo: org VantumST (privada), cuenta `daniel-vantumst`
| Métrica | Valor |
|---|---|
| PRs de su autoría | **635** (60 % de los 1,050 de la org) |
| PRs mergeados | **601** (61.5 % de los 977 mergeados de la org) |
| PRs de otros revisados | **121** (218 reviews: 95 aprobaciones, **49 cambios solicitados**, 65 comentarios) |
| PRs de otros que mergeó | **168** (dueño del merge en CRM, agencia de viajes, Soporte y ERP) |
| Issues creados | **414** (53 % de la org): define el backlog y las specs |
| Commits | **~1,425** (todas sus identidades, sin duplicados) |
| Repos en los que contribuyó | **24**; es el **#1 en 21** |
| Repos que creó o construyó desde cero | **14** |
| Contribuciones del último año (GitHub) | **3,253** (3,240 privadas) |
| PRs mergeados por mes en 2026 | ene 6 · feb 1 · mar 4 · abr 10 · may 36 · jun 39 · jul 53 · ago 80 · sep 108 · **oct 240** |

`ui:` mini gráfico de barras con los PRs por mes. Cuenta la historia de una curva de crecimiento exponencial.

### Personal / open source: cuenta `daniel-baf`
| Métrica | Valor |
|---|---|
| Contribuciones en el último año | **688** (241 commits, 144 PRs, 25 reviews) |
| Contribuciones por año | 2020: 45 · 2021: 94 · 2022: 116 · 2023: 176 · 2024: 66 · 2025: 127 · **2026: 688** |
| PRs mergeados en repos externos de terceros | Engram 5, LenovoLegionLinux 1, MCP-Packet-Tracer 1, lexema-cli 3, SIGHCI-plus 2 |
| SIGA-INEBI | 97 PRs (89 mergeados) de 442, ≈22 %; 72 commits, #2 de 9 personas |
| ERP Progra Web | 20 de 36 PRs; 47 commits, #1 de 19 personas |

### Calidad (evidencia de testing)
- Las Américas CRM: ~2,408 tests en el backend y ~400 en el frontend. **Daniel creó 179 de los 298 archivos de test** del repo. Usa mutation testing (mutmut) y un contrato OpenAPI tipado de punta a punta.
- agencia_viajes: ~1,313 tests en los addons.
- email-scheduler: ~277 casos.
- vantum-cli: 139 tests bats.
- vantum-tenants-admin: ~90 casos.
- SIGA-INEBI: la suite de 1,660 tests corre en paralelo en CI.

---

## 3. Experiencia profesional: Vantum ST

**Rol:** Backend Developer / Platform. Hace backend, infraestructura y producto, y lidera técnicamente varios repos.
**Fechas:** 2025 → presente. Los primeros commits en proyectos de clientes de Vantum son de jul-2025 (cuenta `debf-ni`); la cuenta `daniel-vantumst` tiene PRs desde 2026-01-02.
**Empresa:** Vantum ST, software house en Guatemala. Hace CRMs, ERPs sobre Odoo 18, SaaS de soporte y mensajería para colegios y empresas.

### Resumen para el CV (3 bullets)
- **Principal ingeniero de la organización:** 601 PRs mergeados (61 % de la org), contribuidor #1 en 21 de 24 repos y 121 PRs de compañeros revisados (49 con cambios solicitados).
- **Productos de punta a punta:** un helpdesk SaaS multi-tenant, un gateway de WhatsApp (Meta y Evolution), el CRM de admisiones de un colegio, facturación electrónica FEL desacoplada del certificador y verticales en Odoo 18. Los 12 sistemas están en producción.
- **Plataforma y estándares:** Terraform, Cloud Run, Workload Identity Federation, releases semver automáticos, la guía de ingeniería y diseño de la empresa, un CLI interno con Secret Manager y un marketplace de skills de IA que usa todo el equipo.

### Los 4 pilares (para una vista de "qué hago")
1. **Producto:** CRM, helpdesk, ERP y nómina, verticales Odoo.
2. **Integraciones y mensajería:** WhatsApp (Meta Cloud API, Flows, Evolution), email transaccional, FEL Guatemala (InFile, Digifact), Odoo ↔ CRM.
3. **Plataforma GCP:** Terraform, Cloud Run, Cloud SQL, Secret Manager, Identity Platform, WIF y CI/CD.
4. **Ingeniería y equipo:** estándares, code review, tooling interno y flujos con IA.

`ui:` 4 cards; al hacer click en una, se filtran los case studies de abajo.

---

### 3.1 Case studies (los proyectos más fuertes, en orden de impacto)

> Formato de cada caso: **pitch · cliente · rol · números · problema → lo que hice · stack · visibilidad.**
> `ui:` grid de cards. El modal de cada una muestra "Problema / Lo que hice / Resultado / Stack".

#### ① Las Américas CRM: CRM de admisiones y alumnado
- **Pitch:** un CRM completo para un colegio privado. Cubre la captura de prospectos, el pipeline de admisión, la agenda de citas, la matrícula, los carnés, las comunicaciones por WhatsApp y email, y finanzas. Después lo convertí en un **producto revendible** a otros colegios.
- **Cliente:** Colegio Las Américas, Guatemala *(anónimo: "un colegio privado K-12")*.
- **Rol:** **autor principal y, desde agosto de 2026, único mantenedor.**
  - 461 de 736 commits (63 %) y 200 PRs (188 mergeados).
  - Responsable de todos los módulos core (prospectos, alumnado, admin, auth, agenda).
  - Único autor de `integraciones`, `soporte` y `infra/terraform`.
  - Fechas: abr-2026 → oct-2026.
- **Lo que hice:**
  - **Arquitectura:** reorganicé el backend en una arquitectura por dominios, con el patrón repository + inyección de dependencias y una jerarquía única de errores. Extraje un repositorio y un router genéricos para los catálogos.
  - **Producto revendible:** moví a configuración la identidad del tenant, los supuestos de país, los formatos y los permisos. Agregué manifiestos de distribución single-tenant y una imagen de distribución unificada. Con eso, CEA ya consume el núcleo como una distribución delgada.
  - **Contrato tipado:** OpenAPI tipado de punta a punta entre backend y frontend (PR de +49k líneas).
  - **Integración con Odoo:** espejos seguros CRM ↔ ERP con firma asimétrica.
  - **Mensajería confiable:** el estado de WhatsApp y email dejó de depender de un polling frágil (en Cloud Run, la CPU se limita fuera del request) y pasó a callbacks de entrega firmados. También agregué el seguimiento de rebotes.
  - **Carnés estudiantiles:** se generan con un trigger de Postgres y se pueden asignar en bloque por xlsx, importar, exportar y buscar.
  - **Seguridad:** middleware CSRF, security headers, SameSite configurable, validación del token de webhooks, permisos a nivel de rol, un rate-limiter único y nada de stack traces en producción.
  - **Producto:** formulario público de admisión v2, dashboard de agenda, editor WYSIWYG de plantillas, widget de soporte embebido y una **PWA instalable**.
  - **DevOps:** migración del aprovisionamiento a Terraform, Cloud Build paralelo y con caché, tests en cada PR, releases automáticos, `make env-sync` desde GCP y concurrencia de Cloud Run alineada con el pool de conexiones.
  - **Calidad:** creé 179 de los 298 archivos de test. Tests validados con mutation testing ("menos tests, mejores tests"), react-doctor con puntaje 100 y una ronda de reducción de complejidad.
- **Stack:** FastAPI · SQLAlchemy 2 · Alembic · Pydantic v2 · PostgreSQL 17 / Cloud SQL · React 19 · TypeScript · MUI · SWR · Firebase / Identity Platform · Cloud Run · Cloud Build · Terraform · GitHub Actions · pytest · vitest · mutmut.
- **Visibilidad:** privado.

#### ② Soporte Vantum: helpdesk SaaS multi-tenant
- **Pitch:** una plataforma de soporte para los clientes de Vantum. Incluye portal de clientes, bandeja de agentes, SLA, CSAT, un widget embebible y un **bot de tickets por WhatsApp**.
- **Rol:** **lo construí desde cero**, de la prueba de concepto a producción (v0.3.0 en ago-2026, luego hasta v0.7.0).
  - 179 de 206 commits (87 %) y 112 PRs (110 mergeados).
  - Fechas: jun-2026 → oct-2026.
- **Lo que hice:**
  - Auth y **RBAC configurable**. El rol helpdesk tiene visibilidad por solicitante.
  - Dominio de tickets:
    - máquina de estados;
    - asignación con auditoría;
    - **SLA que descuenta el tiempo en pausa**;
    - tiempo facturable;
    - orden por el SLA más próximo a vencer.
  - **Migración completa del frontend** de plantillas Django + Tailwind a React + MUI, con code-splitting y carga diferida por rol, en una serie de PRs apilados.
  - **Bot de WhatsApp sobre la Meta Cloud API:**
    - listas y botones interactivos;
    - plantillas para la ventana de 24 h;
    - un botón de CSAT;
    - formularios dentro del chat (WhatsApp Flows).
  - **Seguridad:**
    - login reforzado con django-axes;
    - correcciones de una auditoría de XSS, OAuth y CI;
    - IP real del cliente detrás del proxy de Cloud Run;
    - actualizaciones de dependencias con CVE.
  - **Plataforma:**
    - bucket privado en GCS con Terraform;
    - staging separado de producción;
    - CI/CD que solo corre lo que cambió;
    - caché de Cloud Build por etapa;
    - tag y release automáticos;
    - alertas a Google Chat por entorno.
- **Stack:** Django 6 · React · MUI · Postgres (Neon) · Cloud Run · Terraform · GCS · Meta WhatsApp Cloud API.
- **Visibilidad:** privado.

#### ③ WhatsApp Stack: gateway de WhatsApp multi-tenant
- **Pitch:** el gateway de mensajería que usan todos los productos de Vantum. Soporta dos proveedores (**Meta Cloud API** oficial y **Evolution**, por QR) con una cola durable por tenant.
- **Rol:** **creador**. 92 de 101 commits y 72 PRs (68 mergeados). Fechas: jun-2026 → oct-2026.
- **Lo que hice:**
  - Interfaz de proveedor sin ramas por proveedor, y **cambio de proveedor por tenant** con precondiciones (serie de 4 PRs apilados).
  - **Confiabilidad:**
    - `message_status` durable;
    - las colas sobreviven ~1 día de caída del consumidor (backoff exponencial y redrive);
    - entrega at-most-once por parte del mensaje;
    - callbacks firmados con HMAC;
    - protección anti-SSRF en los callbacks.
  - Features: plantillas fuera de la ventana de 24 h, mensajes interactivos con `cta_url` y **WhatsApp Flows** (enviar, responder, publicar).
  - **Panel de administración:**
    - Cloud Run con Identity Platform y Google OAuth, en React + MUI 9;
    - después lo extraje a su propio repo (ver ④).
  - **Infraestructura y calidad:**
    - state de Terraform compartido con backups;
    - deploy al mergear a main, con un backup previo de la VM;
    - CI que **limita cada archivo a 800 líneas**.
- **Stack:** TypeScript · Node · Redis · BullMQ · Postgres · Docker en una VM de GCE · Terraform · GitHub Actions + WIF.
- **Visibilidad:** privado.

#### ④ Vantum Admin (tenants-admin): consola de operación multi-tenant
- **Pitch:** un solo panel para operar los tenants de WhatsApp y de email.
  - WhatsApp: estado de conexión en vivo, emparejamiento por QR, rotación de tokens y secretos HMAC, credenciales de Meta y cambio de proveedor.
  - Email: alta y edición de remitentes del email-scheduler.
  - Todo con un **audit log que registra al actor**.
- **Rol:** creador y prácticamente único autor: 38 de 39 commits (97 %). Fechas: jul-2026 → oct-2026.
- **Lo que hice:**
  - Servidor Fastify con Google OAuth del lado del servidor y Identity Platform, cookie de sesión HMAC y allowlist de correos.
  - Terraform para Identity Platform, OAuth y los admins, desplegado en Cloud Run con Direct VPC egress hacia la VM del gateway.
  - Deploy con GitHub Actions + Workload Identity Federation.
- **Stack:** Fastify 5 · React 19 · MUI 9 · Vite 7 · Terraform · Cloud Run · Biome · vitest.
- **Visibilidad:** privado.

#### ⑤ Facturación electrónica FEL (Guatemala): `odoo-digifact`
- **Pitch:** una capa de facturación electrónica **desacoplada del certificador**. Con ella cambié el certificador de un cliente en producción, de InFile a Digifact, con un runbook de corte.
- **Rol:** creador y único autor: 8 de 8 PRs.
- **Lo que hice:**
  - Interfaz neutral `einvoice_base`: certificar, anular, log de auditoría y configuración por capas.
  - Cliente HTTP para Digifact y proveedor FEL Guatemala en formato NUC.
  - Smoke test en vivo contra el ambiente de pruebas de Digifact.
  - CI y releases automáticos.
  - Se usa en `odoo-lasamericas` (cambio InFile → Digifact) y en `odoo-vantum-school`.
- **Stack:** Python · Odoo 18 · SAT/FEL GT.
- **Visibilidad:** privado.

#### ⑥ Odoo School: gestión escolar sobre Odoo 18
- **Pitch:** gestión académica y financiera de un colegio: académico, boletas de calificaciones, cobros, **conciliación bancaria** y facturas FEL.
- **Rol:** creador. 47 de 49 commits y 33 PRs mergeados. Fechas: sep-2026 → oct-2026.
- **Lo que hice:**
  - Conciliación de estados de cuenta, saldos a favor, y FEL que se emite solo con el cargo totalmente pagado.
  - **Conector firmado con el CRM:** llave privada cifrada, lotes sin concurrencia, **~1,000 filas en 1.1 s** y lecturas en paralelo.
  - Boletas de calificaciones individuales y masivas, en segundo plano y con exportación a Excel.
  - La conciliación se hace por el carné del alumno en vez del NIT.
  - Facturación sobre la interfaz neutral de ⑤.
- **Stack:** Python · Odoo 18 · OWL · QWeb.
- **Visibilidad:** privado.

#### ⑦ Las Américas ERP: nómina guatemalteca y ERP
- **Pitch:** un ERP de ventas, gastos, cuentas, **nómina** y activos fijos para el mismo colegio.
- **Rol:** el primer commit es suyo. 130 commits como `daniel-vantumst` y 156 como `debf-ni`; 25 PRs. Fechas: 2025 → abr-2026.
- **Lo que hice:**
  - Nómina guatemalteca completa: períodos con auditoría, embargos judiciales, corrección del cálculo de ISR, prestaciones, **Bono 14 y aguinaldo**, y liquidaciones.
  - Corregí falsos positivos del OCR al subir DTEs.
  - ORM, migraciones y gestión de personal.
- **Stack:** FastAPI async · React 19 · MUI · Cloud SQL · Firebase · Vertex AI.
- **Visibilidad:** privado.

#### ⑧ email-scheduler: microservicio de email transaccional
- **Pitch:** un servicio de correo genérico y multi-tenant. Encola los correos en BullMQ y los envía por la Gmail API con rate-limit y reintentos.
- **Rol:** coautor (36 % de los commits). Le agregué la capa de confiabilidad y la multi-tenant.
- **Lo que hice:**
  - **Callbacks de entrega firmados**, con su suite de pruebas.
  - **Detección de rebotes (DSN)**, notificados como `state=bounced`.
  - Store de secretos cifrado y remitentes guardados en Postgres, con API de administración, caché con TTL y respuesta 503 si el store no responde.
  - **API keys con alcance** (tenant vs. admin) y denegado por defecto.
  - El proceso ya no se cae por un error en un cliente ocioso del pool, y el apagado es ordenado.
- **Stack:** TypeScript · Fastify 5 · BullMQ · Redis · Postgres · Gmail API · Secret Manager · GCS · vitest.
- **Visibilidad:** privado.

#### ⑨ Verticales Odoo 18 para clientes
- **Agencia de viajes ("Topax")**, en producción en `erp.topax.vantumst.com`. Es un repo de equipo; mi parte (110 commits y 54 PRs, oct → nov 2026) fue:
  - Infraestructura en GCP con Terraform (Cloud SQL, VM, Ops Agent), con un **guardrail que rechaza cualquier plan que destruya o reemplace recursos**.
  - CI con tests de Odoo en cada PR y deploy automático vía WIF.
  - Repo autosuficiente, con los módulos OCA vendorizados.
  - Rediseño del workspace a partir de Penpot, con tema claro y oscuro.
  - Correcciones de concurrencia, como evitar el doble envío por doble click.
- **Euromorteros (materiales de construcción).** Creé ambos repos:
  - Terraform con state remoto y entornos separados (shared, staging, prod);
  - proxy HTTPS con Caddy;
  - factura FEL impresa;
  - deploy automático;
  - métricas con Ops Agent;
  - correo saliente por el email-scheduler.
- **Odoo Las Américas.** 98 de 101 commits: automatización de VMs y staging, endurecimiento de producción y releases automáticos.
- **Plataforma Odoo compartida:**
  - `odoo-vantum-ui` (creador): login corporativo, tema oscuro para Community, PWA y Settings más rápidos.
  - `Odoo-repo-base`: plantilla reutilizable.
  - `odoo-vantum-mail` (creador y único autor): manda el correo de cualquier Odoo por el email-scheduler, con seguridad transaccional ante rollbacks.
- **Stack:** Odoo 18 · Python · OWL · SCSS · Terraform · GCE · Cloud SQL · Caddy.
- **Visibilidad:** privado. Solo se puede mencionar la URL del ERP de producción si Daniel lo aprueba.

#### ⑩ Euro BI: BI con IA (2025)
- **Pitch:** inteligencia de negocio sobre las ventas de Euromorteros, con **BigQuery y Gemini**, desplegada en Cloud Run.
- **Rol:** creador (cuenta `debf-ni`), jul-2025 → ene-2026.
- **Stack:** FastAPI · React · MUI · BigQuery · Gemini · Firebase · Cloud Run.
- **Visibilidad:** privado.

---

### 3.2 Plataforma interna y developer experience
`ui:` sección propia, "Construyo herramientas para que el equipo vaya más rápido".

| Herramienta | Qué es | Rol | Números |
|---|---|---|---|
| **vantum-cli** | El CLI de la empresa. `vantum env pull/push/discover` sincroniza los `.env` con GCP Secret Manager (un proyecto por repo). También trae `doctor`, `init`, `update` con canal stable/beta y una TUI con aviso de versión nueva | creador y único autor | 22 commits · 139 tests bats en Docker · shellcheck · semver automático desde Conventional Commits · Linux y macOS |
| **vantum-tools** | Marketplace de plugins de **Claude Code**. Convierte la guía de ingeniería en *skills* que usa todo el equipo: commit, pr, review, address-review, ready, tdd y ui | creador y único autor | 14 commits · releases desde main, beta desde develop |
| **design-guidelines** | El estándar normativo de Vantum: DESIGN.md (863 líneas), ENGINEERING.md (646), API.md y DATABASE.md, más plantillas de issues y PRs con etiquetado automático. El sistema de UI se extrajo del CRM en producción y se adoptó como estándar de la empresa | creador y único autor | 28 commits |
| **trainee / Vantum Assessment** | Plataforma de entrevistas técnicas: consola del entrevistador, pantalla del candidato con un código de 8 caracteres, modo proyector, motor de scoring puro, selección de preguntas y rúbricas | creador | banco de **90 preguntas** · 54 tests · FastAPI + React/MUI · prototipo |

**Mensaje clave:** "No solo escribo código: escribo las reglas, las herramientas y las evaluaciones con las que trabaja el equipo."

### 3.3 Liderazgo técnico (evidencia)
- **121 PRs de compañeros revisados**, 218 reviews en total y **49 con cambios solicitados**: un filtro real de calidad, no aprobaciones automáticas.
- **168 PRs de otros mergeados.** Es el responsable de integrar en los repos principales.
- **414 issues creados (53 % de la org).** Convierte objetivos ambiguos en backlog accionable.
- Estándares que definió y que el equipo usa:
  - Conventional Commits y PRs de una sola intención, de unas 400 líneas.
  - Develop para integrar, main para entregar.
  - Tag y release en cada merge.
  - Límite de 800 líneas por archivo en CI.
  - Modelo de base de datos con dos usuarios (el que migra y el de runtime).
  - API keys con alcance y `X-Vantum-Actor` para auditoría.
- Prácticas propias: PRs apilados para cambios grandes y rondas de endurecimiento guiadas por auditorías (Soporte, whatsapp-stack).
- Releases automáticos en ~6 repos.

### 3.4 Clientes e integraciones (logo-wall / chips)
- **Sectores:** educación (colegios), materiales de construcción, viajes y SaaS interno.
- **Integraciones:**
  - WhatsApp: Meta Cloud API (templates, interactive, Flows, webhooks) y Evolution API.
  - Correo: Gmail API.
  - **FEL / SAT Guatemala:** InFile y Digifact.
  - ERP: Odoo 18 + OCA.
  - Identidad: Firebase / Identity Platform.
  - Datos e IA: BigQuery, Gemini / Vertex AI.
  - Alertas: Google Chat.
- **GCP:** Cloud Run · Cloud SQL · Cloud Build · Artifact Registry · Secret Manager · Identity Platform · GCS · GCE + Ops Agent · VPC · **Workload Identity Federation** · Terraform.

---

## 4. Open source (todo `público`, enlazar)

`ui:` lista con badge "MERGED", estrellas del repo y diff +/−.

### Gentleman-Programming/engram (~7.9k ★): memoria persistente para agentes de IA, escrito en Go
| PR | Qué cambió | Diff |
|---|---|---|
| [#493](https://github.com/Gentleman-Programming/engram/pull/493) **MERGED** | **Registro declarativo de agentes.** Reemplacé un `switch` de instaladores por un registro guiado por datos y un inyector genérico de configuración MCP que soporta 3 formatos. Esto agregó `engram setup` nativo para 7 agentes (Cursor, Windsurf, VS Code Copilot, Kiro, Qwen, Kilocode y Antigravity) sin cambiar el comportamiento de los existentes. Incluye tests de idempotencia y de preservación del contenido del usuario | +1128 / −83 |
| [#526](https://github.com/Gentleman-Programming/engram/pull/526) **MERGED** | Ranking de búsqueda: cambié el ranking FTS5 por defecto por **BM25 ponderado** (título ×5, topic_key ×3), con un test de ranking | +55 / −2 |
| [#527](https://github.com/Gentleman-Programming/engram/pull/527) **MERGED** | Ciclo de vida: cierre correcto de sesiones de OpenCode (con reintento y deduplicación) y de Gemini | +150 / −9 |
| [#906](https://github.com/Gentleman-Programming/engram/pull/906) **MERGED** | MCP: metadata estructurada para recuperarse de `unknown_session` cuando el agente inventa IDs de sesión | +234 / −10 |
| [#908](https://github.com/Gentleman-Programming/engram/pull/908) **MERGED** | Diagnostiqué y corregí un test inestable en CI (frontera de 1 s en `exported_at`) y reporté el issue #907 | +12 / −2 |

### johnfanv2/LenovoLegionLinux (~3.5k ★): driver de kernel en C
- [#563](https://github.com/johnfanv2/LenovoLegionLinux/pull/563) **MERGED.** Encontré que en la Legion Pro 5 16ARX8 las escrituras WMI de la curva de ventiladores descartaban en silencio las temperaturas, la histéresis y el ventilador 2. Corregí el módulo de kernel y desactivé el modo de potencia extremo para ese modelo. Nació de mi propio diagnóstico térmico, documentado en mis dotfiles.

### Mats2208/MCP-Packet-Tracer (359 ★): automatización de Cisco Packet Tracer con IA y MCP
- [#20](https://github.com/Mats2208/MCP-Packet-Tracer/pull/20) **MERGED · seguridad.** Un salto de línea en los nombres de VLAN, ACL, dispositivo o pool DHCP permitía **inyectar comandos de IOS**. Lo corregí rechazando los caracteres de control, siguiendo el patrón de validación del repo (+366 / −18, 14 archivos).

### Colaboraciones con compañeros
- **diegoabdo/lexema-cli** (CLI de IA para terminal), 3 PRs mergeados:
  - #1: un worker agnóstico de proveedor (Gemini, OpenRouter, OpenAI, Groq, Ollama);
  - #2: una TUI interactiva con **ink**, binarios compilados con bun, vitest y CI;
  - #4: auto-actualización.
- **WilderL/SIGHCI-plus**, 2 PRs mergeados: deploy en Heroku y una app de depuración con IA vía OpenRouter, con tests.

---

## 5. Proyectos universitarios en equipo (con liderazgo)

#### SIGA-INEBI: Sistema Integral de Gestión Académica y Administrativa · `público`
- **Links:** repo https://github.com/siga-inebi/siga-inebi · producción https://siga-inebi-prod-997189930810.us-central1.run.app/
- **Pitch:** la plataforma académica y administrativa del **INEBI de Salcajá**, una escuela pública real. Cubre matrículas, asistencia, ciclos, cursos, asignación docente, emisión y verificación de documentos, y avisos a familias. Llegó a producción el 2026-11-02.
- **Rol:** **tech lead, planificación y DevOps.** 97 PRs (89 mergeados) de 442, ≈22 %; 72 commits (#2 de 9 personas); 12 reviews.
- **Lo que hice:**
  - **Planificación:**
    - plan de sprint full-stack en 8 líneas de trabajo, con diagramas de dependencias y wireframes;
    - plan de entrega de las semanas 9 a 14 ligado a un GitHub Project de **179 issues**;
    - scripts para automatizar ese Project (con dry-run y tests), ensayados con 237 tickets en un sandbox.
  - **Cloud:**
    - QA y producción en Cloud Run + Cloud SQL con Terraform, con análisis de costos y un ADR;
    - CI/CD con WIF;
    - deploy restringido a `main`;
    - simulacro de restauración de Cloud SQL;
    - protocolo de pruebas de carga.
  - **CI más rápido:** el CI solo corre las áreas que tocó el cambio y pytest corre en paralelo. Antes, los **1,660 tests tardaban 115 s en serie**; además, el deploy a QA ya no repite el CI completo.
  - **Backend:**
    - dominio de personas y alumnos, ciclos, secciones y matrícula, con control de cupos;
    - permisos por contexto;
    - credenciales con IDs opacos;
    - **emisión de documentos idempotente con código público de verificación** y rate-limit;
    - **minimización de datos de menores**;
    - avisos de inasistencia a los encargados;
    - una cola de trabajos en segundo plano.
  - **Frontend:**
    - la UI reconstruida sobre MUI;
    - flujos completos de ciclo escolar, hoja de notas y asistencia;
    - importación de alumnos por CSV y exportación masiva de carnés.
  - **Trazabilidad:** cada requisito (RF y RNF) tiene su PR o issue; manuales de QA y dossier del proyecto.
- **Stack:** Django · DRF · React · MUI · PostgreSQL 16 · Docker · Terraform · Cloud Run · Cloud SQL · Secret Manager · GitHub Actions + WIF · pytest-xdist.
- **Assets disponibles:** `/assets/images/siga-inebi-*.webp` (4 capturas).

#### ERP Progra Web (curso de Programación Web, URL) · `público`
- **Link:** https://github.com/URL-progra-web/ERP-progra-web-url
- **Pitch:** un ERP de inventario, pedidos, clientes y emprendedores, y reportes, hecho por **19 estudiantes**.
- **Rol:** **creador y admin de la org; armé la arquitectura base.** 20 de 36 PRs; 47 commits (#1; el siguiente tiene 16); 10 reviews; 19 issues.
- **Lo que hice:**
  - Bootstrap del proyecto (estructura, Docker, migraciones y dashboards por módulo) "para que el resto solo programe su parte".
  - Módulos de inventario, unidades y conversiones, pedidos con tablas pivote y exportación de ventas a Excel.
  - Notificaciones de pedidos en línea y CRUD de emprendedores.
  - La paginación se hace en la base de datos (devolviendo QuerySets).
  - UI responsive y workflow de deploy.
- **Stack:** Django 4.2 · DRF · React 19 · Vite · PostgreSQL · Docker Compose · Vercel.
- ⚠️ El sitio actual lo llama "ERP para ONG". **Eso no aparece en el repo.** Ver la sección 14.

#### ExamLock (virtua-ExamLock) · `público`
- **Link:** https://github.com/daniel-baf/virtua-ExamLock
- **Pitch:** una plataforma de exámenes controlados. El estudiante arranca una **ISO Debian Live bloqueada**, una VM o un kiosco, y un agente local aplica una whitelist de red y reglas de firewall. El docente monitorea en vivo: respuestas, capturas de pantalla, stream y auditoría.
- **Rol:** 29 commits (como daniel-baf y daniel-vantumst) y 6 PRs mergeados: stream, refactor de sockets, deploy y presentación.
- **Stack:** Node · Express · Socket.IO · Firebase Auth · Firestore · Cloud Storage · React/Vite · Debian live-build · QEMU · Terraform en GCP. Incluye un checklist de pentest.

---

## 6. Proyectos personales y freelance

#### Cálculo de Vigas Estructurales: freelance · repo privado, **app pública**
- **Link:** https://calculo-vigas-estructurales.danibaufu.workers.dev/
- **Pitch:** un asistente paso a paso para **diseñar vigas de concreto reforzado**: cargas gravitacionales, flexión, corte y confinamiento, torsión y reportes. Todo corre en el navegador, con un **visor 3D** de la viga y la sección, y fórmulas renderizadas.
- **Rol:** autor único. 73 commits y 13 PRs mergeados, mar-2026 → ago-2026. **Validado con un ingeniero civil.**
- **Lo que hice:**
  - **Revisión del flujo de flexión a partir del reporte del ingeniero.** El chip rojo de "As requerido" engañaba. Ahora el chequeo que gobierna es **φMn ≥ Mu** con el brazo real de Whitney (d − a/2), no con j = 0.9.
  - **Torsión:** alineé Vc, fyt G60 y Mpr con la hoja de cálculo de una tesis de referencia, y el flujo se volvió usable en móvil.
  - **Confinamiento:** opción de estribo de 4 ramas, corrección de un caso degenerado que mostraba "= Infinity cm", y el visor 3D ahora distribuye las ramas interiores.
  - Compartir e importar proyectos por **QR**, biblioteca local de proyectos y documentación con diagramas Mermaid y fórmulas.
- **Stack:** React · TypeScript · Vite · shadcn/Radix · Tailwind 4 · **three.js / react-three-fiber** · **KaTeX** · vitest · Cloudflare Workers.
- **Assets:** `/assets/images/calculo-vigas-preview.webp`.
- ⚠️ El sitio dice "ACI 318-19"; el código solo dice "ACI". Ver la sección 14.

#### Quishing Lab: concientización sobre phishing por QR · `público`
- **Link:** https://github.com/daniel-baf/quishing-lab
- **Pitch:** una demo en vivo de 5 a 7 minutos para una **feria universitaria**.
  1. El participante escanea un QR y entra a una "tienda" (OWASP Juice Shop con otra piel).
  2. Un segundo QR dispara un **XSS DOM almacenado** que roba el JWT y lo muestra en un panel proyectado.
  3. En vivo se repite la sesión robada.
  4. Cierre con las defensas: cookies HttpOnly, tokens de vida corta y token binding.
- **Lo que hice:** el panel que decodifica el JWT; URLs de QR editables con un túnel para que funcione fuera de la LAN; persistencia opcional en Postgres; un SECURITY.md de uso responsable.
- **Stack:** Node · Docker Compose (panel + Juice Shop + WebGoat) · Makefile.

#### Notas Seguras: demo de autenticación segura · `público`
- **Links:** https://demo-implementacion-auth-seguro.vercel.app · https://github.com/daniel-baf/demo-implementacion-auth-seguro
- **Pitch:** una app de notas para clase que muestra **MFA real** (contraseña + TOTP o biometría con WebAuthn), **RBAC** (panel de admin), **ABAC** (notas privadas y por departamento) y el ciclo de vida del JWT con **revocación inmediata**: el claim `sid` se valida contra SQLite.
- **Destacado:** 9 documentos técnicos con Mermaid, que incluyen un anti-patrón (preguntas de seguridad) y un inventario honesto de limitaciones.
- **Stack:** Node · Express · SQLite · nginx · Docker Compose · PWA.

#### hyprtablet · `público`
- **Link:** https://github.com/daniel-baf/hyprtablet
- App nativa en GTK4 + libadwaita (Python) para mapear tabletas de dibujo a monitores en Hyprland. Tiene tests y un PKGBUILD para AUR, que aún no está publicado.

#### dotfiles · `público`
- **Link:** https://github.com/daniel-baf/dotfiles
- Hyprland + GNU Stow para una Legion Pro 7 con NVIDIA, y una paleta Tokyo Night clara y oscura compartida.
- El instalador es idempotente y genera la identidad de git y las llaves SSH sin guardar datos personales.
- Tiene un diagnóstico térmico documentado, **que terminó en el PR mergeado al driver de kernel**.

#### Este portfolio · `público`
- **Link:** https://daniel-baf.github.io/portfolio/
- Astro con un motor de "presentación" 3D propio: **three.js + GSAP ScrollTrigger + Lenis**. El scroll se mapea a *beats* con peso, y hay un controlador de calidad para equipos modestos. Se despliega en GitHub Pages.

#### Laboratorio de seguridad ofensiva · `público`
- `meterpreter-exploit-reverse-shell-on-remote-vm`: laboratorio en Bash y Makefile que automatiza los payloads de msfvenom, los listeners y las reglas de ufw, con un descargo ético y legal.

---

## 7. Docencia y comunidad
`ui:` sección corta, "Enseñar es la mejor forma de aprender".
- **"Git Quest: del primer commit a chained PRs".** Taller de 4 horas de Git y GitHub para principiantes (UDEO, sep-2026). Una app de consola en .NET 8 se construye por ramas acumulativas, con su guía `TALLER.md` y una presentación. https://github.com/daniel-baf/taller-github-udeo
- **"Práctica Git & GitHub: de cero a avanzado"** (URL, 2026). Un curso interactivo de unas 20 lecciones por ramas: amend, commits firmados, rebase vs. merge, conflictos, squash, review de PRs, cherry-pick y worktree, con soluciones etiquetadas. **40 forks de estudiantes.** https://github.com/daniel-baf/practica-git-github-url-2026
- **Quishing Lab:** demo de concientización en una feria universitaria.
- **Notas Seguras:** demo de seguridad para clase.
- **Apuntes del curso:** https://github.com/daniel-baf/url-notas (Obsidian + MkDocs, 241 commits).

---

## 8. Formación

| Fechas | Programa | Institución | Nota |
|---|---|---|---|
| 2023 → presente | Ingeniería en Informática y Sistemas (5.º año) | Universidad Rafael Landívar (URL) | SIGA-INEBI, ERP Progra Web, ExamLock |
| 2019 → 2023 | Ingeniería en Ciencias y Sistemas | USAC · CUNOC | Compiladores, estructuras de datos, arquitectura y ensamblador |
| 2024 | Oracle Next Education (ONE), Java | Oracle + Alura | https://github.com/daniel-baf/ONE-G7-daniel-baf |

### Proyectos académicos (USAC, 2020-2023): grid compacto `público`
| Repo | Año | Qué es |
|---|---|---|
| [compiler-simulator](https://github.com/daniel-baf/compiler-simulator) | 2020 | Simulador de compilador en C# |
| [matrix-solver](https://github.com/daniel-baf/matrix-solver) | 2020 | 5 métodos para resolver sistemas 3×3 (Java) |
| [furnitureControlSystem](https://github.com/daniel-baf/furnitureControlSystem) | 2021 | Sistema web en Java (IPC2) |
| [magazine-app](https://github.com/daniel-baf/magazine-app) | 2021 | Plataforma de revistas (Java + Angular) |
| [graphic-language](https://github.com/daniel-baf/graphic-language) | 2022 | Lenguaje gráfico con JFlex/CUP |
| [JavaCodeComparer](https://github.com/daniel-baf/JavaCodeComparer) | 2022 | Detector de plagio de código (Java + Lex) |
| [web-compiler](https://github.com/daniel-baf/web-compiler) | 2022 | Compilador en el navegador (Angular + Jison) |
| [PyramidAVL](https://github.com/daniel-baf/PyramidAVL) · [HorseRaces](https://github.com/daniel-baf/HorseRaces) · [GameOf15](https://github.com/daniel-baf/GameOf15) | 2022 | Estructuras de datos (Java, C++) |
| [arqui-1-assembler](https://github.com/daniel-baf/arqui-1-assembler) | 2023 | Programas en ensamblador |
| [SystemNumberConverter](https://github.com/daniel-baf/SystemNumberConverter) | 2023 | Conversor de bases numéricas (Python) |

**Hilo narrativo:** cuatro compiladores entre 2020 y 2022 (simulador, lenguaje gráfico, comparador y compilador web). Esa base de parsers, ASTs y validación reaparece en el fix de inyección de comandos IOS y en el contrato OpenAPI tipado.

---

## 9. Habilidades con evidencia
`ui:` matriz de habilidades. **Sin porcentajes**: cada habilidad enlaza a los proyectos que la prueban. Las barras actuales con "88 %" restan credibilidad.

| Área | Tecnologías | Evidencia |
|---|---|---|
| Backend Python | FastAPI, Django/DRF, SQLAlchemy, Alembic, Pydantic | CRM ①, Soporte ②, ERP ⑦, SIGA |
| Backend TypeScript | Node, Fastify, Express, BullMQ, Socket.IO | WhatsApp ③, Admin ④, email ⑧, ExamLock |
| ERP | Odoo 18 (Python, OWL, QWeb), OCA | ⑤ ⑥ ⑨ |
| Bases de datos | PostgreSQL (triggers, migraciones, pools), Cloud SQL, Redis, SQLite, BigQuery | carnés por trigger, nómina, BI |
| Frontend | React 19, TypeScript, MUI, Vite, PWA, three.js, KaTeX | CRM, Soporte, Vigas |
| Cloud / IaC | GCP (Cloud Run, Cloud SQL, Build, Secret Manager, Identity Platform, VPC, WIF), Terraform, Docker | 12 sistemas en producción |
| CI/CD | GitHub Actions, Cloud Build, semver automático, CI que solo corre lo que cambió | Soporte, SIGA, vantum-cli |
| Integraciones | WhatsApp Meta Cloud API y Flows, Gmail API, FEL (InFile, Digifact), webhooks HMAC | ② ③ ⑤ ⑧ |
| Seguridad | RBAC/ABAC, MFA/WebAuthn, CSRF, HMAC, anti-SSRF, API keys con alcance, auditoría | Notas Seguras, Quishing, MCP-PT #20 |
| Testing | pytest, vitest, bats, mutation testing, tests en paralelo | 179 archivos de test en el CRM |
| IA aplicada | MCP, Claude Code skills, Engram, Gemini/Vertex, OpenRouter | Engram, vantum-tools, Euro-BI |
| Sistemas | Linux, Bash, kernel modules (C), Hyprland, Arch/AUR | LenovoLegionLinux #563, dotfiles |
| Liderazgo | Code review, planificación de sprints, estándares, docencia | 121 PRs revisados, SIGA, talleres |

**Idiomas:** español (nativo). Inglés: **por confirmar el nivel** (los PRs open source están escritos en inglés).

---

## 10. Línea de tiempo (para `journey.ts` / la historia 3D)

| Año | Capítulo | Texto (≤ 2 líneas) | Highlights |
|---|---|---|---|
| 2020 | **First compile** | Primer repo y primer compilador: un simulador en C# en mi primer año en la USAC. | compiler-simulator, matrix-solver |
| 2021-2022 | **Estructuras y lenguajes** | Árboles AVL, juegos, un detector de plagio y tres compiladores más. La base de todo lo que vino después. | 4 compiladores, 9+ proyectos |
| 2023 | **Bajo nivel** | Ensamblador, arquitectura del computador y el cambio a la URL. | arqui-1-assembler |
| 2024 | **Backend** | Oracle ONE: Java, APIs REST y bases de datos. | ONE-G7 |
| 2025 | **Primeros sistemas reales** | BI con BigQuery y Gemini, y la nómina guatemalteca de un ERP escolar. | Euro-BI, LasAmericas-ERP |
| 2026 H1 | **Producción** | Me hago cargo del CRM de un colegio, construyo un helpdesk SaaS desde cero y nace el gateway de WhatsApp. Primer PR mergeado en Engram. | CRM, Soporte v0.3, whatsapp-stack, Engram #493 |
| 2026 H2 | **Plataforma** | 108 PRs en septiembre y **240 en octubre**: FEL desacoplado, verticales Odoo 18, Terraform en todos lados, el CLI y las skills de IA del equipo, SIGA-INEBI en producción y open source en kernel, MCP y Go. | 601 PRs, 121 reviews, 12 sistemas, SIGA en producción, 7 PRs OSS |

`ui:` en la historia 3D actual, el capítulo "LIDERAZGO 2025" usa datos que no se pudieron verificar (ver la sección 13). Conviene reemplazarlo por "Primeros sistemas reales" y partir "Producción" en H1 y H2.

---

## 11. Textos listos para pegar

**Titular de LinkedIn:**
Backend & Cloud Engineer @ Vantum ST · Python · TypeScript · GCP · Terraform · Odoo 18 · Open source (Engram)

**Elevator pitch en inglés (para reclutadores internacionales):**
> Backend & cloud engineer from Guatemala. At Vantum ST I author ~60 % of the organization's pull requests (600+ merged in 2026) and am the top contributor in 21 of 24 repositories. I built a multi-tenant helpdesk SaaS from scratch, the company's WhatsApp gateway (Meta Cloud API + Evolution), a school admissions CRM, and a certifier-agnostic e-invoicing layer for Odoo 18. I also built the GCP/Terraform platform that ships all of them. Open-source contributor to Engram (5 merged PRs), LenovoLegionLinux and MCP-Packet-Tracer.

**Bullets de CV en inglés (los 5 más fuertes):**
- Authored 635 PRs (601 merged, 61 % of the org) and reviewed 121 teammate PRs (49 with requested changes) across 24 repositories; top contributor in 21.
- Built a multi-tenant helpdesk SaaS from POC to production v0.7: configurable RBAC, SLA engine with pause credit, and a WhatsApp ticket bot with Meta Flows. Also migrated its frontend from Django + Tailwind to React + MUI.
- Created a multi-tenant WhatsApp gateway with pluggable providers (Meta / Evolution), durable BullMQ queues that survive ~1 day of consumer downtime, HMAC-signed callbacks and anti-SSRF protection.
- Designed a certifier-agnostic e-invoicing (FEL Guatemala) interface for Odoo 18 and cut a production client over from InFile to Digifact.
- Standardized delivery: Terraform + Cloud Run + Workload Identity Federation, semver auto-releases, an internal secrets CLI (139 bats tests) and a Claude Code skills marketplace adopted by the team.

---

## 12. Sugerencias de estructura de página (para el agente de UI)
1. **Hero:** headline, bio corta y 4 a 6 tiles de métricas.
2. **Evidencia:** gráfico de PRs por mes, la frase "#1 en 21/24 repos" y el mini panel de reviews.
3. **Qué hago:** los 4 pilares.
4. **Case studies:** ① a ⑩ en un grid. Los primeros 4 en grande, el resto compacto. Cada uno con un badge "Privado · cliente real".
5. **Plataforma y equipo:** la tabla de la sección 3.2 y el liderazgo de la 3.3.
6. **Open source:** PRs con enlace, estrellas y badge MERGED.
7. **Universidad:** SIGA-INEBI destacado (en producción, con capturas), el ERP y ExamLock.
8. **Proyectos personales:** Vigas (app viva + captura), Quishing, Notas Seguras y el resto.
9. **Docencia.**
10. **Timeline.**
11. **Habilidades con evidencia.**
12. **Formación y académicos.**
13. **Contacto.**

---

## 13. Correcciones al sitio actual (`src/data/*.ts`)

| Dónde | Hoy | Debe decir | Por qué |
|---|---|---|---|
| `journey.ts` intro | "140 pull requests · ~98 code reviews · 681+ commits" | "600+ PRs mergeados · 140+ PRs revisados · 1,400+ commits" | Datos de la API de GitHub al 2026-11-09 |
| `journey.ts` cloud | "94 PRs en producción · 79 merged", "84 code reviews", "13 proyectos" | "601 PRs mergeados", "121 PRs revisados", "12 sistemas en producción · 24 repos" | Mismo motivo |
| `journey.ts` cloud, subtítulo | "VantumST · GCP · Docker · CI/CD" | "Vantum ST · producto + plataforma · GCP · Terraform" | Faltaba lo de producto |
| `journey.ts` ai | Solo #493 | 5 PRs mergeados en Engram, más LenovoLegionLinux #563 y MCP-PT #20 | Hay más evidencia |
| `journey.ts` network (2025, "LIDERAZGO") | "ERP para ONG", "evaluación técnica de talento" | Ver la sección 14 | Sin evidencia en los repos |
| `CAREER_START_YEAR = 2024` | 2024 | Confirmar: la evidencia más antigua de trabajo profesional es de **jul-2025** | Ver la sección 14 |
| `portfolio.ts` proyectos | Incluye SystemNumberConverter, ASM y Oracle como proyectos destacados | Moverlos al grid académico. Destacar Soporte, WhatsApp, CRM, FEL, SIGA, Vigas y Engram | Impacto |
| `portfolio.ts` habilidades | Barras con % | Matriz con evidencia (sección 9) | Credibilidad |
| `portfolio.ts` hero.metrics | "GCP especialización en progreso" | "12 sistemas en producción en GCP" | Mostrar resultados |
| README del repo | Astro 6, stitch MCP, binary rain | Astro 7, three.js, GSAP, Lenis | Está desactualizado |

---

## 14. Por confirmar con Daniel (antes de publicar)
1. **Nombres de clientes:** ¿se pueden mostrar Las Américas, Euromorteros, CEA y Topax? Si no, usar las versiones anónimas: "colegio privado", "empresa de materiales de construcción", etc.
2. **URL de producción** `erp.topax.vantumst.com`: ¿se puede mostrar?
3. **Fechas y tipo de empleo en Vantum:** el README de perfil dice *part-time*. ¿Desde qué mes? ¿Qué título exacto?
4. **Nodo Intel** (`debf-ni`, daniel@nodointel.com): hay commits de 2025 en LasAmericas-ERP y Euro-BI con esa cuenta. ¿Fue otro empleador, una agencia predecesora o un contrato? ¿Va como una experiencia aparte?
5. **2024 como inicio profesional:** ¿hay trabajo de 2024 que no esté en GitHub?
6. **"ERP para ONG":** el repo no lo menciona. ¿Hubo una ONG real, o se cambia a "ERP del curso de Programación Web, 19 estudiantes"?
7. **"Evaluación técnica de talento":** ¿se apoya en `trainee` (Vantum Assessment)? Si es así, se puede afirmar con evidencia.
8. **ACI 318-19** en Vigas: ¿es la edición exacta?
9. **Blog** `programacioncondaniel.blogspot.com`: ¿sigue activo?
10. **Nivel de inglés.**
11. **Capturas:** faltan imágenes de Soporte, WhatsApp Admin, el CRM y Quishing. Si los clientes lo permiten, hacen falta capturas anonimizadas.
