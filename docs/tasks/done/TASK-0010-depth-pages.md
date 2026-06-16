---
tags: [task]
status: done           # todo | in-progress | blocked | done
priority: medium      # low | medium | high
created: 2026-06-16
assigned: claude-code  # e.g. claude-code, or a person
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

- [x] All five pages render, are linked from nav/footer, and carry a waitlist CTA.
      Found and fixed a side effect of this requirement: `SiteHeader`/`SiteFooter` are
      persistent chrome rendered on every route, and their `navLinks` hrefs were in-page
      anchors (`#features`, `#faq`, …) that only resolved on the home page — broken on any
      depth page. Switched `lib/content/nav.ts`'s `navLinks` to the real routes, and
      converted `SiteHeader`/`SiteHeaderClient`/`SiteFooter`'s internal-route links (incl.
      the wordmark, previously `href="#top"` — also broken from a depth page, now `/` via
      `next/link`) from plain `<a>` to `next/link`'s `Link` for client-side nav + prefetch.
      Each depth page renders the real `<WaitlistSignup />` (via `DepthPageShell`), not a
      link back to home.
- [x] `/features` anchor IDs are stable and deep-linkable — they're literally `Feature.id`
      from `lib/content/features.ts` (`xp-levels`, `daily-quests`, `skill-tree`,
      `achievements`, `streaks-buffs`, `apple-watch`), matching the brief exactly.
- [x] Each page has intent-matched title/description and valid breadcrumb schema.
      Verified via Playwright: all 6 pages (home + 5 depth) have distinct titles/canonicals;
      each depth page emits a `BreadcrumbList` block alongside the sitewide
      Organization/WebSite/MobileApplication schema. Not run against Google's Rich Results
      Test (no deployed URL in this sandboxed environment) — same caveat as TASK-0009.
- [x] Internal links use descriptive anchor text (no "click here"); no broken links.
      Verified via `pnpm build` (all 14 routes compile) and `curl` against a production
      `next start` server: `/`, all 5 depth pages, `/sitemap.xml`, `/robots.txt`,
      `/llms.txt`, `/opengraph-image` all return `200`. Anchor text throughout is
      descriptive ("See the care-to-XP system in depth", "read about Parent Mode", etc.).
- [x] `pnpm lint` and `pnpm build` pass.

## Bonus fix found during the audit

Same root cause as the nav-href issue above, applied to the brand wordmark: both
`SiteHeader` and `SiteFooter` linked the logo to `href="#top"`, which only resolves on
home (the only page with an `id="top"` element) — clicking the logo from a depth page was a
silent no-op. Fixed by linking the wordmark to `/` via `next/link` in both places.

## Technical Notes

- Pages are SSG; keep them content-rich and answer-first (SEO + AEO).
- Pricing copy must not over-promise until the model is decided. `/pricing` states only
  what's actually known (free to join, founder perks, no price yet) — reuses the FAQ's
  `free-and-launch` answer rather than authoring a second, possibly-conflicting claim.
- pnpm only.

## Definition of Done

- [x] Acceptance criteria all pass.
- [x] New pages documented in [[../../features/depth-pages]] (covers all four content
      depth pages as one initiative, per the doc-rule's intent; [[../../features/faq]]
      updated to note the standalone `/faq` page reuses `<Faq/>` directly);
      [[../../architecture/modules]] and [[../../architecture/data-flow]] updated
      (new `app` routes, `seo` module additions, the `navLinks`-hrefs behavior change);
      `app/sitemap.ts` and `public/llms.txt` extended with the five new routes;
      `updated:` already current.
- [x] Task file moved from `active/` to `done/`.
</content>
