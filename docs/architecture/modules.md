---
tags: [architecture]
updated: 2026-09-04
---

# Modules & Dependencies

> Planned module boundaries for the landing page. See [[overview]] for the full layout.

## Modules

| Module | Path | Responsibility |
|--------|------|----------------|
| **app** | `app/` | Routing, root layout, page composition, the `/api/contact` route handler, and the SEO/AEO system routes added in TASK-0009 (`sitemap.ts`, `robots.ts`, `opengraph-image.tsx`). The only module that owns routes and server endpoints. As of TASK-0010, also owns the five depth-page routes (`app/[locale]/features`, `app/[locale]/rpg-system`, `app/[locale]/parents`, `app/[locale]/pricing`, `app/[locale]/faq`), each a Server Component page with its own `metadata` export, composed from `DepthPageShell` (`seo`) + reused `content`/`sections` data. As of TASK-0012, also owns: `/blog` index + `/blog/[slug]` article pages (English-first, locale-aware chrome), `app/blog/feed.xml/route.ts` (RSS 2.0), `/about`, `/contact`, `/legal/privacy`, and `/legal/terms`. `app/api/waitlist/route.ts` was removed 2026-09-04 (see below). |
| **sections** | `components/sections/` | One component per landing-page section (Hero, HeroCharacter, Reveal, HowItWorks, FeatureShowcase, ParentMode, Screenshots, ThemeGallery, FamilyShare, DownloadSection, Faq, Footer). The home page is character-driven and mostly Server Component based: `Hero`, `HeroCharacter`, `Reveal`, `HowItWorks`, `FeatureShowcase`, `ParentMode`, `Screenshots`, `FamilyShare`, and `Faq` render static layout and real PNG assets; `ThemedBabyMascot.client.tsx` is the small theme-aware character island used where section mascots must swap with the active website skin (`focus` uses the baby-boy assets); `FeatureCard.client.tsx` provides reduced-motion-aware reveal/hover polish; `ScreenshotsCarousel.client.tsx` owns the pinned-tour screen carousel, now rendering real App Store screenshots (`public/screenshots/<locale>/<id>.png`) instead of a synthetic app-preview mockup; `ThemeGallery.tsx` is a client section for theme switching; `DownloadSection.tsx` (formerly `WaitlistSignup.tsx`, renamed 2026-09-04 now that the app has shipped) is the S11 closing App Store download push, using the shared `DownloadCta.client.tsx` button; `SectionObserver.client.tsx` fires section analytics when a section enters view. Legacy WebGL hero/island files may remain in the tree but are not mounted by the redesigned landing page. |
| **ui** | `components/ui/` | Reusable chrome and primitives: `SiteHeader` (+ `SiteHeaderClient` mobile-menu island), `SiteFooter`, `LocaleSwitcher`, and `ThemeToggle`. `SiteHeader` and `SiteFooter` accept a `locale` prop and resolve nav labels from `lib/i18n/dictionary` and hrefs via `lib/i18n/paths.localeHref`; the header's scroll-aware CTA (`SiteHeaderClient`) now links directly to `lib/app-store.ts`'s `APP_STORE_URL` (external, `target="_blank"`) instead of an in-page `#waitlist` anchor. `CustomCursor.client.tsx` and `SoundToggle.client.tsx` remain in the tree but are not mounted in the redesigned layout. |
| **i18n** | `lib/i18n/` | Sub-path locale infrastructure. `config.ts` — `locales`, `defaultLocale`, `localeNames`, `isLocale`. `dictionary.ts` — `Dictionary` type + synchronous `getDictionary(locale)` (static JSON, no async required). `paths.ts` — `localeHref(locale, path)` + `localeAlternates(path)` for `hreflang` alternates. Locale files live in `locales/en.json`, `locales/ja.json`, `locales/vi.json`. Route middleware (`middleware.ts`) handles the three routing cases: `/en/…` redirect, `/ja|vi/…` pass-through, and bare `/…` rewrite to `/en/…`. See [[decisions/ADR-0003-i18n-approach]]. |
| **providers** | `components/providers/` | Root-level client islands wired once in `app/layout.tsx` (currently `LenisProvider` for smooth scroll). No content/business logic. |
| **content** | `lib/content/` | Typed, static content data: assets, hero, loop, modes, family, features, themes, FAQ, screenshots, nav, and blog. The single source of marketing copy and semantic asset keys. `assets.ts` maps every frontend image key to `public/assets`. `nav.ts`'s `navCtaHref` now equals `lib/app-store.ts`'s `APP_STORE_URL`. |
| **app-store** | `lib/app-store.ts` | New 2026-09-04. Single exported constant, `APP_STORE_URL`, the real App Store Connect listing — the one place the URL is hardcoded, imported by the header CTA, Hero CTA, and `DownloadSection`/`DownloadCta`. |
| **analytics** | `lib/analytics.ts` + `lib/sound.ts` + `app/api/analytics/route.ts` | TASK-0013. `lib/analytics.ts` — `trackEvent(name, props)` (fires to `/api/analytics` in prod, console in dev via `navigator.sendBeacon`), `getCtaVariant()` (stable A/B assignment in localStorage, SSR-safe "a" default), `observeSection(el, id)` (IntersectionObserver wrapper, fires `section_viewed` once per section). `EventName` no longer includes `waitlist_submit`/`waitlist_success`/`waitlist_error` (removed with the waitlist feature); `EventProps.location` gained `"download_section"`. `lib/sound.ts` — synthesized level-up chime via Web Audio API (C5→E5→G5 ascending), `playLevelUp()` fires only when user has opted in via `SoundToggle`. `app/api/analytics/route.ts` — no-op POST endpoint (204), ready to forward to any provider. |
| **contact** | `components/sections/ContactForm.tsx` + `app/api/contact/route.ts` + `lib/contact-provider.ts` | Contact form client island + server route handler. `ContactForm` validates email/message client-side and POSTs to `/api/contact`. The route handler validates server-side, rate-limits (3 req/min/IP), then hands off to `lib/contact-provider.ts` (server-only) — `GoogleSheetsContactProvider` behind `getContactProvider()` appends `[email, subject, message, createdAt]` (each passed through `sanitizeCellValue`, now in `lib/sheets-sanitize.ts`) to a dedicated "Contact" tab in the spreadsheet, authenticated via a service account. Tab name overridable via `GOOGLE_SHEETS_CONTACT_TAB_NAME`. |
| **seo** | `lib/seo.ts` + `components/seo/` | Sitewide SEO/AEO constants (`SITE_URL`, `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_DESCRIPTOR` — see [[../planning/04-seo-aeo]] §9.5/§10.3) and JSON-LD components (`JsonLd.tsx`: `SiteJsonLd` for `Organization`/`WebSite`/`MobileApplication`, mounted once in `app/layout.tsx`; `FaqPageJsonLd`, mounted in `Faq.tsx`; `BreadcrumbJsonLd`, landed TASK-0010, mounted via `Breadcrumbs.tsx`). Also as of TASK-0010: `Breadcrumbs.tsx` (the visible breadcrumb nav, paired 1:1 with `BreadcrumbJsonLd` so the schema can't drift from what's on screen) and `DepthPageShell.tsx` (the shared chrome — breadcrumb + `<DownloadSection />` — every depth page composes). A leaf module: pure constants/markup, no business logic; `DepthPageShell` is the one exception that composes a `sections` component (`DownloadSection`), which `app/*/page.tsx` files depend on. |

