import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./Input.module.css";

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

type Size = keyof typeof SIZE_CLASS;
type Radius = keyof typeof RADIUS_CLASS;

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "style" | "size"> {
  label?: string;
  helperText?: string;
  errorText?: string;
  error?: boolean;
  size?: Size;
  radius?: Radius;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

function Input({
  label,
  helperText,
  errorText,
  error = false,
  size = "md",
  radius = "lg",
  fullWidth = false,
  leftIcon,
  rightIcon,
  id,
  disabled,
  required,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const labelId = label ? `${inputId}-label` : undefined;
  const descriptionId = helperText || errorText ? `${inputId}-desc` : undefined;

  const fieldClassName = [
    styles.field,
    SIZE_CLASS[size],
    RADIUS_CLASS[radius],
    error ? styles.error : "",
    disabled ? styles.disabled : "",
    fullWidth ? styles.fullWidth : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={[styles.root, fullWidth ? styles.fullWidth : ""].filter(Boolean).join(" ")}>
      {label ? (
        <label id={labelId} className={styles.label} htmlFor={inputId}>
          {label}
          {required ? <span className={styles.required}>*</span> : null}
        </label>
      ) : null}

      <div className={fieldClassName}>
        {leftIcon ? <span className={styles.icon}>{leftIcon}</span> : null}
        <input
          id={inputId}
          className={styles.input}
          aria-invalid={error}
          aria-describedby={descriptionId}
          disabled={disabled}
          required={required}
          {...rest}
        />
        {rightIcon ? <span className={styles.icon}>{rightIcon}</span> : null}
      </div>

      {descriptionId ? (
        <p id={descriptionId} className={errorText ? styles.errorText : styles.helperText}>
          {errorText ?? helperText}
        </p>
      ) : null}
    </div>
  );
}

export default Input;
