import { Heart } from "lucide-react";
import styles from "./HeartIcon.module.css";

const SIZE_MAP = {
  sm: 12,
  md: 16,
  lg: 20,
} as const;

const TONE_CLASS_MAP = {
  accent: styles.toneAccent,
  strong: styles.toneStrong,
  muted: styles.toneMuted,
} as const;

const VARIANT_PROPS = {
  solid: { fill: "currentColor", stroke: "currentColor" },
  outline: { fill: "none", stroke: "currentColor" },
} as const;

type HeartIconSize = keyof typeof SIZE_MAP;

type HeartIconTone = keyof typeof TONE_CLASS_MAP;

type HeartIconVariant = keyof typeof VARIANT_PROPS;

interface HeartIconProps {
  size?: HeartIconSize;
  tone?: HeartIconTone;
  variant?: HeartIconVariant;
  ariaLabel?: string;
}

function HeartIcon({ size = "md", tone = "accent", variant = "solid", ariaLabel }: HeartIconProps) {
  const toneClassName = TONE_CLASS_MAP[tone];
  const variantProps = VARIANT_PROPS[variant];
  const ariaProps = ariaLabel ? { role: "img", "aria-label": ariaLabel } : { "aria-hidden": true };

  return (
    <span className={`${styles.root} ${toneClassName}`} {...ariaProps}>
      <Heart size={SIZE_MAP[size]} {...variantProps} />
    </span>
  );
}

export default HeartIcon;
