---
tags: [architecture]
updated: 2026-06-22
---

# Getting Started

> Onboarding and build instructions for the BabyLeveling landing page.

> [!note] Bootstrapped (TASK-0001)
> The Next.js shell is in place — see [[architecture/overview]] for the installed stack.
> **Daily development** below is the steady-state workflow. Stack rationale lives in
> [[decisions/ADR-0001-web-stack]].

## Prerequisites

- **Node.js 20 LTS+** and **pnpm** (`corepack enable pnpm`, or `npm i -g pnpm`).
- Git.
- (For deploy) a Vercel account.

## Bootstrap (historical — already done)

The shell was scaffolded with `create-next-app` pinned to Next 15 (the task predates Next 16,
and the stack is fixed at Next.js 15 + React 19 per [[decisions/ADR-0001-web-stack]]):

```bash
pnpm dlx create-next-app@15.5.19 . \
  --typescript --tailwind --app --eslint --src-dir=false --import-alias "@/*" \
  --use-pnpm
```

Because the repo already held `LICENSE`, `docs/`, `lib/`, `public/`, and `.claude/`,
`create-next-app` refused to scaffold directly into `.` (non-empty dir check). The actual
bootstrap scaffolded into a throwaway temp directory, then the generated `app/`, `package.json`,
`pnpm-lock.yaml`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `next.config.ts`,
and `.gitignore` were copied into the repo root and customized (design tokens, fonts, Lenis,
content-model types — see [[architecture/overview]] and [[data-flow]]).

> [!note] Tailwind v4 — no `tailwind.config.ts`
> `create-next-app@15.5.19` ships Tailwind 4, which configures theme tokens in CSS
> (`app/globals.css`, `@theme inline`) instead of a JS/TS config file. There is no
> `tailwind.config.ts` in this repo by design — see the note in [[architecture/overview]].

If re-bootstrapping from scratch, recreate the planned structure from [[architecture/overview]]:

```bash
mkdir -p components/sections components/ui components/providers lib/content app/api/waitlist public/screenshots
```

## Daily development

```bash
pnpm install       # install dependencies
pnpm dev           # start dev server at http://localhost:3000
pnpm lint          # ESLint
pnpm test          # Vitest unit tests (pnpm test:watch for local watch mode)
pnpm format        # Prettier --write (pnpm format:check for CI)
pnpm build         # production build (verifies SSG/SSR)
pnpm start         # serve the production build locally
```

## Project layout

See [[architecture/overview]] for the full tree and [[architecture/modules]] for module
boundaries and dependency rules.

Unit tests live in the top-level `tests/` folder (`tests/**/*.test.ts`), separate from the
source they cover; they import modules via the `@/*` alias. Run them with `pnpm test`. The
runner is configured in `vitest.config.ts`.

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

Build tooling and config files (`next.config.ts`, `postcss.config.mjs` (Tailwind v4),
`tsconfig.json`, `eslint.config.mjs`, `.prettierrc.json`) are owned here. **Any change to
build config or tooling must be reflected in this file**, with the `updated:` date bumped.

> [!note] Repo hygiene
> The git remote uses SSH (`git@github.com:...`) with a dedicated key — no credentials in the
> URL. A personal access token was previously embedded in the remote and removed; revoke that
> old token at github.com/settings/tokens if not already done.

## Google Search Console

Once the site is deployed to its production domain, verify ownership and submit the sitemap
so Google indexes the site actively rather than waiting to discover it through backlinks.

> [!note] Pre-requisites already done
> `robots.ts` (permissive, AI crawlers allowed) and `public/llms.txt` (AEO fact sheet) are
> already configured — no action needed for those. See [[04-seo-aeo]] for the strategy.

**Step 1 — Add the property**

Go to https://search.google.com/search-console → **Add property** → choose **Domain**
(not "URL prefix") and enter the bare domain (e.g. `babyleveling.app`). Domain property
covers all subdomains and both `http`/`https` in one go.

**Step 2 — Verify via DNS TXT record (recommended for Vercel)**

Search Console will give you a TXT record value like:
```
google-site-verification=XXXXXXXXXXXXXXXXXXXX
```
Add it as a TXT record on your domain registrar (or in Vercel's DNS settings if Vercel
manages DNS). Propagation takes a few minutes to a few hours. Once verified, the property
becomes active.

**Step 3 — Submit the sitemap**

In Search Console → **Sitemaps** → enter `sitemap.xml` → **Submit**. Google will confirm
it found the sitemap and show a page count within 24–48 hours.

**Step 4 — Request indexing for priority pages**

In Search Console → **URL Inspection** → paste each URL → **Request Indexing**. Prioritize
in this order:
1. `https://babyleveling.app/` (home)
2. `/features`, `/rpg-system`, `/parents`, `/pricing`, `/faq`

Google typically processes these within 1–7 days.

**Step 5 — Monitor coverage**

Check back in 3–5 days under **Indexing → Pages**. Watch for:
- **Crawled — currently not indexed**: usually resolves on its own; if persistent, check for
  thin content or canonicalization issues.
- **Excluded by noindex**: should not appear (no `noindex` is set).
- **Redirect errors**: fix any broken redirect chains.

## Related
- [[architecture/overview]]
- [[architecture/modules]]
- [[decisions/ADR-0001-web-stack]]
- [[04-seo-aeo]]
