---
tags: [planning, ia, sitemap]
updated: 2026-06-16
---

# Information Architecture

Deliverables 4–5. Owner: Information Architecture Lead (coordinated via
`product-strategist` for section IA + `nextjs-architect` for routing).

---

## 4. Complete Sitemap

The **landing page (`/`) is the conversion engine**. Supporting pages exist for SEO depth,
AEO entity coverage, and objection-handling, but all roads lead back to the waitlist.

### 4.1 Sitemap tree
```
/                          Home (the scroll-driven landing experience) ★ primary
├── /features              Features — full RPG + tracking capability detail
│   ├── #xp-levels
│   ├── #daily-quests
│   ├── #skill-tree
│   ├── #achievements
│   ├── #streaks-buffs
│   └── #apple-watch
├── /rpg-system            RPG System — the care→XP mechanic explained in depth
├── /parents               Parents — Parent Mode, data rigor, privacy, pediatrician-ready
├── /pricing               Pricing — plans / "free at launch" / founder perks
├── /faq                   FAQ — standalone, schema-rich (mirrors home FAQ + more)
├── /blog                  Blog — index (SEO/AEO content engine)
│   └── /blog/[slug]       Article
├── /about                 About — mission, team, the "why"
├── /contact               Contact — support + press + partnership
├── /legal/privacy         Privacy Policy (critical: baby data)
├── /legal/terms           Terms of Service
└── /waitlist              Waitlist confirm / share page (post-submit, optional)

Locale variants: /  · /ja  · /vi   (sub-path i18n; see nextjs-architect)
System: /sitemap.xml · /robots.txt · /llms.txt (AEO) · /og/* (social cards)
```

### 4.2 URL structure rules
- Lowercase, hyphenated, no trailing slash, no `.html`.
- Locale as path prefix: `example.com/ja/features`, `example.com/vi/pricing`. Default locale
  (`en`) un-prefixed. `hreflang` + `x-default` on every page.
- Blog: flat `/blog/<slug>` (no dated paths — keeps evergreen URLs).
- Anchor deep-links on `/features` are stable IDs for AEO citation + internal linking.
- Canonical URL self-referential per page; locale alternates declared.

### 4.3 Navigation structure
**Primary nav (persistent header — minimal, Linear-style):**
`Features · RPG System · Parents · Pricing · FAQ` + **[Join the waitlist]** (button) + locale
switcher (EN/JA/VI). Mobile: condensed to logo + hamburger + sticky CTA.

**Footer nav (4 columns):**
1. **Product** — Features, RPG System, Parents, Pricing
2. **Resources** — FAQ, Blog, Support/Contact
3. **Company** — About, Press, Careers (stub)
4. **Legal & Locale** — Privacy, Terms, language switch, social icons

**Nav rules:** Blog/About/Contact live in footer (not primary) to keep the header
conversion-focused. The waitlist CTA is the only button in the header.

### 4.4 Page hierarchy & priority
| Tier | Pages | Role | Build priority |
|------|-------|------|----------------|
| **0** | `/` | Conversion + brand artifact | P0 (MVP) |
| **1** | `/faq`, `/legal/privacy`, `/legal/terms` | Trust + legal must-haves | P0 |
| **2** | `/features`, `/rpg-system`, `/parents`, `/pricing` | SEO depth + objection handling | P1 |
| **3** | `/blog` + articles, `/about`, `/contact` | Content engine + credibility | P2 |
| **4** | `/ja`, `/vi` locales, `/waitlist` share | Reach + virality | P2–P3 |

---

## 5. Landing Page Section Breakdown

