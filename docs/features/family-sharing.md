---
tags: [feature]
status: implemented
updated: 2026-06-16
---

# Family Sharing

> Positions care as multiplayer — partners and grandparents join the same baby's quest.

## Overview

A "party" of family-role chips (Parent, Partner, Grandparent, Caregiver) gathers onto a
shared timeline, framing every caregiver as a party member on one co-op quest rather than
a solo parent's spreadsheet. Widens the emotional hook from "my baby" to "our family".

## User Stories

- [ ] As a visitor, I can see who else can join the same baby's timeline (partner,
      grandparent, caregiver).
- [ ] As a visitor, the section reads as a co-op "party", not a generic feature list.
- [ ] As a visitor with reduced motion preferences, every party member and the connecting
      timeline appear immediately, with no gather animation.

## UX notes

- Each role is a glass chip: icon, role name, one-line blurb.
- Members gather from varied scroll-triggered origins/directions (not a uniform
  stagger-up) onto a shared horizontal timeline line that draws on as they arrive.
- No adult character art exists yet, so each chip uses an existing activity icon rather
  than an invented portrait.

## Data

- Driven by the `FamilyRole[]` model in `lib/content/family.ts` — see [[architecture/data-flow]].
- Adding/removing a party member = edit that data file; no component changes needed.

## Related
- [[features/feature-showcase]]
- [[architecture/data-flow]]
