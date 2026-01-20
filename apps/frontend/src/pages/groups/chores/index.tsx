import PageCard from "../../../components/PageCard";
import styles from "../home/home.module.css";
import { useGroupLayout } from "../GroupLayoutContext";

function GroupChoresPage() {
  const { groupId } = useGroupLayout();

  return (
    <PageCard align="center">
      <section className={styles.content} aria-labelledby="group-chores-heading">
        <p className={styles.badge}>家事</p>
        <h1 id="group-chores-heading" className={styles.title}>
          to be continue...
        </h1>
        <p className={styles.description}>家事画面は現在準備中です。</p>
        <p className={styles.groupId}>groupId: {groupId}</p>
      </section>
    </PageCard>
  );
}

export default GroupChoresPage;
