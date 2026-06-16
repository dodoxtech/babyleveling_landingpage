import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * See docs/planning/02-architecture.md §4.1 (sitemap tree). Only `/` exists
 * today — the depth pages (`/features`, `/rpg-system`, `/parents`,
 * `/pricing`, `/faq`) land in TASK-0010 and extend this list then.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
