import { Search } from "lucide-react";
import { useId, useState, type FormEventHandler } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";
import { LoaderCircle } from "../../../../components";
import type { SearchUser } from "@kaiji-ai/backend/contracts";
import SearchResultList from "./search-result-list";
import styles from "./group-invite-modal.module.css";

interface GroupInviteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
  onSearch: (keyword: string) => void;
  isSearching: boolean;
  isInviting: boolean;
  searchResults: SearchUser[];
  searchError: string;
  onClearSearchError: () => void;
  onInvite: (user: SearchUser) => void;
}

function GroupInviteModal({
  open,
  onOpenChange,
  groupName,
  onSearch,
  isSearching = false,
  isInviting = false,
  searchResults,
  searchError,
  onClearSearchError,
  onInvite,
}: GroupInviteModalProps) {
  const [keyword, setKeyword] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const formId = useId();

  const resetForm = () => {
    setKeyword("");
    setHasSearched(false);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const trimmed = keyword.trim();
    if (!trimmed) return;
    onSearch(trimmed);
    setHasSearched(true);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const isDisabledButton = isSearching || isInviting || !keyword.trim();

  const hasSearchResults = searchResults.length > 0;
  const emptyText = hasSearched
    ? "該当するユーザーが見つかりませんでした"
    : "招待したいユーザーを検索しましょう！";

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
            if (searchError) {
              onClearSearchError();
            }
          }}
          disabled={isSearching || isInviting}
          error={Boolean(searchError)}
          errorText={searchError}
        />
        <Button
          type="submit"
          size="md"
          radius="pill"
          variant="primary"
          disabled={isDisabledButton}
          icon={<Search size={18} strokeWidth={2.4} />}
        >
          検索
        </Button>
      </form>

      <div className={styles.resultArea} aria-live="polite">
        {isSearching ? (
          <div className={styles.emptyContainer}>
            <LoaderCircle size="md" ariaLabel="ユーザーを検索中" />
          </div>
        ) : hasSearchResults ? (
          <SearchResultList
            results={searchResults}
            onInvite={(user) => {
              onInvite(user);
              handleOpenChange(false);
            }}
            isInviting={isInviting}
          />
        ) : (
          <div className={styles.emptyContainer}>
            <div className={styles.emptyState}>
              <span className={styles.emptyEmoji} aria-hidden="true">
                🔍
              </span>
              <p className={styles.emptyText}>{emptyText}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default GroupInviteModal;
