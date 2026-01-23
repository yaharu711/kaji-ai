import type { ReactNode } from "react";
import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "../Button";
import LoaderCircle from "../LoaderCircle";
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

type FooterActions =
  | {
      primaryActionLabel: string;
      secondaryActionLabel: string;
      primaryActionDisabled?: boolean;
      primaryActionLoading?: boolean;
      secondaryActionDisabled?: boolean;
      onPrimaryAction?: () => void;
      onSecondaryAction?: () => void;
    }
  | {
      primaryActionLabel?: undefined;
      secondaryActionLabel?: undefined;
      primaryActionDisabled?: undefined;
      primaryActionLoading?: undefined;
      secondaryActionDisabled?: undefined;
      onPrimaryAction?: undefined;
      onSecondaryAction?: undefined;
    };

interface HalfModalBaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  headerIcon?: ReactNode;
  children: ReactNode;
  size?: Size;
  radius?: Radius;
  height?: Height;
}

type HalfModalProps = HalfModalBaseProps & FooterActions;

function HalfModal({
  open,
  onOpenChange,
  title,
  description,
  headerIcon,
  children,
  primaryActionLabel,
  secondaryActionLabel,
  primaryActionDisabled = false,
  primaryActionLoading = false,
  secondaryActionDisabled = false,
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
  const resolvedPrimaryDisabled = primaryActionDisabled || primaryActionLoading;
  const resolvedSecondaryDisabled = secondaryActionDisabled || primaryActionLoading;
  const primaryActionIcon = primaryActionLoading ? (
    <LoaderCircle size="xs" tone="onPrimary" ariaLabel="処理中" />
  ) : undefined;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={contentClassName}>
          <div className={styles.header}>
            <div className={styles.heading}>
              {headerIcon ?? null}
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
                  disabled={resolvedSecondaryDisabled}
                >
                  {secondaryActionLabel}
                </Button>
              ) : null}
              {primaryActionLabel ? (
                <Button
                  radius="pill"
                  fullWidth
                  size="sm"
                  onClick={onPrimaryAction}
                  disabled={resolvedPrimaryDisabled}
                  icon={primaryActionIcon}
                  aria-busy={primaryActionLoading}
                >
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
