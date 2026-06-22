import { describe, it, expect } from "vitest";
import {
  buildMobileApplicationSchema,
  buildOrganizationSchema,
  buildHowToSchema,
} from "@/lib/seo-schemas";

describe("buildMobileApplicationSchema", () => {
  it("sets @type to MobileApplication", () => {
    expect(buildMobileApplicationSchema()["@type"]).toBe("MobileApplication");
  });

  it("includes applicationSubCategory", () => {
    expect(buildMobileApplicationSchema().applicationSubCategory).toBe(
      "Baby Tracker",
    );
  });

  it("includes featureList with ≥ 8 items", () => {
    const { featureList } = buildMobileApplicationSchema();
    expect(Array.isArray(featureList)).toBe(true);
    expect((featureList as string[]).length).toBeGreaterThanOrEqual(8);
  });

  it("includes availableOnDevice for iPhone and Apple Watch", () => {
    const { availableOnDevice } = buildMobileApplicationSchema();
    expect(Array.isArray(availableOnDevice)).toBe(true);
    expect(availableOnDevice).toContain("iPhone");
    expect(availableOnDevice).toContain("Apple Watch");
  });

  it("includes countriesSupported with US, JP, VN", () => {
    const { countriesSupported } = buildMobileApplicationSchema();
    expect(Array.isArray(countriesSupported)).toBe(true);
    expect(countriesSupported).toContain("US");
    expect(countriesSupported).toContain("JP");
    expect(countriesSupported).toContain("VN");
  });

  it("includes speakable spec with cssSelector array", () => {
    const { speakable } = buildMobileApplicationSchema();
    expect(speakable).toBeDefined();
    const spec = speakable as { "@type": string; cssSelector: string[] };
    expect(spec["@type"]).toBe("SpeakableSpecification");
    expect(Array.isArray(spec.cssSelector)).toBe(true);
    expect(spec.cssSelector.length).toBeGreaterThanOrEqual(1);
  });

  it("retains operatingSystem field", () => {
    expect(buildMobileApplicationSchema().operatingSystem).toBeDefined();
  });

  it("retains description from SITE_DESCRIPTOR", () => {
    const schema = buildMobileApplicationSchema();
    expect(typeof schema.description).toBe("string");
    expect((schema.description as string).length).toBeGreaterThan(0);
  });
});

describe("buildOrganizationSchema", () => {
  it("sets @type to Organization", () => {
    expect(buildOrganizationSchema()["@type"]).toBe("Organization");
  });

  it("includes knowsAbout array with ≥ 2 topics", () => {
    const { knowsAbout } = buildOrganizationSchema();
    expect(Array.isArray(knowsAbout)).toBe(true);
    expect((knowsAbout as string[]).length).toBeGreaterThanOrEqual(2);
  });

  it("includes contactPoint with @type ContactPoint", () => {
    const { contactPoint } = buildOrganizationSchema();
    expect(contactPoint).toBeDefined();
    const cp = contactPoint as { "@type": string; url: string };
    expect(cp["@type"]).toBe("ContactPoint");
    expect(typeof cp.url).toBe("string");
    expect(cp.url.length).toBeGreaterThan(0);
  });

  it("retains name and url", () => {
    const schema = buildOrganizationSchema();
    expect(typeof schema.name).toBe("string");
    expect(typeof schema.url).toBe("string");
  });
});

describe("buildHowToSchema", () => {
  it("sets @type to HowTo", () => {
    expect(buildHowToSchema()["@type"]).toBe("HowTo");
  });

  it("has exactly 4 steps", () => {
    const { step } = buildHowToSchema();
    expect(Array.isArray(step)).toBe(true);
    expect((step as unknown[]).length).toBe(4);
  });

  it("each step has @type HowToStep", () => {
    const steps = buildHowToSchema().step as { "@type": string }[];
    for (const s of steps) {
      expect(s["@type"]).toBe("HowToStep");
    }
  });

  it("each step has a non-empty name", () => {
    const steps = buildHowToSchema().step as { name: string }[];
    for (const s of steps) {
      expect(typeof s.name).toBe("string");
      expect(s.name.length).toBeGreaterThan(0);
    }
  });

  it("each step text is ≥ 50 words", () => {
    const steps = buildHowToSchema().step as { text: string }[];
    for (const s of steps) {
      const wordCount = s.text.trim().split(/\s+/).length;
      expect(wordCount, `step "${s.text.slice(0, 40)}…" has only ${wordCount} words`).toBeGreaterThanOrEqual(50);
    }
  });

  it("steps are numbered 1 through 4", () => {
    const steps = buildHowToSchema().step as { position: number }[];
    expect(steps.map((s) => s.position)).toEqual([1, 2, 3, 4]);
  });
});
