---
tags: [feature]
status: implemented
updated: 2026-06-18
---

# Full Screen Scroll Snap Story

## Overview

The landing page now behaves like a guided product story on desktop. Major home sections
snap vertically into focused viewport panels while preserving native browser scrolling,
anchor links, and normal back/forward behavior.

Mobile keeps standard comfortable page scrolling so visitors do not feel trapped while
reading or swiping through the phone demo.

## UX Notes

- Desktop uses native CSS proximity snap on the page, with `scroll-padding-top` matching
  the fixed `4.5rem` header. This keeps the story-panel feel without a hard scroll lock.
- Story sections use viewport-relative `min-height` instead of fixed height so short laptop
  screens can still reach all content.
- A subtle right-side chapter rail appears on desktop and highlights the active story panel.
- Active panels settle with soft transform and opacity only; layout properties are not
  animated.
- FAQ and legal trust content remain calmer because they are trust and decision-support
  sections.
- Reduced-motion mode disables the story entrance choreography and forced snap behavior.

## Implementation

- `app/[locale]/page.tsx` defines the story chapter order and mounts
  `StoryProgress`.
- `components/sections/StoryProgress.client.tsx` uses `IntersectionObserver` to mark the
  active panel and update the chapter rail.
- `app/globals.css` owns snap layout, active-panel settling, mobile fallback, and reduced
  motion behavior.

## Related

- [[features/hero-section]]
- [[features/screenshot-gallery]]
- [[features/theme-gallery]]
- [[features/waitlist-signup]]
- [[architecture/modules]]
