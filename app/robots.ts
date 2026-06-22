import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Permissive by default, with reputable AI crawlers explicitly named  -  a
 * deliberate AEO choice, not an oversight. See docs/planning/04-seo-aeo.md
 * §10.5.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Original AI crawlers
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      // Additional AI crawlers added in TASK-0031
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
      { userAgent: "DuckAssistBot", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
