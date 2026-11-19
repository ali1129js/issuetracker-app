import { THEME_NAMES } from "../lib/types";
import type { ThemeName } from "../lib/types";
import { THEME_LABELS } from "./themes";

interface Props {
  value: ThemeName;
  onChange: (theme: ThemeName) => void;
}

export function ThemeSwitcher({ value, onChange }: Props) {
  return (
    <div role="group" aria-label="Theme" className="segmented">
      {THEME_NAMES.map((name) => (
        <button
          key={name}
          type="button"
          aria-pressed={value === name}
          onClick={() => onChange(name)}
          className="segment"
        >
          {THEME_LABELS[name]}
        </button>
      ))}
    </div>
  );
}
