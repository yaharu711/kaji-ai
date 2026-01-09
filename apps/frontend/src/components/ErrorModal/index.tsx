import type { ReactNode } from "react";
import Modal from "../Modal";
import Button from "../Button";
import styles from "./ErrorModal.module.css";

interface ErrorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: string;
  description?: ReactNode;
  actionLabel?: string;
}

function ErrorModal({
  open,
  onOpenChange,
  title = "エラーが発生しました",
  message,
  description,
  actionLabel = "閉じる",
}: ErrorModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={typeof description === "string" ? description : undefined}
      footer={
        <Button
          type="button"
          size="md"
          radius="pill"
          variant="primary"
          onClick={() => {
            onOpenChange(false);
          }}
        >
          {actionLabel}
        </Button>
      }
    >
      <div className={styles.body}>
        <p className={styles.message}>{message}</p>
        {description && typeof description !== "string" ? (
          <div className={styles.description}>{description}</div>
        ) : null}
      </div>
    </Modal>
  );
}

export default ErrorModal;
