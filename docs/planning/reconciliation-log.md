---
tags: [planning, orchestration]
updated: 2026-06-16
---

# Reconciliation Log

The orchestrator's record of cross-discipline conflicts and how they were resolved. Tie-break
priority order (from `landing-page-orchestrator`):
**1) Accessibility & user trust → 2) Performance / Core Web Vitals → 3) Conversion →
4) Storytelling & brand wow → 5) Visual/motion maximalism.**

| # | Conflict | Parties | Decision | Rationale (priority applied) |
|---|----------|---------|----------|------------------------------|
| R-1 | Full-page WebGL world (Igloo-style) vs. load performance | motion-director / creative-director ↔ frontend-performance | **Limit WebGL to 2 scenes** (Hero, Reveal); both lazy + paused off-screen; DOM elsewhere | Performance (2) over visual maximalism (5). Protects LCP/INP on mobile. |
| R-2 | Animated/3D hero as LCP vs. fast LCP | motion ↔ frontend-performance | **LCP element = server-rendered text/logo**, canvas hydrates after | Performance (2). Canvas must never be the LCP. |
| R-3 | "Delay the product reveal" narrative vs. SEO needing the category keyword early | story-architect ↔ seo-aeo-specialist | Poetic `<h1>`; an **SEO-bearing `<h2>`** ("gamified baby tracker app") appears within the first crawlable screen; full category copy by S3 | Storytelling (4) and conversion (3) preserved without sacrificing crawlability. Semantic HTML is a trust/discoverability floor. |
| R-4 | Heavy scroll-jacking immersion vs. accessibility | motion-director ↔ design-reviewer | Every section ships a **`prefers-reduced-motion` static fallback**; scroll never traps keyboard users | Accessibility (1) is non-negotiable, above all else. |
| R-5 | Glassmorphism aesthetic vs. text contrast | creative-director ↔ design-reviewer | Enforce **WCAG AA** contrast; CTA-on-glass verified; reduced-transparency fallback | Accessibility (1) over visual maximalism (5). |
| R-6 | Long emotional copy vs. large-type/whitespace layout | multilingual-copywriter ↔ creative-director | Tighten body to scannable, self-contained statements (also helps AEO); headlines carry emotion | Conversion (3) + AEO; serves both. |
| R-7 | JA/VI line-length variance vs. fixed comps | copywriter ↔ creative-director | **No fixed-width text containers**; layout flexes per locale | Conversion/reach; avoids breakage at i18n. |
| R-8 | Custom cursor + success sound vs. distraction/perf | motion-director ↔ design-reviewer/perf | Desktop-only cursor; **sound opt-in, muted by default** | Accessibility (1) + performance (2); kept as P3 polish, not core. |
| R-9 | Many sections/CTAs vs. single conversion focus | product-strategist ↔ story-architect | **One repeated waitlist CTA** (no competing ask); nav CTA quiet until final beat | Conversion (3) clarity. |
| R-10 | Adding R3F/Drei + new content models vs. repo docs rules | nextjs-architect ↔ `CLAUDE.md` | Dependencies recorded in [[../architecture/overview]] Tech Stack; new models → [[../architecture/data-flow]]; provider/i18n → ADRs; bump `updated:` on edit | Honor project rules; tracked in [[06-execution#15-development-task-breakdown]]. |

## Definition of done (gate)
Implementation is "done" only when `design-reviewer` returns **PASS** across accessibility,
performance, conversion, storytelling/brand, and content — per
[[06-execution#20-milestone-plan]]. Open items must be explicitly accepted by the user.

## Outstanding decisions (need owner input, not blocking the plan)
- **Waitlist provider** (Resend / Mailchimp / Supabase) — pending; ADR on decision (M-01).
- **i18n library/approach** — sub-path chosen; library (next-intl vs. native) pending ADR.
- **Pricing model** — affects `/pricing` copy; "free at launch + founder perks" assumed until set.
- **Display typeface licensing** — comp uses a high-contrast serif placeholder; final pending.
</content>
