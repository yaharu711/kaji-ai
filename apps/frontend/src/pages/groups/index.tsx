import { useParams } from "react-router-dom";
import PageCard from "../../components/PageCard";
import styles from "./groups.module.css";
import { Header } from "../../components";
import { createGroupNavItems } from "./navItems";

function GroupPage() {
  const { groupId } = useParams<{ groupId: string }>();
  if (!groupId) {
    return null;
  }
  const navigateItems = createGroupNavItems(groupId, `/groups/${groupId}`);

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <Header navItems={navigateItems} />
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
      </main>
    </div>
  );
}

export default GroupPage;
