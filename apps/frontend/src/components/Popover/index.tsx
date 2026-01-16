import type { ReactNode } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import styles from "./Popover.module.css";

const SIZE_CLASS = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

const RADIUS_CLASS = {
  md: styles.radiusMd,
  lg: styles.radiusLg,
  xl: styles.radiusXl,
} as const;

const VARIANT_CLASS = {
  default: styles.variantDefault,
  soft: styles.variantSoft,
} as const;

type Size = keyof typeof SIZE_CLASS;
type Radius = keyof typeof RADIUS_CLASS;
type Variant = keyof typeof VARIANT_CLASS;

type PopoverSide = "top" | "right" | "bottom" | "left";
type PopoverAlign = "start" | "center" | "end";

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  ariaLabel?: string;
  size?: Size;
  radius?: Radius;
  variant?: Variant;
  side?: PopoverSide;
  align?: PopoverAlign;
  sideOffset?: number;
  alignOffset?: number;
}

function Popover({
  trigger,
  content,
  open,
  onOpenChange,
  ariaLabel,
  size = "md",
  radius = "xl",
  variant = "default",
  side = "bottom",
  align = "end",
  sideOffset = 12,
  alignOffset = 0,
}: PopoverProps) {
  const contentClassName = [
    styles.popover,
    SIZE_CLASS[size],
    RADIUS_CLASS[radius],
    VARIANT_CLASS[variant],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          className={contentClassName}
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          aria-label={ariaLabel}
        >
          {content}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

export default Popover;
