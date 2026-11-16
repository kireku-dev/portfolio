# brand-datacenter — Kireku brand restyle, CV as landing, datacenter figure

Objective: restyle the portfolio with the Kireku brand kit (darker, minimal), delete the interactive presentation, serve the CV at `/`, and add an interactive 3D datacenter/server figure built with the anatomy kit.
Branch: `feat/brand-datacenter` · Delivery: ask-on-risk · Test runner: none (static Astro site) — checks are `npm run build` + headless browser screenshots.

## Specs

- S1. "vamos a refactorizar la UI usando una guia que he generado de marca. /home/daniel/Downloads/kireku-brand-kit.zip quiero algo mas oscuro y minimalista" — apply the brand tokens: Negro Kireku #0A0C10, Panel #10141C, Humo #F4F7FC, Tinta #C6CDD8, Gris terminal #67707F, Borde #1E2635, Aqua #00FFFF (only 1 px strokes and small accents, never solid plates), Azul profundo #2E5BFF (depth only); Space Grotesk (display), Geist (text), Geist Mono (technical labels); 1 px borders, no shadows, radius 0–2 px, ≥96 px between sections; isotipo as favicon/brand mark.
- S2. "BORRA la interactiva, no la uso" — delete the interactive presentation page and its code/assets.
- S3. "me gusta mas la de cv. Asi que esa va a pasar a ser la landing digamos para mi portfolio" — the CV page is served at `/`.
- S4. "si quiero una interaccion 3D como si fuera una experiencia, quiero que hagamos un servidor por dentro (un datacenter) usa https://github.com/wheresryan22/anatomy para el dise;o del modelo 3D" — an interactive figure of a server rack opened up, built with the anatomy kit, mounted in the landing.

Assumption: dark-only (the light/dark toggle is removed) because the brand is dark-first and the user asked for "más oscuro".

## Tasks

- T1 (S2, S3) — inline — delete presentation, CV → `/`, redirect `/cv` → `/`. Status: done — commit 19fa601
- T2 (S1) — inline — brand restyle of layout, CSS and components. Status: done — commit 19fa601
- T3 (S4) — delegated (Writer trigger a: parallel independent unit, disjoint surface `src/experience/**`, `src/components/DatacenterExperience.astro`) — anatomy datacenter figure. Status: done — commit (see L4)
- T4 (S1, S4) — inline — mount figure in hero, final build + screenshots. Status: done — commit (see L4)
- T5 (L5) — inline — alias kireku / founder line, tech lead role, computed tenure, ~/vantum project cards 05–10. Status: done — commit (see L5)

## Log

- L1 (2026-11-16): "vamos a refactorizar la UI usando una guia que he generado de marca. /home/daniel/Downloads/kireku-brand-kit.zip quiero algo mas oscuro y minimalista, ayudame aplicando y de paso hagamos algo BORRA la interactiva, no la uso, me gusta mas la de cv. Asi que esa va a pasar a ser la landing digamos para mi portfolio, pero si quiero una interaccion 3D como si fuera una experiencia, quiero que hagamos un servidor por dentro (un datacenter) usa https://github.com/wheresryan22/anatomy para el dise;o del modelo 3D"
- L2: anatomy is an MIT isometric SVG kit (+ beta 3D "turn" mode), framework-free, Node build writes SVG strings. Plan: vendor the kit, compute the figure at build time in Astro frontmatter, live motion in a client script.
- L3: T1+T2 done in 19fa601. Removed presentation, three/gsap/lenis, dead JS (theme toggle, cv-intro, typewriter, terminal writer), old style.css/cv.css; new public/assets/css/site.css. Checks: `npm run build` OK (2 routes, /cv meta-refresh redirect); headless screenshots at 1440 and 390 reviewed; fixed empty grid cell painted with line colour and stretched "Ver más".
- L4: T3 delivered by writer: rack kr-01 (12U) on a turntable, server 07 on telescopic slides, ~154 authored parts, anatomy 3D turn mode (±27° drag), hover/tap opens the sled, keyboard, idle tour, live model readout. Writer checks: kit audit passed; lines.mjs 0 in 4 poses; turn-check lines 0 at 24 angles; pops first-difference 0 (second-difference run crashed, incomplete); quick orbit audit leaves 1 swap + continuity births at unreachable angles; perf ~9.8 ms/frame desktop, ~43 ms on throttled phone. T4: mounted as NavHeroSection slot; foot row stacks via container query (<=720px) so the hint is never truncated; build OK; hero screenshots desktop/phone and idle-tour frames reviewed. Page: index.html 576 KB (130 KB gzip) + 78 KB client JS.
- L5 (2026-11-16): "solo que valdria la pena poner un texto donde digamos "alias kireku" para que sepan eso, o tipo "fuindador de kireku" empresa de desarrollo... + el tiempo esta mal, debe ser calculado, ya tengo 2 años 1 año y 7 meses en vantumst y actualmente soy techlead ahi, fui backend engineer luego fullstack y ahora tech lead + podemos hablar de mas repos sabes, como la cli d evantum" / "todo en ~/vantum". Done: hero alias + founder line, role Tech Lead en Vantum ST, durations computed from CAREER_START 2024-11 and VANTUM_START 2025-04 (assumed from the user's statement; 6/6 scratch checks), cards 05–10 (vantum-cli, design-guidelines+vantum-tools, tenants-admin, LasAmericas ERP, email-scheduler, Odoo verticals; client names anonymised, no repo links). Build OK; projects screenshot at 1440 reviewed.
