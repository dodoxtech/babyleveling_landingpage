import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { locales } from "@/lib/i18n/config";
import { localeHref } from "@/lib/i18n/paths";
import { getAllPosts } from "@/lib/content/blog";

/** Absolute URL for a locale + path combination. */
function absUrl(locale: (typeof locales)[number], path: string): string {
  return `${SITE_URL}${localeHref(locale, path)}`;
}

/**
 * hreflang alternates for a sitemap entry — all three locale variants of the
 * given path, keyed by locale code. No x-default: that belongs in <link> tags,
 * not sitemap alternates. See TASK-0031.
 */
function sitemapAlternates(path: string): Record<string, string> {
  return Object.fromEntries(locales.map((l) => [l, absUrl(l, path)]));
}

/**
 * Sitemap — emits one entry per locale × depth page so every locale variant
 * is discoverable with hreflang alternates. Blog posts are English-only
 * (TASK-0012 scope). Home resolves correctly via middleware and keeps a single
 * entry. See docs/architecture/overview.md §4.1 and TASK-0031.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const depthPaths = [
    "/features",
    "/rpg-system",
    "/parents",
    "/pricing",
    "/faq",
  ] as const;

  const depthEntries: MetadataRoute.Sitemap = depthPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: absUrl(locale, path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: { languages: sitemapAlternates(path) },
    })),
  );

  const secondaryPaths = ["/blog"] as const;

  const secondaryEntries: MetadataRoute.Sitemap = secondaryPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: absUrl(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
      alternates: { languages: sitemapAlternates(path) },
    })),
  );

  const blogPostEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/en/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...home, ...depthEntries, ...secondaryEntries, ...blogPostEntries];
}
