# Learning notes

Short explanations of the ideas this project actually uses, and why they matter. Each one points at a file.

## Derived lists, not a second source of truth

The app keeps one list of issues in state. What you see on the page is computed from that list plus the current search and filters. If search results were stored separately, adding or deleting an issue could leave the two lists out of step. `filterIssues` and `sortIssues` take the full list in and return a new array, so the screen can never show an issue that is not in state.

See `src/lib/issues.ts` and how `App.tsx` builds `visible` with `useMemo`.

## Validated localStorage

`localStorage` only stores strings. A later visit might find missing data, half-written JSON, or an old shape. The read helpers parse the string, then check it with a Zod schema. Anything that fails is ignored and a safe fallback is used, so a corrupt value cannot crash the page.

A missing key is treated differently from an empty list. No key means "first visit", so the example issues are seeded. A stored `[]` means the user deleted everything, so the list stays empty after a reload.

See `src/lib/storage.ts` and `src/test/storage.test.ts`.

## Confirm before a destructive action

Delete is easy to click by mistake and cannot be undone. The button does not remove the issue immediately. It opens a dialog; only "Delete issue" changes the list. Cancel, clicking the backdrop, or Escape leaves the data as it was. The dialog also moves focus to Cancel so a keyboard user is not sitting on the destructive button.

See `src/components/ConfirmDialog.tsx` and the delete tests in `src/test/App.test.tsx`.

## Controlled forms and a required field

The form fields are controlled: React state is the value, and every keystroke updates that state. That makes edit simple (the form is given an existing issue as `initial`) and makes validation straightforward. On submit, a blank title is rejected with a visible error, and focus returns to the title field. The list is not updated until the title is valid.

See `src/components/IssueForm.tsx` and `createIssue` in `src/lib/issues.ts`.

## Theme tokens as CSS variables

Colour tokens live in `src/styles/gloss.css` and are mirrored in TypeScript so a test can check WCAG contrast ratios. If a colour change fails the test, it is caught before it ships. The page has three gloss themes — Khaki, Dark grey and Midnight — plus an optional animated background that stays still when `prefers-reduced-motion` is set.

See `src/styles/gloss.css`, `src/theme/themes.ts` and `src/test/theme.test.ts`.

## Why the original `start`/`render` pattern is gone

The 2020 app held issues only in component state, used class components, and had no tests around adding or closing an issue. Clicking a status always set it to "Closed". Keys on the grid rows were new random ids on every render, which makes React treat every row as new. This rewrite uses stable ids, function components, and tests that cover create, edit, filter, delete and persistence.

The original files lived in `src/components/App.js` and `src/components/Grid.js`. The 2020 screenshot is in `docs/original-screenshot.png`.
