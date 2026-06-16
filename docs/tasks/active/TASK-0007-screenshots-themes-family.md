---
tags: [task]
status: todo          # todo | in-progress | blocked | done
priority: medium      # low | medium | high
created: 2026-06-16
assigned: unassigned  # e.g. claude-code, or a person
---

# TASK-0007 — Screenshots (S7) + Theme Gallery (S8) + Family Sharing (S9)

## Context

The proof-and-belonging stretch: real app screens, the three signature themes (a headline
differentiator), and the co-op family framing. Completes the narrative body for Milestone
**M3 — Full narrative** (P2, dev tasks D-24, D-25, D-26). Depends on [[TASK-0006-features-parent-mode]].

Read first: [[../../features/screenshot-gallery]], [[../../features/theme-gallery]],
[[../../planning/01-strategy#3-story-framework]] (S7–S9),
[[../../planning/03-storyboard-motion-visual]] (S7–S9 storyboard + motion),
[[../../planning/02-architecture#5-1-new-content-models-required]] (`family.ts`).

## Goal

A device-framed screenshot carousel, a live-recoloring three-theme gallery, and a family
"party" section — all responsive and reduced-motion safe.

## Scope

**In scope**
- `sections/Screenshots` (S7): `next/image` device-framed snap carousel from `screenshots.ts`;
  lazy off-screen; captions + meaningful `alt`; arrow/dot nav (desktop), swipe (mobile).
- `sections/ThemeGallery` (S8): segmented control recolors a live preview via **CSS-var swap**
  (no remount) from `themes.ts` (Royal/Warrior/Zen + taglines + palettes).
- `sections/FamilyShare` (S9): party of sprites around a shared timeline from `family.ts`;
  scroll-orchestrated gather (not stagger-up).
- Reduced-motion: carousel auto-advance off (manual only); theme cross-fade instead of sweep;
  family elements appear immediately.

**Out of scope**
- Producing the actual screenshot images / theme art (design track G-05/G-07 provides assets).
- FAQ/waitlist (done in TASK-0004).

## Relevant Files

- `components/sections/Screenshots.tsx`, `ThemeGallery.tsx`, `FamilyShare.tsx` — create.
- `lib/content/screenshots.ts` (`Screenshot[]`), `lib/content/themes.ts` (`AppTheme[]`),
  `lib/content/family.ts` (`FamilyRole[]`) — consume/create.
- `public/screenshots/*`, theme art assets, `public/sprites/*`.

## Acceptance Criteria

- [ ] Carousel: swipe-snap on mobile, arrow/dot nav on desktop; off-screen images lazy-load; every image has `alt`.
- [ ] Theme toggle recolors the preview live via CSS variables without re-mounting; mobile shows themes swipeable/stacked.
- [ ] Family section conveys the co-op "party" framing and shared timeline.
- [ ] Reduced-motion fallbacks all behave per spec; 60fps maintained.
- [ ] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- Theme palettes/taglines must mirror the app exactly (per [[../../features/theme-gallery]]); keep recolor cheap.
- Use `next/image` responsive sizing; device frame is one static overlay asset.
- pnpm only.

## Definition of Done

- [ ] Acceptance criteria all pass.
- [ ] `family.ts` recorded in [[../../architecture/data-flow]] (`updated:` bumped);
      [[../../features/screenshot-gallery]], [[../../features/theme-gallery]] `updated:` bumped.
- [ ] Task file moved from `active/` to `done/`.
</content>
