import type { ReactNode } from "react";
import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "../Button";
import styles from "./HalfModal.module.css";

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

const HEIGHT_CLASS = {
  sm: styles.heightSm,
  md: styles.heightMd,
  lg: styles.heightLg,
} as const;

type Size = keyof typeof SIZE_CLASS;
type Radius = keyof typeof RADIUS_CLASS;
type Height = keyof typeof HEIGHT_CLASS;

interface HalfModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  headerIcon?: ReactNode;
  children: ReactNode;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  size?: Size;
  radius?: Radius;
  height?: Height;
}

function HalfModal({
  open,
  onOpenChange,
  title,
  description,
  headerIcon,
  children,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  size = "md",
  radius = "xl",
  height = "md",
}: HalfModalProps) {
  const contentClassName = [
    styles.content,
    styles.variantSoft,
    SIZE_CLASS[size],
    RADIUS_CLASS[radius],
    HEIGHT_CLASS[height],
  ]
    .filter(Boolean)
    .join(" ");
  const shouldShowFooter = Boolean(primaryActionLabel && secondaryActionLabel);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={contentClassName}>
          <div className={styles.header}>
            <div className={styles.heading}>
              {headerIcon ? <span className={styles.headerIcon}>{headerIcon}</span> : null}
              <div className={styles.titleGroup}>
                <Dialog.Title className={styles.title}>{title}</Dialog.Title>
                {description ? (
                  <Dialog.Description className={styles.description}>
                    {description}
                  </Dialog.Description>
                ) : null}
              </div>
            </div>
            <Dialog.Close asChild>
              <button type="button" className={styles.closeButton} aria-label="閉じる">
                <X size={18} strokeWidth={2.5} />
              </button>
            </Dialog.Close>
          </div>

          <div className={styles.body}>{children}</div>

          {shouldShowFooter ? (
            <div className={styles.footer}>
              {secondaryActionLabel ? (
                <Button
                  variant="outline"
                  radius="pill"
                  size="sm"
                  fullWidth
                  onClick={onSecondaryAction}
                >
                  {secondaryActionLabel}
                </Button>
              ) : null}
              {primaryActionLabel ? (
                <Button radius="pill" fullWidth size="sm" onClick={onPrimaryAction}>
                  {primaryActionLabel}
                </Button>
              ) : null}
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default HalfModal;
