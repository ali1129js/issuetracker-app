import { formatCreatedAt } from "../lib/format";
import { PRIORITY_LABELS, STATUS_LABELS } from "../lib/types";
import type { Issue } from "../lib/types";

interface Props {
  issue: Issue;
  onEdit: (issue: Issue) => void;
  onAskDelete: (issue: Issue) => void;
}

export function IssueItem({ issue, onEdit, onAskDelete }: Props) {
  return (
    <article className="issue card" aria-labelledby={`issue-${issue.id}-title`}>
      <header className="issue-head">
        <h3 id={`issue-${issue.id}-title`} className="issue-title">
          {issue.title}
        </h3>
        <div className="issue-badges">
          {issue.example ? <span className="badge badge-example">Example</span> : null}
          <span className={`badge badge-status badge-${issue.status}`}>
            {STATUS_LABELS[issue.status]}
          </span>
          <span className={`badge badge-priority badge-${issue.priority}`}>
            {PRIORITY_LABELS[issue.priority]}
          </span>
        </div>
      </header>
      {issue.description ? <p className="issue-desc">{issue.description}</p> : null}
      <footer className="issue-foot">
        <time dateTime={issue.createdAt}>Created {formatCreatedAt(issue.createdAt)}</time>
        <div className="issue-actions">
          <button type="button" className="button button-small" onClick={() => onEdit(issue)}>
            Edit
          </button>
          <button
            type="button"
            className="button button-small button-danger-ghost"
            onClick={() => onAskDelete(issue)}
          >
            Delete
          </button>
        </div>
      </footer>
    </article>
  );
}
