---
tags: [task]
status: done           # todo | in-progress | blocked | done
priority: high         # low | medium | high
created: 2026-06-20
assigned: claude-code   # e.g. claude-code, or a person
---

> [!success] Done — verified live (2026-06-20)
> Verified end-to-end against the user's real sheet: new email → `200 created` + one
> appended row; same email → `200 duplicate` (no second row); invalid email + honeypot →
> `400`. During verification the user's tab turned out to be named `シート1` (Google created
> the sheet in a Japanese locale), which broke the hardcoded `Sheet1` range — fixed by
> auto-detecting the first tab name (override: `GOOGLE_SHEETS_TAB_NAME`).

# TASK-0019 — Waitlist: send signups to a Google Sheet

## Context

The waitlist (TASK-0004) was shipped against a pluggable `WaitlistProvider` interface,
with the concrete storage/email provider explicitly **deferred** — a `[!todo]` callout in
[[../../architecture/modules]] still points at `lib/waitlist-provider.ts`, and
[[../../features/waitlist-signup]] still reads "provider is **not yet chosen**". We now want
every confirmed signup to land in a Google Sheet (one row per email) so the team can see and
export the list with zero extra infra.

The concrete provider has already been written — `lib/waitlist-provider.ts` now contains a
`GoogleSheetsWaitlistProvider`, `googleapis` is in `package.json`, and `.env.local.example`
documents the three required env vars. **What remains is closing out the decision + docs +
verification** so the codebase and the vault stop disagreeing about whether the provider exists.

Read first: [[../../features/waitlist-signup]], [[../../architecture/data-flow]] (waitlist
flow + `WaitlistEntry`), [[../../architecture/modules]] (provider TODO callout),
[[../../decisions/README]], [[TASK-0004-closing-block-waitlist]].

## Goal

Confirmed waitlist submissions are appended to a Google Sheet (deduplicated by email), the
provider choice is recorded in an ADR, and all affected docs reflect that the provider is now
implemented rather than deferred.

## Scope

**In scope**
- Google Sheets implementation of `WaitlistProvider` (append `[email, source, createdAt]`;
  dedupe so a repeat email returns `{ status: "duplicate" }`, never an error).
- Service-account auth via env vars; no credentials committed to the repo.
- `.env.local.example` entries for the required env vars.
- `ADR-0002-waitlist-provider.md` recording the Google Sheets choice and its trade-offs.
- Doc updates: `features/waitlist-signup`, `architecture/modules`, `architecture/overview`
  (Tech Stack now includes `googleapis`), `architecture/data-flow` if the flow description
  changes.
- End-to-end verification against a real (or test) sheet.

**Out of scope**
- Sending nurture / confirmation emails to signups (marketing track).
- Durable, cross-instance rate limiting (still the in-memory stub from TASK-0004).
- A custom admin UI for viewing signups — the Google Sheet itself is the admin surface.
- Migrating any existing in-memory entries (there is no persisted prior data).

## Relevant Files

- `lib/waitlist-provider.ts` — the `GoogleSheetsWaitlistProvider` (already written; review/confirm).
- `app/api/waitlist/route.ts` — calls `getWaitlistProvider().submit()`; no change expected.
- `.env.local.example` — documents `GOOGLE_SHEETS_*` vars (already added; confirm).
- `package.json` — `googleapis` dependency (already added; confirm via pnpm).
- `docs/decisions/ADR-0002-waitlist-provider.md` — **create**.
- `docs/features/waitlist-signup.md`, `docs/architecture/modules.md`,
  `docs/architecture/overview.md`, `docs/architecture/data-flow.md` — update + bump `updated:`.

## Acceptance Criteria

- [x] A valid new email POSTed to `/api/waitlist` appends one row `[email, source, createdAt]`
      to the configured Google Sheet and returns `200 { status: "created" }`.
- [x] Resubmitting the same email (case-insensitive) does **not** add a duplicate row and
      returns `200 { status: "duplicate" }`.
