import PageCard from "../../../components/PageCard";
import styles from "../home/home.module.css";
import { useGroupLayout } from "../GroupLayoutContext";

function GroupSettingsPage() {
  const { groupId } = useGroupLayout();

  return (
    <PageCard align="center">
      <section className={styles.content} aria-labelledby="group-settings-heading">
        <p className={styles.badge}>設定</p>
        <h1 id="group-settings-heading" className={styles.title}>
          to be continue...
        </h1>
        <p className={styles.description}>設定画面は現在準備中です。</p>
        <p className={styles.groupId}>groupId: {groupId}</p>
      </section>
    </PageCard>
  );
}

export default GroupSettingsPage;
