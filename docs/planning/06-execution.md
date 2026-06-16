---
tags: [planning, roadmap, tasks]
updated: 2026-06-16
---

# Execution Plan

Deliverables 14–20. Owners: `nextjs-architect`, `frontend-performance`, `design-reviewer`,
plus design/content/marketing leads. **Planning only** — no code is written here.

> Stack (per project): Next.js 15 (App Router) · React 19 · TypeScript · Tailwind · GSAP
> ScrollTrigger · Framer Motion · Lenis · React Three Fiber · Drei. **pnpm only.** Honor the
> `docs/` documentation rules in `CLAUDE.md` (update the matching doc + bump `updated:` on any
> structure/data-flow/feature change).

---

## 14. Complete Implementation Roadmap

Six phases, gated by `design-reviewer`. Ships the conversion-critical core first (an
award-worthy hero + working waitlist), then layers depth and reach.

| Phase | Theme | Outcome | Gate |
|-------|-------|---------|------|
| **P0 — Foundation** | Bootstrap + design system | Next.js 15 app runs; tokens, fonts, Tailwind config, Lenis, content-model types, CI/Vercel | Lints, builds, deploys a blank shell |
| **P1 — MVP conversion core** | Hero + reveal + waitlist + FAQ | A shippable, beautiful page that captures emails (S1, S3 simplified, S10, S11, S12) | `design-reviewer` PASS on core; waitlist works end-to-end; CWV green |
| **P2 — Full narrative** | All sections + motion | S2, S4–S9 with full GSAP/R3F motion + reduced-motion fallbacks | PASS on whole page vs. 5 references; perf budgets held |
| **P3 — SEO/AEO + depth pages** | Discoverability | `/features`, `/rpg-system`, `/parents`, `/pricing`, `/faq`, schema, sitemap, llms.txt, OG | SEO checklist pass; rich results valid |
| **P4 — i18n + content engine** | Reach | `/ja`, `/vi` locales; `/blog` + first posts; `/about`, `/contact`, legal pages | Locale QA; hreflang valid |
| **P5 — Polish + launch prep** | Award finish + measurement | Micro-interactions, sound (opt-in), analytics, A/B on CTA, accessibility audit, Awwwards submission prep | Full `design-reviewer` PASS + a11y audit |

**Critical path:** P0 → P1 (Hero canvas + Reveal + Waitlist API) → P2 (motion system) → review loop.
**Parallelizable:** content/copy (Phase 2 of orchestrator) and SEO/AEO structure can proceed
alongside P0/P1; design comps (P1) overlap foundation.

---

## 15. Development Task Breakdown

> `nextjs-architect` owns structure; `frontend-performance` owns budgets. IDs map to the
> priority matrix (§19). Each task that changes structure/data-flow/features must update the
> matching `docs/` file (column "Docs").

### P0 — Foundation
- **D-01** Bootstrap Next.js 15 + React 19 + TS + Tailwind via pnpm (per [[../setup/getting-started]]). *Docs: getting-started, overview*
- **D-02** Configure ESLint/Prettier, `tsconfig`, path aliases; commit `pnpm-lock.yaml`.
- **D-03** Global CSS: design tokens (§8.2) as CSS vars + Tailwind theme extension. *Docs: overview*
- **D-04** Fonts: subset display + body, `next/font`, `display: swap`.
- **D-05** Install + wire **Lenis** smooth scroll provider (client island at root).
- **D-06** Define content-model types in `lib/content/` (`hero`, `loop`, `modes`, `family` + existing `features/themes/faq/screenshots`). *Docs: data-flow (bump date)*
- **D-07** Vercel project + preview deploys per PR; env scaffolding for waitlist provider.
- **D-08** Set up `prefers-reduced-motion` + low-power detection utility (drives all motion).

### P1 — MVP conversion core
- **D-10** Layout shell: `app/layout.tsx` (metadata, fonts, Lenis), `globals.css`. *Docs: overview*
- **D-11** `SiteHeader` (S0) — server + tiny client island for sticky/condense + CTA.
- **D-12** `Hero` (S1) — server text shell (LCP-safe) + **lazy R3F starfield** client island; logo/letter drop-in (Framer/GSAP); reduced-motion static still.
- **D-13** `Reveal` (S3) — GSAP ScrollTrigger **pinned** peel→dashboard; reduced-motion = cross-fade.
- **D-14** `Faq` (S10) — server `<details>`/ARIA disclosure (per [[../features/faq]]).
- **D-15** `WaitlistSignup` (S11) — client form state machine `idle|submitting|success|error`; client+server email validation; success reward state. (per [[../features/waitlist-signup]])
- **D-16** `app/api/waitlist/route.ts` — POST handler, validate, stamp `createdAt`, honeypot + rate-limit, pluggable provider. *Docs: data-flow, waitlist (when provider chosen → new ADR)*
- **D-17** `SiteFooter` (S12) — sitemap columns + locale switch stub + legal links.
- **D-18** Perf pass on core: confirm LCP element is text/logo, reserve media boxes (CLS≈0), canvas paused off-screen.

