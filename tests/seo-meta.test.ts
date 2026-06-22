import { describe, it, expect } from "vitest";
import { getLlmsTxtAlternate } from "@/lib/seo";

describe("getLlmsTxtAlternate", () => {
  it("returns the text/plain alternate pointing at /llms.txt", () => {
    const alternate = getLlmsTxtAlternate();
    expect(alternate["text/plain"]).toBe("/llms.txt");
  });

  it("returns an object with exactly one key", () => {
    expect(Object.keys(getLlmsTxtAlternate())).toHaveLength(1);
  });
});
