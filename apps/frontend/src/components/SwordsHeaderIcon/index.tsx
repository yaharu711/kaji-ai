import type { HTMLAttributes } from "react";
import { Swords } from "lucide-react";
import styles from "./SwordsHeaderIcon.module.css";

const SIZE_CLASS = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

type Size = keyof typeof SIZE_CLASS;

const ICON_SIZE = {
  sm: 19,
  md: 23,
  lg: 26,
} as const;

interface SwordsHeaderIconProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "className" | "style"> {
  size?: Size;
}

function SwordsHeaderIcon({ size = "md", ...rest }: SwordsHeaderIconProps) {
  const className = [styles.icon, SIZE_CLASS[size]].join(" ");
  const iconSize = ICON_SIZE[size];
  return (
    <span className={className} {...rest}>
      <Swords size={iconSize} />
    </span>
  );
}

export default SwordsHeaderIcon;
