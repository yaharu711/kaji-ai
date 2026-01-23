import { LoaderCircle as LoaderCircleIcon } from "lucide-react";
import styles from "./LoaderCircle.module.css";

const SIZE_CLASS_MAP = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

interface LoaderCircleProps {
  size?: keyof typeof SIZE_CLASS_MAP;
  ariaLabel?: string;
}

function LoaderCircle({ size = "md", ariaLabel = "読み込み中" }: LoaderCircleProps) {
  const sizeClass = SIZE_CLASS_MAP[size];

  return (
    <LoaderCircleIcon
      role="status"
      aria-label={ariaLabel}
      className={`${styles.spinner} ${sizeClass}`}
    />
  );
}

export default LoaderCircle;
