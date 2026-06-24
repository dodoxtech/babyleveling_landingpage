/**
 * Markdown-for-Agents content negotiation  -  shared, framework-free helpers.
 *
 * The site serves HTML to browsers by default, but an AI agent that sends
 * `Accept: text/markdown` gets a markdown rendering of the same page instead
 * (see `app/api/md/route.ts` and the negotiation branch in `middleware.ts`).
 * Keeping the Accept parsing and HTML→markdown conversion here  -  away from
 * the Next request plumbing  -  lets the unit tests exercise the actual logic.
 *
 * Spec: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */

import { NodeHtmlMarkdown } from "node-html-markdown";

export const MARKDOWN_MEDIA_TYPE = "text/markdown";

interface MediaRange {
  type: string;
  q: number;
}

/**
 * Parses an `Accept` header into `{ type, q }` ranges. Unparseable q-values
 * default to 1 (per RFC 9110 §12.4.2). Order is preserved; callers compare on
 * q only, since markdown vs HTML is never a same-q tie we need to break.
 */
function parseAccept(accept: string): MediaRange[] {
  return accept
    .split(",")
    .map((part) => {
      const [rawType, ...params] = part.trim().split(";");
      const type = rawType.trim().toLowerCase();
      if (!type) return null;
      let q = 1;
      for (const param of params) {
        const [key, value] = param.split("=").map((s) => s.trim());
        if (key?.toLowerCase() === "q") {
          const parsed = Number.parseFloat(value);
          if (!Number.isNaN(parsed)) q = parsed;
        }
      }
      return { type, q };
    })
    .filter((range): range is MediaRange => range !== null);
}

/**
 * True when the client explicitly wants markdown at least as much as HTML.
 *
 * Browsers never send `text/markdown`, so its mere presence is a strong agent
 * signal; we still honour q-values so a client that says it prefers HTML
 * (`text/html, text/markdown;q=0.1`) keeps getting HTML. A `text/markdown`
 * with no competing `text/html` range wins outright.
 */
export function prefersMarkdown(accept: string | null | undefined): boolean {
  if (!accept) return false;
  const ranges = parseAccept(accept);

  let markdownQ = -1;
  let htmlQ = -1;
  for (const { type, q } of ranges) {
    if (type === MARKDOWN_MEDIA_TYPE) markdownQ = Math.max(markdownQ, q);
    else if (type === "text/html" || type === "application/xhtml+xml") {
      htmlQ = Math.max(htmlQ, q);
    }
  }

  if (markdownQ < 0 || markdownQ === 0) return false;
  return markdownQ >= htmlQ;
}

/**
 * Extracts the primary content region from a full HTML document. Pages render
 * their body inside a single `<main>` (the persistent `<header>`/`<footer>`
 * chrome lives outside it), so the markdown rendering is the page's actual
 * content without the nav and footer repeated on every route. Falls back to
 * `<body>`, then the whole string, if no `<main>` is present.
 */
export function extractMainHtml(html: string): string {
  const main = /<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(html);
  if (main) return main[1];
  const body = /<body\b[^>]*>([\s\S]*?)<\/body>/i.exec(html);
  if (body) return body[1];
  return html;
}

/**
 * Converts a page's HTML into clean markdown. Decorative/non-content nodes
 * (scripts, styles, inline SVG/canvas used by the 3D hero and motion layers)
 * are dropped so the output is the readable text an agent actually wants.
 */
export function htmlToMarkdown(html: string): string {
  return NodeHtmlMarkdown.translate(
    extractMainHtml(html),
    {
      ignore: ["script", "style", "svg", "canvas", "noscript"],
    },
  ).trim();
}

/**
 * Approximate token count for the `x-markdown-tokens` response header. A precise
 * count needs the model's tokenizer; agents use this header as a budgeting hint,
 * so the common ~4-chars-per-token heuristic is sufficient and dependency-free.
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}
