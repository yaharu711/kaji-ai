import type { PropsWithChildren } from "react";
import styles from "./PageCard.module.css";

type PageCardProps = PropsWithChildren<{
  align?: "left" | "center";
  padding?: "sm" | "md" | "lg";
}>;

const PADDING_CLASS = {
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
} as const;

function PageCard({ children, align = "left", padding = "lg" }: PageCardProps) {
  const mergedClassName = [
    styles.card,
    align === "center" ? styles.alignCenter : "",
    PADDING_CLASS[padding],
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={mergedClassName}>{children}</div>;
}

export default PageCard;
