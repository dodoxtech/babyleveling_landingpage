---
name: landing-page-orchestrator
description: >-
  Master coordinator for building the award-winning BabyLeveling landing page. Use this
  FIRST whenever the request spans more than one discipline — e.g. "build the hero",
  "design the page", "improve conversion", "plan the landing page", "redesign a section",
  or any vague high-level landing-page goal. It decomposes the work, sequences the nine
  specialist skills (product-strategist, story-architect, seo-aeo-specialist,
  multilingual-copywriter, creative-director, motion-director, design-reviewer,
  nextjs-architect, frontend-performance), and merges their outputs into one coherent plan.
---

# Landing Page Orchestrator

## Purpose

Turn a high-level goal ("ship an award-winning landing page for BabyLeveling") into a
sequenced, reviewed, multi-disciplinary plan and implementation. This skill owns the
*workflow* — it never does specialist work itself; it routes to the right specialist skill,
passes the right inputs, and reconciles conflicting recommendations into a single decision.

The north-star quality bar is the reference set the project aspires to:
**Igloo Inc** (immersive 3D/WebGL world), **Apple Vision Pro** (cinematic depth,
spatial storytelling), **Linear** (precision, restraint, typographic rigor),
**Arc Browser** (playful delight, personality), and **Stripe Sessions** (motion-led
narrative, polish). The page must optimize for product strategy, storytelling, SEO, AEO,
multilingual reach, motion design, performance, and conversion — simultaneously.

## Activation criteria

Activate this skill when ANY of the following is true:

- The request is a broad landing-page goal that touches 2+ disciplines ("build the
  landing page", "redesign the hero", "make it award-winning", "improve conversion").
- The user hasn't named a specific specialist and you must decide who does what.
- Multiple specialist outputs need to be reconciled (e.g. motion vs. performance budget,
  copy length vs. layout).
- A new section or page-wide change is starting and needs end-to-end sequencing.

Do NOT activate when the user explicitly scopes the work to one discipline and one skill
already covers it (e.g. "fix the LCP image" → go straight to `frontend-performance`).

## Responsibilities

1. **Intake & framing.** Restate the goal, the target audience (new/expecting parents),
   the conversion event (waitlist email capture), and the quality bar (the five references).
2. **Decompose.** Break the goal into discipline-sized work items.
3. **Sequence.** Run specialists in dependency order (see workflow below), not all at once.
4. **Route inputs.** Give each specialist exactly the upstream artifacts it needs.
5. **Reconcile.** Resolve cross-discipline conflicts using the priority order in the
   Quality checklist. Document the trade-off and the decision.
6. **Gate.** Require `design-reviewer` sign-off before implementation is considered done.
7. **Honor project rules.** pnpm only; update `docs/` + bump `updated:` frontmatter when
   structure/data-flow/features change (per repo `CLAUDE.md`); content stays grounded in
   the real app, never invented.

## Default coordination workflow

Run phases in order; within a phase, specialists can work in parallel. Each arrow is a
handoff of artifacts, not a vague "consider".

```
Phase 0 — Frame (this skill)
   goal, audience, conversion event, quality bar, constraints
        │
Phase 1 — Strategy & Narrative
   product-strategist ──▶ positioning, value props, ICP, conversion model, section IA
   story-architect    ──▶ page narrative arc, section-by-section story beats, CTA logic
        │  (story uses strategy's value props)
Phase 2 — Content & Discoverability
   seo-aeo-specialist     ──▶ keyword/entity map, metadata, schema.org, AEO Q&A blocks
   multilingual-copywriter──▶ final copy per section + i18n keys + locale variants
        │  (copy uses narrative beats + SEO/AEO targets)
Phase 3 — Experience design
   creative-director ──▶ art direction, layout system, type/color, section comps
   motion-director   ──▶ motion spec per section, reduced-motion fallbacks, perf budget asks
        │  (design uses copy length + story beats; motion respects perf budget)
Phase 4 — Build
   nextjs-architect     ──▶ component/route structure, content models, rendering strategy
   frontend-performance ──▶ Core Web Vitals budgets, asset/loading strategy, motion cost review
        │
Phase 5 — Review gate
   design-reviewer ──▶ scored audit vs. references + checklist; PASS or returns fixes
        │ (loop back to the owning specialist for any FAIL item)
Phase 6 — Merge (this skill)
   reconcile, finalize plan, list doc updates required by CLAUDE.md
```

Iterate Phase 3↔4↔5 until `design-reviewer` returns PASS.

## Inputs

- The user's goal and any scope (section, whole page, specific KPI).
- Project docs: `docs/` vault (architecture, features, decisions), `CLAUDE.md`.
- Existing assets: `public/sprites/`, content in `lib/content/`.
- Any brand constraints from the sibling app's `docs/Design.md` (dark/neon/glass, themes).

## Outputs

- A **coordination plan**: ordered list of which specialist runs when, with the input
  each receives and the artifact each must return.
- A **reconciliation log**: every cross-discipline conflict and how it was resolved.
- A **definition of done**: the `design-reviewer` checklist that must pass.
- A **docs-impact list**: which `docs/` files must be updated per `CLAUDE.md` rules.
- A single merged recommendation/implementation, not nine disconnected ones.

## Quality checklist

- [ ] Goal, audience, conversion event, and quality bar are explicitly stated before work starts.
- [ ] Every active discipline was routed to its specialist (none silently skipped or self-done).
- [ ] Specialists ran in dependency order; no skill consumed an artifact that didn't exist yet.
- [ ] Cross-discipline conflicts resolved using this priority order, ties broken downward:
      **1) Accessibility & user trust → 2) Performance / Core Web Vitals → 3) Conversion →
      4) Storytelling & brand wow → 5) Visual/motion maximalism.**
