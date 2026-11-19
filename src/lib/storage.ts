import { z } from "zod";
import { cloneExamples } from "./issues";
import type { Issue, ThemeName } from "./types";
import { LEGACY_THEMES, MOTION_NAMES, PRIORITIES, STATUSES, THEME_NAMES } from "./types";

export const KEYS = {
  issues: "issuetracker.v1.issues",
  theme: "issuetracker.v1.theme",
  motion: "issuetracker.v1.motion",
} as const;

export const motionSchema = z.enum(MOTION_NAMES);

export const themeSchema = z.preprocess(
  (value) => (typeof value === "string" && value in LEGACY_THEMES ? LEGACY_THEMES[value] : value),
  z.enum(THEME_NAMES),
);

const issueSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  status: z.enum(STATUSES),
  priority: z.enum(PRIORITIES),
  createdAt: z.string().refine((value) => !Number.isNaN(Date.parse(value)), "invalid date"),
  example: z.boolean(),
});

export const issuesSchema = z.array(issueSchema);

/** Reads and validates a value. Missing, corrupt or wrong-shaped data gives the fallback. */
export function readStored<T>(key: string, schema: z.ZodType<T>, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = schema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : fallback;
  } catch {
    return fallback;
  }
}

/** Storage can be full or blocked; the app still works, it just forgets. */
export function writeStored(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

/**
 * Loads issues from storage. A missing key seeds the example list.
 * An explicit empty array is kept, so deleting every issue survives a reload.
 * Corrupt data falls back to the examples.
 */
export function readIssues(): Issue[] {
  try {
    const raw = localStorage.getItem(KEYS.issues);
    if (raw === null) return cloneExamples();
    const parsed = issuesSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : cloneExamples();
  } catch {
    return cloneExamples();
  }
}

export function writeIssues(issues: readonly Issue[]): void {
  writeStored(KEYS.issues, issues);
}

export function preferredTheme(
  match: (query: string) => { matches: boolean } = (query) => window.matchMedia(query),
): ThemeName {
  return match("(prefers-color-scheme: dark)").matches ? "darkgrey" : "khaki";
}
