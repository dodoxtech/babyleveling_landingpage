---
tags: [feature]
status: implemented
updated: 2026-06-16
---

# Depth Pages

> SEO/AEO surface area beyond the home narrative — for visitors and crawlers who land
> mid-funnel, not at the top of the story.

## Overview

Four standalone, crawlable pages that each go deeper on one part of the home narrative and
target one intent-matched keyword cluster (docs/planning/04-seo-aeo.md §9.3):

| Page | Depth on | Primary keyword |
|------|----------|------------------|
| `/features` | S5 Feature Showcase | baby activity tracker app |
| `/rpg-system` | S4 Care → XP loop | parenting RPG app |
| `/parents` | S6 Parent Mode | baby tracker for new parents |
| `/pricing` | S11 Waitlist (no price exists yet) | baby tracker app free |

(`/faq` is documented in [[features/faq]] — it's a standalone mirror of the home FAQ block,
not new content.)

## User Stories

- [x] As a visitor who lands on a depth page from search, I get a complete answer to the
      keyword that brought me here, not a fragment that assumes home-page context.
- [x] As a visitor on any depth page, I can join the waitlist without navigating back to home.
- [x] As a visitor on any depth page, I can see where I am (breadcrumb) and reach the other
      depth pages and home via descriptive links.
- [x] As a search/AI crawler, each page has unique, intent-matched metadata and valid
      `BreadcrumbList` schema.

## UX notes

- Shared chrome (`DepthPageShell`): breadcrumb at the top, the real `<WaitlistSignup />`
  section at the bottom of every page — not a link back to home's waitlist.
- Content reuses the same data home reads (`features`, `loopSteps`, `appModes`, specific
  `faqItems` entries by `id`) so a fact can never disagree between home and its depth-page
  counterpart; each page adds a short paragraph of additional depth-copy beyond the
  card-sized home blurb.
- `/features` section IDs are the `Feature.id` values themselves (`#xp-levels`,
  `#daily-quests`, `#skill-tree`, `#achievements`, `#streaks-buffs`, `#apple-watch`) —
  stable, deep-linkable anchors.
- `/pricing` deliberately does not state a price: pricing isn't decided yet
  (docs/planning/reconciliation-log.md, "Outstanding decisions") — the page states only what
  is actually known (free to join, founder perks, "we'll email you when it's set").
- No motion/WebGL on these pages — they're SSG, content-rich, answer-first surfaces, not
  narrative beats.

## Data

- `/features` ← `lib/content/features.ts` (`Feature[]`).
- `/rpg-system` ← `lib/content/loop.ts` (`LoopStep[]`).
- `/parents` ← `lib/content/modes.ts` (the `parent` `AppMode` entry) + `lib/content/faq.ts`
  (the `data-privacy` entry, by `id`).
- `/pricing` ← `lib/content/faq.ts` (the `free-and-launch` entry, by `id`).
- See [[architecture/data-flow]] ("Depth pages") for why no new content model was needed.

## Related
- [[features/faq]]
- [[features/feature-showcase]]
- [[features/parent-mode]]
- [[architecture/data-flow]]
- [[architecture/modules]]
