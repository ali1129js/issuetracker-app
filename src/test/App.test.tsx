import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "../App";
import { KEYS } from "../lib/storage";

function renderApp() {
  return render(<App />);
}

describe("App", () => {
  it("shows the seeded example issues with an Example badge", () => {
    renderApp();
    expect(screen.getByRole("heading", { name: "Issue Tracker" })).toBeInTheDocument();
    expect(screen.getByText("2 open · 1 in progress · 2 done")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Login form accepts a blank password" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Example")).toHaveLength(5);
  });

  it("creates an issue and lists it as a real issue, not an example", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole("button", { name: "New issue" }));
    await user.type(screen.getByLabelText("Title"), "Cannot reset password");
    await user.type(screen.getByLabelText("Description"), "The reset email never arrives.");
    await user.click(screen.getByRole("button", { name: "High" }));
    await user.click(screen.getByRole("button", { name: "Create issue" }));

    expect(screen.getByRole("heading", { name: "Cannot reset password" })).toBeInTheDocument();
    expect(screen.getByText("The reset email never arrives.")).toBeInTheDocument();
    expect(screen.getByText("3 open · 1 in progress · 2 done")).toBeInTheDocument();
    expect(screen.getAllByText("Example")).toHaveLength(5);
    expect(screen.getByText("Showing 6 of 6 issues")).toBeInTheDocument();
  });

  it("requires a title when creating an issue", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole("button", { name: "New issue" }));
    await user.click(screen.getByRole("button", { name: "Create issue" }));
    expect(screen.getByRole("alert")).toHaveTextContent("A title is required.");
  });

  it("filters by status and search", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.selectOptions(screen.getByLabelText("Status"), "done");
    expect(screen.getByText("Showing 2 of 5 issues")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Profile page heading has a typo" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Login form accepts a blank password" }),
    ).not.toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Search title or description"), "theme");
    expect(
      screen.getByRole("heading", { name: "Dark theme flashes white on the first load" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Profile page heading has a typo" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Showing 1 of 5 issues")).toBeInTheDocument();
  });

  it("shows an empty state when filters match nothing, and can clear them", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByPlaceholderText("Search title or description"), "xyzzy-no-match");
    expect(screen.getByRole("status")).toHaveTextContent("No matching issues");
    await user.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getByText("Showing 5 of 5 issues")).toBeInTheDocument();
  });

  it("edits an issue", async () => {
    const user = userEvent.setup();
    renderApp();
    const article = screen.getByRole("article", { name: "Login form accepts a blank password" });
    await user.click(within(article).getByRole("button", { name: "Edit" }));
    const title = screen.getByLabelText("Title");
    await user.clear(title);
    await user.type(title, "Login form should reject a blank password");
    await user.click(screen.getByRole("button", { name: "In Progress" }));
    await user.click(screen.getByRole("button", { name: "Save changes" }));
    expect(
      screen.getByRole("heading", { name: "Login form should reject a blank password" }),
    ).toBeInTheDocument();
    expect(screen.getByText("1 open · 2 in progress · 2 done")).toBeInTheDocument();
  });

  it("asks for confirmation before deleting, and cancel leaves the issue", async () => {
    const user = userEvent.setup();
    renderApp();
    const article = screen.getByRole("article", { name: "CSV export drops the last row" });
    await user.click(within(article).getByRole("button", { name: "Delete" }));
    expect(screen.getByRole("dialog", { name: "Delete this issue?" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "CSV export drops the last row" }),
    ).toBeInTheDocument();
  });

  it("deletes an issue after confirmation and persists the remaining list", async () => {
    const user = userEvent.setup();
    const { unmount } = renderApp();
    const article = screen.getByRole("article", { name: "CSV export drops the last row" });
    await user.click(within(article).getByRole("button", { name: "Delete" }));
    await user.click(screen.getByRole("button", { name: "Delete issue" }));
    expect(
      screen.queryByRole("heading", { name: "CSV export drops the last row" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Showing 4 of 4 issues")).toBeInTheDocument();
    unmount();
    renderApp();
    expect(
      screen.queryByRole("heading", { name: "CSV export drops the last row" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Showing 4 of 4 issues")).toBeInTheDocument();
  });

  it("shows the empty list state after every issue is deleted", async () => {
    const user = userEvent.setup();
    renderApp();
    for (const title of [
      "Login form accepts a blank password",
      "Search results do not update when a filter changes",
      "CSV export drops the last row",
      "Dark theme flashes white on the first load",
      "Profile page heading has a typo",
    ]) {
      const article = screen.getByRole("article", { name: title });
      await user.click(within(article).getByRole("button", { name: "Delete" }));
      await user.click(screen.getByRole("button", { name: "Delete issue" }));
    }
    expect(screen.getByRole("status")).toHaveTextContent("No issues yet");
    const saved = localStorage.getItem(KEYS.issues);
    expect(saved).toBe("[]");
  });

  it("switches theme and stores the choice", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole("button", { name: "Graphite" }));
    expect(document.documentElement.dataset.theme).toBe("graphite");
    expect(localStorage.getItem(KEYS.theme)).toBe(JSON.stringify("graphite"));
  });

  it("keeps background motion static by default and persists a change", async () => {
    const user = userEvent.setup();
    renderApp();
    const toggle = screen.getByRole("button", { name: "Animated background" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement.dataset.motion).toBe("static");
    expect(localStorage.getItem(KEYS.motion)).toBeNull();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.dataset.motion).toBe("animated");
    expect(localStorage.getItem(KEYS.motion)).toBe(JSON.stringify("animated"));
  });
});
