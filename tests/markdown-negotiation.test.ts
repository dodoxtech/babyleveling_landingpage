import { describe, expect, it } from "vitest";
import {
  estimateTokens,
  extractMainHtml,
  htmlToMarkdown,
  prefersMarkdown,
} from "@/lib/markdown/negotiation";

describe("prefersMarkdown", () => {
  it("returns false when no Accept header is sent", () => {
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown(undefined)).toBe(false);
    expect(prefersMarkdown("")).toBe(false);
  });

  it("ignores a typical browser Accept header", () => {
    const browser =
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,*/*;q=0.8";
    expect(prefersMarkdown(browser)).toBe(false);
  });

  it("intercepts a bare text/markdown request", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
  });

  it("intercepts when markdown is preferred over html", () => {
    expect(prefersMarkdown("text/markdown, text/html;q=0.9")).toBe(true);
    expect(prefersMarkdown("text/markdown;q=1.0, text/html;q=0.5")).toBe(true);
  });

  it("defers to html when the client ranks it higher", () => {
    expect(prefersMarkdown("text/html, text/markdown;q=0.1")).toBe(false);
    expect(prefersMarkdown("text/markdown;q=0")).toBe(false);
  });

  it("wins ties so an equal-q agent still gets markdown", () => {
    expect(prefersMarkdown("text/html;q=0.8, text/markdown;q=0.8")).toBe(true);
  });
});

describe("extractMainHtml", () => {
  it("returns only the <main> region, dropping header/footer chrome", () => {
    const html =
      "<body><header>nav</header><main><h1>Hi</h1></main><footer>foot</footer></body>";
    expect(extractMainHtml(html)).toBe("<h1>Hi</h1>");
  });

  it("falls back to <body> when there is no <main>", () => {
    expect(extractMainHtml("<body><p>x</p></body>")).toBe("<p>x</p>");
  });
});

describe("htmlToMarkdown", () => {
  it("converts page content and strips decorative nodes", () => {
    const html = `
      <html><body><header>nav</header>
      <main>
        <h1>BabyLeveling</h1>
        <p>Track <strong>feeding</strong> and sleep.</p>
        <canvas></canvas>
        <script>console.log("hero")</script>
        <ul><li>XP</li><li>Levels</li></ul>
      </main>
      <footer>footer</footer></body></html>`;
    const md = htmlToMarkdown(html);
    expect(md).toContain("# BabyLeveling");
    expect(md).toContain("**feeding**");
    expect(md).toContain("* XP");
    expect(md).not.toContain("hero");
    expect(md).not.toContain("nav");
    expect(md).not.toContain("footer");
  });
});

describe("estimateTokens", () => {
  it("approximates ~4 characters per token", () => {
    expect(estimateTokens("")).toBe(0);
    expect(estimateTokens("abcd")).toBe(1);
    expect(estimateTokens("a".repeat(401))).toBe(101);
  });
});
