import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Badge.module.css";

const SIZE_CLASS = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
} as const;

const RADIUS_CLASS = {
  md: styles.radiusMd,
  pill: styles.radiusPill,
} as const;

const VARIANT_CLASS = {
  accent: styles.variantAccent,
  neutral: styles.variantNeutral,
} as const;

type Size = keyof typeof SIZE_CLASS;
type Radius = keyof typeof RADIUS_CLASS;
type Variant = keyof typeof VARIANT_CLASS;

interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "className" | "style"> {
  children: ReactNode;
  size?: Size;
  radius?: Radius;
  variant?: Variant;
}

function Badge({
  children,
  size = "sm",
  radius = "pill",
  variant = "accent",
  ...rest
}: BadgeProps) {
  const className = [styles.badge, SIZE_CLASS[size], RADIUS_CLASS[radius], VARIANT_CLASS[variant]]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={className} {...rest}>
      {children}
    </span>
  );
}

export default Badge;
