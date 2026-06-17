---
tags: [architecture]
updated: 2026-06-17
---

# Data Models & State Flow

> What data exists on the landing page and how it moves between layers.
> Modules referenced here are defined in [[modules]].

## Two kinds of data

1. **Static content** — marketing copy and assets, known at build time. The bulk of the site.
2. **Waitlist submission** — the one piece of runtime, user-generated data.

## Content models

Defined as typed data in `lib/content/` (TypeScript types/interfaces). These are the
single source of marketing copy; sections render them.

```ts
// lib/content/features.ts
interface Feature {
  id: string;
  title: string;        // e.g. "Skill Tree"
  blurb: string;        // one-line description
  icon: string;         // asset key in /public
  accent: string;       // Tailwind/CSS accent token
}

// lib/content/themes.ts — mirrors the app's three themes
interface AppTheme {
  id: 'royal' | 'warrior' | 'zen';
  name: string;         // "Royal", "Warrior", "Zen"
  tagline: string;      // "Soft power.", "Forged in fire.", "Gentle and intentional."
  palette: { bg: string; accent: string; highlight: string };
  art: string;          // background art asset key
}

// lib/content/faq.ts
interface FaqItem { id: string; question: string; answer: string; }

// lib/content/screenshots.ts
interface Screenshot { id: string; src: string; alt: string; caption?: string; }

// lib/content/assets.ts
// `AssetKey` is a union of every public asset key; assetPath() resolves it to
// a /assets/... path under public/.
type AssetKey = string;             // e.g. "character.warrior-shield", "icon.bottle"
declare function assetPath(key: AssetKey): string;
```

### Narrative content models (landed in TASK-0001)

Types only for now except `hero.ts` and `loop.ts` (see below) — copy is a separate
workstream (`multilingual-copywriter` / `story-architect`); sections populate the rest
once real content lands.

```ts
// lib/content/loop.ts — the care→XP mapping (S4)
interface LoopStep { id: string; realAction: string; gameReward: string; icon: string; }
// e.g. { realAction: "Feeding", gameReward: "+Energy", icon: "icon.bottle" }

// lib/content/modes.ts — Parent Mode vs RPG Mode (S6)
interface AppMode { id: 'parent' | 'rpg'; name: string; promise: string; bullets: string[]; }

// lib/content/family.ts — co-op framing (S9)
interface FamilyRole { id: string; role: string; blurb: string; sprite: string; }
```

### Loop content model (real copy landed in TASK-0005)

```ts
export const loopSteps: LoopStep[];   // English copy, per planning/05-copy-multilingual.md "S4 Care -> XP loop"
```

`HowItWorks.tsx` is the first consumer, so `loop.ts` graduated from "types only" to real
English copy here — the same reason `hero.ts`/`nav.ts`/`faq.ts` did in earlier tasks. The
four steps fix the mapping from `planning/01-strategy.md` §3 (S4): Feeding=Energy,
Sleep=HP, Habits=EXP, Milestone=Achievement. JA/VI variants land in TASK-0011.

### Features & modes content models (real copy landed in TASK-0006)

```ts
export const features: Feature[];    // English copy, per planning/05-copy-multilingual.md "S5 Feature Showcase"
export const appModes: AppMode[];    // English copy, per planning/05-copy-multilingual.md "S6 Parent Mode"
```

`FeatureShowcase.tsx` and `ParentMode.tsx` are the first consumers, so `features.ts` and
`modes.ts` graduate from "types only" to real English copy here. `Feature.accent` holds a
CSS color value (a design-token `var(...)` or hex) consumed directly as an inline style —
no Tailwind class lookup table to keep in sync as cards are added/removed. `AppMode.bullets`
back representative stat panels (count-up numbers, a representative growth-chart line) per
TASK-0006's explicit scope note that a real chart data pipeline is out of scope. JA/VI
variants land in TASK-0011.

### Screenshots, themes & family content models (real copy landed in TASK-0007)

```ts
export const screenshots: Screenshot[];   // English copy, per planning/05-copy-multilingual.md "S7 Screenshots"
export const themes: AppTheme[];          // mirrors the app's Royal/Warrior/Zen palettes exactly
export const familyRoles: FamilyRole[];   // English copy, per planning/05-copy-multilingual.md "S9 Family Sharing"
```

`Screenshots.tsx`, `ThemeGallery.tsx`, and `FamilyShare.tsx` are the first consumers, so
`screenshots.ts`, `themes.ts`, and `family.ts` graduate from "types only" to real English
copy here. No real screenshot PNGs or theme art assets exist yet (TASK-0007 explicitly puts
producing those out of scope) — `Screenshot.src` names the future asset path and
`AppTheme.art` is a descriptive key reserved for future art, but the sections currently
render styled stand-ins driven by the rest of each model (`alt`/`caption`, `palette`) rather
than those two fields; see the comments in `lib/content/screenshots.ts` and
`lib/content/themes.ts`. `FamilyRole.sprite` points at an existing activity icon (no adult
character art exists yet either). JA/VI variants land in TASK-0011.

