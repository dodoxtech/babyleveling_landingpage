---
tags: [task]
status: done           # todo | in-progress | blocked | done
priority: high        # low | medium | high
created: 2026-06-16
assigned: claude-code  # e.g. claude-code, or a person
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

- [x] Header renders the wordmark, nav links, and a single waitlist CTA; CTA scrolls to the S11 waitlist section.
- [x] Header is transparent at scroll top and condenses (glass) on scroll; respects `prefers-reduced-motion`.
- [x] Fully keyboard-operable with visible focus rings; mobile menu is ARIA-correct.
- [x] `app/page.tsx` composes S0–S12 placeholders in the order from the section breakdown.
- [x] Text contrast meets WCAG AA over the dark canvas.
- [x] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- Default Server Component; isolate only the scroll/menu state into a client island.
- Use the design tokens (no new colors) from [[../../planning/03-storyboard-motion-visual#8-2-design-tokens]].
- pnpm only.

## Definition of Done

- [x] Acceptance criteria all pass.
- [x] New module recorded in [[../../architecture/modules]]; `updated:` bumped (per `CLAUDE.md`).
  Also updated [[../../architecture/overview]] (project layout diagram) and
  [[../../architecture/data-flow]] (new `nav.ts` content model) since both changed too.
- [x] Task file moved from `active/` to `done/`.

## Implementation Notes (post-completion)

- **Files added:** `components/ui/SiteHeader.tsx` (server shell), `components/ui/SiteHeaderClient.tsx`
  (the only client island — scroll-condense + mobile menu state), `lib/content/nav.ts`
  (`navLinks`, `navCta`, `localeOptions`, `wordmark`). `app/page.tsx` rewritten to compose
  S1–S12 ordered placeholders (S0 mounts once in `app/layout.tsx` as persistent chrome).
  `app/layout.tsx` wired to render `<SiteHeader />` inside `LenisProvider`.
- **Nav anchor mapping:** the standalone `/features`, `/rpg-system`, `/parents`, `/pricing`
  depth pages (sitemap tier 2) don't exist yet, so each nav link anchors to the landing
  section covering the same topic instead: Features → S5 (`#features`), RPG System → S4
  Care-to-XP loop (`#rpg-system`, since that's the mechanic `/rpg-system` will explain),
  For Parents → S6 (`#parents`), Pricing → S11 waitlist (`#waitlist`, since pricing isn't
  set pre-launch per the FAQ copy), FAQ → S10 (`#faq`).
  - **Known accessibility fix applied:** the planning doc's "verify CTA gradient on glass"
    callout ([[../../planning/03-storyboard-motion-visual#8-6-accessibility]]) was a real
    issue — `text-hi` on the solid `--grad-plasma` fill measures ~3.2:1 at the hot-pink end,
    under the 4.5:1 AA threshold for normal text. The CTA instead uses a glass pill with a
    `--grad-plasma-to` border (5.58:1 against `--bg-void`) and a plain `text-hi` label, so
    the gradient stays an accent rather than a text background. The wordmark (gradient
    text) was bumped to `text-xl font-bold` (20px bold) to clear the WCAG "large text" 3:1
    threshold at the gradient's worst point (3.46:1 purple-on-void).
  - All other interactive text verified ≥ 4.5:1 (or ≥3:1 where it qualifies as large text)
    against `--bg-void` and the condensed `.glass` surface — see contrast figures above.
</content>