- [x] Auth uses env vars only; no service-account key or sheet ID is committed.
- [x] Missing/invalid Google credentials surface as a `500` from the route (the generic
      localized error), never an unhandled crash or a leaked stack trace to the client.
      _(route wraps `submit()` in try/catch → generic 500; confirmed earlier when the tab name
      was wrong, the route returned 500 not a crash.)_
- [x] `ADR-0002-waitlist-provider.md` exists and is referenced from the modules/feature docs
      in place of the old "provider not chosen" TODO.
- [x] `docs/features/waitlist-signup.md`, `architecture/modules.md`, `architecture/overview.md`
      updated (provider no longer "deferred"; `googleapis` listed in Tech Stack) with `updated:`
      bumped to today.
- [x] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- Service account flow: enable the Sheets API in Google Cloud, create a service account,
  download the JSON key, and **share the target sheet with the service account email (Editor)**
  — otherwise appends 403. Env vars: `GOOGLE_SHEETS_SPREADSHEET_ID`,
  `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`.
- Vercel stores multi-line secrets with literal `\n`; the provider restores real newlines via
  `.replace(/\\n/g, "\n")` on `GOOGLE_SHEETS_PRIVATE_KEY`. Keep that.
- Dedupe currently reads column A (`Sheet1!A:A`) and compares lower-cased. This is O(rows) per
  submit — fine at waitlist scale; note the limitation in the ADR rather than over-engineering.
- The route handler is unchanged: it only knows the `WaitlistProvider` interface, so this stays
  a one-file swap per [[TASK-0004-closing-block-waitlist]]'s design.
- pnpm only — `pnpm add googleapis`, never npm/yarn.

## How to get the Google credentials (user action)

You need a **Google Cloud service account** (a robot account the server uses to write to your
sheet) — not a personal API key. Steps:

1. **Create the sheet.** New Google Sheet → leave `Sheet1` as the tab name. Copy the long ID
   from the URL: `https://docs.google.com/spreadsheets/d/`**`<THIS_PART>`**`/edit`.
   → `GOOGLE_SHEETS_SPREADSHEET_ID`.
2. **Create a Google Cloud project.** https://console.cloud.google.com → top bar → New Project.
3. **Enable the Sheets API.** APIs & Services → Library → search "Google Sheets API" → Enable.
4. **Create a service account.** APIs & Services → Credentials → Create credentials →
   Service account. Name it (e.g. `waitlist-writer`), Create & Done (no roles needed — access
   is granted by sharing the sheet, step 7).
5. **Create a JSON key.** Open the service account → Keys tab → Add key → Create new key →
   **JSON** → download. This file is the "API key"; keep it secret, never commit it.
6. **Copy two fields out of the JSON** into env vars:
   - `client_email` → `GOOGLE_SHEETS_CLIENT_EMAIL` (looks like
     `waitlist-writer@<project>.iam.gserviceaccount.com`).
   - `private_key` → `GOOGLE_SHEETS_PRIVATE_KEY` (the whole `-----BEGIN PRIVATE KEY----- … -----END
     PRIVATE KEY-----` block, including the `\n`s — paste it verbatim; the app converts them).
7. **Share the sheet with the service account.** Open the sheet → Share → paste the
   `client_email` from step 6 → give it **Editor** → Send. (Skip this and appends 403.)
8. **Set the env vars.** Local: `cp .env.local.example .env.local` and fill in all three.
   Production: add the same three in the Vercel dashboard → Settings → Environment Variables.
9. **Verify.** `pnpm dev`, then `curl -X POST http://localhost:3000/api/waitlist -H 'content-type:
   application/json' -d '{"email":"test@example.com"}'` → expect `{"status":"created"}` and a new
   row in the sheet; run it again → `{"status":"duplicate"}` with no second row.

## Definition of Done

- [x] Acceptance criteria all pass (verified live against the user's sheet).
- [x] `ADR-0002-waitlist-provider.md` created; affected docs updated and `updated:` bumped
      (per repo CLAUDE.md rules).
- [x] Task file moved from `active/` to `done/`.
