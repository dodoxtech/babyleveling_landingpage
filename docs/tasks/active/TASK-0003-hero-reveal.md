---
tags: [task]
status: todo          # todo | in-progress | blocked | done
priority: high        # low | medium | high
created: 2026-06-16
assigned: unassigned  # e.g. claude-code, or a person
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

- [ ] Hero LCP element is the server-rendered text/logo — **not** the canvas (verify in Lighthouse).
- [ ] Starfield canvas lazy-loads, hydrates after paint, and pauses when off-screen.
- [ ] Reveal pins and scrubs the fantasy→dashboard transition smoothly at 60fps on mid-tier mobile.
- [ ] `prefers-reduced-motion`: Hero shows a static still; Reveal becomes a cross-fade; no scroll-trap.
- [ ] CLS ≈ 0 (all media boxes reserved); INP < 200ms.
- [ ] Keyboard users can reach the Hero CTA and scroll past the pinned section normally.
- [ ] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- WebGL limited to this scene + S2 only (R-1). Animate transform/opacity only.
- GSAP/Framer/R3F installed here, not in TASK-0001, to keep the initial bundle lean.
- Tokens + storyboard are the source of truth; do not invent visuals.
- pnpm only.

## Definition of Done

- [ ] Acceptance criteria all pass.
- [ ] New deps recorded in [[../../architecture/overview]] Tech Stack; new modules in
      [[../../architecture/modules]]; [[../../features/hero-section]] `updated:` bumped.
- [ ] Task file moved from `active/` to `done/`.
</content>
