# BabyLeveling Landing Page — Claude Code Guide

Marketing + waitlist website for the **BabyLeveling** iOS/watchOS app (a gamified baby
tracker). Planned stack: **Next.js (App Router) + TypeScript + Tailwind CSS**, deployed on
Vercel. See `docs/` for the full architecture and decisions.

> [!note] The repo is pre-implementation — only `LICENSE` + `docs/` exist today. Start from
> `docs/setup/getting-started.md` (Bootstrap section).

## Package manager (REQUIRED)

> This project uses **pnpm** as its only package manager. Do **not** use `npm` or `yarn` —
> mixing managers creates conflicting lockfiles.

- Install deps: `pnpm install`
- Add a dependency: `pnpm add <pkg>` (`pnpm add -D <pkg>` for dev deps)
- Run scripts: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm start`
- One-off binaries: `pnpm dlx <pkg>` (the pnpm equivalent of `npx`)
- The committed lockfile is `pnpm-lock.yaml`; never commit `package-lock.json` or `yarn.lock`.

## Documentation Rules (REQUIRED)

> Any change to **project structure**, **data flow**, or **features** must be reflected in
> `docs/`, and the `updated:` frontmatter date of the edited file must be bumped to today.

### When to update docs

| Change | File to update |
|--------|----------------|
| Add / remove / rename a module | `docs/architecture/modules.md` |
| Change module dependencies | `docs/architecture/modules.md` |
| Add / modify a data model | `docs/architecture/data-flow.md` |
| Change data or state flow | `docs/architecture/data-flow.md` |
| Add a new feature | Create `docs/features/<feature>.md` |
| Major tech or architecture decision | Create `docs/decisions/ADR-NNNN-*.md` |
| Add a dependency | `docs/architecture/overview.md` (Tech Stack) |
| Change build config or tooling | `docs/setup/getting-started.md` |

### No doc update needed when

- Adding a new UI view that introduces no structural change
- Bug fixes in existing logic
- Refactoring that doesn't change a module's public API

## Docs layout

```
docs/
├── README.md            → vault index / navigation hub
├── architecture/        → overview, modules, data-flow
├── features/            → one file per user-facing feature
├── decisions/           → Architecture Decision Records (ADRs)
├── setup/               → onboarding + build instructions
└── tasks/               → AI task briefs (active / done / templates)
```

Docs use Obsidian-style `[[wikilinks]]` and YAML frontmatter. The vault is the source of
truth for architecture and decisions.
