import type { MotionName } from "../lib/types";

interface Props {
  value: MotionName;
  onChange: (motion: MotionName) => void;
  reducedMotion: boolean;
}

function WavesIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <path
        d="M3 6.5c2-2 4 2 6 0s4 2 6 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M3 10.5c2-2 4 2 6 0s4 2 6 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M3 14.5c2-2 4 2 6 0s4 2 6 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
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
      <WavesIcon />
    </button>
  );
}
