---
tags: [task]
status: done           # todo | in-progress | blocked | done
priority: medium      # low | medium | high
created: 2026-06-16
assigned: claude-code  # e.g. claude-code, or a person
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

- [x] Each page has unique title/description/canonical/OG/Twitter; OG image renders.
      Only `/` exists today (depth pages are TASK-0010); verified via Playwright that
      title/canonical/OG title/Twitter card are all populated and the generated
      `/opengraph-image` returns `200 image/png` (111KB, screenshot reviewed — dark card,
      gradient wordmark, headline, matches the §9.5 OG spec). No designed OG art asset
      exists, so the image is generated at request time via `next/og` from the same
      design tokens, rather than an invented binary file.
- [x] JSON-LD validates (Rich Results Test) with no errors for SoftwareApplication, Organization, WebSite, FAQPage.
      **Not run against Google's actual Rich Results Test** — that tool needs a public
      URL and this site isn't deployed yet. Verified instead: all four blocks parse as
      valid JSON (extracted + `JSON.parse`'d via Playwright) and each includes every
      field Google's structured-data docs mark *required* for its type (Organization:
      name; WebSite: name+url; MobileApplication: name+operatingSystem+applicationCategory;
      FAQPage: mainEntity[].name+acceptedAnswer.text). Deliberately omitted fields
      (`logo`/`sameAs`/`potentialAction`/`offers`/`aggregateRating`) are all
      *recommended*, not required, and are documented as omitted-not-forgotten in
      `components/seo/JsonLd.tsx` — see that file's comment for why. Re-run the real Rich
      Results Test once a preview/production URL exists.
- [x] `sitemap.xml` and `robots.txt` are served and correct; AI crawlers allowed as specified.
      Verified via `curl`: `robots.txt` allows `*`, `GPTBot`, `Google-Extended`,
      `PerplexityBot`, `ClaudeBot` explicitly and points to `sitemap.xml`; `sitemap.xml`
      lists `/`. Both are `MetadataRoute` functions (`app/robots.ts`, `app/sitemap.ts`),
      not static files, so they stay in sync with `lib/seo.ts`'s `SITE_URL`.
- [x] `llms.txt` present with product facts + canonical URLs.
      `public/llms.txt`, verified served at `/llms.txt`. Lists only `/` under "Pages" —
      the depth-page URLs don't exist until TASK-0010, which will extend this file
      alongside `sitemap.ts`.
- [x] Page content (copy, headings, FAQ, links) is present in server-rendered HTML with JS disabled.
      Verified via Playwright with `javaScriptEnabled: false`: `<h1>` present, all 7 FAQ
      `<details>` present, the waitlist `<form>` present, primary nav's 5 links present,
      ~3,200 characters of body text rendered. Confirms the heavy motion/WebGL layer is
      genuinely progressive enhancement, not load-bearing for content (R-3).
- [x] `pnpm lint` and `pnpm build` pass.

## Bonus fix found during the audit

Hero's R-3 SEO-bearing `<h2>` was non-compliant with its own code comment: the comment
claimed an `<h2>` carried "gamified baby tracker app", but the actual category phrase was
in a sibling `sr-only` `<p>`, not a heading at all — so the page genuinely had no
SEO-bearing `<h2>` in the first crawlable screen. Fixed by converting that paragraph into
a second, `sr-only` `<h2>` (the visible poetic tagline stays its own sibling `<h2>`,
unchanged). Verified: exactly 1 `<h1>` on the page, and the new `<h2>` carries
`SITE_DESCRIPTOR` (`lib/seo.ts`).

## Technical Notes

- Semantic HTML is the non-negotiable floor under the heavy motion (R-3). Keep the poetic `<h1>`
  but ensure an SEO-bearing early `<h2>` carries "gamified baby tracker app".
- FAQ answers stay answer-first (40–60 words) for AEO extraction.
- pnpm only.
- Production domain isn't decided yet — `lib/seo.ts`'s `SITE_URL` defaults to the
  placeholder `https://babyleveling.app`, overridable via `NEXT_PUBLIC_SITE_URL`; added
  to [[../../planning/reconciliation-log]]'s "Outstanding decisions".

## Definition of Done

- [x] Acceptance criteria all pass (two flagged above as verified-by-proxy rather than via
      the real external tool, since this environment has no deployed URL to point it at).
- [x] SEO/metadata approach noted in [[../../architecture/overview]] (Project layout tree +
      new `seo` row in [[../../architecture/modules]]); `updated:` already current.
- [x] Task file moved from `active/` to `done/`.
</content>
