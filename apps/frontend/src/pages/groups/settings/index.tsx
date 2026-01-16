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
        <Header
          navItems={navItems}
          groupName={groupId}
          userProfile={{ name: "田中 花子", status: "ログイン中", initial: "田" }}
          householdName={groupId}
          members={[
            { id: "member-1", name: "山田 太郎", initial: "山", tone: "pink" },
            { id: "member-2", name: "田中 花子", initial: "田", tone: "purple" },
            { id: "member-3", name: "佐藤 次郎", initial: "佐", tone: "orange" },
          ]}
        />
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
