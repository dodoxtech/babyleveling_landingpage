import { beforeAll, describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import { GET as robotsTxt } from "@/app/robots.txt/route";
import { SITE_URL } from "@/lib/seo";
import { getAllPosts } from "@/lib/content/blog";

// ─── sitemap ────────────────────────────────────────────────────────────────

describe("sitemap()", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  it("emits a Japanese locale entry for each depth page", () => {
    for (const path of ["/features", "/rpg-system", "/parents", "/pricing", "/faq"]) {
      expect(urls, `missing /ja${path}`).toContain(`${SITE_URL}/ja${path}`);
    }
  });

  it("emits a Vietnamese locale entry for each depth page", () => {
    for (const path of ["/features", "/rpg-system", "/parents", "/pricing", "/faq"]) {
      expect(urls, `missing /vi${path}`).toContain(`${SITE_URL}/vi${path}`);
    }
  });

  it("emits an English (unprefixed) entry for each depth page", () => {
    for (const path of ["/features", "/rpg-system", "/parents", "/pricing", "/faq"]) {
      expect(urls, `missing ${path}`).toContain(`${SITE_URL}${path}`);
    }
  });

  it("every depth-page entry has alternates.languages for all 3 locales", () => {
    const depthPaths = ["/features", "/rpg-system", "/parents", "/pricing", "/faq"];
    for (const entry of entries) {
      const isDepth = depthPaths.some((p) =>
        entry.url.endsWith(p) ||
        entry.url.endsWith(`/ja${p}`) ||
        entry.url.endsWith(`/vi${p}`),
      );
      if (!isDepth) continue;
      const langs = (entry as { alternates?: { languages?: Record<string, string> } })
        .alternates?.languages;
      expect(langs, `${entry.url} missing alternates.languages`).toBeDefined();
      expect(langs).toHaveProperty("en");
      expect(langs).toHaveProperty("ja");
      expect(langs).toHaveProperty("vi");
    }
  });

  it("includes all blog post slugs under /en/blog/", () => {
    const posts = getAllPosts();
    for (const post of posts) {
      expect(urls).toContain(`${SITE_URL}/en/blog/${post.slug}`);
    }
  });

  it("blog entries have priority 0.8", () => {
    const posts = getAllPosts();
    for (const post of posts) {
      const entry = entries.find((e) => e.url === `${SITE_URL}/en/blog/${post.slug}`);
      expect(entry?.priority).toBe(0.8);
    }
  });

  it("home entry is still present at SITE_URL", () => {
    expect(urls).toContain(SITE_URL);
  });
});

// ─── robots ─────────────────────────────────────────────────────────────────

describe("robots.txt", () => {
  let body = "";

  beforeAll(async () => {
    body = await robotsTxt().text();
  });

  it("declares an explicit User-agent group for each AI crawler", () => {
    const bots = [
      "anthropic-ai",
      "Applebot-Extended",
      "YouBot",
      "DuckAssistBot",
      "cohere-ai",
      "Bytespider",
    ];
    for (const bot of bots) {
      expect(body, `missing AI crawler ${bot}`).toContain(`User-agent: ${bot}`);
    }
  });

  it("retains original bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)", () => {
    for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) {
      expect(body, `missing original bot ${bot}`).toContain(`User-agent: ${bot}`);
    }
  });

  it("declares the Content-Signal directive in the wildcard group", () => {
    expect(body).toContain("Content-Signal: search=yes, ai-input=yes, ai-train=no");
  });

  it("points at the sitemap", () => {
    expect(body).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  });
});
