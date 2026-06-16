---
tags: [architecture]
updated: 2026-06-16
---

# Modules & Dependencies

> Planned module boundaries for the landing page. See [[overview]] for the full layout.

## Modules

| Module | Path | Responsibility |
|--------|------|----------------|
| **app** | `app/` | Routing, root layout, page composition, the `/api/waitlist` route handler. The only module that owns routes and server endpoints. |
| **sections** | `components/sections/` | One component per landing-page section (Hero, HeroCharacter, Reveal, HowItWorks, FeatureShowcase, ParentMode, ThemeGallery, Screenshots, WaitlistSignup, Faq, Footer). Each renders content from `lib/content`. Server Component by default; splits into a `*.client.tsx` island only where a section needs scroll/animation state (e.g. `Hero.tsx` → `HeroCanvasMount.client.tsx`/`HeroCanvas.client.tsx`/`HeroLogoReveal.client.tsx`; `Reveal.tsx` → `RevealScene.client.tsx`; `HeroCharacter.tsx` (S2, TASK-0005) → `HeroCharacterMount.client.tsx`/`HeroCharacterScene.client.tsx` (the R3F island-continuation scene) + `HeroCharacterXpBar.client.tsx` (the GSAP-scrubbed XP-bar hand-off); `HowItWorks.tsx` (S4, TASK-0005) → `HowItWorksSteps.client.tsx` (Framer Motion `whileInView` chip reveal); `FeatureShowcase.tsx` (S5, TASK-0006) → `FeatureCard.client.tsx` (per-card scroll reveal + hover/focus XP-bar micro-anim)). `WaitlistSignup.tsx` (S11, TASK-0004) and `ParentMode.tsx` (S6, TASK-0006) are themselves top-level `"use client"` components (not split into an island) since the entire section is interactive — `ParentMode` owns the `rpg\|parent` toggle state and renders `StatNumber.client.tsx` (count-up stat) inside either panel. `Faq.tsx` (S10, TASK-0004) stays a Server Component — native `<details>`/`<summary>` needs no client JS. Reads `lib/motion.ts` directly (not just via `providers`) to decide reduced-motion/low-power fallbacks per section. |
| **ui** | `components/ui/` | Reusable, content-agnostic-ish primitives: `SiteHeader` (+ `SiteHeaderClient` scroll/menu island), `SiteFooter` (S12, TASK-0004), `Button`, `GlassCard`, `XPBar`, `Badge`. `SiteHeader` and `SiteFooter` read `lib/content/nav` for their labels/links — the only `ui` components allowed to import `content`, since the app frame (S0) and footer (S12) are persistent chrome/closing-chrome rather than narrative sections. `SiteFooter` reuses `navLinks`/`localeOptions` from the same `nav.ts` model as `SiteHeader` so the two never drift out of sync. |
| **providers** | `components/providers/` | Root-level client islands wired once in `app/layout.tsx` (currently `LenisProvider` for smooth scroll). No content/business logic. |
| **content** | `lib/content/` | Typed, static content data — hero, loop, modes, family, features, themes, FAQ, screenshots, sprites, nav. The single source of marketing copy. `faq.ts` (TASK-0004) ships real English `FaqItem[]` data, not just types — same graduation `hero.ts`/`nav.ts` went through in earlier tasks. |
| **waitlist** | `lib/waitlist.ts` + `lib/waitlist-provider.ts` + `app/api/waitlist/route.ts` | Client submission helper + server handler for email capture. `lib/waitlist.ts` (client-safe) holds the `WaitlistEntry` type, `isValidEmail()`, and `submitToWaitlist()`. `lib/waitlist-provider.ts` (server-only) defines the `WaitlistProvider` interface the route handler depends on, plus an in-memory stub implementation behind `getWaitlistProvider()`. |

## Dependency graph

```
app          ──→ sections, ui, content, waitlist (api), providers
sections     ──→ ui, content, waitlist (client helper), lib/motion.ts
ui           ──→ content (SiteHeader + SiteFooter, both read lib/content/nav)
providers    ──→ lib/motion.ts (reduced-motion / low-power check)
content      ──→ (no internal dependencies — pure typed data)
waitlist     ──→ WaitlistProvider interface (lib/waitlist-provider.ts);
                 no concrete external email/storage provider wired yet
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
