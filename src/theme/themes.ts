import type { ThemeName } from "../lib/types";

export interface ThemeTokens {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  onAccent: string;
  focus: string;
  danger: string;
  onDanger: string;
  open: string;
  progress: string;
  done: string;
  high: string;
  medium: string;
  low: string;
  exampleBg: string;
  exampleText: string;
}

export const THEME_LABELS: Readonly<Record<ThemeName, string>> = {
  light: "Light",
  dark: "Dark",
};

export const THEMES: Readonly<Record<ThemeName, ThemeTokens>> = {
  light: {
    bg: "#eef1f7",
    surface: "#ffffff",
    text: "#151a26",
    textMuted: "#4b5568",
    border: "#6b778c",
    accent: "#3730a3",
    onAccent: "#ffffff",
    focus: "#1e3a8a",
    danger: "#b42318",
    onDanger: "#ffffff",
    open: "#1d4ed8",
    progress: "#92400e",
    done: "#047857",
    high: "#b42318",
    medium: "#b45309",
    low: "#1d4ed8",
    exampleBg: "#eef2ff",
    exampleText: "#3730a3",
  },
  dark: {
    bg: "#0e121b",
    surface: "#171d2b",
    text: "#e8edf7",
    textMuted: "#a8b3c7",
    border: "#7b879c",
    accent: "#a5b4fc",
    onAccent: "#111827",
    focus: "#fbbf24",
    danger: "#fca5a5",
    onDanger: "#1f1212",
    open: "#93c5fd",
    progress: "#fbbf24",
    done: "#6ee7b7",
    high: "#fca5a5",
    medium: "#fbbf24",
    low: "#93c5fd",
    exampleBg: "#1e1b4b",
    exampleText: "#c7d2fe",
  },
};

export function applyTheme(name: ThemeName, root: HTMLElement = document.documentElement): void {
  root.dataset.theme = name;
  const tokens = THEMES[name];
  for (const [key, value] of Object.entries(tokens)) {
    root.style.setProperty(`--${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`, value);
  }
  root.style.colorScheme = name;
}

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex: string): number {
  const [r = 0, g = 0, b = 0] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}
