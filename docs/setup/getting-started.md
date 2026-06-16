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

- **Node.js 20 LTS+** and **pnpm** (`corepack enable pnpm`, or `npm i -g pnpm`).
- Git.
- (For deploy) a Vercel account.

## Bootstrap (first time only)

Scaffold a Next.js + TypeScript + Tailwind project in the repo root:

```bash
# from the repo root (keep existing LICENSE and docs/)
pnpm dlx create-next-app@latest . \
  --typescript --tailwind --app --eslint --src-dir=false --import-alias "@/*" \
  --use-pnpm
```

Then create the planned structure from [[architecture/overview]]:

```bash
mkdir -p components/sections components/ui lib/content app/api/waitlist public/screenshots
```

Commit the scaffold, then update [[architecture/overview]] (mark the stack "installed") and
bump its `updated:` date.

## Daily development

```bash
pnpm install       # install dependencies
pnpm dev           # start dev server at http://localhost:3000
pnpm lint          # ESLint
pnpm build         # production build (verifies SSG/SSR)
pnpm start         # serve the production build locally
```

## Project layout

See [[architecture/overview]] for the full tree and [[architecture/modules]] for module
boundaries and dependency rules.

## Sprite assets

Baby character art and activity icons are sliced from source character sheets by a Python
pipeline in `tools/sprites/` (requires Python 3 + Pillow). It outputs individual transparent
PNGs to `public/sprites/<group>/<name>.png` and a typed index at `lib/content/sprites.ts`.

```bash
python3 -m pip install -r tools/sprites/requirements.txt   # one-time
python3 tools/sprites/export_sprites.py                    # export all sheets
```

After bootstrap, add a script to `package.json` so it runs as `pnpm sprites`:

```json
{ "scripts": { "sprites": "python3 tools/sprites/export_sprites.py" } }
```

Full details (manifests, crop tuning, background removal, usage in components) live in
`tools/sprites/README.md`. The generated `public/sprites/` PNGs and `lib/content/sprites.ts`
are checked in; `tools/sprites/preview/` (QA contact sheets) is gitignored.

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

> [!note] Repo hygiene
> The git remote uses SSH (`git@github.com:...`) with a dedicated key — no credentials in the
> URL. A personal access token was previously embedded in the remote and removed; revoke that
> old token at github.com/settings/tokens if not already done.

## Related
- [[architecture/overview]]
- [[architecture/modules]]
- [[decisions/ADR-0001-web-stack]]
