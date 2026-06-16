---
tags: [index, home]
---

# BabyLeveling — Landing Page Docs

> Obsidian vault and source of truth for the **BabyLeveling** marketing landing page.

BabyLeveling is a gamified baby-tracking iOS + Apple Watch app — track feeding, sleep,
and growth as if your baby were a character leveling up in an RPG. **This repository is
the public landing / waitlist site that markets that app.**

> [!note] Project status
> The landing page is **implemented through Milestone M4** (TASK-0001–0010): the full
> one-page narrative (S1–S12), motion/performance hardening, SEO/AEO metadata, and the
> five depth pages all ship. See `docs/tasks/done/` for what's landed and
> [[decisions/ADR-0001-web-stack]] for the architecture decision behind it. Feature
> content is grounded in the real app it promotes, not invented.

## Navigation

### Architecture
- [[architecture/overview]] — tech stack + project layout
- [[architecture/modules]] — modules and their dependencies
- [[architecture/data-flow]] — content models + state flow between layers

### Features
- [[features/hero-section]] — above-the-fold hero + primary CTA
- [[features/feature-showcase]] — gameplay feature grid (XP, quests, skill tree…)
- [[features/parent-mode]] — RPG ⟷ Parent mode toggle
- [[features/theme-gallery]] — Royal / Warrior / Zen theme showcase
- [[features/screenshot-gallery]] — app screenshot carousel
- [[features/family-sharing]] — co-op party / family sharing
- [[features/waitlist-signup]] — email capture / waitlist
- [[features/faq]] — frequently asked questions
- [[features/depth-pages]] — /features, /rpg-system, /parents, /pricing SEO depth pages

### Decisions
- [[decisions/README]] — ADR index
- [[decisions/ADR-0001-web-stack]] — choose Next.js + Tailwind

### Planning
- [[planning/README]] — the complete 20-part landing-page planning package (strategy → tasks)
- [[planning/01-strategy]] · [[planning/02-architecture]] · [[planning/03-storyboard-motion-visual]] · [[planning/04-seo-aeo]] · [[planning/05-copy-multilingual]] · [[planning/06-execution]] · [[planning/reconciliation-log]]

### Setup
- [[setup/getting-started]] — onboarding + build instructions

### Tasks
- [[tasks/README]] — how to write tasks for AI
- `tasks/active/` — tasks in progress
- `tasks/done/` — completed tasks
- `tasks/templates/task-template` — reusable template

## Conventions

- Every doc starts with YAML frontmatter (tags + a date field where relevant).
- Cross-link with Obsidian `[[wikilinks]]`.
- When you change structure, data flow, or features, update the matching doc and bump its
  `updated:` date. See the **Documentation Rules** table in the repo `CLAUDE.md`.
