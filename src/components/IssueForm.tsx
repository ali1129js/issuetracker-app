import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { PRIORITIES, PRIORITY_LABELS, STATUSES, STATUS_LABELS } from "../lib/types";
import type { IssueDraft } from "../lib/types";

interface Props {
  initial: IssueDraft;
  heading: string;
  submitLabel: string;
  onSubmit: (draft: IssueDraft) => void;
  onCancel: () => void;
}

export function IssueForm({ initial, heading, submitLabel, onSubmit, onCancel }: Props) {
  const headingId = useId();
  const titleId = useId();
  const errorId = useId();
  const titleRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState<IssueDraft>(initial);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDraft(initial);
    setError(null);
    titleRef.current?.focus();
    titleRef.current?.select();
  }, [initial]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (draft.title.trim().length === 0) {
      setError("A title is required.");
      titleRef.current?.focus();
      return;
    }
    onSubmit({
      ...draft,
      title: draft.title.trim(),
      description: draft.description.trim(),
    });
  }

  return (
    <form className="card form" onSubmit={handleSubmit} aria-labelledby={headingId}>
      <h2 id={headingId} className="form-heading">
        {heading}
      </h2>
      <label className="field" htmlFor={titleId}>
        <span>Title</span>
        <input
          ref={titleRef}
          id={titleId}
          name="title"
          value={draft.title}
          onChange={(event) => {
            setDraft({ ...draft, title: event.target.value });
            if (error) setError(null);
          }}
          aria-invalid={error !== null}
          aria-describedby={error ? errorId : undefined}
        />
      </label>
      {error ? (
        <p id={errorId} className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <label className="field">
        <span>Description</span>
        <textarea
          name="description"
          rows={4}
          value={draft.description}
          onChange={(event) => setDraft({ ...draft, description: event.target.value })}
        />
      </label>
      <fieldset className="field">
        <legend>Status</legend>
        <div className="segmented wrap">
          {STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              className="segment"
              aria-pressed={draft.status === status}
              onClick={() => setDraft({ ...draft, status })}
            >
              {STATUS_LABELS[status]}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="field">
        <legend>Priority</legend>
        <div className="segmented wrap">
          {PRIORITIES.map((priority) => (
            <button
              key={priority}
              type="button"
              className="segment"
              aria-pressed={draft.priority === priority}
              onClick={() => setDraft({ ...draft, priority })}
            >
              {PRIORITY_LABELS[priority]}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="form-actions">
        <button type="submit" className="button button-primary">
          {submitLabel}
        </button>
        <button type="button" className="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
