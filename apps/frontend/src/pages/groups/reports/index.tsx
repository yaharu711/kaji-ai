import PageCard from "../../../components/PageCard";
import styles from "../home/home.module.css";

function GroupReportsPage() {
  return (
    <PageCard align="center">
      <section className={styles.content} aria-labelledby="group-reports-heading">
        <p className={styles.badge}>レポート</p>
        <p className={styles.description}>レポート画面は現在準備中です。</p>
      </section>
    </PageCard>
  );
}

export default GroupReportsPage;
