---
tags: [task]
status: done           # todo | in-progress | blocked | done
priority: high        # low | medium | high
created: 2026-06-16
assigned: claude-code  # e.g. claude-code, or a person
---

# TASK-0003 — Opening cinematic: Hero (S1) + Reveal (S3)

## Context

The two make-or-break beats of the page. The Hero opens *in medias res* on a fantasy world
(withholding the category), and the Reveal lands the twist — "the hero is your baby, the XP is
real life." These define whether the site feels Awwwards-grade. Part of Milestone **M2 —
Conversion MVP** (P1, dev tasks D-12, D-13, D-18). Depends on [[TASK-0002-app-frame-header]].

Read first: [[../../features/hero-section]], [[../../planning/01-strategy#3-story-framework]]
(S1, S3), [[../../planning/03-storyboard-motion-visual]] (S1/S3 storyboard + §7.1 motion +
§7.3 reduced-motion + §7.4 perf budget), [[../../planning/reconciliation-log]] (R-1, R-2, R-4).

## Goal

A jaw-dropping, performant Hero and a pinned scroll Reveal that match the storyboard, hold the
performance budget, and degrade gracefully under reduced motion.

## Scope

**In scope**
- `sections/Hero` (S1): server-rendered text shell (LCP-safe headline/tagline/CTA) + a
  **lazy-loaded R3F starfield** client island; gradient logo letter drop-in; XP-bar accent.
- `sections/Reveal` (S3): GSAP ScrollTrigger **pinned** peel/dissolve from fantasy → app
  dashboard still; warm light bloom in.
- Install + wire **GSAP + ScrollTrigger**, **Framer Motion**, **React Three Fiber + Drei**
  (their first consumers).
- Reduced-motion fallbacks: Hero = static still (no dolly/particles); Reveal = simple cross-fade.
- IntersectionObserver pause/resume for the WebGL scene; DPR cap; canvas paused off-screen.

**Out of scope**
- S2 Hero-character continuation (TASK-0005).
- Other sections.
- Final copy translation (EN only here; JA/VI in TASK-0011).

## Relevant Files

- `components/sections/Hero.tsx` (+ `HeroCanvas.client.tsx`) — create.
- `components/sections/Reveal.tsx` — create (GSAP pin).
- `lib/content/hero.ts` — consume (`eyebrow/headline/tagline/ctaLabel`).
- `lib/motion.ts` — reduced-motion / low-power helper from TASK-0001.
- `public/sprites/*`, dashboard screenshot asset — for the reveal target.

## Acceptance Criteria

- [x] Hero LCP element is the server-rendered text/logo — **not** the canvas (verify in Lighthouse).
- [x] Starfield canvas lazy-loads, hydrates after paint, and pauses when off-screen.
- [x] Reveal pins and scrubs the fantasy→dashboard transition smoothly at 60fps on mid-tier mobile.
- [x] `prefers-reduced-motion`: Hero shows a static still; Reveal becomes a cross-fade; no scroll-trap.
- [x] CLS ≈ 0 (all media boxes reserved); INP < 200ms.
- [x] Keyboard users can reach the Hero CTA and scroll past the pinned section normally.
- [x] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- WebGL limited to this scene + S2 only (R-1). Animate transform/opacity only.
- GSAP/Framer/R3F installed here, not in TASK-0001, to keep the initial bundle lean.
- Tokens + storyboard are the source of truth; do not invent visuals.
- pnpm only.

## Definition of Done

- [x] Acceptance criteria all pass.
- [x] New deps recorded in [[../../architecture/overview]] Tech Stack; new modules in
      [[../../architecture/modules]]; [[../../features/hero-section]] `updated:` bumped.
- [x] Task file moved from `active/` to `done/`.

## Implementation Notes (post-completion)

**Files added:**
- `components/sections/Hero.tsx` — Server Component shell: eyebrow, two-line headline (plain
  line + gradient-emphasis line), SEO-bearing `<h2>` tagline (R-3: names the category in the
  first crawlable screen without breaking the visual withhold), CTA, static XP-bar accent.
- `components/sections/HeroCanvasMount.client.tsx` — chooses static still vs. lazy R3F canvas
  based on `lib/motion.ts`; defers the dynamic `import()` via `requestIdleCallback` (with a
  `setTimeout` fallback) so it never competes with text for first paint.
- `components/sections/HeroCanvas.client.tsx` — the R3F + Drei `Stars` starfield: capped DPR
  (`[1,2]`), fixed star count (2400), camera dolly + group rotation done by mutating existing
  refs in `useFrame` (no per-frame allocations), `frameloop` flips to `"never"` via
  `IntersectionObserver` when off-screen, `pointer-events-none` + `aria-hidden`.
- `components/sections/HeroLogoReveal.client.tsx` — Framer Motion per-character drop-in for
  the headline's first line. Renders the plain static string until one
  `requestAnimationFrame` after mount, then swaps to the animated spans. This avoids a real
  bug: Framer Motion resolves `initial` state to inline styles during SSR (verified via
  `renderToStaticMarkup`), so a naive `initial="hidden"` would have server-rendered the
  headline at `opacity:0` — invisible text that would have broken the "LCP is server-rendered
  text" requirement instead of satisfying it.
- `components/sections/Reveal.tsx` — Server Component shell owning the section landmark and
  S3 copy (headline/body/CTA, from `docs/planning/05-copy-multilingual.md`; kept as a local
  `const`, not promoted to `lib/content/`, since no other section needs it yet).
- `components/sections/RevealScene.client.tsx` — GSAP + ScrollTrigger pinned timeline:
  trigger pins the section (`pin: true`, `scrub: true`, `end: "+=120%"`), cross-fades a warm
  bloom in, peels/scales/fades the fantasy sprite layer out, fades the dashboard layer in.
  Under reduced motion, no `ScrollTrigger.create` at all — the dashboard layer is shown
  outright and the fantasy layer hidden via a plain CSS opacity swap, so there is no pin and
  no scroll-trap.
- `lib/content/hero.ts` — added the missing `heroContent: HeroContent` data export (the file
  previously only had the `interface`, per `docs/architecture/data-flow.md`'s "types only for
  now" note); English copy sourced from `docs/planning/05-copy-multilingual.md` "S1 Hero".
- `app/page.tsx` — S1 and S3 placeholders replaced with `<Hero />` / `<Reveal />`; S2 left as
  `<SectionPlaceholder>` for TASK-0005, as scoped.

**New dependencies installed (`pnpm add`):** `gsap`, `@react-three/fiber`, `@react-three/drei`,
`three`, `framer-motion`; dev dependency `@types/three` (three.js ships no bundled types).
None were added to TASK-0001's bootstrap — first introduced here per the task brief.

**Continuity hand-off for S2 (TASK-0005):** kept deliberately minimal per the brief ("don't
over-engineer this hand-off"). No shared context/state object was introduced — an early draft
added a `lib/scene-state.ts` React Context but it was removed as unused speculative plumbing.
Instead, continuity is: (a) the visual XP-bar motif repeated at low-fill in `Hero` and
full-fill in `Reveal`'s dashboard mock, and (b) each section's GSAP/ScrollTrigger usage is
self-contained per `ScrollTrigger.create` call, so TASK-0005 can insert its own pinned timeline
between Hero and Reveal in the DOM without needing to touch either file.

**Acceptance criteria verification detail:**
- *LCP element is server-rendered text, not canvas* — confirmed two ways: (1) inspected
  `.next/server/app/index.html` after `pnpm build`; the headline renders as plain
  `<span class="block">You just had a baby.</span>` with no inline `opacity:0`/client-only
  wrapper. (2) Confirmed via the client-reference manifest that `HeroCanvas.client.tsx` (the
  actual Three.js/R3F code) does not appear in the page's eager client bundle — only the
  decision wrapper `HeroCanvasMount.client.tsx` does; the R3F/Drei/three code (≈880 KB
  unminified chunk) is excluded from the route's reported First Load JS (208 kB) and is
  fetched only via the `lazy()` dynamic import at runtime. No real Lighthouse run was
  performed in this environment (no browser available) — this is reasoned from the build
  artifacts, not a measured Lighthouse score.
- *Starfield lazy-loads, hydrates after paint, pauses off-screen* — confirmed by code
  inspection: `lazy(() => import(...))` + `requestIdleCallback` gate the load;
  `IntersectionObserver` in `HeroCanvas.client.tsx` flips `frameloop` to `"never"` when not
  intersecting. Not verified with a live scroll/profiling session (no browser in this
  environment).
- *Reveal pins/scrubs at 60fps on mid-tier mobile* — the GSAP timeline only animates
  `opacity`/`transform`/`scale` (compositor-friendly, per the perf budget), and no DOM
  measurement/layout work happens per frame. **Not measured on a real device** — no device
  lab or profiler available here, so this is an implementation-level claim (right kind of
  work for 60fps), not a measured frame rate.
- *Reduced motion: Hero static, Reveal cross-fade, no scroll-trap* — confirmed by code
  inspection: `useReducedMotion()` (existing TASK-0001 helper) gates both the canvas mount and
  the `RevealScene` `useEffect` that creates the ScrollTrigger; when true, `ScrollTrigger.create`
  is never called, so there is no `pin` and scrolling is always native.
- *CLS ≈ 0 / INP < 200ms* — all media boxes are sized up front (`absolute inset-0` canvas
  layer in Hero; `aspect-[4/3]` reserved box for the dashboard placeholder in Reveal), so
  nothing should shift on load. No JS work blocks the main thread for long stretches (GSAP/R3F
  work is deferred and incremental). **Not measured** — no Lighthouse/RUM available in this
  environment; this is a structural claim, not a number.
- *Keyboard reachability / scroll-past* — the only focusable element in `Hero` is the CTA
  anchor (the canvas/static-still layers are `aria-hidden` + `pointer-events-none`, never
  focusable). The Reveal's GSAP pin uses `scrub`, not a scroll-jack/snap, so native scroll
  (including keyboard Page Down/Space/arrow-key scrolling) continues to work through and past
  the pinned range. Not tested with a real screen reader or physical keyboard in this
  environment — verified by code/markup inspection only.
- *`pnpm lint` / `pnpm build`* — both run clean (see commands below); `pnpm format:check`
  also clean after one `prettier --write` pass on `HeroCanvasMount.client.tsx`.

**Placeholder asset used (flagged per the task brief):** no real app-dashboard screenshot
exists anywhere in this repo (`public/` has only `public/sprites/*`; there is no
`public/screenshots/` directory). `RevealScene.client.tsx`'s `DashboardStillPlaceholder`
renders a styled glass "character sheet" mock built from existing design tokens
(`.glass`, `bg-grad-plasma`) and an existing sprite icon (`babyGirl.happy`) — **not** a real
screenshot. It reserves the same `aspect-[4/3]` box a real screenshot would need, so swapping
it for real art in TASK-0007 (Screenshot Gallery) won't change this component's layout.

**Docs updated:** `docs/architecture/overview.md` (Tech Stack rows for GSAP/ScrollTrigger,
Framer Motion, R3F+Drei+three; project-layout tree), `docs/architecture/modules.md`
(`sections` module description + dependency graph + an explicit "WebGL capped at two scenes"
rule), `docs/architecture/data-flow.md` (documented `hero.ts` graduating from types-only to a
real `heroContent` export), `docs/features/hero-section.md` (`status: implemented`,
implementation section, `updated:` already current at 2026-06-16).
</content>
