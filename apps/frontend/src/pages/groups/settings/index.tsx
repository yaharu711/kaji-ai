import PageCard from "../../../components/PageCard";
import styles from "../home/home.module.css";

function GroupSettingsPage() {
  return (
    <PageCard align="center">
      <section className={styles.content} aria-labelledby="group-settings-heading">
        <p className={styles.badge}>設定</p>
        <p className={styles.description}>設定画面は現在準備中です。</p>
      </section>
    </PageCard>
  );
}

export default GroupSettingsPage;
