---
tags: [task]
status: done
priority: high
created: 2026-06-18
assigned: unassigned
---

# TASK-0017 - Screenshot Horizontal Phone Demo

## Context

The current S7 screenshot gallery is functional, but it still reads like a small carousel
with simplified phone cards. The next design pass should make this section feel like a
premium product demo: realistic phone hardware, large inspectable app previews, and a
horizontal browsing experience that feels natural on desktop and mobile.

Relevant docs:
- [[features/screenshot-gallery]]
- [[features/feature-showcase]]
- [[features/theme-gallery]]
- [[architecture/modules]]
- [[architecture/data-flow]]

## Goal

Redesign the Screenshots section into a horizontal product-demo section where visitors can
scroll or swipe through realistic BabyLeveling phone screens.

The phone previews should feel more like real iPhone demo hardware and less like generic
rounded rectangles.

## Scope

**In scope**
- Redesign `Screenshots.tsx` layout around a horizontal product-demo experience.
- Redesign `ScreenshotsCarousel.client.tsx` into a polished horizontal scroll / snap track.
- Create a more realistic phone frame with visible device details such as bezel, Dynamic
  Island, side buttons, glass/screen depth, and subtle reflection.
- Improve each demo screen so it looks like a plausible BabyLeveling app screen:
  dashboard / character sheet, quest log, skill tree or milestones, trophy room.
- Preserve accessible alt text and captions from `lib/content/screenshots.ts`.
- Keep manual controls for browsing, such as arrows, progress indicators, or equivalent
  affordances.
- Support mobile swipe, desktop horizontal browsing, keyboard operation, and reduced motion.
- Update [[features/screenshot-gallery]] and bump its `updated:` date.

**Out of scope**
- Creating final production app screenshots outside the website codebase.
- Changing the route structure, header navigation, footer navigation, or waitlist flow.
- Adding a new animation library or a new UI component system.
- Reworking unrelated sections such as Hero, Feature Showcase, Theme Gallery, or FAQ.

## Relevant Files

- `components/sections/Screenshots.tsx` - section wrapper, heading, layout, background.
- `components/sections/ScreenshotsCarousel.client.tsx` - interactive horizontal track,
  phone frame, controls, active state.
- `lib/content/screenshots.ts` - screenshot manifest, alt text, captions.
- `docs/features/screenshot-gallery.md` - feature documentation to update.
- `app/[locale]/page.tsx` - confirms where S7 sits in the landing-page sequence.
- `app/globals.css` - only if small shared token or utility additions are justified.

## Acceptance Criteria

- [x] S7 is redesigned as a horizontal scroll / snap product-demo section.
- [x] Desktop users can browse all phone previews horizontally without layout overflow.
- [x] Mobile users can swipe one phone preview at a time with clean snap behavior.
- [x] The phone frame looks realistic enough to read as device hardware, including a
      Dynamic Island or equivalent top sensor area, bezel depth, and screen glass treatment.
- [x] Each demo screen looks like a real BabyLeveling app screen, not a placeholder card.
- [x] Captions remain visible and every preview has meaningful accessible text.
- [x] Arrow/progress controls, if present, have accessible labels and disabled/current states.
- [x] Keyboard navigation works for moving between previews or focusing each preview.
- [x] Reduced-motion users do not get forced smooth/animated motion.
- [x] No text, controls, or phone frames overlap at common desktop, tablet, and mobile widths.
- [x] `docs/features/screenshot-gallery.md` is updated and its `updated:` date is bumped.
- [x] `pnpm lint` succeeds with no errors.
- [x] `pnpm build` succeeds with no errors.

## Technical Notes

- Use the existing Next.js App Router + TypeScript + Tailwind setup. Do not introduce a new
  package unless there is a strong reason and the docs are updated accordingly.
- Prefer CSS scroll snap and native horizontal overflow for the core interaction. Use client
  JavaScript only for active state, controls, and keyboard ergonomics.
- Keep animations on `transform` and `opacity`; respect reduced motion.
- Keep the section consistent with the existing BabyLeveling visual system:
  `font-display`, token colors, `card-duolingo`, `glass`, and the established rounded
  radius scale.
- Avoid a tiny fake-phone treatment. The main product proof should be large enough for a
  parent to inspect the app UI.
- If actual screenshot PNGs are still unavailable, render high-fidelity demo screens from
  existing assets and content, but keep the structure ready to swap to real images later.

## Definition of Done

- [x] Acceptance criteria all pass.
- [x] Affected docs updated and `updated:` date bumped.
- [x] Implementation verified locally on the landing page.
- [x] Task file moved from `active/` to `done/`.