## Removed: waitlist module (2026-09-04)

The pre-launch email waitlist — `lib/waitlist.ts`, `lib/waitlist-validation.ts`,
`lib/waitlist-provider.ts` (`GoogleSheetsWaitlistProvider`), `app/api/waitlist/route.ts`,
`components/sections/WaitlistConfetti.client.tsx`, and `tests/waitlist-validation.test.ts` —
was deleted outright now that the app has shipped: every CTA links straight to the App Store
(`lib/app-store.ts`) instead. The one piece of shared logic, `sanitizeCellValue()` (spreadsheet
formula-injection guard), moved to the new leaf module `lib/sheets-sanitize.ts` since `contact`
still depends on it; its tests moved to `tests/sheets-sanitize.test.ts`. See
[[../features/waitlist-signup]] (superseded) and [[decisions/ADR-0002-waitlist-provider]]
(historical — the Google Sheets choice it documents no longer has a live consumer, but the
decision record itself is left as-is).

## Dependency graph

```
app          ──→ sections, ui, content, i18n, analytics (api), contact (api), providers, seo
sections     ──→ ui, content, i18n, analytics, app-store (Hero, DownloadSection/DownloadCta), lib/motion.ts, seo (Faq → FaqPageJsonLd)
ui           ──→ content (nav), i18n (SiteHeader + SiteFooter resolve labels/hrefs; LocaleSwitcher uses paths), app-store (SiteHeaderClient CTA), analytics (CustomCursor, MagneticButton, SoundToggle), lib/sound.ts (SoundToggle), lib/motion.ts (CustomCursor, MagneticButton)
providers    ──→ lib/motion.ts (reduced-motion / low-power check)
content      ──→ i18n/config (Locale type for locale-keyed data structures), app-store (nav.ts's navCtaHref)
i18n         ──→ (no internal dependencies — pure config + static JSON)
app-store    ──→ (no internal dependencies — one exported constant)
contact      ──→ ContactProvider interface (lib/contact-provider.ts) →
                 GoogleSheetsContactProvider → googleapis (Google Sheets API);
                 sanitizeCellValue (lib/sheets-sanitize.ts)
analytics    ──→ (no internal dependencies — pure browser APIs + fetch)
seo          ──→ sections (DepthPageShell.tsx → DownloadSection only — see Rules); i18n (localeAlternates)
```

Rules:
- **`ui` and `content` are leaves toward `sections`/`app`** — they never import from
  `sections` or `app`. `ui` may read `content` (`SiteHeader` and `SiteFooter`, both
  ← `nav`) since the app frame (S0) and footer (S12) are persistent chrome rendered
  directly by `app/layout.tsx`/`app/page.tsx`, not narrative sections.
- **`sections` compose `ui` + read `content`** — they hold no business logic beyond
  rendering. They may read `lib/motion.ts` directly (e.g. `Hero`/`Reveal`'s client
  islands) for per-section reduced-motion fallbacks, same contract `providers` already
  uses.
- **`app` is the only entry point** — it owns layout, metadata, and the server routes.
- Dependencies flow one direction (app → sections → ui/content). No cycles.
- **`seo`'s one exception:** `DepthPageShell.tsx` imports `DownloadSection` from `sections`
  so every depth page gets the same real download CTA other rules would call a leaf
  importing a non-leaf. This is allowed because `DepthPageShell` only composes (renders),
  never reads `DownloadSection`'s internals, and the alternative — five depth pages each
  importing `DownloadSection` directly — would just move the same dependency, not remove it.
- **WebGL is currently unmounted on the home landing page.** The redesign uses PNG
  character and scene assets for faster first paint and a more app-native mascot feel.

## Adding a module

1. Create the directory under `components/` or `lib/`.
2. Keep it a leaf if it holds data or primitives; only `sections`/`app` may compose others.
3. Update this file's table + graph, and bump `updated:`.

## Related
- [[overview]]
- [[data-flow]]
