---
tags: [feature, legal]
status: implemented
updated: 2026-06-22
---

# Legal Pages

> Trust and platform-compliance pages for parents, app stores, and launch reviewers.

## Overview

BabyLeveling ships two localized legal routes:

| Page | Purpose |
|------|---------|
| `/legal/privacy` | Explains launch-stage local baby-data handling, waitlist email, contact form data, first-party analytics, future optional server backup/sharing, deletion, and children's privacy. |
| `/legal/terms` | Defines website/app terms, iOS/watchOS launch license scope, platform store considerations, local-data responsibilities, acceptable use, medical disclaimer, future payments/ads, IP, and liability limits. |

## UX Notes

- Both pages use the same visual system as the rest of the site: `DepthPageShell`,
  `card-duolingo`, `glass`, rounded token radii, display headings, and the shared footer
  legal links.
- The privacy and terms routes are surfaced in the persistent header and in a compact
  trust panel on the landing page before the final waitlist CTA.
- The pages are content-first and server-rendered. No motion or new runtime dependency is
  introduced.
- Each page includes a sticky desktop side panel that clarifies launch scope, future
  platform expansion, and web coverage, plus a cross-link to the sibling legal page.
- Legal body copy is localized in English, Vietnamese, and Japanese with locale-native
  phrasing rather than literal translation.

## Platform Notes

- Launch references cover iOS, watchOS, local device storage, Apple App Store rules,
  and device permissions. The app does not use Apple HealthKit.
- Android, cross-device sharing, family access, and server backup are described only as
  future optional features that may be added later and would require clear user action
  before baby logs leave the device.
- The free launch version has no ads. Future paid features or ads are described as
  possible later changes, not launch behavior.
- The official contact email for legal/privacy requests is `contact@babyleveling.com`.

## Related

- [[features/faq]]
- [[features/waitlist-signup]]
- [[architecture/modules]]
