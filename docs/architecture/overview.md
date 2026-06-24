---
tags: [architecture]
updated: 2026-06-24
---

# Architecture Overview

> Tech stack and high-level layout for the BabyLeveling landing page.

## What this is

A marketing + waitlist website for the BabyLeveling iOS/watchOS app. The site is
**content-heavy and mostly static**: a hero, a feature showcase, a theme gallery, a
screenshot carousel, a waitlist email form, and an FAQ. The only dynamic surface is the
waitlist submission. See [[data-flow]] for how content and the one dynamic path move
through the app.

## Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 15.5 (App Router, Turbopack)** | SSG/SSR for SEO on a marketing page; file-based routing; first-class Vercel deploy. See [[decisions/ADR-0001-web-stack]]. |
| Language | **TypeScript 5.9** | Typed content models (features, themes, FAQ) — see [[data-flow]]. |
| Styling | **Tailwind CSS 4** | Utility-first; dual-theme (Cute/Warrior) design tokens in `globals.css` via `@theme inline`. |
| UI | **React 19 (Server + Client Components)** | Default to Server Components; client only where interaction is needed (carousel, form, Lenis). |
| Smooth scroll | **Lenis 1.3** (`lenis/react`, root client island) | Scroll-as-timeline for the S1→S3 narrative; disabled under `prefers-reduced-motion`. |
| Scroll choreography | **GSAP 3.15 + ScrollTrigger** | Pinned scrub for the S3 Reveal peel/dissolve and the S2 XP-bar hand-off. Hero (S1) needs zero GSAP, so as of TASK-0008 both consumers (`RevealScene.client.tsx`, `HeroCharacterXpBar.client.tsx`) load it via a dynamic `import("gsap")`/`import("gsap/ScrollTrigger")` inside their effect, not a static top-level import — this keeps GSAP's bytes out of the above-the-fold bundle and only fetches them once the section actually mounts (measured: Route `/` First Load JS dropped ~44kB). Each also calls `useLenis()` to drive `ScrollTrigger.update()` from Lenis's own scroll tick, keeping the scrub in sync with Lenis's smoothed position instead of relying on ScrollTrigger's default native-`scroll`-event timing. Never imported in a Server Component. |
| Component motion | **Framer Motion 12** | Micro-interactions and entrance choreography (e.g. the Hero's per-character letter drop-in) that animate already-painted, server-rendered text — never used for content that must appear at first paint, since Framer Motion resolves `initial` state to inline styles during SSR. Used in the Hero (above the fold), so unlike GSAP it isn't worth deferring — it's already a required part of the critical bundle. |
| 3D / WebGL | **React Three Fiber 9 + Drei 10** (+ `three`) | The two WebGL scenes allowed under R-1: Hero's starfield (`HeroCanvas.client.tsx`, S1) and the island-continuation scene (`HeroCharacterScene.client.tsx`, S2, landed TASK-0005). Both are lazy-loaded (`lazy()` + `Suspense`) client islands, paused off-screen via `IntersectionObserver` (`frameloop="never"` when not intersecting), DPR capped at 2, never the LCP element (R-2), never rendered at all under reduced motion/low-power. `@types/three` is a dev dependency since `three` ships no bundled types. |
| i18n | **Native Next.js App Router sub-path routing** + static JSON dictionaries | No library; `app/[locale]/` + `middleware.ts` + `lib/i18n/`. See [[decisions/ADR-0003-i18n-approach]]. EN is default (unprefixed), `/ja` + `/vi` are sub-path prefixed. |
| Agent markdown | **node-html-markdown 2** | Markdown-for-Agents content negotiation: `middleware.ts` rewrites `Accept: text/markdown` GETs to `app/api/md`, which self-fetches the page HTML and converts its `<main>` to markdown. See [[../features/markdown-for-agents]]. |
| Forms | **Next.js Route Handler** (`app/api/waitlist`) | Server-side email capture; pluggable `WaitlistProvider` behind the handler. |
| Waitlist storage | **Google Sheets** via `googleapis` (service account) | Confirmed signups appended as rows to a sheet; near-zero ops/cost, human-readable + exportable. See [[decisions/ADR-0002-waitlist-provider]]. |
| Deploy | **Vercel** | Zero-config Next.js hosting, preview deploys per PR. |
| Tooling | ESLint 9 + Prettier 3 | Lint/format consistency. |
| Testing | **Vitest 4** | Fast unit tests for pure logic (e.g. waitlist input validation/sanitization). `pnpm test` (CI), `pnpm test:watch` (local). `vitest.config.ts` mirrors the `@/*` tsconfig path alias. |

> [!note] Tailwind 4 is CSS-first
> Tailwind 4 has no `tailwind.config.ts` — theme tokens (colors, fonts) are declared directly in
> `app/globals.css` via `@theme inline`, sourced from CSS vars (`--bg-void`, `--text-hi`,
> `--accent-feed`, etc., per the design tokens in
> [[../planning/03-storyboard-motion-visual#8-2-design-tokens]]). The bootstrap task originally
> assumed a `tailwind.config.ts` file; this supersedes that for Tailwind v4.

> [!note] Installed (TASK-0001 bootstrap)
> The stack above is in the repo as of the bootstrap task. `package.json`, `next.config.ts`,
> `postcss.config.mjs`, `eslint.config.mjs`, and `app/globals.css` own the build config — see
> [[setup/getting-started]]. Update this table whenever a dependency is added or changed.

## Project layout

```
/
├── app/                      → Next.js App Router
│   ├── [locale]/             → locale sub-path segment (en|ja|vi); middleware rewrites
│   │   │                       unprefixed /… to /en/… so English stays visibly un-prefixed
│   │   ├── layout.tsx        → locale root layout: fonts, metadata, hreflang, SiteHeader
│   │   ├── page.tsx          → landing page (composes all sections S1–S12)
│   │   ├── opengraph-image.tsx → generated OG/Twitter card image, next/og (TASK-0009)
│   │   ├── features/page.tsx → /features depth page (TASK-0010, locale-aware TASK-0011)
│   │   ├── rpg-system/page.tsx → /rpg-system depth page (TASK-0010, locale-aware TASK-0011)
│   │   ├── parents/page.tsx  → /parents depth page (TASK-0010, locale-aware TASK-0011)
│   │   ├── pricing/page.tsx  → /pricing depth page (TASK-0010, locale-aware TASK-0011)
│   │   └── faq/page.tsx      → /faq depth page (TASK-0010, locale-aware TASK-0011)
│   ├── globals.css           → Tailwind v4 import + @theme design tokens
│   ├── sitemap.ts            → MetadataRoute.Sitemap (TASK-0009; +5 depth-page URLs, TASK-0010)
│   ├── robots.ts             → MetadataRoute.Robots, allows reputable AI crawlers (TASK-0009)
│   └── api/
│       └── waitlist/route.ts → POST handler for waitlist signups
├── components/
│   ├── sections/             → Hero (+ HeroCanvas.client, HeroCanvasMount.client,
│   │                           HeroLogoReveal.client), HeroCharacter (+ ...client islands),
│   │                           Reveal (+ RevealScene.client), HowItWorks (+ ...client),
│   │                           FeatureShowcase (+ FeatureCard.client), ParentMode,
│   │                           Screenshots (+ ScreenshotsCarousel.client), ThemeGallery,
│   │                           FamilyShare (+ FamilyShareParty.client), WaitlistSignup,
│   │                           Faq, Footer
│   ├── ui/                   → shared primitives: SiteHeader (S0 app frame, server) +
│   │                           SiteHeaderClient (scroll/menu island), SiteFooter
│   │                           (S12, server), Button, GlassCard, XPBar, Badge
│   ├── providers/            → root client islands (LenisProvider)
│   └── seo/                  → JsonLd.tsx (SiteJsonLd, FaqPageJsonLd, BreadcrumbJsonLd),
│                                Breadcrumbs.tsx, DepthPageShell.tsx (TASK-0009/TASK-0010)
├── lib/
│   ├── content/              → typed content data (hero, loop, modes, family, features,
│   │                           themes, faq, screenshots, sprites, nav)
│   ├── motion.ts             → prefers-reduced-motion / low-power detection
│   ├── seo.ts                → SITE_URL/SITE_TITLE/SITE_DESCRIPTION/SITE_DESCRIPTOR (TASK-0009)
│   ├── waitlist.ts           → WaitlistEntry type + client → /api/waitlist submission helper
│   ├── waitlist-validation.ts → pure input validation/sanitization (shared by client, route, provider)
│   └── waitlist-provider.ts  → server-only WaitlistProvider interface + GoogleSheetsWaitlistProvider
│                                (appends signups to a Google Sheet — see [[decisions/ADR-0002-waitlist-provider]])
├── tests/                    → Vitest unit tests (e.g. waitlist-validation.test.ts), run via `pnpm test`
├── public/                   → static assets (sprites, llms.txt, screenshots, theme art, favicon)
├── docs/                     → this Obsidian vault
├── next.config.ts
├── postcss.config.mjs        → Tailwind v4 PostCSS plugin
├── eslint.config.mjs
├── vitest.config.ts          → Vitest config (mirrors the @/* tsconfig path alias)
└── package.json
```

→ Module boundaries and dependencies: [[modules]]
→ Content models and state flow: [[data-flow]]

## Design source of truth

Visual language is owned by `app/globals.css` design tokens. The landing page uses a
soft app-native light theme with cobalt as the locked CTA accent, warm playfield panels,
frosted secondary controls, pill-shaped buttons, and transform/opacity-based motion.
The Cute and Warrior modes adjust supporting surface tones while preserving the same core
interaction language.

## Related
- [[modules]]
- [[data-flow]]
- [[decisions/ADR-0001-web-stack]]
- [[setup/getting-started]]
