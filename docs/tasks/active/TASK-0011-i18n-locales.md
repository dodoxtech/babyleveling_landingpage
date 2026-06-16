---
tags: [task]
status: todo          # todo | in-progress | blocked | done
priority: medium      # low | medium | high
created: 2026-06-16
assigned: unassigned  # e.g. claude-code, or a person
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

- [ ] Acceptance criteria all pass.
- [ ] ADR-0003 created; i18n approach noted in [[../../architecture/overview]]; routing in
      [[../../architecture/modules]]; `updated:` bumped.
- [ ] Task file moved from `active/` to `done/`.
</content>
