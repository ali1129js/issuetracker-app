import type { Issue, IssueDraft, IssueFilters } from "./types";

const STATUS_ORDER = { open: 0, "in-progress": 1, done: 2 } as const;

/** Fixed seed issues, clearly marked as examples. Used only when storage is empty. */
export const EXAMPLE_ISSUES: readonly Issue[] = [
  {
    id: "ex-blank-password",
    title: "Login form accepts a blank password",
    description:
      "Example issue. On the sign-in page, submitting with an empty password still sends the request.",
    status: "open",
    priority: "high",
    createdAt: "2026-03-12T09:15:00.000Z",
    example: true,
  },
  {
    id: "ex-search-filters",
    title: "Search results do not update when a filter changes",
    description:
      "Example issue. Changing a category chip leaves the previous result list on screen until the page is reloaded.",
    status: "in-progress",
    priority: "medium",
    createdAt: "2026-03-10T14:40:00.000Z",
    example: true,
  },
  {
    id: "ex-export-csv",
    title: "CSV export drops the last row",
    description:
      "Example issue. A report with 20 rows downloads as 19. The missing row is always the last one in the table.",
    status: "open",
    priority: "high",
    createdAt: "2026-03-08T11:05:00.000Z",
    example: true,
  },
  {
    id: "ex-dark-theme-flash",
    title: "Dark theme flashes white on the first load",
    description:
      "Example issue. The saved theme is applied after the first paint, so a dark-theme user sees a brief white screen.",
    status: "done",
    priority: "low",
    createdAt: "2026-02-27T16:20:00.000Z",
    example: true,
  },
  {
    id: "ex-profile-typo",
    title: "Profile page heading has a typo",
    description: 'Example issue. The heading reads "Acccount" with three c\'s.',
    status: "done",
    priority: "low",
    createdAt: "2026-02-18T08:50:00.000Z",
    example: true,
  },
];

export function cloneExamples(): Issue[] {
  return EXAMPLE_ISSUES.map((issue) => ({ ...issue }));
}

export function newId(random: () => string = () => crypto.randomUUID()): string {
  return random();
}

export function createIssue(
  draft: IssueDraft,
  options: { now?: Date; id?: string } = {},
): Issue {
  const title = draft.title.trim();
  if (title.length === 0) {
    throw new Error("Title is required");
  }
  const now = options.now ?? new Date();
  const id = options.id ?? newId();
  return {
    id,
    title,
    description: draft.description.trim(),
    status: draft.status,
    priority: draft.priority,
    createdAt: now.toISOString(),
    example: false,
  };
}

export function updateIssue(issue: Issue, draft: IssueDraft): Issue {
  const title = draft.title.trim();
  if (title.length === 0) {
    throw new Error("Title is required");
  }
  return {
    ...issue,
    title,
    description: draft.description.trim(),
    status: draft.status,
    priority: draft.priority,
  };
}

export function removeIssue(issues: readonly Issue[], id: string): Issue[] {
  return issues.filter((issue) => issue.id !== id);
}

export function draftFromIssue(issue: Issue): IssueDraft {
  return {
    title: issue.title,
    description: issue.description,
    status: issue.status,
    priority: issue.priority,
  };
}

export function filterIssues(issues: readonly Issue[], filters: IssueFilters): Issue[] {
  const query = filters.query.trim().toLowerCase();
  return issues.filter((issue) => {
    if (filters.status !== "all" && issue.status !== filters.status) return false;
    if (filters.priority !== "all" && issue.priority !== filters.priority) return false;
    if (query.length === 0) return true;
    return (
      issue.title.toLowerCase().includes(query) || issue.description.toLowerCase().includes(query)
    );
  });
}

/** Open, then in progress, then done. Within a status, newest first. */
export function sortIssues(issues: readonly Issue[]): Issue[] {
  return [...issues].sort((a, b) => {
    const status = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
    if (status !== 0) return status;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export function countByStatus(issues: readonly Issue[]): Record<"open" | "in-progress" | "done", number> {
  const counts = { open: 0, "in-progress": 0, done: 0 };
  for (const issue of issues) {
    counts[issue.status] += 1;
  }
  return counts;
}
