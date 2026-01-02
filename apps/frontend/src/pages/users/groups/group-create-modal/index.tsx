import { useState, type ChangeEventHandler, type FormEventHandler, useId } from "react";
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
  const formId = useId();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setGroupName(event.target.value);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setGroupName("");
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
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
        <Button form={formId} fullWidth radius="pill" size="lg" type="submit" disabled={isDisabled}>
          作成する
        </Button>
      }
    >
      <form id={formId} onSubmit={handleSubmit} className={styles.modalContent}>
        <Input
          label="グループ名"
          placeholder="例: 田中家"
          fullWidth
          radius="pill"
          value={groupName}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </form>
    </Modal>
  );
}

export default GroupCreateModal;
