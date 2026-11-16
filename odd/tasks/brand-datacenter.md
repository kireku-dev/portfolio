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

- T1 (S2, S3) — inline — delete presentation, CV → `/`, redirect `/cv` → `/`. Status: pending
- T2 (S1) — inline — brand restyle of layout, CSS and components. Status: pending
- T3 (S4) — delegated (Writer trigger a: parallel independent unit, disjoint surface `src/experience/**`, `src/components/DatacenterExperience.astro`) — anatomy datacenter figure. Status: pending
- T4 (S1, S4) — inline — mount figure in hero, final build + screenshots. Status: pending

## Log

- L1 (2026-11-16): "vamos a refactorizar la UI usando una guia que he generado de marca. /home/daniel/Downloads/kireku-brand-kit.zip quiero algo mas oscuro y minimalista, ayudame aplicando y de paso hagamos algo BORRA la interactiva, no la uso, me gusta mas la de cv. Asi que esa va a pasar a ser la landing digamos para mi portfolio, pero si quiero una interaccion 3D como si fuera una experiencia, quiero que hagamos un servidor por dentro (un datacenter) usa https://github.com/wheresryan22/anatomy para el dise;o del modelo 3D"
- L2: anatomy is an MIT isometric SVG kit (+ beta 3D "turn" mode), framework-free, Node build writes SVG strings. Plan: vendor the kit, compute the figure at build time in Astro frontmatter, live motion in a client script.
