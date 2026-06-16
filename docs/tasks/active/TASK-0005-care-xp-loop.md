---
tags: [task]
status: todo          # todo | in-progress | blocked | done
priority: medium      # low | medium | high
created: 2026-06-16
assigned: unassigned  # e.g. claude-code, or a person
---

# TASK-0005 — Hero character (S2) + Care→XP loop (S4) + scene continuity

## Context

Bridges the opening cinematic into the proof span: introduce the small hero, then make the
core mechanic legible (real care maps to game rewards). Continuity is key — the XP bar handed
off from the Hero through S2 into the S3 Reveal should feel like one continuous shot. Milestone
**M3 — Full narrative** (P2, dev tasks D-20, D-21, D-28). Depends on [[TASK-0003-hero-reveal]].

Read first: [[../../planning/01-strategy#3-story-framework]] (S2, S4),
[[../../planning/03-storyboard-motion-visual]] (S2/S4 storyboard, §7.1 motion, §7.0 continuity),
[[../../planning/02-architecture#5-1-new-content-models-required]] (`loop.ts`).

## Goal

The hero appears on its island (continuing the R3F scene) with a Level-1 XP bar, and a scrubbed
care→XP loop section explains Feeding=Energy, Sleep=HP, Habits=EXP, Milestone=Achievement.

## Scope

**In scope**
- `sections/HeroCharacter` (S2): continue the R3F scene; sprite hero with idle bob; XP-bar ignite.
- `sections/HowItWorks` (S4): scrubbed step sequence (SVG/canvas-lite, not WebGL) from `loop.ts`;
  reward chips pop with spring + activity sprite icons.
- Wire the shared scroll timeline so the XP bar persists S1→S2→S3 (continuity, D-28).
- Reduced-motion fallbacks: static hero still; loop steps appear immediately.

**Out of scope**
- A third WebGL scene (loop is 2D — keep WebGL to Hero/Reveal only, per R-1).
- Feature grid / Parent Mode (TASK-0006).

## Relevant Files

- `components/sections/HeroCharacter.tsx`, `components/sections/HowItWorks.tsx` — create.
- `lib/content/loop.ts` — consume (`LoopStep[]`: realAction → gameReward + icon).
- `public/sprites/icon/*`, `public/sprites/baby*/...` — sprite assets.

## Acceptance Criteria

- [ ] Hero sprite renders on the island continuing the Hero scene (no hard cut between S1/S2/S3).
- [ ] XP bar visually persists and advances across S1→S2→S3.
- [ ] Loop section scrubs through all four mappings with sprite icons; 60fps on mid-tier mobile.
- [ ] Reduced-motion: static composition; loop steps shown without entrance animation.
- [ ] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- Animate transform/opacity only; reuse the IntersectionObserver pause from TASK-0003.
- pnpm only; tokens/storyboard are source of truth.

## Definition of Done

- [ ] Acceptance criteria all pass.
- [ ] `loop.ts` model recorded in [[../../architecture/data-flow]] (`updated:` bumped); new
      modules in [[../../architecture/modules]].
- [ ] Task file moved from `active/` to `done/`.
</content>
