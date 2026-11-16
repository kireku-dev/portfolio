# scroll-story — the rack comes apart on scroll and tells Daniel's story

Objective: turn the hero rack into a scroll-driven story where the rack comes apart into its internals, network/antennas and a desk where Daniel programs, with chapters about architecture, cloud/infra, tech lead and holding both roles.
Branch: `feat/brand-datacenter` · Delivery: ask-on-risk · Test runner: none (static Astro site). Checks are `npm run build`, the anatomy audits and headless screenshots.

## Specs

- S1. "me encanta todo lo que tenga que ver con arquietectura d software, patrones de dise;o" — one story chapter is about software architecture and design patterns, backed by real project evidence.
- S2. "Me gustaria tipo tener el rack y a medida que haces scroll hacia abajo el rack se desarma, y vemos sus partes internas o ver antenas, o un mouse, un escritorio, a mi programando..." — as the visitor scrolls, the same rack shown in the hero comes apart. The scenes in order are: its internal parts, antennas and network, then a desk with monitor, keyboard and mouse, with Daniel programming. Scroll position drives the scene, and it reverses on scroll up.
- S3. "hablar sobre mi historia, por ejemplo, hablar sobre que soy cloud engineer y ya estoy graduado de ingeneiria (acabo de cerrar en 2026) ya tengo cierre de pensum" — the story says he is a cloud engineer. Studies read "cierre de pensum 2026" (user's choice, 2026-11-16), not "graduado".
- S4. "que pase por ser encargado de infraesturctura y tech lead (mi puesto actual) para una startup, y sobre las ventanajs de tener estos 2 puestos al mismo tiempo.." — the user confirmed both roles are at Vantum ST and held at the same time. One chapter explains the advantages of holding both.

Assumptions:
- The story chapters sit beside the pinned figure and are plain HTML text, so the content works without JS.
- With `prefers-reduced-motion`, the scenes switch per chapter with no scrubbing.

## Tasks

- T1 (S1, S3, S4) — inline — story copy in `src/data/portfolio.ts` (`story` block), plus hero role, about and studies updated. Status: done — commit (see git log: "feat(cv): agrega la historia...")
- T2 (S2) — delegated: the Writer trigger is the context backstop. The parent context is past the advisory budget after a compacted session, and the unit needs the anatomy kit docs. The work is the scroll-scrubbed scene (rack → internals → network/antennas → desk with Daniel programming → both roles) and the story layout with the pinned figure. Status: pending

## Log

- L1 (2026-11-16): "sabes, me encanta todo lo que tenga que ver con arquietectura d software, patrones de dise;o. Me gustaria tipo tener el rack y a medida que haces scroll hacia abajo el rack se desarma, y vemos sus partes internas o ver antenas, o un mouse, un escritorio, a mi programando... y hablar sobre mi historia, por ejemplo, hablar sobre que soy cloud engineer y ya estoy graduado de ingeneiria (acabo de cerrar en 2026) ya tengo cierre de pensum + que pase por ser encargado de infraesturctura y tech lead (mi puesto actual) para una startup, y sobre las ventanajs de tener estos 2 puestos al mismo tiempo.." / "solo haz commit primero para tenerlo todo a la mano" (done: c8dbeba).
- L2 (2026-11-16): the user answered "Vantum ST, ambos a la vez" (startup = Vantum ST, both roles now) and "Cierre de pensum 2026" (studies wording).
