import { describe, expect, it } from "vitest";
import { EXAMPLE_ISSUES } from "../lib/issues";
import {
  KEYS,
  preferredTheme,
  readIssues,
  readStored,
  themeSchema,
  writeIssues,
} from "../lib/storage";

describe("readIssues", () => {
  it("seeds examples when storage is empty", () => {
    expect(readIssues()).toEqual(EXAMPLE_ISSUES);
  });

  it("keeps an explicit empty list, so deleting everything survives a reload", () => {
    writeIssues([]);
    expect(readIssues()).toEqual([]);
  });

  it("returns saved issues when the data is valid", () => {
    const custom = [
      {
        id: "a",
        title: "Saved issue",
        description: "From storage",
        status: "open" as const,
        priority: "low" as const,
        createdAt: "2026-01-01T00:00:00.000Z",
        example: false,
      },
    ];
    writeIssues(custom);
    expect(readIssues()).toEqual(custom);
  });

  it("falls back to examples when the data is corrupt or the wrong shape", () => {
    localStorage.setItem(KEYS.issues, "{not json");
    expect(readIssues()).toEqual(EXAMPLE_ISSUES);
    localStorage.setItem(KEYS.issues, JSON.stringify([{ title: "missing fields" }]));
    expect(readIssues()).toEqual(EXAMPLE_ISSUES);
  });
});

describe("readStored", () => {
  it("returns the fallback for a missing or invalid theme", () => {
    expect(readStored(KEYS.theme, themeSchema, "khaki")).toBe("khaki");
    localStorage.setItem(KEYS.theme, JSON.stringify("neon"));
    expect(readStored(KEYS.theme, themeSchema, "khaki")).toBe("khaki");
    localStorage.setItem(KEYS.theme, JSON.stringify("midnight"));
    expect(readStored(KEYS.theme, themeSchema, "khaki")).toBe("midnight");
  });

  it("maps the old light and dark values onto gloss themes", () => {
    localStorage.setItem(KEYS.theme, JSON.stringify("light"));
    expect(readStored(KEYS.theme, themeSchema, "khaki")).toBe("khaki");
    localStorage.setItem(KEYS.theme, JSON.stringify("dark"));
    expect(readStored(KEYS.theme, themeSchema, "khaki")).toBe("darkgrey");
  });
});

describe("preferredTheme", () => {
  it("follows the operating system", () => {
    expect(preferredTheme((query) => ({ matches: query.includes("dark") }))).toBe("darkgrey");
    expect(preferredTheme(() => ({ matches: false }))).toBe("khaki");
  });
});