### P2 — Full narrative + motion
- **D-20** `HeroCharacter` (S2) — continue R3F scene, sprite hero, XP-bar handoff.
- **D-21** `HowItWorks` (S4) — scrubbed care→XP loop (SVG/canvas-lite), uses `loop.ts` + icons.
- **D-22** `FeatureShowcase` (S5) — glass card grid from `features.ts`; scale+blur-in reveal; hover XP micro-anim. (per [[../features/feature-showcase]])
- **D-23** `ParentMode` (S6) — mode toggle + FLIP morph + count-up numbers; reduced-motion instant.
- **D-24** `Screenshots` (S7) — `next/image` device-framed snap carousel, lazy off-screen. (per [[../features/screenshot-gallery]])
- **D-25** `ThemeGallery` (S8) — segmented control recolors via CSS vars (no remount). (per [[../features/theme-gallery]])
- **D-26** `FamilyShare` (S9) — party-gather scroll choreography from `family.ts`.
- **D-27** Motion system hardening: IntersectionObserver pause/resume for both WebGL scenes; DPR cap; rAF budget audit.
- **D-28** Cross-section continuity (XP bar handoff S1→S2→S3) wired through a shared scroll timeline.

### P3 — SEO/AEO + depth pages
- **D-30** Per-page metadata API (title/description/canonical/OG/Twitter) + JSON-LD components (`SoftwareApplication`, `Organization`, `WebSite`, `FAQPage`). *Docs: overview*
- **D-31** `app/sitemap.ts`, `robots.ts` (allow reputable AI crawlers), static `llms.txt`.
- **D-32** Build `/features`, `/rpg-system`, `/parents`, `/pricing`, standalone `/faq`. *Docs: new feature docs per CLAUDE.md*
- **D-33** Internal-linking pass + breadcrumb schema on deep pages.

### P4 — i18n + content engine
- **D-40** Sub-path i18n (`/`, `/ja`, `/vi`), locale files keyed to the §11–13 i18n map, `hreflang` + `x-default`.
- **D-41** Locale switcher (real) in header/footer; per-locale metadata + OG.
- **D-42** `/blog` index + `/blog/[slug]` (MDX or typed content), `Article` schema, RSS.
- **D-43** `/about`, `/contact` (+ form), `/legal/privacy`, `/legal/terms`.

### P5 — Polish + launch
- **D-50** Micro-interactions (magnetic CTA, custom cursor desktop-only), opt-in success sound.
- **D-51** Analytics + event tracking (scroll-depth-to-reveal, CTA clicks, submit, share).
- **D-52** CTA copy A/B harness (per [[05-copy-multilingual]] variants).
- **D-53** Final CWV + bundle audit; accessibility audit; cross-browser/device QA.

---

## 16. Design Task Breakdown
> `creative-director` + `motion-director`; gated by `design-reviewer`.
- **G-01** Lock design tokens, type scale, grid, glass spec (deliver as a one-page system). *(P0)*
- **G-02** Hi-fi comps: S1 Hero + S3 Reveal (the two make-or-break beats) — desktop + mobile. *(P1)*
- **G-03** Hi-fi comps: S4–S9 + S10–S12; mobile-first variants. *(P2)*
- **G-04** Motion storyboards / prototypes (After Effects or Rive refs) for S1→S3 continuity + S5/S8 interactions. *(P2)*
- **G-05** Theme art direction for Royal/Warrior/Zen preview backgrounds + palettes. *(P2)*
- **G-06** Sprite usage spec: which sprite per beat (hero idle, loop icons, family party). *(P2)*
- **G-07** Device-frame template + screenshot art-direction (real app screens). *(P2/P3)*
- **G-08** OG/social card set per locale; favicon/app icons. *(P3/P4)*
- **G-09** Accessibility design pass: contrast, focus states, reduced-motion stills for every animated section. *(every phase)*
- **G-10** Awwwards submission art (capture reel, thumbnails). *(P5)*

