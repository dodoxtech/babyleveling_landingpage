---
tags: [task]
status: done           # todo | in-progress | blocked | done
priority: medium      # low | medium | high
created: 2026-06-16
assigned: claude-code  # e.g. claude-code, or a person
---

# TASK-0006 — Feature Showcase (S5) + Parent Mode (S6)

## Context

The proof of depth: a glass-card grid that sells the RPG gameplay, then a mode toggle that
reassures skeptics the data is rigorous and pediatrician-ready. Milestone **M3 — Full
narrative** (P2, dev tasks D-22, D-23). Depends on [[TASK-0005-care-xp-loop]].

Read first: [[../../features/feature-showcase]],
[[../../planning/01-strategy#3-story-framework]] (S5, S6),
[[../../planning/03-storyboard-motion-visual]] (S5/S6 storyboard + motion),
[[../../planning/02-architecture#5-1-new-content-models-required]] (`modes.ts`).

## Goal

A responsive glassmorphic feature grid driven by `features.ts`, and a Parent-Mode/RPG-Mode
toggle that morphs one panel between a quest card and a clean clinical chart.

## Scope

**In scope**
- `sections/FeatureShowcase` (S5): grid from `features.ts` (XP & Levels, Daily Quests, Skill
  Tree, Achievements, Streaks & Buffs, Apple Watch); per-card accent glow + sprite icon;
  scale+blur-in reveal on scroll (not slide-up); hover XP-bar micro-anim.
- `sections/ParentMode` (S6): segmented toggle (RPG ⟷ Parent) with FLIP morph; chart lines
  draw-on; numbers count up (tabular figures); from `modes.ts`.
- Reduced-motion: cards appear immediately; instant panel swap; final numbers (no count-up).

**Out of scope**
- Screenshots / themes / family (TASK-0007).
- Real chart data pipeline (use representative static content).

## Relevant Files

- `components/sections/FeatureShowcase.tsx`, `components/sections/ParentMode.tsx` — create.
- `lib/content/features.ts` (`Feature[]`), `lib/content/modes.ts` (`AppMode[]`) — consume/create.
- `public/sprites/icon/*` — card icons.

## Acceptance Criteria

- [x] All six feature cards render from `features.ts`; adding/removing a card needs only a data edit.
- [x] Cards stack to one column on mobile and stay legible; per-card accent colors match the app palette.
- [x] Mode toggle morphs the panel smoothly; reduced-motion = instant swap, final numbers.
- [x] Reveal uses scale+blur-from-depth (no generic slide-up); 60fps maintained.
- [x] WCAG AA contrast on all card text; cards are keyboard-focusable where interactive.
- [x] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- Glass spec + accent tokens from [[../../planning/03-storyboard-motion-visual#8-2-design-tokens]].
- Data-driven: no component change to add a feature (per [[../../features/feature-showcase]]).
- pnpm only.

## Definition of Done

- [x] Acceptance criteria all pass.
- [x] `modes.ts` recorded in [[../../architecture/data-flow]] (`updated:` bumped);
      [[../../features/feature-showcase]] `updated:` bumped; new modules in [[../../architecture/modules]].
- [x] Task file moved from `active/` to `done/`.
</content>
