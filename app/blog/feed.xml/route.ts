import { getAllPosts } from "@/lib/content/blog";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * GET /blog/feed.xml  -  RSS 2.0 feed for the English blog.
 * Blog posts are English-only (see TASK-0012 scope), so the feed lives outside
 * the locale segment. The middleware matcher `/((?!_next|api|.*\\..*).*)` skips
 * paths containing dots, so this route is never rewritten by locale routing.
 */
export function GET() {
  const posts = getAllPosts();
  const blogUrl = `${SITE_URL}/blog`;

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const description = escapeXml(post.description);
      const title = escapeXml(post.title);
      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <author>contact@babyleveling.com (${escapeXml(post.author)})</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} Blog</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
