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
- T2 (S2) — delegated: the Writer trigger is the context backstop. The parent context is past the advisory budget after a compacted session, and the unit needs the anatomy kit docs. The work is the scroll-scrubbed scene (rack → internals → network/antennas → desk with Daniel programming → both roles) and the story layout with the pinned figure. Status: done — commit (see L3)
- T3 (S2, L4) — delegated (same writer, context backstop) — unboxed figure that travels left/right with the chapters. Status: done — commit (see L5)
- T4 (S2, L6) — delegated (same writer) — hide caption after the hero; desk frame no longer cuts the rack. Status: done — commit (see L7)

## Log

- L1 (2026-11-16): "sabes, me encanta todo lo que tenga que ver con arquietectura d software, patrones de dise;o. Me gustaria tipo tener el rack y a medida que haces scroll hacia abajo el rack se desarma, y vemos sus partes internas o ver antenas, o un mouse, un escritorio, a mi programando... y hablar sobre mi historia, por ejemplo, hablar sobre que soy cloud engineer y ya estoy graduado de ingeneiria (acabo de cerrar en 2026) ya tengo cierre de pensum + que pase por ser encargado de infraesturctura y tech lead (mi puesto actual) para una startup, y sobre las ventanajs de tener estos 2 puestos al mismo tiempo.." / "solo haz commit primero para tenerlo todo a la mano" (done: c8dbeba).
- L2 (2026-11-16): the user answered "Vantum ST, ambos a la vez" (startup = Vantum ST, both roles now) and "Cierre de pensum 2026" (studies wording).
- L3 (2026-11-16): T2 delivered by the writer. One `.scrolly` wrapper keeps the hero rack pinned while the chapters scroll; native scroll driver (no new deps); scenes rack → internals (explode) → network → desk → together; reduced motion steps per chapter. Writer checks: build OK, dist/index.html 879,748 B (186,963 gzip); story-audit passed; kit quick orbit audit: 2 swaps (pre-existing sled.wall/sled.board pair at -24.3°, present at HEAD) and 108 continuity births at 30°/120° outside the ±27° range (existing class); line ends 0 in all 5 scenes; scroll 60 fps desktop, ~32 fps on 4× throttled phone. No sideways scroll at 1440/820/390. Parent spot check: build re-run OK with the same size; desktop and phone contact sheets reviewed. `gentle-ai review assess` returned `unassessable` (untracked files) and no high-risk item applies, so writer self-verification stands.
- L4 (2026-11-16): "me gusta, pero se ve muy plano, saquemoslo del cuadrado y movamoslo, tipo, a medida que hago scroll se pasa al lado derecho, izuqierdo..." — T3 opened: remove the panel box so the figure floats on the page; the figure travels right/left alternating per chapter (text opposite) with a turn swing during the crossing; phones keep the top pin with a small drift; reduced motion jumps. Route: same writer resumed (context backstop).
- L5 (2026-11-16): T3 delivered. Panel removed and the stage edges masked; the figure travels between page halves per chapter (hero R, 01 L, 02 R, 03 L, 04 R, 05 L) and the text sits opposite, fading at the crossing edges. The swing (+10°, clamped ±27°) applies only on hero → 01; the other crossings use a scale dip and a lift, because the explode needs STORY_ANGLE and the world art is drawn for -21°. Writer checks: build OK (879,947 B, 187,192 gzip); quick audit unchanged (2 existing swaps, 108 out-of-range continuity); line ends 0 in all 5 scenes; 60 fps desktop and 33 fps on a 4× throttled phone; no overflow at 1440/1280/820/390. Parent: build re-run OK at the same size; desktop contact sheet reviewed.
- L6 (2026-11-16): "arreglalos": T4 opened. Hide the long figure caption after the hero, and reframe the desk scene so the rack is not cut at the right edge. Route: same writer resumed (context backstop).
- L7 (2026-11-16): T4 delivered. The caption fades out on hero → 01 and is then hidden (`visibility: hidden`). The desk camera frame now holds the whole rack with an 8 % margin. The mast and uplinks fade out over 03→04 and back in for 05. Writer checks: build OK (879,947 B); line ends 0 at all poses; story-audit passed; no overflow at 1440/390. Parent: build re-run OK; fix contact sheet reviewed. The user chose native scroll over GSAP ("scroll nativo").
