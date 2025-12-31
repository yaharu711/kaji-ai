import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

const SIZE_CLASS = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

const RADIUS_CLASS = {
  md: styles.radiusMd,
  lg: styles.radiusLg,
  pill: styles.radiusPill,
} as const;

const VARIANT_CLASS = {
  primary: styles.variantPrimary,
  secondary: styles.variantSecondary,
  ghost: styles.variantGhost,
} as const;

type Size = keyof typeof SIZE_CLASS;
type Radius = keyof typeof RADIUS_CLASS;
type Variant = keyof typeof VARIANT_CLASS;

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> {
  size?: Size;
  radius?: Radius;
  variant?: Variant;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
}

function Button({
  children,
  size = "md",
  radius = "lg",
  variant = "primary",
  fullWidth = false,
  icon,
  iconPosition = "start",
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const className = [
    styles.button,
    SIZE_CLASS[size],
    RADIUS_CLASS[radius],
    VARIANT_CLASS[variant],
    fullWidth ? styles.fullWidth : "",
    icon ? styles.withIcon : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={className} disabled={disabled} {...rest}>
      {icon && iconPosition === "start" ? <span className={styles.icon}>{icon}</span> : null}
      <span className={styles.label}>{children}</span>
      {icon && iconPosition === "end" ? <span className={styles.icon}>{icon}</span> : null}
    </button>
  );
}

export default Button;
