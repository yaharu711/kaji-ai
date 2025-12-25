import PageCard from "../../components/PageCard";
import LinkButton from "../../components/LinkButton";
import styles from "./not-found.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <main>
        <PageCard align="center">
          <p className={styles.code}>404</p>
          <h1 id="not-found-title" className={styles.title}>
            お探しのページが見つかりません
          </h1>
          <p className={styles.description}>
            URLが誤っているか、ページが移動または削除された可能性があります。
          </p>
          <div className={styles.actions}>
            <LinkButton to="/">トップに戻る</LinkButton>
          </div>
        </PageCard>
      </main>
    </div>
  );
}

export default NotFoundPage;