## 17. Content Task Breakdown
> `multilingual-copywriter` + `seo-aeo-specialist`; uses story beats + keyword targets.
- **C-01** Final EN copy for all sections → locale file (`en`). *(P1 for core; P2 rest)*
- **C-02** Keyword/entity map sign-off + per-page metadata + FAQ Q&A authored answer-first. *(P1/P3)*
- **C-03** JA transcreation (review by native speaker) → `ja` locale. *(P4)*
- **C-04** VI transcreation (review by native speaker) → `vi` locale. *(P4)*
- **C-05** Screenshot captions + image `alt` text (all locales, a11y + SEO). *(P2/P3)*
- **C-06** Content models populated: `features.ts`, `themes.ts`, `faq.ts`, `screenshots.ts`, `loop.ts`, `modes.ts`, `family.ts`. *Docs: data-flow*
- **C-07** Blog editorial calendar + first 4 posts (pillars from [[04-seo-aeo#9-9-blog-strategy]]). *(P4)*
- **C-08** `/about`, `/pricing`, legal page copy. *(P4)*
- **C-09** `llms.txt` fact sheet + entity descriptor consistency audit. *(P3)*

## 18. Marketing Task Breakdown
> Growth lead; depends on a working waitlist (D-15/16).
- **M-01** Waitlist email provider decision + ADR (Resend / Mailchimp / Supabase) → confirmation + nurture sequence. *Docs: new ADR*
- **M-02** Launch-list nurture: welcome email, "behind the build" updates, referral ask.
- **M-03** Referral / "invite a co-parent" mechanic + share page (`/waitlist`). *(ties to S9 + virality)*
- **M-04** Social presence + content repurposing of blog/visual reel; teaser of the reveal beat.
- **M-05** Press / Product Hunt / "best baby tracker app" listicle outreach (also boosts AEO entity confidence). *(supports [[04-seo-aeo#10-4-knowledge-graph-recommendations]])*
- **M-06** Influencer wedge: parent-gamers / "geek parent" creators.
- **M-07** Analytics + funnel dashboards; AEO share-of-voice tracking (query the 5 prompts × 4 engines). *(P5)*
- **M-08** Awwwards / CSS Design Awards / FWA submissions at launch. *(P5)*

---

## 19. Priority Matrix

Impact (conversion + brand) × Effort. Resolve ties with the orchestrator priority order:
**Accessibility/trust → Performance → Conversion → Storytelling → Visual maximalism.**

```
        HIGH IMPACT
            ▲
  DO FIRST  │  DO / SCHEDULE
 (quick win)│  (big bets)
  D-15/16 Waitlist  │  D-12 Hero canvas
  D-10/11 Shell+Nav │  D-13 Reveal (the hinge)
  C-01 EN copy      │  D-20–D-28 Full motion
  D-14 FAQ          │  G-02/G-04 Hero+motion comps
  G-01 Tokens       │  D-30/32 SEO pages+schema
  D-03/04/05 Base   │  C-03/C-04 JA/VI
──────────────────────────────────────────► EFFORT
  FILL-IN           │  RECONSIDER / LATER
 (nice, cheap)      │  (costly, lower impact)
  D-50 micro-int.   │  D-50 custom cursor/sound
  G-08 OG cards     │  R3F beyond 2 scenes (cut)
  M-04 social       │  3D for below-fold sections
  D-42 blog shell   │  bespoke per-locale art
```

**P0 (must-have for MVP launch of the page):** D-01..D-08, D-10..D-18, C-01, C-02, G-01, G-02, M-01.
**P1 (full award-grade page):** D-20..D-33, G-03..G-07, C-05, C-06.
**P2 (reach + depth):** D-40..D-43, C-03/04/07/08/09, M-02..M-06.
**P3 (polish/optional):** D-50..D-53, G-10, M-07/08, sound, custom cursor.

---

## 20. Milestone Plan

Indicative timeline from build start; gated, not date-locked. Each milestone = a
`design-reviewer` PASS + the listed evidence.

| Milestone | Window | Definition of done | Demo |
|-----------|--------|--------------------|------|
| **M1 — Foundation** | Weeks 1–2 | Repo bootstrapped (pnpm), tokens + Lenis + content types in place, CI + Vercel preview live | Blank styled shell deploys |
| **M2 — Conversion MVP** | Weeks 3–5 | Hero (with lazy canvas) + Reveal + FAQ + Waitlist (email captured end-to-end) + Footer; CWV green; reduced-motion fallbacks | A beautiful page that collects real emails |
| **M3 — Full narrative** | Weeks 6–9 | All sections S2,S4–S9 with motion + continuity; whole-page `design-reviewer` PASS vs. 5 references; perf budgets held | The complete scroll experience |
| **M4 — Discoverability** | Weeks 9–11 | Depth pages + schema + sitemap + llms.txt; rich results validate; SEO checklist pass | Indexable, AI-quotable site |
| **M5 — Reach** | Weeks 11–13 | JA + VI locales, blog + 4 posts, about/contact/legal; hreflang valid | Tri-lingual site + content engine |
| **M6 — Launch-ready** | Weeks 13–15 | Polish, analytics, A/B, a11y audit, awards submission package; nurture emails live | Go/no-go: ship + submit to Awwwards |

### Definition of Done (review gate — applies to every milestone)
`design-reviewer` must return **PASS** on: (1) accessibility (WCAG AA, keyboard, reduced
motion), (2) performance (LCP/CLS/INP budgets in §7.4), (3) conversion (CTA clarity, friction
floor), (4) storytelling/brand (the reveal lands; matches the 5 references), (5) content
(grounded in the real app, no invented claims; localized correctly). Any FAIL loops back to
the owning specialist before the milestone is accepted.

### Docs-impact reminder (per `CLAUDE.md`)
Implementing D-06/C-06 (new content models) → update [[../architecture/data-flow]];
new modules/sections → [[../architecture/modules]]; new pages → new `docs/features/*`;
waitlist provider + i18n approach → new ADRs in `docs/decisions/`. Bump every edited file's
`updated:` date. See the full list in this plan and in [[reconciliation-log]].
</content>
