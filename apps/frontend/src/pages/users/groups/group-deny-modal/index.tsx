import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import styles from "./group-deny-modal.module.css";

interface GroupDenyModalProps {
  open: boolean;
  groupName?: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

function GroupDenyModal({
  open,
  groupName,
  onOpenChange,
  onConfirm,
  onCancel,
  isSubmitting = false,
}: GroupDenyModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="招待を拒否します"
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            size="md"
            radius="lg"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            キャンセル
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            radius="lg"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            拒否する
          </Button>
        </>
      }
    >
      <p className={styles.message}>「{groupName ?? "グループ"}」への招待を本当に拒否しますか？</p>
    </Modal>
  );
}

export default GroupDenyModal;
