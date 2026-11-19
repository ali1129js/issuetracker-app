export const STATUSES = ["open", "in-progress", "done"] as const;
export type Status = (typeof STATUSES)[number];

export const STATUS_LABELS: Readonly<Record<Status, string>> = {
  open: "Open",
  "in-progress": "In Progress",
  done: "Done",
};

export const PRIORITIES = ["high", "medium", "low"] as const;
export type Priority = (typeof PRIORITIES)[number];

export const PRIORITY_LABELS: Readonly<Record<Priority, string>> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const THEME_NAMES = ["khaki", "graphite", "midnight"] as const;
export type ThemeName = (typeof THEME_NAMES)[number];

export const LEGACY_THEMES: Readonly<Record<string, ThemeName>> = {
  light: "khaki",
  dark: "graphite",
  darkgrey: "graphite",
};

export const MOTION_NAMES = ["static", "animated"] as const;
export type MotionName = (typeof MOTION_NAMES)[number];

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  createdAt: string;
  example: boolean;
}

export interface IssueDraft {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
}

export interface IssueFilters {
  query: string;
  status: Status | "all";
  priority: Priority | "all";
}

export const EMPTY_DRAFT: IssueDraft = {
  title: "",
  description: "",
  status: "open",
  priority: "medium",
};

export const EMPTY_FILTERS: IssueFilters = {
  query: "",
  status: "all",
  priority: "all",
};
