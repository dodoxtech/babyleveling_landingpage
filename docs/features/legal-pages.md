---
tags: [feature, legal]
status: implemented
updated: 2026-06-18
---

# Legal Pages

> Trust and platform-compliance pages for parents, app stores, and launch reviewers.

## Overview

BabyLeveling ships two localized legal routes:

| Page | Purpose |
|------|---------|
| `/legal/privacy` | Explains baby-data handling, device storage, optional cloud sync, waitlist email, family sharing, deletion, and children's privacy. |
| `/legal/terms` | Defines website/app terms, license scope, Apple App Store and Google Play considerations, acceptable use, medical disclaimer, payments, IP, and liability limits. |

## UX Notes

- Both pages use the same visual system as the rest of the site: `DepthPageShell`,
  `card-duolingo`, `glass`, rounded token radii, display headings, and the shared footer
  legal links.
- The privacy and terms routes are surfaced in the persistent header and in a compact
  trust panel on the landing page before the final waitlist CTA.
- The pages are content-first and server-rendered. No motion or new runtime dependency is
  introduced.
- Each page includes a sticky desktop side panel that clarifies Apple, Android, and web
  coverage, plus a cross-link to the sibling legal page.
- Legal body copy is currently English-first while the page title, breadcrumb, last-updated
  label, nav, and footer continue to use the locale dictionary.

## Platform Notes

- Apple references cover iOS, watchOS, iCloud, App Store purchases, subscriptions, refunds,
  and device permissions.
- Android references cover Android permissions, Google Play, Google Play Billing, refunds,
  subscriptions, and device backup or sync where available.
- The Terms page states that Apple and Google platform terms may also apply, but that
  BabyLeveling remains responsible for its own website, waitlist, and app support.

## Related

- [[features/faq]]
- [[features/waitlist-signup]]
- [[architecture/modules]]
