import { Link } from "react-router-dom";
import PageCard from "../../components/PageCard";
import styles from "./not-found.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <PageCard className={styles.card} aria-labelledby="not-found-title">
        <p className={styles.code}>404</p>
        <h1 id="not-found-title" className={styles.title}>
          お探しのページが見つかりません
        </h1>
        <p className={styles.description}>
          URLが誤っているか、ページが移動または削除された可能性があります。
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.primaryLink}>
            トップに戻る
          </Link>
        </div>
      </PageCard>
    </div>
  );
}

export default NotFoundPage;
