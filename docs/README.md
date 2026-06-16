---
tags: [index, home]
---

# BabyLeveling — Landing Page Docs

> Obsidian vault and source of truth for the **BabyLeveling** marketing landing page.

BabyLeveling is a gamified baby-tracking iOS + Apple Watch app — track feeding, sleep,
and growth as if your baby were a character leveling up in an RPG. **This repository is
the public landing / waitlist site that markets that app.**

> [!note] Project status
> The landing page is **pre-implementation**. Today the repo contains only a `LICENSE`.
> These docs describe the *intended* architecture (see [[decisions/ADR-0001-web-stack]])
> so the build can start from a documented plan rather than guesswork. Feature content is
> grounded in the real app it promotes, not invented.

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
