---
name: frontend-performance
description: >-
  Guards Core Web Vitals and runtime performance for the BabyLeveling landing page — LCP, CLS,
  INP, bundle size, image/font/asset strategy, lazy-loading, and the cost of motion/canvas/WebGL.
  Use when setting performance budgets, optimizing load or scroll smoothness, sizing assets, or
  reviewing whether a motion/visual choice is affordable. Sets budgets the motion-director and
  nextjs-architect must fit. Coordinated by landing-page-orchestrator.
---

# Frontend Performance

## Purpose

Keep the award-winning visuals from costing the user a slow, janky page. An immersive landing
page can still hit excellent Core Web Vitals if assets, JS, and motion are disciplined. This
skill sets the budgets every other build skill must fit within, and optimizes the load and
runtime so the page is fast on a mid-range phone, not just a fast laptop.

## Activation criteria

Activate when:

- Setting or enforcing performance budgets (CWV targets, JS/asset weight).
- Optimizing LCP, CLS, INP, TTFB, or scroll/animation smoothness.
- Deciding image/font/sprite/asset strategy (format, sizing, priority, lazy-loading).
- Reviewing whether a motion/canvas/WebGL or 3D effect is affordable, and how to scope it.
- Diagnosing slowness or jank in a built section/page.

Constrains `motion-director` (motion cost) and `nextjs-architect` (bundle/rendering) and feeds
`design-reviewer` the performance signals.

## Responsibilities

1. **Set budgets.** Concrete targets: LCP < 2.5s, CLS < 0.1, INP < 200ms on mid-tier mobile;
   JS shipped to the client kept lean (set a per-route budget, e.g. < ~100KB gz for interactivity).
2. **Image/asset strategy.** Use `next/image` (AVIF/WebP), correct `sizes`, `priority` on the LCP
   image only; size sprites/theme art; serve responsive variants; compress/optimize PNGs in `public/`.
3. **Font strategy.** `next/font` self-hosting, `font-display: swap`, subset, preload the display face;
   avoid layout shift from font swap (size-adjust).
4. **JS discipline.** Keep Server Components static; lazy/`dynamic()`-load client islands (carousel,
   canvas) below the fold; tree-shake; avoid heavy animation libraries when CSS suffices.
5. **Motion cost review.** Approve only transform/opacity animations on the main path; require
   off-screen pausing for canvas; budget any WebGL strictly and lazy-mount it.
6. **CLS prevention.** Reserve space for images/embeds/fonts; no layout-shifting late content.
7. **Measure.** Recommend Lighthouse/PageSpeed + real-device checks; define the pass thresholds.

## Inputs

- `motion-director` motion spec (what animates, canvas/WebGL asks).
- `nextjs-architect` component/route tree + client-island boundaries.
- `creative-director` asset inventory (sprites, theme art, OG image, fonts).
- Real assets in `public/sprites/` and `public/` to size/optimize.

## Outputs

- **Performance budget**: CWV targets + per-route JS/asset weight limits.
- **Asset optimization plan**: image formats/sizes/priority, font loading, sprite sizing.
- **Loading strategy**: what's eager vs lazy/dynamic, what's deferred below the fold.
- **Motion affordability verdict**: approve/scope-down per effect with the required technique.
- **CLS-prevention notes**: reserved dimensions, font-swap handling.
- **Measurement plan**: tools + pass thresholds for the review gate.

## Quality checklist

- [ ] LCP < 2.5s, CLS < 0.1, INP < 200ms targeted on mid-tier mobile (stated as budgets).
- [ ] Exactly one prioritized LCP image; everything else lazy-loaded; correct `sizes`.
- [ ] Images served as AVIF/WebP via `next/image`; large `public/` PNGs optimized.
- [ ] Fonts self-hosted via `next/font`, subset, `swap`, with size-adjust to avoid CLS.
- [ ] Client JS per route within budget; client islands lazy where below the fold.
- [ ] All approved animations are transform/opacity; canvas pauses off-screen; WebGL strictly scoped.
- [ ] Space reserved for all media/embeds — no late layout shift.
- [ ] A measurement method + pass thresholds are defined for design-reviewer.

## Examples

**Example 1 — Budget statement.**
LCP image = hero wordmark/art (≤ 150KB, `priority`, AVIF). Below-fold sections lazy via
`next/dynamic` for client islands. Per-route client JS budget: ~100KB gz. Particle canvas:
≤ 20KB JS, paused off-screen, disabled under `prefers-reduced-motion`.

**Example 2 — Sprite optimization.**
The 70+ PNGs in `public/sprites/` are decorative/below-fold mostly: lazy-load via `next/image`
with explicit width/height (reserve space → no CLS), AVIF where supported, and only the few
sprites visible above the fold are eager. Don't ship a sprite atlas the page doesn't need.

**Example 3 — Motion affordability verdict.**
Requested hero WebGL "igloo-style" world: scope it to a single lazy-mounted client island,
budget ≤ 80KB, pause on tab blur and off-screen, and ship a static AVIF hero as the LCP so the
WebGL never blocks LCP. If it can't fit, fall back to the CSS particle field. Verdict: approve
scoped, else fall back.
