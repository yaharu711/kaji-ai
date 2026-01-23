import { Swords } from "lucide-react";
import PageCard from "../../../../components/PageCard";
import SwordsHeaderIcon from "../../../../components/SwordsHeaderIcon";
import LoaderCircle from "../../../../components/LoaderCircle";
import BeatingCard from "./beating-card";
import BeatingAccordion from "./beating-accordion";
import type { BeatingGroup } from "../../types/beatings";
import styles from "./Timeline.module.css";

interface GroupTimelineProps {
  beatingGroups?: readonly BeatingGroup[];
  isLoading?: boolean;
}

function GroupTimeline({ beatingGroups = [], isLoading = false }: GroupTimelineProps) {
  const hasBeatings = beatingGroups.length > 0;

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

        {isLoading ? (
          <div className={`${styles.list} ${styles.listLoading}`} role="status">
            <LoaderCircle size="md" ariaLabel="討伐ログを読み込み中" />
          </div>
        ) : hasBeatings ? (
          <div className={styles.list}>
            {beatingGroups.map((group) => {
              if (group.items.length === 0) {
                return null;
              }

              const hasMultiple = group.items.length > 1;

              if (!hasMultiple) {
                const beating = group.items[0];
                return (
                  <div key={beating.id} className={styles.item}>
                    <div className={styles.timeStamp} aria-label={`討伐時刻 ${group.timeLabel}`}>
                      <span className={styles.timeText}>{group.timeLabel}</span>
                      <span className={styles.timeDot} aria-hidden />
                    </div>
                    <BeatingCard {...beating} />
                  </div>
                );
              }

              return (
                <div key={group.timeLabel} className={styles.item}>
                  <div className={styles.timeStamp} aria-label={`討伐時刻 ${group.timeLabel}`}>
                    <span className={styles.timeText}>{group.timeLabel}</span>
                    <span className={styles.timeDot} aria-hidden />
                  </div>
                  <BeatingAccordion timeLabel={group.timeLabel} items={group.items} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState} role="status">
            <Swords className={styles.emptyIcon} aria-hidden />
            <div className={styles.emptyText}>
              <p className={styles.emptyTitle}>まだ討伐記録がありません</p>
              <p className={styles.emptyDescription}>右下のボタンから家事を討伐しましょう！</p>
            </div>
          </div>
        )}
      </section>
    </PageCard>
  );
}

export default GroupTimeline;
