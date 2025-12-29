import PageCard from "../../../components/PageCard";
import styles from "./hero.module.css";

function HeroSection() {
  return (
    <PageCard>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge} aria-hidden="true">
          💖
        </div>
        <div>
          <p className={styles.heroEyebrow}>あなたのダッシュボード</p>
          <h1 className={styles.heroTitle}>
            家事の見える化 <span aria-hidden="true">✨</span>
          </h1>
        </div>
      </div>
    </PageCard>
  );
}

export default HeroSection;
