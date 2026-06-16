---
tags: [task]
status: todo          # todo | in-progress | blocked | done
priority: high        # low | medium | high
created: 2026-06-16
assigned: unassigned  # e.g. claude-code, or a person
---

# TASK-0002 — App frame: layout shell + SiteHeader nav (S0)

## Context

Depends on [[TASK-0001-bootstrap-nextjs]] (foundation). With the shell bootstrapped, the page
needs its persistent chrome — a minimal, premium header (the "game HUD" nav) and the
composition scaffold that later section tasks slot into. Part of Milestone **M2 — Conversion
MVP** (P1, dev tasks D-10, D-11).

Read first: [[../../planning/02-architecture#4-3-navigation-structure]],
[[../../planning/03-storyboard-motion-visual]] (S0 storyboard + tokens),
[[../../planning/05-copy-multilingual]] (`nav.*` keys), [[../../architecture/overview]].

## Goal

A server-rendered `app/page.tsx` that composes ordered section placeholders, plus a polished,
accessible `SiteHeader` (S0) with the quiet waitlist CTA and a locale-switcher stub.

## Scope

**In scope**
- `components/ui/SiteHeader` (S0): whisper-thin glass bar, gradient wordmark, minimal links
  (Features · RPG System · For Parents · Pricing · FAQ), one quiet **Join the waitlist** CTA,
  locale-switcher stub (EN/日本語/Tiếng Việt, non-functional placeholder).
- Sticky/condense-on-scroll behavior (tiny client island); transparent at top.
- `app/page.tsx` composing section placeholders S0–S12 in order (empty stubs for unbuilt ones).
- Mobile header: logo + hamburger + sticky CTA.

**Out of scope**
- Functional locale routing/switching (TASK-0011).
- Footer (covered in TASK-0004 closing block) — link only.
- Any section content beyond placeholders.

## Relevant Files

- `components/ui/SiteHeader.tsx` — create (server + small client island for scroll/menu).
- `app/page.tsx` — create/extend: ordered section composition.
- `lib/content/nav.ts` (or reuse copy keys) — nav labels per [[../../planning/05-copy-multilingual]].
- `app/layout.tsx` — header mounts in the shell from TASK-0001.

## Acceptance Criteria

- [ ] Header renders the wordmark, nav links, and a single waitlist CTA; CTA scrolls to the S11 waitlist section.
- [ ] Header is transparent at scroll top and condenses (glass) on scroll; respects `prefers-reduced-motion`.
- [ ] Fully keyboard-operable with visible focus rings; mobile menu is ARIA-correct.
- [ ] `app/page.tsx` composes S0–S12 placeholders in the order from the section breakdown.
- [ ] Text contrast meets WCAG AA over the dark canvas.
- [ ] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- Default Server Component; isolate only the scroll/menu state into a client island.
- Use the design tokens (no new colors) from [[../../planning/03-storyboard-motion-visual#8-2-design-tokens]].
- pnpm only.

## Definition of Done

- [ ] Acceptance criteria all pass.
- [ ] New module recorded in [[../../architecture/modules]]; `updated:` bumped (per `CLAUDE.md`).
- [ ] Task file moved from `active/` to `done/`.
</content>
