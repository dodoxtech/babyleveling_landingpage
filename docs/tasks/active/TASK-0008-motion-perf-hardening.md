---
tags: [task]
status: todo          # todo | in-progress | blocked | done
priority: high        # low | medium | high
created: 2026-06-16
assigned: unassigned  # e.g. claude-code, or a person
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
- [ ] Scroll holds ~60fps on a mid-tier mobile device/throttled profile through the whole page.
- [ ] WebGL scenes pause when off-screen and are absent under reduced motion / low power.
- [ ] No animation of layout properties; no scroll-driven layout thrash.
- [ ] Heavy motion libs are code-split (not in the initial/above-the-fold bundle).
- [ ] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- WebGL capped at 2 scenes total (R-1); the Hero LCP must remain text/logo (R-2).
- This task is the performance half of the `design-reviewer` PASS gate for M3.
- pnpm only.

## Definition of Done

- [ ] Acceptance criteria all pass; record measured CWV numbers in the task notes.
- [ ] Any perf-driven structural change reflected in [[../../architecture/overview]] / `updated:` bumped.
- [ ] Task file moved from `active/` to `done/`.
</content>
