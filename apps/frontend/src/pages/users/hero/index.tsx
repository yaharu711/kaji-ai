import PageCard from "../../../components/PageCard";
import styles from "./hero.module.css";

function HeroSection() {
  return (
    <PageCard>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge} aria-hidden="true">
          <img
            src="https://kaji-ai.s3.ap-northeast-1.amazonaws.com/favicon.svg"
            alt="アプリのアイコン"
          />
        </div>
        <div>
          <h1 className={styles.heroTitle}>カジアイ</h1>
          <p className={styles.heroEyebrow}>あなたのダッシュボード</p>
        </div>
      </div>
    </PageCard>
  );
}

export default HeroSection;
