import type { NextRequest } from "next/server";
import {
  estimateTokens,
  htmlToMarkdown,
  MARKDOWN_MEDIA_TYPE,
} from "@/lib/markdown/negotiation";

/**
 * GET /api/md?path=/features  -  internal endpoint that renders any page as
 * markdown for the Markdown-for-Agents content negotiation (see middleware.ts).
 *
 * Agents never hit this directly: `middleware.ts` rewrites a request that sent
 * `Accept: text/markdown` here, preserving the original path. We re-request that
 * same path as HTML (the self-fetch carries `Accept: text/html`, so middleware
 * does *not* re-intercept it  -  no loop) and convert the rendered `<main>` to
 * markdown. Driving the conversion off the real HTML keeps the markdown in sync
 * with the page automatically, across all routes and locales, with no per-page
 * markdown to maintain.
 *
 * Node runtime (not edge): the HTML→markdown conversion uses node-html-markdown.
 */
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  // `x-md-path` is set by the middleware rewrite; the `path` query param is a
  // fallback that makes the endpoint directly testable (curl /api/md?path=/x).
  const path =
    request.headers.get("x-md-path") ||
    request.nextUrl.searchParams.get("path") ||
    "/";

  // Only ever re-fetch a same-origin, absolute page path  -  never an external
  // URL an attacker could smuggle in via the query string.
  if (!path.startsWith("/") || path.startsWith("//")) {
    return new Response("Bad Request", { status: 400 });
  }

  // Use the internal Vercel deployment URL for the self-fetch when running on
  // Vercel, rather than the public hostname. The public domain may sit behind
  // Cloudflare (or another proxy) that blocks server-to-server requests from
  // Vercel IPs with 403. VERCEL_URL is always the raw .vercel.app origin,
  // bypassing any proxy layer. Falls back to request.nextUrl.origin locally.
  const selfOrigin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : request.nextUrl.origin;
  const target = new URL(path, selfOrigin);

  let htmlResponse: Response;
  try {
    htmlResponse = await fetch(target, {
      headers: { Accept: "text/html" },
      // Forward the agent's language preference so /ja and /vi pages render
      // in-locale when the negotiated path is locale-prefixed.
      redirect: "follow",
    });
  } catch {
    return new Response("Bad Gateway", { status: 502 });
  }

  if (!htmlResponse.ok) {
    return new Response(`# Not found\n\nNo page at \`${path}\`.\n`, {
      status: htmlResponse.status,
      headers: { "Content-Type": `${MARKDOWN_MEDIA_TYPE}; charset=utf-8` },
    });
  }

  const html = await htmlResponse.text();
  const markdown = htmlToMarkdown(html);

  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": `${MARKDOWN_MEDIA_TYPE}; charset=utf-8`,
      "x-markdown-tokens": String(estimateTokens(markdown)),
      // HTML and markdown share a URL; tell caches the response varies by Accept.
      Vary: "Accept",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
