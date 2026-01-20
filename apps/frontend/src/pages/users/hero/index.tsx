import PageCard from "../../../components/PageCard";
import styles from "./hero.module.css";

function HeroSection() {
  return (
    <PageCard>
      <section className={styles.heroContent} aria-labelledby="hero-heading">
        <div className={styles.heroBadge} aria-hidden="true">
          <img
            src="https://kaji-ai.s3.ap-northeast-1.amazonaws.com/favicon.svg"
            alt="アプリのアイコン"
          />
        </div>
        <div>
          <h1 id="hero-heading" className={styles.heroTitle}>
            カジアイ
          </h1>
          <p className={styles.heroEyebrow}>あなたのプロフィール</p>
        </div>
      </section>
    </PageCard>
  );
}

export default HeroSection;
