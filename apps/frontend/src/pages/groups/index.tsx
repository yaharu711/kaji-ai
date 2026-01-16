import PageCard from "../../components/PageCard";
import styles from "./groups.module.css";
import { useGroupLayout } from "./GroupLayoutContext";

function GroupHomePage() {
  const { groupId } = useGroupLayout();

  return (
    <PageCard align="center">
      <section className={styles.content} aria-labelledby="group-heading">
        <p className={styles.badge}>グループ</p>
        <h1 id="group-heading" className={styles.title}>
          to be continue...
        </h1>
        <p className={styles.description}>グループ画面は現在準備中です。</p>
        {groupId ? <p className={styles.groupId}>groupId: {groupId}</p> : null}
      </section>
    </PageCard>
  );
}

export default GroupHomePage;
