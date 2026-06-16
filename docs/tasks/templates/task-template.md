---
tags: [task]
status: todo          # todo | in-progress | blocked | done
priority: medium      # low | medium | high
created: 2026-06-16
assigned: unassigned  # e.g. claude-code, or a person
---

# TASK-NNNN — <short title>

## Context

Why this task exists. Link the relevant docs so the agent has full context, e.g.
[[architecture/overview]], [[architecture/modules]], or a feature like
[[features/waitlist-signup]].

## Goal

One or two sentences: the outcome when this is done.

## Scope

**In scope**
- …

**Out of scope**
- …

## Relevant Files

- `path/to/file` — what it is / what to change
- (list the files the agent should read or create)

## Acceptance Criteria

- [ ] Objective, checkable condition 1
- [ ] Objective, checkable condition 2
- [ ] `pnpm build` succeeds with no errors

## Technical Notes

Constraints, gotchas, preferred patterns, links to ADRs (e.g. [[decisions/ADR-0001-web-stack]]).

## Definition of Done

- [ ] Acceptance criteria all pass
- [ ] Affected docs updated and `updated:` date bumped (per repo CLAUDE.md rules)
- [ ] Task file moved from `active/` to `done/`
