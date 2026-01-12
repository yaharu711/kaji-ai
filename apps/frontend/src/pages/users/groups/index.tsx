import { useState } from "react";
import { HousePlus } from "lucide-react";
import PageCard from "../../../components/PageCard";
import Button from "../../../components/Button";
import { useGroupsQuery } from "../hooks/useGroupsQuery";
import { useCreateGroupMutation } from "../hooks/useCreateGroupMutation";
import { useSearchGroupUsers } from "../hooks/useSearchGroupUsers";
import { useInviteGroupMutation } from "../hooks/useInviteGroupMutation";
import { useAcceptGroupInvitationMutation } from "../hooks/useAcceptGroupInvitationMutation";
import { useDenyGroupInvitationMutation } from "../hooks/useDenyGroupInvitationMutation";
import GroupCreateModal from "./group-create-modal";
import GroupCard from "./group-card";
import GroupInviteCard from "./invite-card";
import GroupInviteModal from "./group-invite-modal";
import styles from "./groups.module.css";
import { LoaderCircle } from "../../../components";

function GroupsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteModalGroup, setInviteModalGroup] = useState<{ id: string; name: string } | null>(
    null,
  );
  const { data, isLoading, isError } = useGroupsQuery();
  const { mutateAsync: createGroup, isPending: isCreating } = useCreateGroupMutation();
  const { mutateAsync: inviteGroupUser, isPending: isInviting } = useInviteGroupMutation();
  const { mutateAsync: acceptInvitation, isPending: isAccepting } =
    useAcceptGroupInvitationMutation();
  const { mutateAsync: denyInvitation, isPending: isDenying } =
    useDenyGroupInvitationMutation();
  const {
    mutateAsync: searchGroupUsers,
    isPending: isSearching,
    data: searchUsersResult,
    errorMessage: searchError,
    clearErrorMessage,
    resetSearchResult,
  } = useSearchGroupUsers();

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

  const handleInviteClick = (groupId: string, groupName: string) => {
    setInviteModalGroup({ id: groupId, name: groupName });
    resetSearchResult();
  };

  const closeInviteModal = () => {
    setInviteModalGroup(null);
    resetSearchResult();
  };

  const handleSearch = async (keyword: string) => {
    if (!inviteModalGroup) return;

    try {
      await searchGroupUsers({ groupId: inviteModalGroup.id, email: keyword });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInvite = async (userId: string) => {
    if (!inviteModalGroup) return;

    try {
      await inviteGroupUser({ groupId: inviteModalGroup.id, userId });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptInvitation = async (groupId: string) => {
    try {
      await acceptInvitation({ groupId });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDenyInvitation = async (groupId: string) => {
    try {
      await denyInvitation({ groupId });
    } catch (error) {
      console.error(error);
    }
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
            disabled={isAccepting || isDenying}
            onAccept={() => {
              void handleAcceptInvitation(group.id);
            }}
            onDecline={() => {
              void handleDenyInvitation(group.id);
            }}
          />
        ))}

        {joinedGroups.map((group) => (
          <GroupCard
            key={group.id}
            name={group.name}
            memberCount={group.member_count}
            invitedCount={group.invited_count}
            onInviteClick={() => {
              handleInviteClick(group.id, group.name);
            }}
            onOpenClick={() => {
              console.log(`Open group ${group.id}`);
            }}
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
        groupName={inviteModalGroup?.name ?? "グループ名"}
        onSearch={(keyword) => {
          void handleSearch(keyword);
        }}
        isSearching={isSearching}
        isInviting={isInviting}
        searchResults={searchUsersResult?.users ?? []}
        searchError={searchError}
        onClearSearchError={clearErrorMessage}
        onInvite={(user) => {
          void handleInvite(user.id);
        }}
      />
    </PageCard>
  );
}

export default GroupsSection;
