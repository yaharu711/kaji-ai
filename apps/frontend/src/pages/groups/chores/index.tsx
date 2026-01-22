import PageCard from "../../../components/PageCard";
import styles from "../home/home.module.css";

function GroupChoresPage() {
  return (
    <PageCard align="center">
      <section className={styles.content} aria-labelledby="group-chores-heading">
        <p className={styles.badge}>家事</p>
        <p className={styles.description}>家事画面は現在準備中です。</p>
      </section>
    </PageCard>
  );
}

export default GroupChoresPage;
