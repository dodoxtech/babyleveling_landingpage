import { describe, it, expect } from "vitest";
import {
  MAX_EMAIL_LENGTH,
  MAX_SOURCE_LENGTH,
  normalizeEmail,
  isValidEmail,
  sanitizeSource,
  sanitizeCellValue,
} from "@/lib/waitlist-validation";

describe("normalizeEmail", () => {
  it("trims surrounding whitespace and lowercases", () => {
    expect(normalizeEmail("  Foo@Example.COM  ")).toBe("foo@example.com");
  });

  it("returns an empty string for non-string input", () => {
    for (const input of [undefined, null, 42, {}, [], true]) {
      expect(normalizeEmail(input)).toBe("");
    }
  });
});

describe("isValidEmail", () => {
  it("accepts well-formed addresses", () => {
    for (const email of [
      "user@example.com",
      "first.last@example.co.uk",
      "user+tag@example.com",
      "a@b.cd",
    ]) {
      expect(isValidEmail(email), email).toBe(true);
    }
  });

  it("rejects malformed addresses", () => {
    for (const email of [
      "",
      "plainaddress",
      "missing-at.example.com",
      "no-domain@",
      "@no-local.com",
      "no-tld@example",
      "two@@example.com",
      "spaces in@example.com",
      "trailing@example.com ", // not normalized: a raw space fails the shape
    ]) {
      expect(isValidEmail(email), email).toBe(false);
    }
  });

  it("rejects addresses over the max length", () => {
    const local = "a".repeat(MAX_EMAIL_LENGTH); // local + "@x.io" overflows 254
    expect(isValidEmail(`${local}@x.io`)).toBe(false);
  });

  it("accepts an address exactly at the max length", () => {
    const domain = "@x.io"; // 5 chars
    const local = "a".repeat(MAX_EMAIL_LENGTH - domain.length);
    const email = `${local}${domain}`;
    expect(email.length).toBe(MAX_EMAIL_LENGTH);
    expect(isValidEmail(email)).toBe(true);
  });

  it("rejects embedded control characters (NUL, ESC, DEL)", () => {
    for (const email of [
      "user\x00@example.com",
      "user\x1b@example.com",
      "user@exam\x7fple.com",
      "user\n@example.com",
      "user\r@example.com",
    ]) {
      expect(isValidEmail(email), JSON.stringify(email)).toBe(false);
    }
  });
});

describe("sanitizeSource", () => {
  it("returns undefined for absent or non-string input", () => {
    for (const input of [undefined, null, 123, {}, []]) {
      expect(sanitizeSource(input)).toBeUndefined();
    }
  });

  it("returns undefined for empty / whitespace-only strings", () => {
    expect(sanitizeSource("")).toBeUndefined();
    expect(sanitizeSource("   ")).toBeUndefined();
  });

  it("trims and preserves a normal attribution tag", () => {
    expect(sanitizeSource("  hero-cta  ")).toBe("hero-cta");
  });

  it("strips control characters and newlines (log/CSV forging)", () => {
    expect(sanitizeSource("hero\n\rinjected\x00")).toBe("heroinjected");
  });

  it("truncates to the max source length", () => {
    const result = sanitizeSource("x".repeat(MAX_SOURCE_LENGTH + 50));
    expect(result).toHaveLength(MAX_SOURCE_LENGTH);
  });
});

describe("sanitizeCellValue (spreadsheet formula injection)", () => {
  it("prefixes a single quote when a value begins with a formula trigger", () => {
    for (const trigger of ["=", "+", "-", "@", "\t", "\r"]) {
      const value = `${trigger}HYPERLINK("http://evil")`;
      expect(sanitizeCellValue(value)).toBe(`'${value}`);
    }
  });

  it("neutralizes a malicious email whose local part starts with '='", () => {
    const email = '=cmd|"/c calc"!A1@x.com';
    expect(sanitizeCellValue(email)).toBe(`'${email}`);
  });

  it("leaves ordinary values untouched", () => {
    for (const value of [
      "user@example.com",
      "hero-cta",
      "2026-06-20T00:00:00.000Z",
      "",
    ]) {
      expect(sanitizeCellValue(value)).toBe(value);
    }
  });
});
