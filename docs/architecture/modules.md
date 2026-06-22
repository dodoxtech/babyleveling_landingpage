---
tags: [architecture]
updated: 2026-06-22
---

# Modules & Dependencies

> Planned module boundaries for the landing page. See [[overview]] for the full layout.

## Modules

| Module | Path | Responsibility |
|--------|------|----------------|
| **app** | `app/` | Routing, root layout, page composition, the `/api/waitlist` and `/api/contact` route handlers, and the SEO/AEO system routes added in TASK-0009 (`sitemap.ts`, `robots.ts`, `opengraph-image.tsx`). The only module that owns routes and server endpoints. As of TASK-0010, also owns the five depth-page routes (`app/[locale]/features`, `app/[locale]/rpg-system`, `app/[locale]/parents`, `app/[locale]/pricing`, `app/[locale]/faq`), each a Server Component page with its own `metadata` export, composed from `DepthPageShell` (`seo`) + reused `content`/`sections` data. As of TASK-0012, also owns: `/blog` index + `/blog/[slug]` article pages (English-first, locale-aware chrome), `app/blog/feed.xml/route.ts` (RSS 2.0), `/about`, `/contact`, `/legal/privacy`, and `/legal/terms`. |
| **sections** | `components/sections/` | One component per landing-page section (Hero, HeroCharacter, Reveal, HowItWorks, FeatureShowcase, ParentMode, Screenshots, ThemeGallery, FamilyShare, WaitlistSignup, Faq, Footer). The current redesign keeps the home page character-driven and mostly Server Component based: `Hero`, `HeroCharacter`, `Reveal`, `HowItWorks`, `FeatureShowcase`, `ParentMode`, `Screenshots`, `FamilyShare`, and `Faq` render static layout and real PNG assets; `ThemedBabyMascot.client.tsx` is the small theme-aware character island used where section mascots must swap with the active website skin (`focus` uses the baby-boy assets); `FeatureCard.client.tsx` provides reduced-motion-aware reveal/hover polish; `ScreenshotsCarousel.client.tsx` owns snap-scroll app preview navigation; `ThemeGallery.tsx` and `WaitlistSignup.tsx` are client sections for theme switching and waitlist submission; `SectionObserver.client.tsx` fires section analytics when the waitlist enters view. Legacy WebGL hero/island files may remain in the tree but are not mounted by the redesigned landing page. |
| **ui** | `components/ui/` | Reusable chrome and primitives: `SiteHeader` (+ `SiteHeaderClient` mobile-menu island), `SiteFooter`, `LocaleSwitcher`, and `ThemeToggle`. `SiteHeader` and `SiteFooter` accept a `locale` prop and resolve nav labels from `lib/i18n/dictionary` and hrefs via `lib/i18n/paths.localeHref`. `CustomCursor.client.tsx` and `SoundToggle.client.tsx` remain in the tree but are not mounted in the redesigned layout. |
| **i18n** | `lib/i18n/` | Sub-path locale infrastructure. `config.ts` — `locales`, `defaultLocale`, `localeNames`, `isLocale`. `dictionary.ts` — `Dictionary` type + synchronous `getDictionary(locale)` (static JSON, no async required). `paths.ts` — `localeHref(locale, path)` + `localeAlternates(path)` for `hreflang` alternates. Locale files live in `locales/en.json`, `locales/ja.json`, `locales/vi.json`. Route middleware (`middleware.ts`) handles the three routing cases: `/en/…` redirect, `/ja|vi/…` pass-through, and bare `/…` rewrite to `/en/…`. See [[decisions/ADR-0003-i18n-approach]]. |
| **providers** | `components/providers/` | Root-level client islands wired once in `app/layout.tsx` (currently `LenisProvider` for smooth scroll). No content/business logic. |
| **content** | `lib/content/` | Typed, static content data: assets, hero, loop, modes, family, features, themes, FAQ, screenshots, nav, and blog. The single source of marketing copy and semantic asset keys. `assets.ts` maps every frontend image key to `public/assets`. |
| **waitlist** | `lib/waitlist.ts` + `lib/waitlist-validation.ts` + `lib/waitlist-provider.ts` + `app/api/waitlist/route.ts` | Client submission helper + server handler for email capture. `lib/waitlist-validation.ts` (pure, dependency-free) is the single source of truth for input safety — `normalizeEmail()`, `isValidEmail()` (shape + length + control-char rejection), `sanitizeSource()` (control-char strip + length cap), and `sanitizeCellValue()` (spreadsheet formula-injection guard); covered by `tests/waitlist-validation.test.ts`. `lib/waitlist.ts` (client-safe) holds the `WaitlistEntry` type, `isValidEmail()` (delegates to the validation module so client and server agree), and `submitToWaitlist()`. `lib/waitlist-provider.ts` (server-only) defines the `WaitlistProvider` interface the route handler depends on, plus the `GoogleSheetsWaitlistProvider` implementation behind `getWaitlistProvider()` — appends `[email, source, createdAt]` (each passed through `sanitizeCellValue`) to a Google Sheet, deduped by email, authenticated via a service account (`googleapis`). The route handler normalizes + validates input via the validation module before constructing the entry. See [[decisions/ADR-0002-waitlist-provider]]. |
| **analytics** | `lib/analytics.ts` + `lib/sound.ts` + `app/api/analytics/route.ts` | TASK-0013. `lib/analytics.ts` — `trackEvent(name, props)` (fires to `/api/analytics` in prod, console in dev via `navigator.sendBeacon`), `getCtaVariant()` (stable A/B assignment in localStorage, SSR-safe "a" default), `observeSection(el, id)` (IntersectionObserver wrapper, fires `section_viewed` once per section). `lib/sound.ts` — synthesized level-up chime via Web Audio API (C5→E5→G5 ascending), `playLevelUp()` fires only when user has opted in via `SoundToggle`. `app/api/analytics/route.ts` — no-op POST endpoint (204), ready to forward to any provider. |
| **contact** | `components/sections/ContactForm.tsx` + `app/api/contact/route.ts` | Contact form client island + server route handler. `ContactForm` validates email/message client-side and POSTs to `/api/contact`. The route handler validates server-side, rate-limits (3 req/min/IP), and logs submissions; wired to an email provider at deployment time. |
| **seo** | `lib/seo.ts` + `components/seo/` | Sitewide SEO/AEO constants (`SITE_URL`, `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_DESCRIPTOR` — see [[../planning/04-seo-aeo]] §9.5/§10.3) and JSON-LD components (`JsonLd.tsx`: `SiteJsonLd` for `Organization`/`WebSite`/`MobileApplication`, mounted once in `app/layout.tsx`; `FaqPageJsonLd`, mounted in `Faq.tsx`; `BreadcrumbJsonLd`, landed TASK-0010, mounted via `Breadcrumbs.tsx`). Also as of TASK-0010: `Breadcrumbs.tsx` (the visible breadcrumb nav, paired 1:1 with `BreadcrumbJsonLd` so the schema can't drift from what's on screen) and `DepthPageShell.tsx` (the shared chrome — breadcrumb + `<WaitlistSignup />` — every depth page composes). A leaf module: pure constants/markup, no business logic; `DepthPageShell` is the one exception that composes a `sections` component (`WaitlistSignup`), which `app/*/page.tsx` files depend on. |

