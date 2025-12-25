import type { PropsWithChildren } from "react";
import styles from "./PageCard.module.css";

type PageCardProps = PropsWithChildren<{
  className?: string;
}>;

function PageCard({ children, className }: PageCardProps) {
  const mergedClassName = className ? `${styles.card} ${className}` : styles.card;
  return <div className={mergedClassName}>{children}</div>;
}

export default PageCard;
