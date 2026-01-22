import { Swords } from "lucide-react";
import PageCard from "../../../../components/PageCard";
import SwordsHeaderIcon from "../../../../components/SwordsHeaderIcon";
import styles from "./Timeline.module.css";

function GroupTimeline() {
  return (
    <PageCard padding="md">
      <section className={styles.timeline} aria-labelledby="timeline-heading">
        <div className={styles.header}>
          <SwordsHeaderIcon size="md" aria-hidden />
          <div>
            <h2 id="timeline-heading" className={styles.title}>
              討伐タイムライン
            </h2>
            <p className={styles.subtitle}>みんなで協力して家事を討伐しよう！</p>
          </div>
        </div>

        <div className={styles.emptyState} role="status">
          <Swords className={styles.emptyIcon} aria-hidden />
          <div className={styles.emptyText}>
            <p className={styles.emptyTitle}>まだ討伐記録がありません</p>
            <p className={styles.emptyDescription}>右下のボタンから家事を討伐しましょう！</p>
          </div>
        </div>
      </section>
    </PageCard>
  );
}

export default GroupTimeline;
