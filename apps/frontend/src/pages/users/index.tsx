import { useSessionUser } from "../../contexts/SessionUserContext";
import styles from "./users.module.css";
import GroupsSection from "./groups";
import ProfileSection from "./profile";
import { Header } from "../../components";

function UserPage() {
  const user = useSessionUser();

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <Header />
        <ProfileSection user={user} />
        <GroupsSection />
        <p className={styles.footerNote}>さあ、今週も頑張りましょう！ ✨</p>
      </main>
    </div>
  );
}

export default UserPage;
