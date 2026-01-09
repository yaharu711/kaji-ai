import { Search } from "lucide-react";
import { useId, useState, type FormEventHandler } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";
import SearchResultList from "./search-result-list";
import styles from "./group-invite-modal.module.css";

interface GroupInviteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
  onSearch: (keyword: string) => void;
  isSearching?: boolean;
  searchResults?: UserSearchResult[];
  onInvite?: (user: UserSearchResult) => void;
  invitingUserId?: string;
}

export interface UserSearchResult {
  id: string;
  name: string;
  email: string;
  status?: "available" | "joined" | "invited";
}

function GroupInviteModal({
  open,
  onOpenChange,
  groupName,
  onSearch,
  isSearching = false,
  searchResults,
  onInvite,
  invitingUserId,
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

  const hasSearchResults = Boolean(searchResults && searchResults.length > 0);

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
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
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
        {hasSearchResults ? (
          <SearchResultList
            results={searchResults ?? []}
            onInvite={onInvite}
            invitingUserId={invitingUserId}
          />
        ) : (
          <div className={styles.emptyContainer}>
            <div className={styles.emptyState}>
              <span className={styles.emptyEmoji} aria-hidden="true">
                🔍
              </span>
              <p className={styles.emptyText}>招待したいユーザーを検索しましょう！</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default GroupInviteModal;
