import { Search } from "lucide-react";
import { useId, useState, type FormEventHandler, type ReactNode } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";
import styles from "./group-invite-modal.module.css";

interface GroupInviteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
  onSearch: (keyword: string) => void;
  isSearching?: boolean;
  results?: ReactNode;
}

function GroupInviteModal({
  open,
  onOpenChange,
  groupName,
  onSearch,
  isSearching = false,
  results,
}: GroupInviteModalProps) {
  const [keyword, setKeyword] = useState("");
  const formId = useId();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const trimmed = keyword.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setKeyword("");
    }
    onOpenChange(nextOpen);
  };

  const isDisabled = isSearching || !keyword.trim();

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title="メンバーを招待 ✨"
      description={`${groupName}に招待するユーザーを検索できる`}
    >
      <form id={formId} onSubmit={handleSubmit} className={styles.searchForm}>
        <Input
          fullWidth
          radius="pill"
          placeholder="kaji-enjoy@thankyou.com"
          value={keyword}
          label="メールアドレス"
          onChange={(e) => setKeyword(e.target.value)}
          disabled={isSearching}
        />
        <Button
          type="submit"
          size="md"
          radius="pill"
          variant="primary"
          disabled={isDisabled}
          icon={<Search size={18} strokeWidth={2.4} />}
        >
          検索
        </Button>
      </form>

      <div className={styles.resultArea} aria-live="polite">
        {results ?? (
          <div className={styles.emptyState}>
            <span className={styles.emptyEmoji} aria-hidden="true">
              🔍
            </span>
            <p className={styles.emptyText}>ユーザーが見つかりませんでした</p>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default GroupInviteModal;
