---
tags: [task]
status: todo          # todo | in-progress | blocked | done
priority: medium      # low | medium | high
created: 2026-06-16
assigned: unassigned  # e.g. claude-code, or a person
---

# TASK-0009 — SEO/AEO: metadata, schema, sitemap, robots, llms.txt

## Context

Make the immersive page discoverable by search and quotable by AI answer engines. Milestone
**M4 — Discoverability** (P3, dev tasks D-30, D-31; content C-02, C-09). Depends on
[[TASK-0008-motion-perf-hardening]].

Read first: [[../../planning/04-seo-aeo]] (full SEO + AEO strategy),
[[../../planning/reconciliation-log]] (R-3 — semantic HTML floor).

## Goal

Complete, per-page (and per-locale-ready) metadata + JSON-LD structured data + sitemap +
robots + `llms.txt`, with valid rich results.

## Scope

**In scope**
- Per-page metadata via Next.js Metadata API: `<title>` ≤60, description ≤155, canonical,
  OpenGraph + Twitter, `hreflang` scaffolding (en/ja/vi + x-default).
- JSON-LD components: `SoftwareApplication`/`MobileApplication`, `Organization`, `WebSite`
  (+ SearchAction), `FAQPage` on the home FAQ block.
- `app/sitemap.ts`, `app/robots.ts` (allow reputable AI crawlers: GPTBot, Google-Extended,
  PerplexityBot, ClaudeBot), static `public/llms.txt` fact sheet.
- Confirm a single semantic `<h1>` + crawlable heading outline; verify content renders without JS.
- Entity-descriptor consistency audit (one stable one-liner sitewide).

**Out of scope**
- Depth pages themselves (TASK-0010) — this wires the metadata system they'll use.
- Blog (TASK-0012).

## Relevant Files

- `app/layout.tsx` + per-route `metadata` / `generateMetadata`.
- `components/seo/JsonLd.tsx` (or per-type components) — create.
- `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt` — create.
- `lib/content/faq.ts` — source for FAQPage schema.

## Acceptance Criteria

- [ ] Each page has unique title/description/canonical/OG/Twitter; OG image renders.
- [ ] JSON-LD validates (Rich Results Test) with no errors for SoftwareApplication, Organization, WebSite, FAQPage.
- [ ] `sitemap.xml` and `robots.txt` are served and correct; AI crawlers allowed as specified.
- [ ] `llms.txt` present with product facts + canonical URLs.
- [ ] Page content (copy, headings, FAQ, links) is present in server-rendered HTML with JS disabled.
- [ ] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- Semantic HTML is the non-negotiable floor under the heavy motion (R-3). Keep the poetic `<h1>`
  but ensure an SEO-bearing early `<h2>` carries "gamified baby tracker app".
- FAQ answers stay answer-first (40–60 words) for AEO extraction.
- pnpm only.

## Definition of Done

- [ ] Acceptance criteria all pass.
- [ ] SEO/metadata approach noted in [[../../architecture/overview]]; `updated:` bumped.
- [ ] Task file moved from `active/` to `done/`.
</content>