### Depth pages (landed in TASK-0010)

No new content models — `/features`, `/rpg-system`, and `/parents` read the same
`features`/`loopSteps`/`appModes` data the home sections do (plus, for `/parents` and
`/pricing`, specific `faqItems` entries looked up by `id`), so a fact can't drift between
the home narrative and its depth-page counterpart. The only genuinely new per-page content
is each page's own `<h1>`/intro copy and the `FEATURE_DEPTH_COPY`/`LOOP_DEPTH_COPY` lookup
records (one elaboration sentence per feature/loop step), which stay local `const`s in
`app/features/page.tsx`/`app/rpg-system/page.tsx` — same reasoning `Reveal.tsx` and
`WaitlistSignup.tsx` record for their own local copy: no other page needs to read it.
`/faq` has no new copy at all — it renders `<Faq />` directly under its own `<h1>`.

### Nav content model (landed in TASK-0002)

```ts
// lib/content/nav.ts
interface NavLink { id: string; label: string; href: string; }
interface LocaleOption { id: string; label: string; }

export const navLinks: NavLink[];        // Features, RPG System, For Parents, Pricing, FAQ
export const navCta: { label: string; href: string };   // "Join the waitlist" -> #waitlist
export const localeOptions: LocaleOption[];               // EN / 日本語 / Tiếng Việt stub
export const wordmark: string;
```

Unlike the other narrative models, `nav.ts` ships real English copy (not just types) because
`SiteHeader` (S0) renders now — it's the one section already built. `localeOptions` is a
non-functional stub — real i18n routing is TASK-0011.

**`navLinks` hrefs (updated TASK-0010):** originally in-page anchors on the home composition,
since the standalone `/features`/`/rpg-system`/`/parents`/`/pricing` depth pages referenced in
[[../planning/02-architecture#4-1-sitemap-tree]] didn't exist yet. Now that TASK-0010 has built
them (plus a standalone `/faq`), every `navLinks` entry points at its real route instead — an
anchor like `#features` only resolves on the one page that actually has a `#features` element,
and `SiteHeader`/`SiteFooter` are persistent chrome rendered on every route via `app/layout.tsx`,
so a route-relative anchor would silently do nothing on any other page. `navCta.href` stays
`#waitlist`: every page (home and all five depth pages, via `DepthPageShell`) renders its own
`<WaitlistSignup />`, so that anchor genuinely resolves everywhere.

### Hero content model (real copy landed in TASK-0003)

```ts
// lib/content/hero.ts
interface HeroContent {
  eyebrow: string;
  headline: string;
  headlineEmphasis: string;  // second headline line, gradient-emphasized
  tagline: string;
  ctaLabel: string;
  ctaSubLabel: string;
}

export const heroContent: HeroContent;   // English copy, per planning/05-copy-multilingual.md "S1 Hero"
```

`Hero.tsx` is the first consumer, so `hero.ts` graduated from "types only" to real English
copy here (the same reason `nav.ts` did in TASK-0002). JA/VI variants land in TASK-0011. The
S3 Reveal's copy (headline/body/CTA) stays a local `const` inside `Reveal.tsx` rather than a
new `lib/content/reveal.ts` model, since no other section currently needs to read it.

## Waitlist model

```ts
// lib/waitlist.ts
interface WaitlistEntry {
  email: string;
  source?: string;      // optional UTM / referrer tag
  createdAt: string;    // ISO timestamp, set server-side
}
```

## Static content flow (build time → render)

```
lib/content/*  (typed data)
      │
      ▼
Server Component section  (e.g. FeatureShowcase reads features)
      │
      ▼
HTML rendered at build (SSG) → served via Vercel CDN
```

Static content never round-trips to a server at runtime. It is imported directly and
rendered in Server Components, so most of the page ships as static HTML/CSS.

## Waitlist flow (runtime)

```
WaitlistSignup (Client Component)
      │  user submits email
      ▼
lib/waitlist.ts  → fetch POST /api/waitlist
      │
      ▼
app/api/waitlist/route.ts  (server)
      │  validate email, stamp createdAt
      ▼
External provider (Resend / Mailchimp / Supabase)
      │
      ▼
Response → WaitlistSignup shows success / error state
```

State here is local and ephemeral: the form holds `idle | submitting | success | error` in
component state. There is no global client store — the site has no cross-section shared
runtime state.

## Related
- [[modules]]
- [[overview]]
- [[features/waitlist-signup]]
