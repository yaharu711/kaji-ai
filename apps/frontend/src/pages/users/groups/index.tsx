import { useState } from "react";
import { UserPlus } from "lucide-react";
import PageCard from "../../../components/PageCard";
import Button from "../../../components/Button";
import GroupCreateModal from "./group-create-modal";
import styles from "./groups.module.css";

function GroupsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    // TODO: グループ作成APIと接続
    setIsModalOpen(false);
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
