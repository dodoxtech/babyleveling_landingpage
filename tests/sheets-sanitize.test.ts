import { describe, it, expect } from "vitest";
import { sanitizeCellValue } from "@/lib/sheets-sanitize";

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
