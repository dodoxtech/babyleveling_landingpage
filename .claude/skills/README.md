# BabyLeveling Landing Page — Skill System

Local, project-only Claude Code skills for building an **award-winning landing page** for the
BabyLeveling baby-activity-tracking RPG app. Quality bar references: **Igloo Inc, Apple Vision
Pro, Linear, Arc Browser, Stripe Sessions**. Optimizes for product strategy, storytelling, SEO,
AEO, multilingual content, motion design, performance, and conversion.

> All skills are **local `SKILL.md` files only** — no third-party/community skills, no
> marketplaces, no plugins, no external executable code. Start with the orchestrator.

## Skills

| Skill | Role |
|-------|------|
| [landing-page-orchestrator](landing-page-orchestrator/SKILL.md) | Coordinates all others; decomposes, sequences, reconciles. **Use first.** |
| [product-strategist](product-strategist/SKILL.md) | Positioning, value props, ICP, conversion model, section IA. |
| [story-architect](story-architect/SKILL.md) | Narrative arc, section beats, tension/payoff, CTA logic. |
| [seo-aeo-specialist](seo-aeo-specialist/SKILL.md) | Keywords/entities, metadata, schema.org, AEO answers. |
| [multilingual-copywriter](multilingual-copywriter/SKILL.md) | All copy + i18n keys + transcreated locale variants. |
| [creative-director](creative-director/SKILL.md) | Art direction, layout, type, color, glass, sprites. |
| [motion-director](motion-director/SKILL.md) | Scroll/entrance/micro-interaction motion + reduced-motion. |
| [design-reviewer](design-reviewer/SKILL.md) | Quality gate; scores vs references; routes fixes. |
| [nextjs-architect](nextjs-architect/SKILL.md) | App Router + TS + Tailwind structure, content models, waitlist. |
| [frontend-performance](frontend-performance/SKILL.md) | Core Web Vitals budgets, asset/loading/motion cost. |

## Coordination flow (managed by the orchestrator)

```
Frame → Strategy & Narrative → Content & Discoverability → Experience design
      → Build → Review gate → Merge   (iterate design↔build↔review until PASS)
```

## Project guardrails (from CLAUDE.md)

- **pnpm only** — never npm/yarn.
- Update `docs/` and bump `updated:` frontmatter when structure/data-flow/features change.
- Content stays grounded in the real app — nothing invented.
