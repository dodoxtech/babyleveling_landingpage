---
tags: [index, home]
---

# Architecture Decision Records

> Significant, hard-to-reverse decisions for the BabyLeveling landing page.

Each ADR captures one decision: its **Context**, the **Decision**, and its **Consequences**
(✅ benefits / ⚠️ trade-offs). ADRs are append-only — supersede rather than rewrite.

## Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [[ADR-0001-web-stack]] | Use Next.js + Tailwind for the landing page | accepted | 2026-06-16 |

## Writing a new ADR

1. Copy the structure of an existing ADR.
2. Name it `ADR-NNNN-short-slug.md` (zero-padded, next number).
3. Sections: **Context / Decision / Consequences / Related**.
4. Set `status: accepted` and `date:` to today.
5. Add a row to the table above.

> [!note] Decisions still pending
> The waitlist email provider (Resend / Mailchimp / Supabase) is not yet chosen — when it
> is, record it as ADR-0002. See [[features/waitlist-signup]].