- [ ] `design-reviewer` returned PASS (or open items are explicitly accepted by the user).
- [ ] Required `docs/` updates listed and `updated:` dates bumped (per `CLAUDE.md`).
- [ ] pnpm-only respected; no npm/yarn, no external/community skills, no plugins introduced.
- [ ] Output is one coherent plan, with the reconciliation log attached.

## Examples

**Example 1 — "Build an award-winning hero section."**
1. Frame: audience = sleep-deprived new parents; conversion = waitlist email; bar = Vision Pro depth + Arc delight.
2. `product-strategist`: lead value prop = "turn newborn chaos into a game you're winning."
3. `story-architect`: hero beat = hook ("You just had a baby. You also just started a new game.") → tension → CTA.
4. `seo-aeo-specialist`: target "gamified baby tracker app"; add FAQ schema for AEO; metadata.
5. `multilingual-copywriter`: headline/tagline/CTA in en + locale variants, i18n keys.
6. `creative-director`: dark starfield, neon-gradient logo, XP-bar motif, glass CTA.
7. `motion-director`: letter drop-in + particle drift; `prefers-reduced-motion` static fallback.
8. `nextjs-architect`: `Hero` server component + small client island for the animated CTA.
9. `frontend-performance`: hero image as LCP, budget the particle canvas, defer below-fold.
10. `design-reviewer`: scores it; flags LCP risk → loop to performance → re-score → PASS.
11. Merge + list `docs/features/hero-section.md` as needing an `updated:` bump.

**Example 2 — "Conversion is low, fix it."**
Route narrowly: `product-strategist` (offer/CTA clarity) → `story-architect` (CTA placement
in the arc) → `multilingual-copywriter` (CTA microcopy A/B variants) → `design-reviewer`
(friction audit). Skip motion/architecture unless the diagnosis points there. Reconcile and
return one prioritized list of conversion fixes.

**Example 3 — "Make the whole page feel award-winning."**
Run the full Phase 0→6 workflow once end-to-end, then iterate Phase 3↔4↔5 per section until
`design-reviewer` passes the page as a whole against all five references.
