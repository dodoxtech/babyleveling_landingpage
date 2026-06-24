---
tags: [feature]
status: implemented
updated: 2026-06-24
---

# Markdown for Agents

> Content negotiation so AI agents can request a markdown rendering of any page,
> while HTML stays the default for browsers.

## What it does

When a `GET` request prefers `Accept: text/markdown`, the site responds with a
markdown rendering of that page instead of HTML. Browsers — which never send
`text/markdown` — keep getting the normal HTML response. Same URL, two
representations, selected by the `Accept` header (and cached separately via
`Vary: Accept`).

Implements the [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/)
convention. This site is on Vercel, not Cloudflare, so the negotiation is done
in application code rather than at the edge zone.

## How it works

```
Agent  ──GET / , Accept: text/markdown──▶  middleware.ts
                                             │ prefersMarkdown(accept) === true
                                             ▼
                              rewrite → /api/md  (x-md-path: /)
                                             │
                                             ▼
                              app/api/md/route.ts
                                 │ self-fetch GET / with Accept: text/html
                                 │   (middleware does NOT re-intercept — no loop)
                                 ▼
                              rendered HTML → extractMainHtml → node-html-markdown
                                 ▼
                  200 text/markdown; charset=utf-8
                  x-markdown-tokens: <count>   Vary: Accept
```

1. **`lib/markdown/negotiation.ts`** — framework-free helpers (so they're unit
   testable): `prefersMarkdown()` parses the `Accept` header with q-values and
   returns true only when markdown is wanted at least as much as HTML;
   `extractMainHtml()` slices out the page's `<main>` (dropping the persistent
   header/footer chrome); `htmlToMarkdown()` converts it via `node-html-markdown`
   (ignoring `script`/`style`/`svg`/`canvas`); `estimateTokens()` produces the
   `x-markdown-tokens` hint (~4 chars/token).
2. **`middleware.ts`** — a markdown-preferring GET is rewritten to `/api/md`,
   with the original path passed in the `x-md-path` request header. HTML
   responses also get `Vary: Accept` so a cache never serves a browser's HTML
   copy to an agent.
3. **`app/api/md/route.ts`** (Node runtime) — re-requests the same path as HTML
   (the self-fetch's `Accept: text/html` means middleware ignores it, so there's
   no loop), converts the `<main>` to markdown, and returns it with
   `Content-Type: text/markdown; charset=utf-8` + `x-markdown-tokens`. A
   non-200 upstream yields a `# Not found` markdown body at the same status.

Driving the markdown off the real rendered HTML means it stays in sync with
every page and locale (`/`, `/ja`, `/vi`, depth pages, blog) automatically, with
no per-page markdown to maintain. This complements the curated `llms.txt` /
`llms-full.txt`, which remain the concise whole-site summaries for crawlers.

## Why a request header, not a query param

The middleware passes the negotiated path to `/api/md` via the `x-md-path`
request header. A rewritten query string was not reliably surfaced to the route
handler (it read the default `/`), whereas rewritten request headers are
forwarded consistently. `/api/md?path=…` still works as a direct-testing
fallback.

## Verifying

```bash
# Agent: markdown
curl -i -H "Accept: text/markdown" https://SITE/        # → text/markdown + x-markdown-tokens
curl -i -H "Accept: text/markdown" https://SITE/features
# Browser: still HTML
curl -i -H "Accept: text/html"     https://SITE/        # → text/html
```

External validator: `POST https://isitagentready.com/api/scan` with
`{"url":"https://SITE"}` — expect
`checks.contentAccessibility.markdownNegotiation.status === "pass"`.

Unit tests: `tests/markdown-negotiation.test.ts`.
