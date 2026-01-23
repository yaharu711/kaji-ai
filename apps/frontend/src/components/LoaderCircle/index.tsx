import { LoaderCircle as LoaderCircleIcon } from "lucide-react";
import styles from "./LoaderCircle.module.css";

const SIZE_CLASS_MAP = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

const TONE_CLASS_MAP = {
  accent: styles.toneAccent,
  neutral: styles.toneNeutral,
  onPrimary: styles.toneOnPrimary,
} as const;

interface LoaderCircleProps {
  size?: keyof typeof SIZE_CLASS_MAP;
  tone?: keyof typeof TONE_CLASS_MAP;
  ariaLabel?: string;
}

function LoaderCircle({
  size = "md",
  tone = "accent",
  ariaLabel = "読み込み中",
}: LoaderCircleProps) {
  const sizeClass = SIZE_CLASS_MAP[size];
  const toneClass = TONE_CLASS_MAP[tone];

  return (
    <LoaderCircleIcon
      role="status"
      aria-label={ariaLabel}
      className={`${styles.spinner} ${sizeClass} ${toneClass}`}
    />
  );
}

export default LoaderCircle;
