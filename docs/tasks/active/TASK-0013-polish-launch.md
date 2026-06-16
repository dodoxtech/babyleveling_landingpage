---
tags: [task]
status: todo          # todo | in-progress | blocked | done
priority: low         # low | medium | high
created: 2026-06-16
assigned: unassigned  # e.g. claude-code, or a person
---

# TASK-0013 — Polish + launch readiness (Milestone M6)

## Context

The award-finishing pass and the go/no-go gate. Adds delight micro-interactions, measurement,
and the final audits before shipping and submitting to Awwwards. Milestone **M6 —
Launch-ready** (P5, dev tasks D-50, D-51, D-52, D-53; marketing M-07, M-08). Depends on the
page being complete and localized ([[TASK-0011-i18n-locales]], [[TASK-0012-content-engine]]).

Read first: [[../../planning/06-execution#20-milestone-plan]] (Definition of Done gate),
[[../../planning/03-storyboard-motion-visual#7-2-micro-interactions]],
[[../../planning/reconciliation-log]] (R-8 — cursor/sound opt-in).

## Goal

A polished, measured, accessible, cross-browser-verified page that passes the full
`design-reviewer` gate and is ready to ship and submit for awards.

## Scope

**In scope**
- Micro-interactions: magnetic CTA + custom cursor (desktop only), opt-in "level-up" success
  sound (muted by default).
- Analytics + event tracking: scroll-depth-to-reveal, CTA clicks, waitlist submit, share.
- CTA copy A/B harness using the variants in [[../../planning/05-copy-multilingual]].
- Final audits: Core Web Vitals + bundle, accessibility (WCAG AA, keyboard, reduced motion,
  screen reader), cross-browser/device QA.
- Awwwards / CSS Design Awards / FWA submission assets (capture reel, thumbnails).

**Out of scope**
- New sections or pages.
- Marketing nurture-email content (marketing track M-02).

## Relevant Files

- `components/ui/*` (cursor, CTA), section files (micro-interactions), analytics provider.
- `lib/analytics.ts` — create; A/B utility.

## Acceptance Criteria

- [ ] Micro-interactions are desktop-only where specified; sound is opt-in and muted by default; all respect reduced motion.
- [ ] Analytics events fire for scroll-to-reveal, CTA clicks, and waitlist submit.
- [ ] CTA A/B harness can serve and measure copy variants.
- [ ] Full audit pass: CWV green, WCAG AA, keyboard + screen-reader operable, works across target browsers/devices.
- [ ] `design-reviewer` returns **PASS** across all five axes (a11y, perf, conversion, story/brand, content).
- [ ] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- This is the final review gate (per [[../../planning/06-execution#definition-of-done-review-gate-applies-to-every-milestone]]); any FAIL loops back to the owning specialist before launch.
- Keep polish affordable — it must not regress the perf budget from [[TASK-0008-motion-perf-hardening]].
- pnpm only.

## Definition of Done

- [ ] Acceptance criteria all pass; record final CWV + audit results in the task notes.
- [ ] Any structural/tooling change reflected in docs; `updated:` bumped.
- [ ] Task file moved from `active/` to `done/`.
</content>
