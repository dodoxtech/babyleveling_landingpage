import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug } from "@/lib/content/blog";

const SLUG = "best-baby-tracker-apps-2026";

describe("comparison blog post", () => {
  it("exists in getAllPosts()", () => {
    const slugs = getAllPosts().map((p) => p.slug);
    expect(slugs).toContain(SLUG);
  });

  it("can be retrieved by slug", () => {
    expect(getPostBySlug(SLUG)).toBeDefined();
  });

  it("has a title containing '2026'", () => {
    const post = getPostBySlug(SLUG)!;
    expect(post.title).toContain("2026");
  });

  it("has a non-empty description", () => {
    const post = getPostBySlug(SLUG)!;
    expect(post.description.length).toBeGreaterThan(20);
  });

  it("has a comparison table section with ≥ 5 apps and ≥ 5 criteria columns", () => {
    const post = getPostBySlug(SLUG)!;
    const tableSection = post.sections.find((s) => s.table !== undefined);
    expect(tableSection, "no section with a table found").toBeDefined();
    const { headers, rows } = tableSection!.table!;
    expect(headers.length, "need ≥ 5 columns (1 label + 4 apps)").toBeGreaterThanOrEqual(5);
    expect(rows.length, "need ≥ 5 criteria rows").toBeGreaterThanOrEqual(5);
  });

  it("has faqItems with ≥ 3 Q&A pairs", () => {
    const post = getPostBySlug(SLUG)!;
    expect(post.faqItems, "faqItems missing").toBeDefined();
    expect(post.faqItems!.length).toBeGreaterThanOrEqual(3);
  });

  it("each faqItem has a non-empty question and answer", () => {
    const { faqItems } = getPostBySlug(SLUG)!;
    for (const item of faqItems ?? []) {
      expect(item.question.length).toBeGreaterThan(0);
      expect(item.answer.length).toBeGreaterThan(0);
    }
  });
});
