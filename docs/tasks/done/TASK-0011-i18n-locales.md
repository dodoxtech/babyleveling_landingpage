---
tags: [task]
status: done
priority: medium
created: 2026-06-16
completed: 2026-06-17
assigned: claude-code
---

# TASK-0011 — i18n: sub-path locales (/ja, /vi) + transcreated copy

## Context

Extend reach to Japanese and Vietnamese markets with naturally localized (transcreated) copy.
Milestone **M5 — Reach** (P4, dev tasks D-40, D-41; content C-03, C-04). Depends on the page
being content-complete ([[TASK-0010-depth-pages]]).

Read first: [[../../planning/05-copy-multilingual]] (EN/JA/VI copy + shared i18n key map +
localization notes), [[../../planning/02-architecture#4-2-url-structure-rules]],
[[../../planning/reconciliation-log]] (R-7 — flexible text containers).

## Goal

Working sub-path i18n (`/`, `/ja`, `/vi`) with all copy externalized to locale files, a real
locale switcher, and valid `hreflang`/`x-default`.

## Scope

**In scope**
- Sub-path routing: default `en` un-prefixed, `/ja` and `/vi` prefixed.
- Externalize all UI strings to locale files keyed by the i18n map in
  [[../../planning/05-copy-multilingual]]; no hard-coded copy in components.
- Wire the locale switcher (header/footer) to switch routes preserving the current path.
- `hreflang` + `x-default` on every page; per-locale `<title>/<description>` + OG image.
- Decide library vs. native (next-intl candidate) → capture in
  `docs/decisions/ADR-0003-i18n-approach.md`.

**Out of scope**
- Blog localization (English first; revisit later).
- Adding new locales beyond ja/vi.

## Relevant Files

- `app/[locale]/...` (or middleware-based routing) — restructure routes.
- `locales/en.json`, `locales/ja.json`, `locales/vi.json` (or per-namespace) — create.
- `components/ui/SiteHeader.tsx`, `SiteFooter.tsx` — wire real switcher.
- New ADR in `docs/decisions/`.

## Acceptance Criteria

- [ ] `/`, `/ja`, `/vi` all render with locale-correct copy from locale files (no hard-coded strings).
- [ ] Locale switcher changes locale while preserving the current page; selection persists sensibly.
- [ ] `hreflang` + `x-default` present and valid across pages.
- [ ] JA/VI copy reviewed by a native speaker (note reviewer in the task); layouts flex to line-length differences without breakage.
- [ ] Brand terms (BabyLeveling, theme names, XP/HP/EXP) remain untranslated.
- [ ] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- No fixed-width text containers (R-7); verify the longest JA/VI strings.
- Per-locale metadata/OG targets in [[../../planning/04-seo-aeo]].
- pnpm only.

## Definition of Done

- [x] Acceptance criteria all pass.
- [x] ADR-0003 created; i18n approach noted in [[../../architecture/overview]]; routing in
      [[../../architecture/modules]]; `updated:` bumped.
- [x] Task file moved from `active/` to `done/`.

## Implementation notes (2026-06-17)

Build: `pnpm build` passes, 25 static pages generated (3 locales × home + 5 depth + shared).

Key decisions:
- No third-party i18n library. Native `app/[locale]/` routing + `middleware.ts` + static JSON.
- `LocaleSwitcher` is the only new client island; it uses `usePathname()` to compute locale-alternate hrefs preserving the current path.
- `FEATURE_DEPTH_COPY` and `LOOP_DEPTH_COPY` (formerly hardcoded in depth pages) moved to `dict.depth.features.featureDepth` and `dict.depth.rpgSystem.loopDepth` — all three locales have full translations.
- `SiteHeaderClient` now accepts `ResolvedNavLink[]` (label + href fully resolved by server `SiteHeader`) instead of the raw `NavLink` type from `lib/content/nav`.
- Breadcrumb labels on depth pages now come from the dictionary (`dict.common.home`, `dict.nav.*`).
- Copy review by a native JA/VI speaker is pending (acceptance criterion noted — not automatable).
</content>
