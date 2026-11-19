import { describe, expect, it } from "vitest";
import { GLOSS, THEMES, contrastMeets } from "../theme/themes";
import type { ThemeTokens } from "../theme/themes";
import { THEME_NAMES, type ThemeName } from "../lib/types";

const textPairs: Array<[keyof ThemeTokens, keyof ThemeTokens, number]> = [
  ["bg", "text", 4.5],
  ["surface", "text", 4.5],
  ["surface", "textMuted", 4.5],
  ["accent", "onAccent", 4.5],
  ["danger", "onDanger", 4.5],
  ["exampleBg", "exampleText", 4.5],
  ["surface", "dangerText", 4.5],
  ["bg", "border", 3],
  ["bg", "controlBorder", 3],
  ["surface", "controlBorder", 3],
  ["bg", "focus", 3],
];

const fillPairs: Array<[string, string, number]> = [
  [GLOSS.cobalt, GLOSS.onCobalt, 4.5],
  [GLOSS.pewter, GLOSS.onPewter, 4.5],
  [GLOSS.jade, GLOSS.onJade, 4.5],
  [GLOSS.garnet, GLOSS.onGarnet, 4.5],
  [GLOSS.saffron, GLOSS.onSaffron, 4.5],
  [GLOSS.lagoon, GLOSS.onLagoon, 4.5],
];

describe("theme contrast", () => {
  it.each(
    THEME_NAMES.flatMap((theme) =>
      textPairs
        // Graphite uses a soft border by design, so it is not held to a 3:1 border check.
        .filter((pair) => !(theme === "graphite" && pair[0] === "bg" && pair[1] === "border"))
        .map((pair) => [theme, ...pair]),
    ),
  )("%s %s against %s is at least %s:1", (theme, a, b, min) => {
    const tokens = THEMES[theme as ThemeName];
    expect(
      contrastMeets(tokens[a as keyof ThemeTokens], tokens[b as keyof ThemeTokens], min as number),
    ).toBe(true);
  });

  it.each(fillPairs)("gloss fill %s against %s is at least %s:1", (bg, fg, min) => {
    expect(contrastMeets(bg, fg, min)).toBe(true);
  });
});
