---
tags: [task]
status: todo          # todo | in-progress | blocked | done
priority: low         # low | medium | high
created: 2026-06-16
assigned: unassigned  # e.g. claude-code, or a person
---

# TASK-0012 — Content engine: Blog + About + Contact + Legal

## Context

The organic-growth surface and credibility/legal pages. Milestone **M5 — Reach** (P4, dev
tasks D-42, D-43; content C-07, C-08). Depends on [[TASK-0009-seo-aeo-metadata]].

Read first: [[../../planning/04-seo-aeo#9-9-blog-strategy]] (pillars + first posts),
[[../../planning/02-architecture]] (sitemap), [[../../planning/06-execution]] (C-07/C-08).

## Goal

A working blog (index + article route with Article schema) seeded with the first posts, plus
About, Contact, and legal pages — with privacy front-and-center given baby data.

## Scope

**In scope**
- `/blog` index + `/blog/[slug]` (MDX or typed content); `Article` schema + author/datePublished; RSS.
- First 4 posts from the blog strategy pillars (answer-first, schema, internal links, CTA).
- `/about` (mission + the "why"), `/contact` (support/press/partnership + form), `/legal/privacy`, `/legal/terms`.
- Internal links from posts up to relevant pillar pages.

**Out of scope**
- Localizing blog posts (English first).
- A CMS integration (flat content/MDX is fine for launch).

## Relevant Files

- `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, content source (`content/blog/*.mdx` or `lib/content/blog.ts`).
- `app/about/page.tsx`, `app/contact/page.tsx`, `app/legal/privacy/page.tsx`, `app/legal/terms/page.tsx`.
- Reuse the JSON-LD + metadata system from [[TASK-0009-seo-aeo-metadata]].

## Acceptance Criteria

- [ ] Blog index lists posts; each article renders with valid `Article` schema and a waitlist CTA.
- [ ] Four seed posts published, each targeting a long-tail term with internal links.
- [ ] About, Contact, Privacy, Terms render and are linked from the footer.
- [ ] Contact form submits (or clearly routes to email) with validation.
- [ ] RSS feed is valid; no broken links.
- [ ] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- Privacy page must clearly state how baby data is handled (it's the top parent objection).
- Evergreen blog URLs (`/blog/<slug>`, no dates).
- pnpm only.

## Definition of Done

- [ ] Acceptance criteria all pass.
- [ ] New pages documented in `docs/features/*` / sitemap updated; `updated:` bumped.
- [ ] Task file moved from `active/` to `done/`.
</content>
