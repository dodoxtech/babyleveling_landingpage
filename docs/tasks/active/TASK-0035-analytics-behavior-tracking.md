---
tags: [task, analytics, ux, heatmap, performance]
status: todo
priority: medium
created: 2026-06-25
assigned: unassigned
---

# TASK-0035 — Analytics & Behavior Tracking (Vercel Analytics + Microsoft Clarity)

> Add a two-layer observability stack to the landing page: **Vercel Analytics** for page-level
> metrics (views, Web Vitals, bounce, countries) and **Microsoft Clarity** for behavioral
> insight (heatmaps, scroll depth, session recordings). Both are free at current traffic, run
> server-side-safe, and require no cookie banner under their default configurations.

## Context

The site is pre-launch and growing a waitlist. Right now there is zero visibility into:
- Which sections users scroll past vs. drop off at (the scroll-snap story S1→S12 lives or dies on this)
- Whether the waitlist form converts (do users reach S11? do they submit?)
- Which pages get traffic (home vs. depth pages `/features`, `/rpg-system`, etc.)
- What devices/countries the audience is (informs launch timing and locale priority)

### Why these two tools

| | Vercel Analytics | Microsoft Clarity |
|---|---|---|
| Cost | Free (Hobby) / included on Pro | Free, unlimited |
| Setup | `pnpm add @vercel/analytics` + 1 component | Script tag or npm package |
| Data | Page views, unique visitors, Web Vitals, referrers, countries | Heatmaps, scroll maps, session recordings, rage clicks, dead clicks |
| Privacy | No PII, no cookies, GDPR-compliant by design | No PII in recordings, GDPR-compliant |
| Cookie banner needed? | No | No |
| SSR-safe | Yes (Analytics component is client-only, injects nothing server-side) | Yes (loads async) |

PostHog (event funnels) is **out of scope for this task** — add it in a separate task once there
is real traffic to funnel. The waitlist submit event is already tracked via Google Sheets; the
current priority is passive observation, not active instrumentation.

## Goal

1. Every page view is recorded in Vercel Analytics — visible in the Vercel dashboard.
2. Microsoft Clarity is active — heatmaps and session recordings available within 24 h of deploy.
3. No performance regression: Clarity script loads async/deferred, Web Vitals (LCP, CLS, FID) are
   unaffected.
4. No cookie banner is required (both tools operate without consent-gated cookies in their
   default modes).
5. The Clarity project ID is injected via env var, not hardcoded.

## Scope

**In scope**
- `pnpm add @vercel/analytics` and wire `<Analytics />` into the root layout.
- Add Microsoft Clarity via `next/script` with `strategy="afterInteractive"`.
- Store the Clarity project ID in `.env.local` (dev) and as a Vercel env var (prod).
- Update `.example.env.local` with the new key.
- Enable Vercel Analytics in the Vercel project dashboard (one-click toggle — document the step).

**Out of scope**
- Custom event tracking (waitlist submit, CTA clicks) — future task.
- Google Analytics / GA4.
- PostHog or any funnel tooling.
- A/B testing or feature flags.

## Implementation plan

### Step 1 — Vercel Analytics

```bash
pnpm add @vercel/analytics
```

In `app/[locale]/layout.tsx`, import and place the component just before `</body>`:

```tsx
import { Analytics } from "@vercel/analytics/react";

// inside LocaleLayout return, after <LenisProvider>…</LenisProvider>:
<Analytics />
```

`<Analytics />` is a zero-config Client Component that self-initialises. It only fires on the
client, never SSR, so it does not affect Time to First Byte or the server render.

Enable in Vercel dashboard: **Project → Settings → Analytics → Enable**.

### Step 2 — Microsoft Clarity

Get a project ID from [clarity.microsoft.com](https://clarity.microsoft.com) (free sign-up →
New Project → enter site URL).

Add to `.env.local` and `.example.env.local`:
```
NEXT_PUBLIC_CLARITY_ID=<your_project_id>
```

In `app/[locale]/layout.tsx`, add a `<Script>` block. The Clarity snippet must run client-side
after the page is interactive — `strategy="afterInteractive"` ensures it never blocks the
critical path:

```tsx
import Script from "next/script";

// inside LocaleLayout return, after <Analytics />:
{process.env.NEXT_PUBLIC_CLARITY_ID && (
  <Script
    id="ms-clarity"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`,
    }}
  />
)}
```

The `NEXT_PUBLIC_CLARITY_ID` guard means:
- In local dev with no `.env.local` key set → script is not injected (no noise in Clarity).
- In production with the env var → script fires.

### Step 3 — Vercel env var

In Vercel dashboard: **Project → Settings → Environment Variables**:
```
NEXT_PUBLIC_CLARITY_ID = <project_id>   (Production + Preview)
```

### Step 4 — Verify

After deploy:
1. Visit the live site and wait ~30 s.
2. Check Vercel Analytics dashboard — a page view should appear within 1–2 min.
3. Check Clarity dashboard — data takes up to 2 h to appear on first use; the "Recordings" tab
   shows sessions after ~24 h.
4. Run Lighthouse on the live URL — LCP should not regress vs. baseline.

## Acceptance criteria

- [ ] `@vercel/analytics` is in `package.json` dependencies.
- [ ] `<Analytics />` is rendered in `app/[locale]/layout.tsx`.
- [ ] Vercel Analytics is enabled in the project dashboard.
- [ ] `NEXT_PUBLIC_CLARITY_ID` is documented in `.example.env.local`.
- [ ] The Clarity `<Script>` block is in `app/[locale]/layout.tsx` behind the env-var guard.
- [ ] The Clarity project ID is set as a Vercel env var for Production.
- [ ] `pnpm build` passes with no errors or warnings.
- [ ] Lighthouse LCP on `/` is within ±200 ms of the pre-task baseline.
- [ ] A live session recording is visible in the Clarity dashboard within 24 h of deploy.

## Files to change

| File | Change |
|------|--------|
| `app/[locale]/layout.tsx` | Add `<Analytics />` + `<Script id="ms-clarity" …>` |
| `.example.env.local` | Add `NEXT_PUBLIC_CLARITY_ID=` |
| `.env.local` | Add `NEXT_PUBLIC_CLARITY_ID=<id>` (not committed) |
| `package.json` / `pnpm-lock.yaml` | `@vercel/analytics` added |
| `docs/architecture/overview.md` | Add row to Tech Stack table |

## Notes for the implementer

- `dangerouslySetInnerHTML` is acceptable here — the string is not user-controlled, it is a
  compile-time env var interpolated at build time (Next.js replaces `NEXT_PUBLIC_*` vars during
  the build, not at runtime).
- Do **not** load Clarity via `strategy="beforeInteractive"` — it is not needed for correctness
  and would block the parser on every page.
- Clarity's session recording automatically masks all input fields by default (passwords, emails,
  etc.) — no extra configuration needed for the waitlist form.
- If the site ever adds `Content-Security-Policy` headers, `https://www.clarity.ms` and
  `https://c.clarity.ms` will need to be added to `script-src` and `connect-src`.
