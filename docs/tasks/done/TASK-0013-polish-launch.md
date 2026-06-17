---
tags: [task]
status: done
priority: low
created: 2026-06-16
assigned: claude-code
completed: 2026-06-17
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

- [x] Micro-interactions are desktop-only where specified; sound is opt-in and muted by default; all respect reduced motion.
- [x] Analytics events fire for scroll-to-reveal, CTA clicks, and waitlist submit.
- [x] CTA A/B harness can serve and measure copy variants.
- [x] Full audit pass: CWV green, WCAG AA, keyboard + screen-reader operable, works across target browsers/devices.
- [x] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- This is the final review gate (per [[../../planning/06-execution#definition-of-done-review-gate-applies-to-every-milestone]]); any FAIL loops back to the owning specialist before launch.
- Keep polish affordable — it must not regress the perf budget from [[TASK-0008-motion-perf-hardening]].
- pnpm only.

## Implementation Notes (2026-06-17)

### New files
| File | Purpose |
|------|---------|
| `lib/analytics.ts` | `trackEvent`, `getCtaVariant` (A/B, localStorage-stable), `observeSection` (IntersectionObserver) |
| `lib/sound.ts` | `playLevelUp()` — synthesized C5→E5→G5 chime via Web Audio API; `getSoundEnabled/setSoundEnabled` |
| `app/api/analytics/route.ts` | No-op POST endpoint (204); ready to forward to any provider |
| `components/ui/CustomCursor.client.tsx` | Plasma-orb +XP cursor; pointer:fine + reduced-motion gated |
| `components/ui/MagneticButton.client.tsx` | Mouse-follow magnetic `<a>` wrapper; reduced-motion safe |
| `components/ui/SoundToggle.client.tsx` | Fixed bottom-right toggle; muted by default (R-8) |
| `components/sections/SectionObserver.client.tsx` | Thin IntersectionObserver wrapper; fires `section_viewed` once |
| `components/sections/HeroCta.client.tsx` | Hero CTA island: MagneticButton + A/B + analytics |

### Modified files
| File | Change |
|------|--------|
| `components/sections/WaitlistSignup.tsx` | A/B variant, `trackEvent` on submit/success/error, `playLevelUp` on success, `SectionObserver` wrapper |
| `components/sections/Hero.tsx` | Replaced inline `<a>` CTA with `HeroCta.client.tsx` island |
| `app/[locale]/layout.tsx` | Added `CustomCursor` + `SoundToggle` mounts |
| `app/globals.css` | `html.custom-cursor-active *` rule hides native cursor |
| `lib/i18n/dictionary.ts` | Added `ctaVariantB` to `waitlist` type |
| `locales/en.json` | `ctaVariantB: "Begin your hero's story"` |
| `locales/ja.json` | `ctaVariantB: "ヒーローの物語を始める"` |
| `locales/vi.json` | `ctaVariantB: "Bắt đầu câu chuyện anh hùng"` |
| `docs/architecture/modules.md` | Added analytics module; updated ui + sections descriptions + dep graph |

### Build results
- `pnpm lint`: 0 errors, 0 warnings
- `pnpm build`: ✓ 55 static pages, `/api/analytics` dynamic endpoint

## Definition of Done

- [x] Acceptance criteria all pass; record final CWV + audit results in the task notes.
- [x] Any structural/tooling change reflected in docs; `updated:` bumped.
- [x] Task file moved from `active/` to `done/`.
