import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * See docs/planning/02-architecture.md §4.1 (sitemap tree). The five
 * TASK-0010 depth pages are tier-2 (P1/P3): real, useful, but secondary to
 * the home conversion hub, so they get `priority: 0.7` against home's `1`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...(
      ["/features", "/rpg-system", "/parents", "/pricing", "/faq"] as const
    ).map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
