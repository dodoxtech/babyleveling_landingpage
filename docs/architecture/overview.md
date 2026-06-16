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
| Framework | **Next.js (App Router)** | SSG/SSR for SEO on a marketing page; file-based routing; first-class Vercel deploy. See [[decisions/ADR-0001-web-stack]]. |
| Language | **TypeScript** | Typed content models (features, themes, FAQ) — see [[data-flow]]. |
| Styling | **Tailwind CSS** | Utility-first; fast to match the app's dark, neon, glassmorphic aesthetic. |
| UI | **React 18 (Server + Client Components)** | Default to Server Components; client only where interaction is needed (carousel, form). |
| Forms | **Next.js Route Handler** (`app/api/waitlist`) | Server-side email capture; pluggable into a provider (Resend / Mailchimp / Supabase). |
| Deploy | **Vercel** | Zero-config Next.js hosting, preview deploys per PR. |
| Tooling | ESLint + Prettier | Lint/format consistency. |

> [!warning] Not yet installed
> None of the above is in the repo yet. `package.json`, `next.config.js`, and `tailwind.config.ts`
> are created by the bootstrap task — see [[setup/getting-started]]. Update this table whenever a
> dependency is added or changed.

## Project layout (planned)

```
/
├── app/                      → Next.js App Router
│   ├── layout.tsx            → root layout, fonts, metadata, <body> shell
│   ├── page.tsx              → landing page (composes all sections)
│   ├── globals.css           → Tailwind directives + theme CSS vars
│   └── api/
│       └── waitlist/route.ts → POST handler for waitlist signups
├── components/
│   ├── sections/             → Hero, FeatureShowcase, ThemeGallery, Screenshots,
│   │                           WaitlistSignup, FAQ, Footer
│   └── ui/                   → shared primitives (Button, GlassCard, XPBar, Badge)
├── lib/
│   ├── content/              → typed content data (features, themes, faq, screenshots)
│   └── waitlist.ts           → client → /api/waitlist submission helper
├── public/                   → static assets (screenshots, theme art, og image, favicon)
├── docs/                     → this Obsidian vault
├── tailwind.config.ts
├── next.config.js
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
