import { UserPlus } from "lucide-react";
import PageCard from "../../../components/PageCard";
import styles from "./groups.module.css";

function GroupsSection() {
  return (
    <PageCard>
      <div className={styles.groupsContent} aria-label="グループ一覧">
        <div className={styles.sectionHeader}>
          <h2>あなたのグループ</h2>
          <button type="button" className={styles.createButton}>
            <UserPlus aria-hidden className={styles.iconSmall} />
            <span>新規作成</span>
          </button>
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
      </div>
    </PageCard>
  );
}

export default GroupsSection;
