import { describe, expect, it } from "vitest";
import {
  EXAMPLE_ISSUES,
  cloneExamples,
  countByStatus,
  createIssue,
  filterIssues,
  removeIssue,
  sortIssues,
  updateIssue,
} from "../lib/issues";
import { EMPTY_FILTERS } from "../lib/types";
import type { Issue, IssueDraft } from "../lib/types";

const draft: IssueDraft = {
  title: "  Broken link on the help page  ",
  description: "  The contact link 404s.  ",
  status: "open",
  priority: "high",
};

describe("createIssue", () => {
  it("trims fields, sets a created date, and marks the issue as not an example", () => {
    const issue = createIssue(draft, {
      now: new Date("2026-04-01T10:00:00.000Z"),
      id: "new-1",
    });
    expect(issue).toEqual({
      id: "new-1",
      title: "Broken link on the help page",
      description: "The contact link 404s.",
      status: "open",
      priority: "high",
      createdAt: "2026-04-01T10:00:00.000Z",
      example: false,
    });
  });

  it("rejects a blank title", () => {
    expect(() => createIssue({ ...draft, title: "   " })).toThrow("Title is required");
  });
});

describe("updateIssue", () => {
  it("keeps the id, created date and example flag", () => {
    const original = cloneExamples()[0]!;
    const updated = updateIssue(original, {
      title: "Renamed issue",
      description: "Updated text",
      status: "done",
      priority: "low",
    });
    expect(updated.id).toBe(original.id);
    expect(updated.createdAt).toBe(original.createdAt);
    expect(updated.example).toBe(true);
    expect(updated.title).toBe("Renamed issue");
    expect(updated.status).toBe("done");
  });

  it("rejects a blank title", () => {
    const original = cloneExamples()[0]!;
    expect(() => updateIssue(original, { ...draft, title: "" })).toThrow("Title is required");
  });
});

describe("removeIssue", () => {
  it("removes only the matching id", () => {
    const next = removeIssue(EXAMPLE_ISSUES, "ex-export-csv");
    expect(next).toHaveLength(EXAMPLE_ISSUES.length - 1);
    expect(next.find((issue) => issue.id === "ex-export-csv")).toBeUndefined();
  });
});

describe("filterIssues", () => {
  const issues = cloneExamples();

  it("returns all issues when filters are empty", () => {
    expect(filterIssues(issues, EMPTY_FILTERS)).toHaveLength(5);
  });

  it("filters by status and priority", () => {
    const openHigh = filterIssues(issues, { query: "", status: "open", priority: "high" });
    expect(openHigh.map((issue) => issue.id)).toEqual(["ex-blank-password", "ex-export-csv"]);
  });

  it("searches title and description, ignoring case", () => {
    const byTitle = filterIssues(issues, { ...EMPTY_FILTERS, query: "csv" });
    expect(byTitle.map((issue) => issue.id)).toEqual(["ex-export-csv"]);
    const byDesc = filterIssues(issues, { ...EMPTY_FILTERS, query: "THREE C" });
    expect(byDesc.map((issue) => issue.id)).toEqual(["ex-profile-typo"]);
  });

  it("combines search with a status filter", () => {
    const result = filterIssues(issues, { query: "theme", status: "done", priority: "all" });
    expect(result.map((issue) => issue.id)).toEqual(["ex-dark-theme-flash"]);
    expect(filterIssues(issues, { query: "theme", status: "open", priority: "all" })).toEqual([]);
  });
});

describe("sortIssues", () => {
  it("orders open, then in progress, then done, and newest first within a status", () => {
    const mixed: Issue[] = [
      {
        ...cloneExamples()[0]!,
        id: "old-open",
        status: "open",
        createdAt: "2026-01-01T00:00:00.000Z",
      },
      {
        ...cloneExamples()[0]!,
        id: "new-done",
        status: "done",
        createdAt: "2026-06-01T00:00:00.000Z",
      },
      {
        ...cloneExamples()[0]!,
        id: "new-open",
        status: "open",
        createdAt: "2026-05-01T00:00:00.000Z",
      },
      {
        ...cloneExamples()[0]!,
        id: "progress",
        status: "in-progress",
        createdAt: "2026-04-01T00:00:00.000Z",
      },
    ];
    expect(sortIssues(mixed).map((issue) => issue.id)).toEqual([
      "new-open",
      "old-open",
      "progress",
      "new-done",
    ]);
  });
});

describe("countByStatus", () => {
  it("counts the seeded examples", () => {
    expect(countByStatus(EXAMPLE_ISSUES)).toEqual({ open: 2, "in-progress": 1, done: 2 });
  });
});
