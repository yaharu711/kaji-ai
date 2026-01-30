import styles from "./users.module.css";
import GroupsSection from "./groups";

function UserPage() {
  return (
    <>
      <GroupsSection />
      <p className={styles.footerNote}>さあ、今週も頑張りましょう！ ✨</p>
    </>
  );
}

export default UserPage;
