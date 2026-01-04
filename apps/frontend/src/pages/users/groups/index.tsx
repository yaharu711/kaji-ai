import { useState } from "react";
import { UserPlus } from "lucide-react";
import PageCard from "../../../components/PageCard";
import Button from "../../../components/Button";
import { useGroupsQuery } from "../hooks/useGroupsQuery";
import GroupCreateModal from "./group-create-modal";
import GroupCard from "./group-card";
import styles from "./groups.module.css";

function GroupsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError } = useGroupsQuery();

  const handleSubmit = () => {
    // TODO: グループ作成APIと接続
    setIsModalOpen(false);
  };

  const groups = data?.groups ?? [];
  const hasGroups = groups.length > 0;

  const renderContent = () => {
    if (isLoading) return <p className={styles.helperText}>読み込み中です…</p>;
    if (isError) return <p className={styles.helperText}>グループの取得に失敗しました</p>;
    if (!hasGroups)
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
        {groups.map((group) => (
          <GroupCard key={group.id} name={group.name} memberCount={group.member_count} />
        ))}
      </div>
    );
  };

  return (
    <PageCard>
      <div className={styles.groupsContent} aria-label="グループ一覧">
        <div className={styles.sectionHeader}>
          <h2>あなたのグループ</h2>
          <Button
            variant="primary"
            radius="pill"
            size="md"
            fullWidth
            icon={<UserPlus aria-hidden size={16} />}
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
          onSubmit={handleSubmit}
        />
      </div>
    </PageCard>
  );
}

export default GroupsSection;
