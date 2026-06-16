---
tags: [task]
status: todo          # todo | in-progress | blocked | done
priority: medium      # low | medium | high
created: 2026-06-16
assigned: unassigned  # e.g. claude-code, or a person
---

# TASK-0010 — Depth pages: Features, RPG System, Parents, Pricing, FAQ

## Context

SEO depth + objection-handling pages that the home hub links to. Milestone **M4 —
Discoverability** (P3, dev tasks D-32, D-33). Depends on [[TASK-0009-seo-aeo-metadata]].

Read first: [[../../planning/02-architecture]] (sitemap, URL rules, nav),
[[../../planning/04-seo-aeo#9-3-page-keyword-mapping-intent-matched]] (per-page targets),
[[../../planning/05-copy-multilingual]] (copy voice).

## Goal

Five crawlable, intent-matched pages with stable anchor IDs, internal linking, breadcrumb
schema, and a waitlist CTA on each.

## Scope

**In scope**
- `/features` (with anchors `#xp-levels`, `#daily-quests`, `#skill-tree`, `#achievements`,
  `#streaks-buffs`, `#apple-watch`), `/rpg-system`, `/parents`, `/pricing`, standalone `/faq`.
- Per-page metadata + JSON-LD (reuse TASK-0009 system); `BreadcrumbList` on each.
- Internal-linking pass: contextual links from home narrative + cross-links between pages;
  descriptive anchor text.

**Out of scope**
- Blog, About, Contact, legal (TASK-0012).
- Localization of these pages (TASK-0011 extends i18n to them).
- Final pricing model (assume "free at launch + founder perks" until an owner decision; flag in copy).

## Relevant Files

- `app/features/page.tsx`, `app/rpg-system/page.tsx`, `app/parents/page.tsx`,
  `app/pricing/page.tsx`, `app/faq/page.tsx` — create.
- `lib/content/*` — reuse feature/theme/faq data; add page-specific copy content as needed.
- Footer/nav links — verify they resolve.

## Acceptance Criteria

- [ ] All five pages render, are linked from nav/footer, and carry a waitlist CTA.
- [ ] `/features` anchor IDs are stable and deep-linkable.
- [ ] Each page has intent-matched title/description and valid breadcrumb schema.
- [ ] Internal links use descriptive anchor text (no "click here"); no broken links.
- [ ] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- Pages are SSG; keep them content-rich and answer-first (SEO + AEO).
- Pricing copy must not over-promise until the model is decided.
- pnpm only.

## Definition of Done

- [ ] Acceptance criteria all pass.
- [ ] New pages documented as features in `docs/features/*` (per `CLAUDE.md`); modules/sitemap
      updated; `updated:` bumped.
- [ ] Task file moved from `active/` to `done/`.
</content>
