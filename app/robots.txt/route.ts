import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt is emitted as a plain-text Route Handler (rather than the typed
 * `MetadataRoute.Robots`) because we declare a `Content-Signal` directive,
 * which the Next.js metadata API cannot express.
 *
 * Policy: permissive by default, with reputable AI crawlers explicitly named  -
 * a deliberate AEO choice, not an oversight. See docs/planning/04-seo-aeo.md
 * §10.5.
 *
 * Content Signals (https://contentsignals.org/) declare how this site's content
 * may be used. We allow search indexing and AI answer-engine input (our AEO
 * strategy) but reserve content from AI model training.
 */
const CONTENT_SIGNAL = "search=yes, ai-input=yes, ai-train=no";

// Reputable AI crawlers we explicitly welcome for AEO reach.
const AI_USER_AGENTS = [
  // Original AI crawlers
  "GPTBot",
  "Google-Extended",
  "PerplexityBot",
  "ClaudeBot",
  // Additional AI crawlers added in TASK-0031
  "anthropic-ai",
  "Applebot-Extended",
  "YouBot",
  "DuckAssistBot",
  "cohere-ai",
  "Bytespider",
];

export function GET(): Response {
  const groups = [
    // Wildcard group carries the Content-Signal declaration so it applies broadly.
    ["User-agent: *", "Allow: /", `Content-Signal: ${CONTENT_SIGNAL}`].join("\n"),
    ...AI_USER_AGENTS.map((ua) => [`User-agent: ${ua}`, "Allow: /"].join("\n")),
  ];

  const body = `${groups.join("\n\n")}\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
