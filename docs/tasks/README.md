---
tags: [index, home]
---

# Tasks — Working with AI

> How to write task files that an AI agent (Claude Code) can pick up and implement.

Tasks are self-contained briefs an agent can execute without re-deriving context. They live
in this folder and move through a simple lifecycle.

## Lifecycle

```
templates/  →  active/  →  done/
 (copy)        (in progress)   (completed, archived)
```

1. Copy [[templates/task-template]] into `active/` as `TASK-NNNN-short-slug.md`.
2. Fill in every section — especially **Relevant Files** and **Acceptance Criteria**.
3. Hand it to the agent:
   > "Read docs/tasks/active/TASK-0001-bootstrap-nextjs.md and implement it."
4. When the acceptance criteria pass, move the file to `done/`.

## Writing a good task

- **Be specific about scope** — list what's explicitly out of scope, not just in scope.
- **Point to the real files and docs** — link the relevant [[architecture/overview]],
  [[architecture/modules]], or feature docs so the agent has the right context.
- **Make acceptance criteria checkable** — each should be objectively pass/fail.
- **Keep one task = one coherent unit of work.** Split anything that spans many features.

## Numbering

Zero-padded, sequential: `TASK-0001`, `TASK-0002`, … Don't reuse numbers across `active/`
and `done/`.

## Related
- [[templates/task-template]]
- [[../README]]
