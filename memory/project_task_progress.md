---
name: project-task-progress
description: BabyLeveling landing page task backlog status — which tasks are done vs. active
metadata:
  type: project
---

TASK-0001 through TASK-0011 are done; TASK-0012 and TASK-0013 remain in active/.

**Why:** Sequential milestone build — each task unlocks the next (M1→M6).

**How to apply:** Next task to pick up is TASK-0012 (content engine) or TASK-0013 (polish/launch). TASK-0013 depends on TASK-0011 (i18n, done) and TASK-0012 (content engine).

## Completed tasks
- TASK-0001: Bootstrap Next.js project
- TASK-0002: App frame + header
- TASK-0003: Hero + Reveal sections
- TASK-0004: Closing block + waitlist
- TASK-0005: Care/XP loop section
- TASK-0006: Feature showcase + parent mode
- TASK-0007: Screenshots + themes + family sharing
- TASK-0008: Motion + performance hardening
- TASK-0009: SEO/AEO metadata, schema, sitemap, robots, llms.txt
- TASK-0010: Depth pages (features, rpg-system, parents, pricing, faq)
- TASK-0011: i18n sub-path locales (/ja, /vi) + transcreated copy (completed 2026-06-17)
  - Native Next.js app/[locale]/ routing, no library
  - LocaleSwitcher real client component (was stub)
  - All 5 depth pages locale-aware with generateStaticParams
  - featureDepth + loopDepth added to dictionary + all 3 locale JSON files
  - ADR-0003 written; overview.md + modules.md updated
  - pnpm build: 25 static pages, clean

## Active tasks
- TASK-0012: Content engine (blog, legal, about pages — M5 reach)
- TASK-0013: Polish + launch readiness (micro-interactions, analytics, audits — M6)
