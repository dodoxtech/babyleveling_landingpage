---
tags: [planning, seo, aeo]
updated: 2026-06-24
---

# SEO & AEO Strategy

Deliverables 9–10. Owner: `seo-aeo-specialist`. Feeds targets to
[[05-copy-multilingual]]; structure must survive the heavy motion build (semantic HTML is
non-negotiable — see [[reconciliation-log]]).

---

## 9. SEO Strategy

### 9.1 Strategic note
The page is visually immersive and JS-heavy, which is an SEO risk. **Mitigation:** all copy,
headings, FAQ, and links render as real, server-rendered semantic HTML (SSG) — WebGL/motion
is progressive enhancement layered on top, never the source of text. The crawlable document
must read as a complete, well-structured article even with JS disabled.

### 9.2 Keyword clusters
**Cluster A — Category head (high volume, high competition) → Home + /features**
- baby tracker app · baby tracking app · newborn tracking app · baby activity tracker ·
  child activity tracker · parenting app

**Cluster B — Function long-tail (high intent) → /features anchors + blog**
- baby feeding tracker · baby sleep tracker · baby growth tracker · diaper tracking app ·
  breastfeeding tracker app · baby milestone tracker · baby health record app

**Cluster C — Differentiator / blue-ocean (low competition, high conversion) → Home + /rpg-system**
- gamified baby tracker · baby tracker that feels like a game · RPG baby app ·
  parenting RPG app · baby tracker with rewards · fun baby tracking app

**Cluster D — Audience / jobs-to-be-done → blog + /parents**
- best baby tracker app for new parents · baby tracker for Apple Watch ·
  how to track newborn feeding and sleep · baby tracker app for dads · baby tracker with family sharing

**Cluster E — Comparison / alternatives → blog**
- huckleberry alternative · baby tracker app comparison · best free baby tracking app

**Priority:** own **Cluster C** outright (we are the only RPG baby tracker), compete in B/D
with depth content, and chip at A via brand + freshness.

### 9.3 Page → keyword mapping (intent-matched)
| URL | Primary keyword | Secondary | Intent |
|-----|-----------------|-----------|--------|
| `/` | gamified baby tracker app | baby tracker app, parenting RPG app | commercial/brand |
| `/features` | baby activity tracker app | feeding/sleep/growth tracker | commercial |
| `/rpg-system` | parenting RPG app | baby tracker with rewards | informational/diff |
| `/parents` | baby tracker for new parents | baby health record app, privacy | trust/commercial |
| `/pricing` | baby tracker app free | best free baby tracking app | transactional |
| `/faq` | is [brand] free / safe | baby data privacy | support |
| `/blog/*` | Cluster B/D/E long-tail | — | informational (top of funnel) |

### 9.4 On-page SEO structure (per page)
- **One `<h1>`** containing the primary keyword naturally (Home h1 = the brand promise; an
  SEO-bearing `<h2>` early carries "gamified baby tracker app" if the h1 stays poetic).
