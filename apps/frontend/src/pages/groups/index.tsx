import { useParams } from "react-router-dom";
import PageCard from "../../components/PageCard";
import styles from "./groups.module.css";
import { Header } from "../../components";
import { createGroupNavItems } from "./navItems";
import { useGroupUsersQuery } from "./hooks/useGroupUsersQuery";
import { useSessionUser } from "../../contexts/SessionUserContext";

function GroupPage() {
  const { groupId } = useParams<{ groupId: string }>();
  // こういう時、どのように処理するのが良いのかな？確実にgroupIdはあるはずという前提で今みたいな手抜きでも良いかな
  const { data: members } = useGroupUsersQuery(groupId);
  const sessionUser = useSessionUser();
  if (!groupId) {
    return null;
  }
  const navigateItems = createGroupNavItems(groupId, `/groups/${groupId}`);

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <Header
          navItems={navigateItems}
          groupName="グループ"
          currentUser={sessionUser}
          members={members}
        />
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
