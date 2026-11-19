import type { MotionName } from "../lib/types";

interface Props {
  value: MotionName;
  onChange: (motion: MotionName) => void;
  reducedMotion: boolean;
}

function MotionIcon({ pressed }: { pressed: boolean }) {
  if (pressed) {
    return (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <rect x="4.5" y="4" width="4" height="12" rx="1.2" fill="currentColor" />
        <rect x="11.5" y="4" width="4" height="12" rx="1.2" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <path d="M6 4.2v11.6L16.2 10 6 4.2z" fill="currentColor" />
    </svg>
  );
}

export function MotionToggle({ value, onChange, reducedMotion }: Props) {
  const pressed = !reducedMotion && value === "animated";
  const label = reducedMotion
    ? "Animated background (reduced motion is on)"
    : "Animated background";
  return (
    <button
      type="button"
      className="motion-toggle"
      aria-label={label}
      aria-pressed={pressed}
      disabled={reducedMotion}
      onClick={() => onChange(pressed ? "static" : "animated")}
    >
      <MotionIcon pressed={pressed} />
    </button>
  );
}
