import { CircleUser } from "lucide-react";
import PageCard from "../../../components/PageCard";
import { useSessionUser } from "../../../contexts/SessionUserContext";
import styles from "./profile.module.css";

function ProfileSection({ user }: { user: { name?: string | null; image?: string | null } }) {
  const displayName = user.name ?? "ユーザー";

  return (
    <PageCard>
      <div className={styles.profileContent}>
        <div className={styles.avatar}>
          {user.image ? (
            <img
              src={user.image}
              alt={`${displayName}のアイコン`}
              className={styles.avatarImage}
              referrerPolicy="no-referrer"
            />
          ) : (
            <CircleUser aria-hidden className={styles.avatarIcon} />
          )}
        </div>
        <div className={styles.profileText}>
          <p className={styles.welcome}>ようこそ！</p>
          <p className={styles.userName}>{displayName} さん</p>
        </div>
      </div>
    </PageCard>
  );
}

function UserProfilePage() {
  const user = useSessionUser();
  return <ProfileSection user={user} />;
}

export default UserProfilePage;
