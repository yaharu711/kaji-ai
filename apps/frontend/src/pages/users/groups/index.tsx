import { useState } from "react";
import { HousePlus } from "lucide-react";
import PageCard from "../../../components/PageCard";
import Button from "../../../components/Button";
import { useGroupsQuery } from "../hooks/useGroupsQuery";
import { useCreateGroupMutation } from "../hooks/useCreateGroupMutation";
import GroupCreateModal from "./group-create-modal";
import GroupCard from "./group-card";
import GroupInviteCard from "./invite-card";
import GroupInviteModal, { type UserSearchResult } from "./group-invite-modal";
import styles from "./groups.module.css";
import { LoaderCircle } from "../../../components";

function GroupsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteModalGroup, setInviteModalGroup] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<UserSearchResult[] | undefined>(undefined);
  const [isSearching, setIsSearching] = useState(false);
  const { data, isLoading, isError } = useGroupsQuery();
  const { mutateAsync: createGroup, isPending: isCreating } = useCreateGroupMutation();

  const handleSubmit = async (groupName: string) => {
    try {
      await createGroup(groupName);
      setIsModalOpen(false);
    } catch (error) {
      // TODO: UI でのエラーハンドリングを検討する
      console.error(error);
    }
  };

  const groups = data?.groups ?? [];
  const invitedGroups = groups.filter((group) => group.is_invited);
  const joinedGroups = groups.filter((group) => !group.is_invited);
  const hasJoinedGroups = joinedGroups.length > 0;

  const handleInviteClick = (groupName: string) => {
    setInviteModalGroup(groupName);
    setSearchResults(undefined);
  };

  const closeInviteModal = () => {
    setInviteModalGroup(null);
  };

  const handleSearch = (keyword: string) => {
    // TODO: API 連携時に検索結果を取得する
    setIsSearching(true);
    setSearchResults([]);
    setIsSearching(false);
    console.info("search keyword:", keyword);
  };

  const renderContent = () => {
    if (isLoading)
      return (
        <div className={styles.loadingWrapper}>
          <LoaderCircle size="md" ariaLabel="グループを読み込み中" />
        </div>
      );
    if (isError) return <p className={styles.helperText}>グループの取得に失敗しました</p>;
    if (!hasJoinedGroups && invitedGroups.length === 0)
      return (
        <div className={styles.emptyCard}>
          <div className={styles.emptyEmoji} aria-hidden="true">
            🏠
          </div>
          <p className={styles.emptyTitle}>まだグループがありません</p>
          <p className={styles.emptyDescription}>
            家族や友人とグループを作って
            <br />
            家事を共有しましょう！
          </p>
        </div>
      );

    return (
      <div className={styles.list}>
        {invitedGroups.map((group) => (
          <GroupInviteCard
            key={`invite-${group.id}`}
            groupName={group.name}
            inviterName={undefined}
          />
        ))}

        {joinedGroups.map((group) => (
          <GroupCard
            key={group.id}
            name={group.name}
            memberCount={group.member_count}
            invitedCount={group.invited_count}
            onInviteClick={() => handleInviteClick(group.name)}
            onOpenClick={() => handleInviteClick(group.name)}
          />
        ))}
      </div>
    );
  };

  return (
    <PageCard>
      <section className={styles.groupsContent} aria-labelledby="groups-heading">
        <div className={styles.sectionHeader}>
          <h2 id="groups-heading">あなたのグループ</h2>
          <Button
            variant="primary"
            radius="pill"
            size="md"
            fullWidth
            icon={<HousePlus aria-hidden size={18} />}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            新規作成
          </Button>
        </div>

        {renderContent()}

        <GroupCreateModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSubmit={(name) => {
            void handleSubmit(name);
          }}
          isSubmitting={isCreating}
        />
      </section>

      <GroupInviteModal
        open={Boolean(inviteModalGroup)}
        onOpenChange={(open) => {
          if (!open) closeInviteModal();
        }}
        groupName={inviteModalGroup ?? ""}
        onSearch={handleSearch}
        isSearching={isSearching}
        searchResults={searchResults}
      />
    </PageCard>
  );
}

export default GroupsSection;
