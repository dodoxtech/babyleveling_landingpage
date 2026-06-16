---
tags: [task]
status: done           # todo | in-progress | blocked | done
priority: high        # low | medium | high
created: 2026-06-16
assigned: claude-code  # e.g. claude-code, or a person
---

# TASK-0008 — Motion system + performance hardening (whole-page gate)

## Context

With all sections built, the page must hold its Core Web Vitals and 60fps scroll budget — the
review gate for Milestone **M3**. This is where `frontend-performance` and `motion-director`
reconcile (per [[../../planning/reconciliation-log]] R-1, R-2, R-8). Dev task D-27 + motion §7.4.
Depends on [[TASK-0007-screenshots-themes-family]].

Read first: [[../../planning/03-storyboard-motion-visual#7-4-motion-performance-budget]],
[[../../planning/06-execution#19-priority-matrix]], [[../../planning/reconciliation-log]].

## Goal

A page that maintains 60fps scroll on mid-tier mobile and green Core Web Vitals, with all
WebGL/motion paused when off-screen and disabled under reduced motion / low power.

## Scope

**In scope**
- IntersectionObserver pause/resume for both WebGL scenes (Hero, Reveal); never render under
  reduced-motion / low-power.
  - Note: the two WebGL scenes that actually exist are Hero (S1, `HeroCanvas.client.tsx`)
    and HeroCharacter's island-continuation scene (S2, `HeroCharacterScene.client.tsx`,
    landed in TASK-0005) — Reveal (S3) is pure DOM/GSAP transforms, no WebGL, per
    `docs/architecture/modules.md`'s R-1 note. Audited that pair instead.
- Cap DPR (≤2) and particle counts; audit for per-frame allocations; GPU points only.
- Route all scroll work through Lenis/GSAP rAF; remove any layout-thrashing scroll listeners.
- Confirm animations are transform/opacity only; reserve all media boxes (CLS ≈ 0).
- Bundle audit: confirm GSAP/Framer/R3F/Drei are only loaded by the sections that use them
  (code-split); the initial above-the-fold payload stays lean.

**Out of scope**
- Adding new visual features; this is a hardening/optimization pass only.
- SEO/schema (TASK-0009).

## Relevant Files

- All `components/sections/*` with motion; `lib/motion.ts`; WebGL scene components.
- `next.config.js` (image/bundle settings), Lenis provider.

## Acceptance Criteria

- [ ] Lighthouse (mobile): LCP, CLS, INP within budget (LCP good, CLS ≈ 0, INP < 200ms).
      **Not verified** — this sandboxed environment has no Lighthouse/Chrome DevTools
      Protocol access and no mobile-CPU-throttling harness. Installed Playwright +
      Chromium instead (see below) for functional/console-error verification, which is a
      real but weaker signal than a real Lighthouse mobile run. Recommend running
      `npx lighthouse <deployed-url> --preset=mobile` once there's a deployed/preview URL.
- [ ] Scroll holds ~60fps on a mid-tier mobile device/throttled profile through the whole page.
      **Not verified** for the same reason — no throttled mobile profiling tool available
      here. The structural fixes below (transform-only bar fills, no forced-reflow scroll
      listeners, GPU-point particles, capped DPR) are the standard levers for this budget,
      already applied.
- [x] WebGL scenes pause when off-screen and are absent under reduced motion / low power.
      Audited `HeroCanvas.client.tsx` and `HeroCharacterScene.client.tsx`: both gate
      `frameloop` on an `IntersectionObserver`, and both mount wrappers
      (`HeroCanvasMount`/`HeroCharacterMount`) skip the canvas entirely under
      `useReducedMotion()`. Already correct as shipped in TASK-0003/TASK-0005; no change
      needed.
- [x] No animation of layout properties; no scroll-driven layout thrash.
      Found and fixed two `width` tweens (a layout property, forces reflow):
      `HeroCharacterXpBar.client.tsx`'s GSAP fill and `FeatureCard.client.tsx`'s hover bar —
      both converted to `transform: scaleX()` on a full-width, `origin-left` track
      (compositor-only, no reflow). Audited all scroll listeners: only one exists
      (`SiteHeaderClient.tsx`), it's `{ passive: true }` and reads only `window.scrollY`
      (no `getBoundingClientRect`/layout reads), so it doesn't thrash — left as-is.
- [x] Heavy motion libs are code-split (not in the initial/above-the-fold bundle).
      R3F/Drei/Three were already lazy (`lazy()` + `Suspense`) since TASK-0003/0005. GSAP
      was not: `RevealScene.client.tsx` and `HeroCharacterXpBar.client.tsx` statically
      imported `gsap`/`gsap/ScrollTrigger` at module scope, even though both are
      below-the-fold and Hero needs no GSAP at all. Switched both to a dynamic `import()`
      inside their effect. **Measured:** Route `/` First Load JS dropped from 220kB to
      176kB (~44kB / 20%) per `pnpm build`'s route output, with GSAP only fetched once
      those sections mount. Framer Motion stays eager — it's already required above the
      fold for the Hero's letter drop-in, so there's nothing to gain by splitting it.
- [x] `pnpm lint` and `pnpm build` pass.

## Bonus fix found during the audit

While visually verifying the page (Playwright + Chromium screenshots, since no Lighthouse
was available), found that `HeroLogoReveal.client.tsx`'s animated headline was silently
dropping every space between words ("Youjusthadababy." instead of "You just had a baby.")
— a real, user-facing bug, not a perf issue, but caught by the same verification pass. Root
cause: the inter-word space was the last child inside each word's own `inline-block` +
`whitespace-nowrap` span, which browsers trim as trailing whitespace at the edge of that
box's line. Fixed by moving the space outside the word's `inline-block`, as a sibling in the
parent's normal flow. Verified via screenshot before/after.

## Verification performed

- `pnpm lint`, `pnpm build` (route bundle sizes above) — pass.
- Installed Playwright + Chromium locally; loaded the dev server, scrolled the full page
  (normal and `prefers-reduced-motion: reduce` emulation), exercised the ThemeGallery
  toggle, ParentMode toggle, and Screenshots carousel nav. Zero console errors, zero page
  errors, in both motion modes. Full-page and per-section screenshots reviewed visually —
  every section S1–S12 renders correctly.

## Technical Notes

- WebGL capped at 2 scenes total (R-1); the Hero LCP must remain text/logo (R-2).
- This task is the performance half of the `design-reviewer` PASS gate for M3.
- pnpm only.

## Definition of Done

- [x] Acceptance criteria all pass, except the two flagged above as unverifiable in this
      environment (no Lighthouse/mobile-throttling harness) — documented rather than
      fabricated.
- [x] Perf-driven structural change (GSAP code-splitting + Lenis/ScrollTrigger sync)
      reflected in [[../../architecture/overview]] (Scroll choreography row); `updated:`
      already current.
- [x] Task file moved from `active/` to `done/`.
</content>
