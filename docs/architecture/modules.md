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
| **sections** | `components/sections/` | One component per landing-page section (Hero, FeatureShowcase, ThemeGallery, Screenshots, WaitlistSignup, FAQ, Footer). Each renders content from `lib/content`. |
| **ui** | `components/ui/` | Reusable, content-agnostic primitives: `Button`, `GlassCard`, `XPBar`, `Badge`. No knowledge of page content. |
| **providers** | `components/providers/` | Root-level client islands wired once in `app/layout.tsx` (currently `LenisProvider` for smooth scroll). No content/business logic. |
| **content** | `lib/content/` | Typed, static content data — hero, loop, modes, family, features, themes, FAQ, screenshots, sprites. The single source of marketing copy. |
| **waitlist** | `lib/waitlist.ts` + `app/api/waitlist/route.ts` | Client submission helper + server handler for email capture. |

## Dependency graph

```
app          ──→ sections, ui, content, waitlist (api), providers
sections     ──→ ui, content, waitlist (client helper)
ui           ──→ (no internal dependencies)
providers    ──→ lib/motion.ts (reduced-motion / low-power check)
content      ──→ (no internal dependencies — pure typed data)
waitlist     ──→ (external email/storage provider only)
```

Rules:
- **`ui` and `content` are leaves** — they never import from `sections` or `app`.
- **`sections` compose `ui` + read `content`** — they hold no business logic beyond
  rendering and the waitlist submit handler.
- **`app` is the only entry point** — it owns layout, metadata, and the server route.
- Dependencies flow one direction (app → sections → ui/content). No cycles.

## Adding a module

1. Create the directory under `components/` or `lib/`.
2. Keep it a leaf if it holds data or primitives; only `sections`/`app` may compose others.
3. Update this file's table + graph, and bump `updated:`.

## Related
- [[overview]]
- [[data-flow]]
