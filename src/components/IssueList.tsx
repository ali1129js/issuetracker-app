import type { Issue } from "../lib/types";
import { IssueItem } from "./IssueItem";

interface Props {
  issues: readonly Issue[];
  onEdit: (issue: Issue) => void;
  onAskDelete: (issue: Issue) => void;
}

export function IssueList({ issues, onEdit, onAskDelete }: Props) {
  return (
    <ul className="issue-list">
      {issues.map((issue) => (
        <li key={issue.id}>
          <IssueItem issue={issue} onEdit={onEdit} onAskDelete={onAskDelete} />
        </li>
      ))}
    </ul>
  );
}
