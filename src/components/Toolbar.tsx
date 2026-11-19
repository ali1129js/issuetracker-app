import { PRIORITIES, PRIORITY_LABELS, STATUSES, STATUS_LABELS } from "../lib/types";
import type { IssueFilters, Priority, Status } from "../lib/types";

interface Props {
  filters: IssueFilters;
  onChange: (filters: IssueFilters) => void;
  onNewIssue: () => void;
  formOpen: boolean;
}

export function Toolbar({ filters, onChange, onNewIssue, formOpen }: Props) {
  return (
    <div className="toolbar">
      <button
        type="button"
        className="button button-primary"
        onClick={onNewIssue}
        aria-expanded={formOpen}
      >
        New issue
      </button>
      <label className="search">
        <span className="sr-only">Search issues</span>
        <input
          type="search"
          name="search"
          placeholder="Search title or description"
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
        />
      </label>
      <label className="select-field">
        <span>Status</span>
        <select
          name="status"
          value={filters.status}
          onChange={(event) =>
            onChange({ ...filters, status: event.target.value as Status | "all" })
          }
        >
          <option value="all">All</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </label>
      <label className="select-field">
        <span>Priority</span>
        <select
          name="priority"
          value={filters.priority}
          onChange={(event) =>
            onChange({ ...filters, priority: event.target.value as Priority | "all" })
          }
        >
          <option value="all">All</option>
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {PRIORITY_LABELS[priority]}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
