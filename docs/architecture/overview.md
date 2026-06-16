---
tags: [architecture]
updated: 2026-06-16
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
| Styling | **Tailwind CSS 4** | Utility-first; fast to match the app's dark, neon, glassmorphic aesthetic. |
| UI | **React 19 (Server + Client Components)** | Default to Server Components; client only where interaction is needed (carousel, form, Lenis). |
| Smooth scroll | **Lenis 1.3** (`lenis/react`, root client island) | Scroll-as-timeline for the S1→S3 narrative; disabled under `prefers-reduced-motion`. |
| Scroll choreography | **GSAP 3.15 + ScrollTrigger** | Pinned scrub for the S3 Reveal peel/dissolve and the S2 XP-bar hand-off. Hero (S1) needs zero GSAP, so as of TASK-0008 both consumers (`RevealScene.client.tsx`, `HeroCharacterXpBar.client.tsx`) load it via a dynamic `import("gsap")`/`import("gsap/ScrollTrigger")` inside their effect, not a static top-level import — this keeps GSAP's bytes out of the above-the-fold bundle and only fetches them once the section actually mounts (measured: Route `/` First Load JS dropped ~44kB). Each also calls `useLenis()` to drive `ScrollTrigger.update()` from Lenis's own scroll tick, keeping the scrub in sync with Lenis's smoothed position instead of relying on ScrollTrigger's default native-`scroll`-event timing. Never imported in a Server Component. |
| Component motion | **Framer Motion 12** | Micro-interactions and entrance choreography (e.g. the Hero's per-character letter drop-in) that animate already-painted, server-rendered text — never used for content that must appear at first paint, since Framer Motion resolves `initial` state to inline styles during SSR. Used in the Hero (above the fold), so unlike GSAP it isn't worth deferring — it's already a required part of the critical bundle. |
| 3D / WebGL | **React Three Fiber 9 + Drei 10** (+ `three`) | The two WebGL scenes allowed under R-1: Hero's starfield (`HeroCanvas.client.tsx`, S1) and the island-continuation scene (`HeroCharacterScene.client.tsx`, S2, landed TASK-0005). Both are lazy-loaded (`lazy()` + `Suspense`) client islands, paused off-screen via `IntersectionObserver` (`frameloop="never"` when not intersecting), DPR capped at 2, never the LCP element (R-2), never rendered at all under reduced motion/low-power. `@types/three` is a dev dependency since `three` ships no bundled types. |
| Forms | **Next.js Route Handler** (`app/api/waitlist`) | Server-side email capture; pluggable into a provider (Resend / Mailchimp / Supabase). |
| Deploy | **Vercel** | Zero-config Next.js hosting, preview deploys per PR. |
| Tooling | ESLint 9 + Prettier 3 | Lint/format consistency. |

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
│   ├── layout.tsx            → root layout, fonts, metadata, LenisProvider, <body> shell
│   ├── page.tsx              → landing page (composes all sections)
│   ├── globals.css           → Tailwind v4 import + @theme design tokens
│   └── api/
│       └── waitlist/route.ts → POST handler for waitlist signups
├── components/
│   ├── sections/             → Hero (+ HeroCanvas.client, HeroCanvasMount.client,
│   │                           HeroLogoReveal.client), Reveal (+ RevealScene.client),
│   │                           FeatureShowcase, ThemeGallery, Screenshots,
│   │                           WaitlistSignup, Faq, Footer
│   ├── ui/                   → shared primitives: SiteHeader (S0 app frame, server) +
│   │                           SiteHeaderClient (scroll/menu island), SiteFooter
│   │                           (S12, server), Button, GlassCard, XPBar, Badge
│   └── providers/            → root client islands (LenisProvider)
├── lib/
│   ├── content/              → typed content data (hero, loop, modes, family, features,
│   │                           themes, faq, screenshots, sprites, nav)
│   ├── motion.ts             → prefers-reduced-motion / low-power detection
│   ├── waitlist.ts           → WaitlistEntry type + client → /api/waitlist submission helper
│   └── waitlist-provider.ts  → server-only WaitlistProvider interface + in-memory stub
│                                (TODO: swap in a real provider — see [[modules]])
├── public/                   → static assets (sprites, screenshots, theme art, og image, favicon)
├── docs/                     → this Obsidian vault
├── next.config.ts
├── postcss.config.mjs        → Tailwind v4 PostCSS plugin
├── eslint.config.mjs
└── package.json
```

→ Module boundaries and dependencies: [[modules]]
→ Content models and state flow: [[data-flow]]

## Design source of truth

Visual language (colors, typography, glassmorphism, the three themes) mirrors the app's
design system. The canonical reference is the app repo's `docs/Design.md` (sibling
`BabyLeveling` project). The landing page should *echo* that aesthetic — dark-mode-first,
neon accents, glass cards — without re-deriving tokens here.

## Related
- [[modules]]
- [[data-flow]]
- [[decisions/ADR-0001-web-stack]]
- [[setup/getting-started]]
