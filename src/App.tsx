import { useEffect, useMemo, useState } from "react";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { EmptyState } from "./components/EmptyState";
import { IssueForm } from "./components/IssueForm";
import { IssueList } from "./components/IssueList";
import { Toolbar } from "./components/Toolbar";
import { useStoredState } from "./hooks/useStoredState";
import {
  countByStatus,
  createIssue,
  draftFromIssue,
  filterIssues,
  removeIssue,
  sortIssues,
  updateIssue,
} from "./lib/issues";
import {
  KEYS,
  motionSchema,
  preferredTheme,
  readIssues,
  themeSchema,
  writeIssues,
} from "./lib/storage";
import type { Issue, IssueDraft, IssueFilters, MotionName, ThemeName } from "./lib/types";
import { EMPTY_DRAFT, EMPTY_FILTERS } from "./lib/types";
import { MotionToggle } from "./theme/MotionToggle";
import { ThemeSwitcher } from "./theme/ThemeSwitcher";
import { applyMotion, applyTheme, prefersReducedMotion } from "./theme/themes";

type FormMode = { kind: "closed" } | { kind: "create" } | { kind: "edit"; issue: Issue };

export function App() {
  const [theme, setTheme] = useStoredState<ThemeName>(KEYS.theme, themeSchema, preferredTheme());
  const [motion, setMotion] = useStoredState<MotionName>(KEYS.motion, motionSchema, "static");
  const reducedMotion = prefersReducedMotion();
  const [issues, setIssues] = useState<Issue[]>(() => readIssues());
  const [filters, setFilters] = useState<IssueFilters>(EMPTY_FILTERS);
  const [form, setForm] = useState<FormMode>({ kind: "closed" });
  const [pendingDelete, setPendingDelete] = useState<Issue | null>(null);

  useEffect(() => applyTheme(theme), [theme]);
  useEffect(
    () => applyMotion(motion, document.documentElement, reducedMotion),
    [motion, reducedMotion],
  );

  function commit(next: Issue[]) {
    setIssues(next);
    writeIssues(next);
  }

  function handleSubmit(draft: IssueDraft) {
    if (form.kind === "edit") {
      commit(
        issues.map((issue) => (issue.id === form.issue.id ? updateIssue(issue, draft) : issue)),
      );
    } else {
      commit([...issues, createIssue(draft)]);
    }
    setForm({ kind: "closed" });
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    commit(removeIssue(issues, pendingDelete.id));
    if (form.kind === "edit" && form.issue.id === pendingDelete.id) {
      setForm({ kind: "closed" });
    }
    setPendingDelete(null);
  }

  const visible = useMemo(() => sortIssues(filterIssues(issues, filters)), [issues, filters]);
  const counts = countByStatus(issues);
  const hasActiveFilters =
    filters.query.trim().length > 0 || filters.status !== "all" || filters.priority !== "all";

  const formInitial: IssueDraft = form.kind === "edit" ? draftFromIssue(form.issue) : EMPTY_DRAFT;
  const formKey = form.kind === "edit" ? form.issue.id : form.kind;

  return (
    <div className="app">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="app-header">
        <div>
          <h1 className="app-title">Issue Tracker</h1>
          <p className="app-sub">
            {counts.open} open · {counts["in-progress"]} in progress · {counts.done} done
          </p>
        </div>
        <div className="theme-tools">
          <ThemeSwitcher value={theme} onChange={setTheme} />
          <MotionToggle value={motion} onChange={setMotion} reducedMotion={reducedMotion} />
        </div>
      </header>

      <main id="main" tabIndex={-1} className="app-main">
        <Toolbar
          filters={filters}
          onChange={setFilters}
          formOpen={form.kind !== "closed"}
          onNewIssue={() => setForm({ kind: "create" })}
        />

        {form.kind !== "closed" ? (
          <IssueForm
            key={formKey}
            initial={formInitial}
            heading={form.kind === "edit" ? "Edit issue" : "New issue"}
            submitLabel={form.kind === "edit" ? "Save changes" : "Create issue"}
            onSubmit={handleSubmit}
            onCancel={() => setForm({ kind: "closed" })}
          />
        ) : null}

        {issues.length === 0 ? (
          <EmptyState
            title="No issues yet"
            message="Create one to get started. Nothing is stored until you add an issue."
            actionLabel="New issue"
            onAction={() => setForm({ kind: "create" })}
          />
        ) : visible.length === 0 ? (
          <EmptyState
            title="No matching issues"
            message="Nothing matches the current search or filters."
            {...(hasActiveFilters
              ? { actionLabel: "Clear filters", onAction: () => setFilters(EMPTY_FILTERS) }
              : {})}
          />
        ) : (
          <>
            <p className="result-count" aria-live="polite">
              Showing {visible.length} of {issues.length} issue{issues.length === 1 ? "" : "s"}
            </p>
            <IssueList
              issues={visible}
              onEdit={(issue) => setForm({ kind: "edit", issue })}
              onAskDelete={setPendingDelete}
            />
          </>
        )}
      </main>

      {pendingDelete ? (
        <ConfirmDialog
          title="Delete this issue?"
          message={`“${pendingDelete.title}” will be removed. This cannot be undone.`}
          confirmLabel="Delete issue"
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      ) : null}
    </div>
  );
}
