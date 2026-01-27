import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Drawer } from "vaul";
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
      primaryActionIcon?: ReactNode;
      primaryActionIconPosition?: "start" | "end";
      secondaryActionDisabled?: boolean;
      secondaryActionIcon?: ReactNode;
      secondaryActionIconPosition?: "start" | "end";
      onPrimaryAction?: () => void;
      onSecondaryAction?: () => void;
    }
  | {
      primaryActionLabel?: undefined;
      secondaryActionLabel?: undefined;
      primaryActionDisabled?: undefined;
      primaryActionLoading?: undefined;
      primaryActionIcon?: undefined;
      primaryActionIconPosition?: undefined;
      secondaryActionDisabled?: undefined;
      secondaryActionIcon?: undefined;
      secondaryActionIconPosition?: undefined;
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
  primaryActionIcon,
  primaryActionIconPosition = "start",
  secondaryActionDisabled = false,
  secondaryActionIcon,
  secondaryActionIconPosition = "start",
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
  const resolvedPrimaryIcon = primaryActionLoading ? (
    <LoaderCircle size="xs" tone="onPrimary" ariaLabel="処理中" />
  ) : (
    primaryActionIcon
  );

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
  };

  // 今のままだと、primaryActionLoading中に閉じてしまい、ローディング中のフィードバックができない、、！
  // けど、閉じないようにすると閉じる時にアニメーションがつかなくなる
  // この記事も参考にすると解決策が出てくるかも: https://qiita.com/yun_bow/items/31aaad10d182f03c795b#modal
  const handlePrimaryActionClick = () => {
    onPrimaryAction?.();
    handleOpenChange(false);
  };

  const handleSecondaryActionClick = () => {
    onSecondaryAction?.();
    handleOpenChange(false);
  };

  return (
    <Drawer.Root open={open} onOpenChange={handleOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} />
        <Drawer.Content className={contentClassName}>
          <div className={styles.header}>
            <div className={styles.heading}>
              {headerIcon ?? null}
              <div className={styles.titleGroup}>
                <Drawer.Title className={styles.title}>{title}</Drawer.Title>
                {description ? (
                  <Drawer.Description className={styles.description}>
                    {description}
                  </Drawer.Description>
                ) : null}
              </div>
            </div>
            <Drawer.Close asChild>
              <button type="button" className={styles.closeButton} aria-label="閉じる">
                <X size={18} strokeWidth={2.5} />
              </button>
            </Drawer.Close>
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
                  onClick={handleSecondaryActionClick}
                  disabled={resolvedSecondaryDisabled}
                  icon={secondaryActionIcon}
                  iconPosition={secondaryActionIconPosition}
                >
                  {secondaryActionLabel}
                </Button>
              ) : null}
              {primaryActionLabel ? (
                <Button
                  radius="pill"
                  fullWidth
                  size="sm"
                  onClick={handlePrimaryActionClick}
                  disabled={resolvedPrimaryDisabled}
                  icon={resolvedPrimaryIcon}
                  iconPosition={primaryActionIconPosition}
                  aria-busy={primaryActionLoading}
                >
                  {primaryActionLabel}
                </Button>
              ) : null}
            </div>
          ) : null}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default HalfModal;