## Dependency graph

```
app          ──→ sections, ui, content, i18n, waitlist (api), analytics (api), providers, seo
sections     ──→ ui, content, i18n, waitlist (client helper), analytics, lib/motion.ts, seo (Faq → FaqPageJsonLd)
ui           ──→ content (nav), i18n (SiteHeader + SiteFooter resolve labels/hrefs; LocaleSwitcher uses paths), analytics (CustomCursor, MagneticButton, SoundToggle), lib/sound.ts (SoundToggle), lib/motion.ts (CustomCursor, MagneticButton)
providers    ──→ lib/motion.ts (reduced-motion / low-power check)
content      ──→ i18n/config (Locale type for locale-keyed data structures)
i18n         ──→ (no internal dependencies — pure config + static JSON)
waitlist     ──→ WaitlistProvider interface (lib/waitlist-provider.ts) →
                 GoogleSheetsWaitlistProvider → googleapis (Google Sheets API)
analytics    ──→ (no internal dependencies — pure browser APIs + fetch)
seo          ──→ sections (DepthPageShell.tsx → WaitlistSignup only — see Rules); i18n (localeAlternates)
```

> [!note] Waitlist provider: Google Sheets (TASK-0019)
> `lib/waitlist-provider.ts` exports `WaitlistProvider` (the interface) and
> `getWaitlistProvider()`, which returns the `GoogleSheetsWaitlistProvider`:
> confirmed signups are appended as `[email, source, createdAt]` rows to a Google
> Sheet (deduped by email), authenticated with a service account via `googleapis`.
> Required env vars (`GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SHEETS_CLIENT_EMAIL`,
> `GOOGLE_SHEETS_PRIVATE_KEY`) are documented in `.env.local.example`. The target tab name
> is auto-detected from the spreadsheet's first tab (Google localizes the default name),
> overridable via the optional `GOOGLE_SHEETS_TAB_NAME`.
> `app/api/waitlist/route.ts` still depends only on the interface, so swapping in a
> different backend stays a one-file change. See [[decisions/ADR-0002-waitlist-provider]].
> Launch/nurture email sending (an ESP) remains a separate, future decision.

Rules:
- **`ui` and `content` are leaves toward `sections`/`app`** — they never import from
  `sections` or `app`. `ui` may read `content` (`SiteHeader` and `SiteFooter`, both
  ← `nav`) since the app frame (S0) and footer (S12) are persistent chrome rendered
  directly by `app/layout.tsx`/`app/page.tsx`, not narrative sections.
- **`sections` compose `ui` + read `content`** — they hold no business logic beyond
  rendering and the waitlist submit handler. They may read `lib/motion.ts` directly
  (e.g. `Hero`/`Reveal`'s client islands) for per-section reduced-motion fallbacks,
  same contract `providers` already uses.
- **`app` is the only entry point** — it owns layout, metadata, and the server route.
- Dependencies flow one direction (app → sections → ui/content). No cycles.
- **`seo`'s one exception:** `DepthPageShell.tsx` imports `WaitlistSignup` from `sections` so
  every depth page gets the same real, working waitlist form other rules would call a leaf
  importing a non-leaf. This is allowed because `DepthPageShell` only composes (renders),
  never reads `WaitlistSignup`'s internals, and the alternative — five depth pages each
  importing `WaitlistSignup` directly — would just move the same dependency, not remove it.
- **WebGL is currently unmounted on the home landing page.** The redesign uses PNG
  character and scene assets for faster first paint and a more app-native mascot feel.

## Adding a module

1. Create the directory under `components/` or `lib/`.
2. Keep it a leaf if it holds data or primitives; only `sections`/`app` may compose others.
3. Update this file's table + graph, and bump `updated:`.

## Related
- [[overview]]
- [[data-flow]]
