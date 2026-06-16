---
tags: [adr]
status: accepted
date: 2026-06-16
---

# ADR-0001 — Use Next.js + Tailwind for the landing page

## Context

The repository is a fresh, empty project (only a `LICENSE`) intended to host the public
marketing + waitlist site for the **BabyLeveling** iOS/watchOS app. Before writing code we
need a documented stack choice so the build starts from a plan.

Requirements that shape the choice:
- **SEO matters** — this is a discoverable marketing page; content should render server-side.
- **Mostly static** — hero, feature grid, theme gallery, screenshots, FAQ; one dynamic
  surface (waitlist email capture). See [[architecture/data-flow]].
- **Visual fidelity** — must echo the app's dark, neon, glassmorphic aesthetic quickly.
- **Low ops** — a tiny team; deployment and preview environments should be near-zero-config.

Candidates considered: Next.js + Tailwind, Astro + Tailwind, plain Vite + React.

## Decision

Use **Next.js (App Router) + TypeScript + Tailwind CSS**, deployed on **Vercel**.

- Server Components by default; Client Components only for the carousel and waitlist form.
- Static content lives as typed data in `lib/content/`; the waitlist posts to a Next.js
  Route Handler at `app/api/waitlist/route.ts` (see [[architecture/data-flow]]).
- Tailwind for styling, with theme accent tokens echoing the app's palette.

## Consequences

✅ SSG/SSR gives strong SEO and fast first paint for a marketing page.
✅ File-based routing + Route Handlers cover both static pages and the one server endpoint
   without adding a separate backend.
✅ First-class Vercel hosting: zero-config deploys and a preview URL per PR.
✅ Large ecosystem and familiarity; easy to hire/contribute against.
✅ Tailwind makes matching the glassmorphic neon look fast and consistent.

⚠️ Next.js is heavier than the site strictly needs — Astro would ship less JS for a
   near-static page. Accepted for the routing/API/DX convenience and room to grow.
⚠️ Server/Client Component boundaries add a learning curve vs. a plain SPA.
⚠️ Some coupling to Vercel conventions; portable but most convenient there.

## Related
- [[architecture/overview]]
- [[architecture/modules]]
- [[architecture/data-flow]]
- [[decisions/README]]
