import { useParams } from "react-router-dom";
import PageCard from "../../../components/PageCard";
import { Header } from "../../../components";
import styles from "../groups.module.css";
import { createGroupNavItems } from "../navItems";

function GroupSettingsPage() {
  const { groupId } = useParams<{ groupId: string }>();
  if (!groupId) {
    return null;
  }
  const navItems = createGroupNavItems(groupId, `/groups/${groupId}/settings`);

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <Header navItems={navItems} />
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
      </main>
    </div>
  );
}

export default GroupSettingsPage;