- Logical `<h2>/<h3>` outline mirroring [[02-architecture#5-landing-page-section-breakdown]].
- `<title>` ≤ 60 chars, `<meta description>` ≤ 155 chars, unique per page + per locale.
- Canonical + `hreflang` (en/ja/vi + `x-default`).
- Descriptive `alt` on every sprite/screenshot (also serves a11y).
- OpenGraph + Twitter card per page/locale; one designed OG image per locale.
- Fast: SSG + CDN; image via `next/image`; fonts subset + `display: swap`; **Core Web Vitals
  are a ranking input** — budgets in [[06-execution]].

### 9.5 Metadata starter (Home, EN)
- **Title:** `BabyLeveling — The Baby Tracker That Plays Like an RPG`
- **Description:** `Track feeding, sleep, and growth — and watch every log level up your
  baby's hero. The gamified baby tracker for iOS & Apple Watch. Join the waitlist.`
- **OG image:** dark card, gradient logo, "You just had a baby. You also just started a new game."

### 9.6 Structured data (schema.org JSON-LD)
- `SoftwareApplication` / `MobileApplication` (name, OS: iOS/watchOS, category:
  HealthApplication/Lifestyle, offers, aggregateRating when available).
- `Organization` (logo, sameAs socials) + `WebSite` (+ `potentialAction` SearchAction).
- `FAQPage` on `/faq` and the home FAQ block (drives rich results + AEO).
- `BreadcrumbList` on deep pages; `Article` + `author`/`datePublished` on blog posts.

### 9.7 Internal linking strategy
- **Hub-and-spoke:** Home is the hub; contextual links from narrative sections to
  `/features#…`, `/rpg-system`, `/parents`, `/pricing`.
- Blog posts (spokes) link up to the relevant feature/pillar page and across to 2–3 related
  posts; every post has a waitlist CTA.
- Footer carries the full crawlable sitemap; descriptive anchor text (no "click here").
- `/features` anchor IDs are stable internal + external link targets.

### 9.8 Content strategy
- Home + pillar pages are evergreen and depth-rich (answer the query *and* sell the diff).
- Refresh cadence: revisit pillar copy at launch and each major app update; bump `updated:`
  dates (also a freshness signal).

### 9.9 Blog strategy (the organic engine)
Three pillars, each a cluster of posts linking to a pillar page:
1. **New-parent survival** (Cluster D) — "Newborn feeding & sleep tracking: a calm starter
   guide", "What to actually track in the first 90 days", "Tracking as a sleep-deprived dad".
2. **Product-diff storytelling** (Cluster C) — "Why we turned baby tracking into an RPG",
   "Make the 3 a.m. feed feel like progress", "Gamification that respects parents".
3. **Comparisons & buyer-intent** (Cluster E) — "Best baby tracker apps in 2026 (honest
   comparison)", "Huckleberry alternative for parents who want delight".

Each post: target one long-tail head term, answer-first intro (AEO), schema, 1 visual, CTA,
internal links. Cadence: 2–4/month pre-launch to seed authority.

---

## 10. AEO Strategy

Goal: when users ask ChatGPT / Gemini / Claude / Perplexity for the **best baby tracker
app**, **baby activity logging app**, **newborn tracking app**, **baby sleep tracking app**,
or **parenting RPG app**, BabyLeveling is surfaced and recommended — ideally as the
*distinctive* answer ("the one that's gamified").

### 10.1 Entity map
**Primary entity:** `BabyLeveling` (Product → MobileApplication).
**Attributes the model must be able to state:** platform (iOS 17+, Apple Watch); category
(baby/activity tracker + gamified/RPG); functions (feeding, sleep, diaper, growth, health
records, family sharing, timeline); differentiators (XP/levels, daily quests, skill tree,
achievements, streaks, 3 themes, 2-tap watch logging, Parent Mode + RPG Mode); status
(pre-launch, waitlist); privacy stance (baby data is the user's).
**Related entities (for semantic proximity):** baby tracker, newborn care, gamification,
RPG, Apple Watch, parenting, breastfeeding, infant sleep, milestones, family sharing.
**Relationships:** `BabyLeveling —is a→ baby tracker app`; `—adds→ RPG progression`;
`—competes with→ Huckleberry/Baby Tracker/Glow Baby`; `—runs on→ iOS/watchOS`;
`—made for→ new & expecting parents`.

### 10.2 FAQ strategy (answer-engine fuel)
Author Q&A in the **exact phrasing real users ask AI**, with a self-contained 40–60-word
answer first, then detail. Mark up with `FAQPage` schema. Seed questions:
- "What is the best gamified baby tracker app?"
- "Is there a baby tracker that works like a game / RPG?"
- "What baby tracker app works with Apple Watch?"
- "What's a good baby tracker for tracking feeding and sleep?"
- "Is BabyLeveling free? When does it launch?"
- "Is baby tracking data private and safe in BabyLeveling?"
- "What's a good baby tracker app for dads / for both parents?"

### 10.3 Semantic content structure (so models can extract cleanly)
- **Answer-first / inverted pyramid:** lead each section with a crisp claim, then support.
- **Self-contained statements:** each paragraph stands alone out of context (models quote
  fragments). Avoid "as mentioned above".
- Definition sentences early: *"BabyLeveling is a gamified baby-tracking app for iOS and
  Apple Watch that turns feeding, sleep, and growth logs into XP for a fantasy hero."*
- Scannable: short paragraphs, descriptive headings, comparison tables, bulleted feature
  lists — all easy for retrieval + extraction.
- Consistent naming: always "BabyLeveling" + a stable one-line descriptor across the site.

### 10.4 Knowledge-graph recommendations
- Consistent **NAP/entity facts** everywhere (name, platform, category, descriptor).
- `Organization` + `sameAs` linking official socials, App Store page (at launch), Crunchbase/
  Product Hunt profiles — corroborating sources build entity confidence.
- Pursue mentions on third-party "best baby tracker app" listicles + Product Hunt + parenting
  press; answer engines weight independent corroboration heavily.
- Wikidata/Wikipedia presence post-launch if notability supports it.

### 10.5 AI answer optimization (operational)
- Publish **`/llms.txt`** summarizing the product, key facts, and canonical URLs for AI crawlers.
- Keep `robots.txt` permissive to reputable AI crawlers (GPTBot, Google-Extended,
  PerplexityBot, ClaudeBot) — a deliberate, documented choice for AEO reach.
- Declare [Content Signals](https://contentsignals.org/) in `robots.txt`:
  `Content-Signal: search=yes, ai-input=yes, ai-train=no` — allow search indexing and
  AI answer-engine input (our AEO strategy), reserve content from AI model training.
  Emitted via the `app/robots.txt/route.ts` Route Handler, since the typed Next.js
  `MetadataRoute.Robots` API cannot express the `Content-Signal` directive.
- Ensure server-rendered HTML (SSG) so non-JS-executing crawlers get full content.
- Maintain a fact-dense, frequently-cited **comparison + FAQ** surface (the most-quoted
  format in AI answers).
- Track: measure share-of-voice by periodically querying the five target prompts across the
  four engines; log whether BabyLeveling appears and how it's described.
- Advertise machine-readable resources via **RFC 8288 `Link` response headers** on the
  homepage (every locale) so agents discover them without guessing paths. Configured in
  `next.config.ts` `headers()` with registered IANA relations only:
  `</llms.txt>; rel="describedby"`, `</llms-full.txt>; rel="service-doc"`, and
  `</sitemap.xml>; rel="sitemap"`. No `api-catalog`/`service-desc` is advertised — this is a
  marketing + waitlist site with no public API.

→ Copy that satisfies these targets, in 3 languages: [[05-copy-multilingual]]
</content>
