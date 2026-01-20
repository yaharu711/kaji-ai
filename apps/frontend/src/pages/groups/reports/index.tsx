import PageCard from "../../../components/PageCard";
import styles from "../home/groups.module.css";
import { useGroupLayout } from "../GroupLayoutContext";

function GroupReportsPage() {
  const { groupId } = useGroupLayout();

  return (
    <PageCard align="center">
      <section className={styles.content} aria-labelledby="group-reports-heading">
        <p className={styles.badge}>レポート</p>
        <h1 id="group-reports-heading" className={styles.title}>
          to be continue...
        </h1>
        <p className={styles.description}>レポート画面は現在準備中です。</p>
        <p className={styles.groupId}>groupId: {groupId}</p>
      </section>
    </PageCard>
  );
}

export default GroupReportsPage;
