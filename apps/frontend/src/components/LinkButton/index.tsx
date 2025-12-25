import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import styles from "./LinkButton.module.css";

type LinkButtonProps = PropsWithChildren<{
  to: string;
  variant?: "primary" | "secondary";
  ariaLabel?: string;
}>;

function LinkButton({ to, children, variant = "primary", ariaLabel }: LinkButtonProps) {
  const mergedClassName = [styles.button, styles[variant]].join(" ");

  return (
    // アイコンのみの場合に備えて aria-label を受け取れるようにする
    <Link to={to} className={mergedClassName} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export default LinkButton;
