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
  const [errorText, setErrorText] = useState("");
  const formId = useId();
  const MAX_LENGTH = 100;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const nextValue = event.target.value;
    setGroupName(nextValue);

    if (nextValue.trim().length <= MAX_LENGTH && errorText) {
      setErrorText("");
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setGroupName("");
      setErrorText("");
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const trimmedName = groupName.trim();
    if (!trimmedName) return;

    if (trimmedName.length > MAX_LENGTH) {
      setErrorText("グループ名は100文字以内で入力してください");
      return;
    }

    onSubmit(trimmedName);
    setGroupName("");
    setErrorText("");
  };

  const isDisabled = isSubmitting || !groupName.trim() || Boolean(errorText);

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
          error={Boolean(errorText)}
          errorText={errorText}
        />
      </form>
    </Modal>
  );
}

export default GroupCreateModal;