The home route (`/`) composes the sections below in order. Each maps to a story beat
([[01-strategy#3-story-framework]]) and a planned component
([[../architecture/overview]] → `components/sections/`). **R3F/WebGL** is used only where it
earns its weight (hero world, reveal); everything below the fold favors DOM + cheap motion
to protect performance budgets (see [[06-execution]] and [[reconciliation-log]]).

| # | Section | Component | Story beat | Data source | Render | Heavy tech? |
|---|---------|-----------|-----------|-------------|--------|-------------|
| S0 | Nav / Brand Frame | `ui/SiteHeader` | Frame | static | Server + tiny client island | — |
| S1 | Hero | `sections/Hero` | Act I | `lib/content/hero.ts` | Server shell + client canvas island | **R3F starfield (lazy)** |
| S2 | Hero Appears | `sections/HeroCharacter` | Act I | sprites (`lib/content/sprites.ts`) | Client (scroll) | R3F scene cont. / sprite |
| S3 | The Reveal | `sections/Reveal` | Act II | static | Client (pinned scroll) | GSAP pin + transform |
| S4 | Care → XP loop | `sections/HowItWorks` | Act III | `lib/content/loop.ts` | Server + scroll client | Canvas-lite / SVG |
| S5 | Feature Showcase | `sections/FeatureShowcase` | Act III | `lib/content/features.ts` | Server, scroll-reveal | DOM only |
| S6 | Parent Mode | `sections/ParentMode` | Act III | `lib/content/modes.ts` | Server + client toggle | DOM only |
| S7 | Screenshot Gallery | `sections/Screenshots` | Act III | `lib/content/screenshots.ts` | Client carousel | `next/image`, lazy |
| S8 | Theme Gallery | `sections/ThemeGallery` | Act IV | `lib/content/themes.ts` | Client (CSS-var recolor) | DOM + CSS vars |
| S9 | Family Sharing | `sections/FamilyShare` | Act IV | `lib/content/family.ts` | Server, scroll-reveal | DOM only |
| S10 | FAQ | `sections/Faq` | Act V pre | `lib/content/faq.ts` | Server (`<details>`) | DOM only |
| S11 | Final CTA / Waitlist | `sections/WaitlistSignup` | Act V | `WaitlistEntry` → `/api/waitlist` | Client island | DOM + reward anim |
| S12 | Footer | `ui/SiteFooter` | Close | static | Server | — |

### 5.1 New content models required (extends [[../architecture/data-flow]])
The vault already defines `Feature[]`, `AppTheme[]`, `FaqItem[]`, `Screenshot[]`,
`WaitlistEntry`, and generated `sprites`. The narrative adds:

```ts
// lib/content/hero.ts
interface HeroContent { eyebrow: string; headline: string; tagline: string; ctaLabel: string; }

// lib/content/loop.ts  — the care→XP mapping (S4)
interface LoopStep { id: string; realAction: string; gameReward: string; icon: string; }
// e.g. { realAction: "Feeding", gameReward: "+Energy", icon: "icon.bottle" }

// lib/content/modes.ts — Parent Mode vs RPG Mode (S6)
interface AppMode { id: 'parent' | 'rpg'; name: string; promise: string; bullets: string[]; }

// lib/content/family.ts — co-op framing (S9)
interface FamilyRole { id: string; role: string; blurb: string; sprite: string; }
```
> Per `CLAUDE.md`, adding these models requires updating
> [[../architecture/data-flow]] and bumping its `updated:` date when implemented. Tracked in
> [[06-execution#15-development-task-breakdown]].

### 5.2 Section responsibilities at a glance
- **Above the fold (S0–S1):** wonder + one promise + one CTA, zero layout shift, LCP-safe.
- **Mystery span (S1–S2):** withhold the category; pure adventure.
- **The hinge (S3):** the reveal — the single most important moment; everything is staged
  for this beat to land.
- **Proof span (S4–S7):** convert wonder into belief — mechanic, features, rigor, real UI.
- **Identity + social (S8–S9):** "this is *us*" + multiplayer care.
- **Close (S10–S12):** dissolve doubt, convert, sign off.

→ Storyboard each of these: [[03-storyboard-motion-visual#6-storyboard-for-every-section]]
</content>
