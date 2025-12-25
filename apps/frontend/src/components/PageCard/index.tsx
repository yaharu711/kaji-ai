import type { PropsWithChildren } from "react";
import styles from "./PageCard.module.css";

type PageCardProps = PropsWithChildren<{
  align?: "left" | "center";
}>;

function PageCard({ children, align = "left" }: PageCardProps) {
  const mergedClassName = align === "center" ? `${styles.card} ${styles.alignCenter}` : styles.card;
  return <div className={mergedClassName}>{children}</div>;
}

export default PageCard;
