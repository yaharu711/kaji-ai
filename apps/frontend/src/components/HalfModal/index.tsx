import type { ReactNode } from "react";
import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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
  const [isClosing, setIsClosing] = useState(false);

  // isClosingをtrueにすることで、すぐにアンマウントされないようにしている
  // これは、アニメーションが終わった時点でisClosingをfalseにしてアンマウントするため
  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      onOpenChange(true);
      return;
    }

    setIsClosing(true);
    onOpenChange(false);
  };

  // 今のままだと、primaryActionLoading中に閉じてしまい、ローディング中のフィードバックができない、、！
  // けど、閉じないようにすると閉じる時にアニメーションがつかなくなる
  const handlePrimaryActionClick = () => {
    onPrimaryAction?.();
    handleOpenChange(false);
  };

  const handleSecondaryActionClick = () => {
    onSecondaryAction?.();
    handleOpenChange(false);
  };

  return (
    <Dialog.Root open={open || isClosing} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <AnimatePresence
          onExitComplete={() => {
            setIsClosing(false);
          }}
        >
          {open ? (
            <>
              <Dialog.Overlay asChild>
                <motion.div
                  className={styles.overlay}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  className={contentClassName}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" } }}
                  exit={{ opacity: 0, y: 32, transition: { duration: 0.24, ease: "easeIn" } }}
                >
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
                </motion.div>
              </Dialog.Content>
            </>
          ) : null}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default HalfModal;
