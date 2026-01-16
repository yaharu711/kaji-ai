import { useParams } from "react-router-dom";
import PageCard from "../../../components/PageCard";
import { Header } from "../../../components";
import styles from "../groups.module.css";
import { createGroupNavItems } from "../navItems";
import { useGroupUsersQuery } from "../hooks/useGroupUsersQuery";
import { useSessionUser } from "../../../contexts/SessionUserContext";

function GroupChoresPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const { data: members } = useGroupUsersQuery(groupId ?? "");
  const sessionUser = useSessionUser();
  if (!groupId) {
    return null;
  }
  const navItems = createGroupNavItems(groupId, `/groups/${groupId}/chores`);

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <Header
          navItems={navItems}
          groupName={groupId}
          currentUser={sessionUser}
          members={members}
        />
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
      </main>
    </div>
  );
}

export default GroupChoresPage;
