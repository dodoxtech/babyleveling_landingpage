---
tags: [architecture]
updated: 2026-06-17
---

# Modules & Dependencies

> Planned module boundaries for the landing page. See [[overview]] for the full layout.

## Modules

| Module | Path | Responsibility |
|--------|------|----------------|
| **app** | `app/` | Routing, root layout, page composition, the `/api/waitlist` and `/api/contact` route handlers, and the SEO/AEO system routes added in TASK-0009 (`sitemap.ts`, `robots.ts`, `opengraph-image.tsx`). The only module that owns routes and server endpoints. As of TASK-0010, also owns the five depth-page routes (`app/[locale]/features`, `app/[locale]/rpg-system`, `app/[locale]/parents`, `app/[locale]/pricing`, `app/[locale]/faq`), each a Server Component page with its own `metadata` export, composed from `DepthPageShell` (`seo`) + reused `content`/`sections` data. As of TASK-0012, also owns: `/blog` index + `/blog/[slug]` article pages (English-first, locale-aware chrome), `app/blog/feed.xml/route.ts` (RSS 2.0), `/about`, `/contact`, `/legal/privacy`, and `/legal/terms`. |
| **sections** | `components/sections/` | One component per landing-page section (Hero, HeroCharacter, Reveal, HowItWorks, FeatureShowcase, ParentMode, Screenshots, ThemeGallery, FamilyShare, WaitlistSignup, Faq, Footer). Each renders content from `lib/content`. Server Component by default; splits into a `*.client.tsx` island only where a section needs scroll/animation state (e.g. `Hero.tsx` → `HeroCanvasMount.client.tsx`/`HeroCanvas.client.tsx`/`HeroLogoReveal.client.tsx`/`HeroCta.client.tsx` (TASK-0013, magnetic + analytics + A/B island); `Reveal.tsx` → `RevealScene.client.tsx`; `HeroCharacter.tsx` (S2, TASK-0005) → `HeroCharacterMount.client.tsx`/`HeroCharacterScene.client.tsx` (the R3F island-continuation scene) + `HeroCharacterXpBar.client.tsx` (the GSAP-scrubbed XP-bar hand-off); `HowItWorks.tsx` (S4, TASK-0005) → `HowItWorksSteps.client.tsx` (Framer Motion `whileInView` chip reveal); `FeatureShowcase.tsx` (S5, TASK-0006) → `FeatureCard.client.tsx` (per-card scroll reveal + hover/focus XP-bar micro-anim); `Screenshots.tsx` (S7, TASK-0007) → `ScreenshotsCarousel.client.tsx` (snap-scroll + arrow/dot nav over per-screen mock content); `FamilyShare.tsx` (S9, TASK-0007) → `FamilyShareParty.client.tsx` (the scroll-orchestrated gather); `SectionObserver.client.tsx` (TASK-0013) wraps any section element and fires `section_viewed` via `lib/analytics` when ≥40 % enters the viewport). `WaitlistSignup.tsx` (S11, TASK-0004), `ParentMode.tsx` (S6, TASK-0006), and `ThemeGallery.tsx` (S8, TASK-0007) are themselves top-level `"use client"` components (not split into an island) since the entire section is interactive — `ParentMode` owns the `rpg\|parent` toggle state and renders `StatNumber.client.tsx` (count-up stat) inside either panel; `ThemeGallery` owns the active-theme state and swaps the live preview's inline styles without remounting it. `Faq.tsx` (S10, TASK-0004) stays a Server Component — native `<details>`/`<summary>` needs no client JS. Reads `lib/motion.ts` directly (not just via `providers`) to decide reduced-motion/low-power fallbacks per section. |
| **ui** | `components/ui/` | Reusable, content-agnostic-ish primitives: `SiteHeader` (+ `SiteHeaderClient` scroll/menu island), `SiteFooter` (S12, TASK-0004), `LocaleSwitcher` (TASK-0011, client island), `Button`, `GlassCard`, `XPBar`, `Badge`. As of TASK-0011, `SiteHeader` and `SiteFooter` both accept a `locale` prop and resolve nav labels from `lib/i18n/dictionary` and hrefs via `lib/i18n/paths.localeHref` — still the only `ui` components allowed to import `content`/`i18n`, since they are persistent chrome rendered directly by `app/[locale]/layout.tsx`. `LocaleSwitcher` is a thin client island (`"use client"`) that calls `usePathname()` to build locale-alternate hrefs for the current page; it is mounted inside both header and footer. As of TASK-0013: `CustomCursor.client.tsx` (desktop-only RPG orb cursor, pointer:fine + reduced-motion gated, mounted once in layout); `MagneticButton.client.tsx` (mouse-follow magnetic wrapper for CTA `<a>` elements, desktop+reduced-motion safe); `SoundToggle.client.tsx` (opt-in sound toggle fixed bottom-right, localStorage-persisted, muted by default per R-8). |
| **i18n** | `lib/i18n/` | Sub-path locale infrastructure. `config.ts` — `locales`, `defaultLocale`, `localeNames`, `isLocale`. `dictionary.ts` — `Dictionary` type + synchronous `getDictionary(locale)` (static JSON, no async required). `paths.ts` — `localeHref(locale, path)` + `localeAlternates(path)` for `hreflang` alternates. Locale files live in `locales/en.json`, `locales/ja.json`, `locales/vi.json`. Route middleware (`middleware.ts`) handles the three routing cases: `/en/…` redirect, `/ja|vi/…` pass-through, and bare `/…` rewrite to `/en/…`. See [[decisions/ADR-0003-i18n-approach]]. |
| **providers** | `components/providers/` | Root-level client islands wired once in `app/layout.tsx` (currently `LenisProvider` for smooth scroll). No content/business logic. |
| **content** | `lib/content/` | Typed, static content data — hero, loop, modes, family, features, themes, FAQ, screenshots, sprites, nav, blog. The single source of marketing copy. `faq.ts` (TASK-0004) ships real English `FaqItem[]` data, not just types — same graduation `hero.ts`/`nav.ts` went through in earlier tasks. `blog.ts` (TASK-0012) ships 4 seed `BlogPost[]` items with typed `BlogSection[]` content, `relatedLinks`, and ISO date strings used by the `Article` JSON-LD schema. |
| **waitlist** | `lib/waitlist.ts` + `lib/waitlist-provider.ts` + `app/api/waitlist/route.ts` | Client submission helper + server handler for email capture. `lib/waitlist.ts` (client-safe) holds the `WaitlistEntry` type, `isValidEmail()`, and `submitToWaitlist()`. `lib/waitlist-provider.ts` (server-only) defines the `WaitlistProvider` interface the route handler depends on, plus an in-memory stub implementation behind `getWaitlistProvider()`. |
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
waitlist     ──→ WaitlistProvider interface (lib/waitlist-provider.ts);
                 no concrete external email/storage provider wired yet
analytics    ──→ (no internal dependencies — pure browser APIs + fetch)
seo          ──→ sections (DepthPageShell.tsx → WaitlistSignup only — see Rules); i18n (localeAlternates)
```

> [!todo] Waitlist provider not yet implemented
> `lib/waitlist-provider.ts` exports `WaitlistProvider` (the interface) and
> `getWaitlistProvider()` (currently returns an in-memory stub — data does not
> persist across restarts/instances). `app/api/waitlist/route.ts` depends only on
> the interface. When a real provider (Resend / Mailchimp / Supabase) is chosen,
> implement it behind `WaitlistProvider` here and record the decision in a new
> `docs/decisions/ADR-0002-waitlist-provider.md` — out of scope for TASK-0004.

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
- **WebGL stays capped at two scenes (R-1).** `Hero`'s starfield (TASK-0003) and
  `HeroCharacter`'s island-continuation scene (TASK-0005) are the only two React Three
  Fiber/Drei consumers ever allowed; do not add a third.

## Adding a module

1. Create the directory under `components/` or `lib/`.
2. Keep it a leaf if it holds data or primitives; only `sections`/`app` may compose others.
3. Update this file's table + graph, and bump `updated:`.

## Related
- [[overview]]
- [[data-flow]]
