---
tags: [architecture]
updated: 2026-06-16
---

# Getting Started

> Onboarding and build instructions for the BabyLeveling landing page.

> [!warning] Pre-implementation
> The app code does not exist yet — the repo currently holds only a `LICENSE` and this
> `docs/` vault. The **Bootstrap** section below is the first task; everything after it is
> the steady-state workflow once the project is scaffolded. Stack rationale lives in
> [[decisions/ADR-0001-web-stack]].

## Prerequisites

- **Node.js 20 LTS+** and a package manager (`npm`, `pnpm`, or `yarn`).
- Git.
- (For deploy) a Vercel account.

## Bootstrap (first time only)

Scaffold a Next.js + TypeScript + Tailwind project in the repo root:

```bash
# from the repo root (keep existing LICENSE and docs/)
npx create-next-app@latest . \
  --typescript --tailwind --app --eslint --src-dir=false --import-alias "@/*"
```

Then create the planned structure from [[architecture/overview]]:

```bash
mkdir -p components/sections components/ui lib/content app/api/waitlist public/screenshots
```

Commit the scaffold, then update [[architecture/overview]] (mark the stack "installed") and
bump its `updated:` date.

## Daily development

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:3000
npm run lint       # ESLint
npm run build      # production build (verifies SSG/SSR)
npm start          # serve the production build locally
```

## Project layout

See [[architecture/overview]] for the full tree and [[architecture/modules]] for module
boundaries and dependency rules.

## Environment variables

The waitlist endpoint needs provider credentials once a provider is chosen (see
[[features/waitlist-signup]]). Store them in `.env.local` (git-ignored), e.g.:

```
# .env.local — fill in once the email provider is selected
WAITLIST_PROVIDER_API_KEY=
```

## Deployment

- Push to the default branch → Vercel builds and deploys production.
- Each PR gets a preview deployment.

## Build configuration

Build tooling and config files (`next.config.js`, `tailwind.config.ts`, `tsconfig.json`,
ESLint/Prettier) are owned here. **Any change to build config or tooling must be reflected
in this file**, with the `updated:` date bumped.

> [!warning] Repo hygiene
> The git remote currently embeds a GitHub personal access token in its URL. Rotate that
> token and re-add the remote without credentials before sharing or pushing.

## Related
- [[architecture/overview]]
- [[architecture/modules]]
- [[decisions/ADR-0001-web-stack]]
