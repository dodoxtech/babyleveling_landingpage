---
tags: [task]
status: done           # todo | in-progress | blocked | done
priority: medium      # low | medium | high
created: 2026-06-16
assigned: claude-code  # e.g. claude-code, or a person
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

- [x] Carousel: swipe-snap on mobile, arrow/dot nav on desktop; off-screen images lazy-load; every image has `alt`.
      No real screenshot PNGs exist (out of scope, see above), so slides render a styled
      mock per screen with `role="img" aria-label"` instead of `next/image`/`alt` — the
      carousel mechanics are real and ready to take real `<Image>` slides once assets land
      (see `lib/content/screenshots.ts` and `ScreenshotsCarousel.client.tsx`).
- [x] Theme toggle recolors the preview live via CSS variables without re-mounting; mobile shows themes swipeable/stacked.
- [x] Family section conveys the co-op "party" framing and shared timeline.
- [x] Reduced-motion fallbacks all behave per spec; 60fps maintained.
- [x] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- Theme palettes/taglines must mirror the app exactly (per [[../../features/theme-gallery]]); keep recolor cheap.
- Use `next/image` responsive sizing; device frame is one static overlay asset. (Deferred
  per the note above — device frame is a CSS overlay now, swappable for real `next/image`
  slides without a carousel rewrite.)
- pnpm only.

## Definition of Done

- [x] Acceptance criteria all pass.
- [x] `family.ts` recorded in [[../../architecture/data-flow]] (`updated:` bumped);
      [[../../features/screenshot-gallery]], [[../../features/theme-gallery]] `updated:` bumped.
- [x] Task file moved from `active/` to `done/`.
</content>
