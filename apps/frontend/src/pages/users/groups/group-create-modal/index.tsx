import { useState, type ChangeEventHandler } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import styles from "./group-create-modal.module.css";

interface GroupCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (groupName: string) => void;
  isSubmitting?: boolean;
}

function GroupCreateModal({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: GroupCreateModalProps) {
  const [groupName, setGroupName] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setGroupName(event.target.value);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setGroupName("");
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = () => {
    if (!groupName.trim()) return;
    onSubmit(groupName.trim());
    setGroupName("");
  };

  const isDisabled = isSubmitting || !groupName.trim();

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title="新しいグループを作成 ✨"
      footer={
        <Button
          fullWidth
          radius="pill"
          size="lg"
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          作成する
        </Button>
      }
    >
      <div className={styles.modalContent}>
        <Input
          label="グループ名"
          placeholder="例: 田中家"
          fullWidth
          radius="pill"
          value={groupName}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>
    </Modal>
  );
}

export default GroupCreateModal;
