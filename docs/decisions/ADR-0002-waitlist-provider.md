---
tags: [adr]
status: accepted
date: 2026-06-20
---

# ADR-0002 — Store waitlist signups in a Google Sheet

## Context

The waitlist (TASK-0004) shipped against a pluggable `WaitlistProvider` interface with the
concrete storage backend deferred (see the original "provider not chosen" notes in
[[architecture/modules]] and [[features/waitlist-signup]]). Candidates floated at the time
were Resend, Mailchimp, and Supabase.

The actual need pre-launch is modest: capture a confirmed email (plus a `source` tag and a
server timestamp), keep the list deduplicated, and let a small team **see and export** it with
no extra infrastructure to run or pay for. We are not yet sending nurture or confirmation
emails (that is a separate marketing track), so an email-sending provider is premature.

Requirements that shape the choice:
- **Near-zero ops / cost** — tiny team, pre-launch; no DB to provision or bill.
- **Human-readable list** — the team wants to glance at and export signups directly.
- **Dedupe** — a repeat email must not create a duplicate entry.
- **Swappable** — must sit behind the existing `WaitlistProvider` interface so the route
  handler is unchanged and a future migration (to a real ESP/DB) is a one-file swap.

## Decision

Implement `WaitlistProvider` as a **Google Sheets** backend (`GoogleSheetsWaitlistProvider`
in `lib/waitlist-provider.ts`), authenticated with a **Google Cloud service account**.

- Each confirmed signup appends one row `[email, source, createdAt]` to the sheet's first
  tab. The tab name is **auto-detected** from the spreadsheet metadata (Google localizes the
  default tab — `Sheet1` / `シート1` / `Trang tính1` …), overridable via `GOOGLE_SHEETS_TAB_NAME`.
- Dedupe by reading column A and comparing lower-cased; a known email returns
  `{ status: "duplicate" }` (still a `200` to the client), a new one `{ status: "created" }`.
- Auth via the `googleapis` SDK and three env vars — `GOOGLE_SHEETS_SPREADSHEET_ID`,
  `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY` — documented in
  `.env.local.example`. No credentials are committed; the private key's literal `\n` (as
  Vercel stores it) is restored to real newlines at runtime.
- The route handler (`app/api/waitlist/route.ts`) is untouched — it still depends only on the
  `WaitlistProvider` interface via `getWaitlistProvider()`.

## Consequences

✅ Zero infrastructure and zero cost at waitlist scale — no DB to run, within Sheets API free quota.
✅ The team reads, sorts, filters, and exports the list directly in a familiar spreadsheet.
✅ Dedupe and the `created`/`duplicate` contract are preserved exactly as TASK-0004 specified.
✅ Stays behind `WaitlistProvider`, so migrating to an ESP/DB later is a single-file change.

⚠️ Not a real database: dedupe reads column A on every submit (O(rows)) and the Sheets API has
   per-minute write quotas — fine for a waitlist, not for high-volume writes.
⚠️ A Google Cloud service account must be created and the sheet shared with it (Editor); a
   misconfigured key or unshared sheet surfaces as a `500` from the route.
⚠️ Sending launch/nurture emails is out of scope here — that needs a separate ESP decision
   (a future ADR) since a spreadsheet can't send mail.
⚠️ Google Sheets is not a long-term system of record; treat it as a pre-launch capture tool.

## Related
- [[features/waitlist-signup]]
- [[architecture/data-flow]]
- [[architecture/modules]]
- [[decisions/README]]
