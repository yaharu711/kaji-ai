import { CircleUser, UserPlus } from "lucide-react";
import styles from "./index.module.css";

function UserPage() {
  // TODO: 認証済みユーザー情報をセッションから取得する
  const displayName = "田中 花子";

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroBadge}>💖</div>
          <div>
            <p className={styles.heroEyebrow}>あなたのダッシュボード</p>
            <h1 className={styles.heroTitle}>家事の見える化 ✨</h1>
          </div>
        </section>

        <section className={styles.profileCard}>
          <div className={styles.avatar}>
            <CircleUser aria-hidden className={styles.avatarIcon} />
          </div>
          <div className={styles.profileText}>
            <p className={styles.welcome}>ようこそ、</p>
            <p className={styles.userName}>{displayName} さん</p>
          </div>
        </section>

        <section className={styles.groupsSection} aria-label="グループ一覧">
          <div className={styles.sectionHeader}>
            <h2>あなたのグループ</h2>
            <button type="button" className={styles.createButton}>
              <UserPlus aria-hidden className={styles.iconSmall} />
              <span>新規作成</span>
            </button>
          </div>

          <div className={styles.emptyCard}>
            <div className={styles.emptyEmoji} aria-hidden>
              🏠
            </div>
            <p className={styles.emptyTitle}>まだグループがありません</p>
            <p className={styles.emptyDescription}>
              家族や友人とグループを作って
              <br />
              家事を共有しましょう！
            </p>
          </div>
        </section>

        <p className={styles.footerNote}>さあ、今週も頑張りましょう！ ✨</p>
      </main>
    </div>
  );
}

export default UserPage;
