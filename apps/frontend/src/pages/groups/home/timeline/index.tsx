import { Swords } from "lucide-react";
import PageCard from "../../../../components/PageCard";
import SwordsHeaderIcon from "../../../../components/SwordsHeaderIcon";
import BeatingCard from "./beating-card";
import type { ChoreIconCode } from "../../../../constants/chores";
import styles from "./Timeline.module.css";

interface BeatingLog {
  id: string;
  beatedAt: Date;
  choreIconCode: ChoreIconCode;
  choreName: string;
  userName: string;
  userImageUrl?: string | null;
  likeCount?: number;
  commentCount?: number;
  userRoleLabel?: string;
}

interface GroupTimelineProps {
  beatings?: BeatingLog[];
}

const formatBeatedTime = (date: Date) => {
  return new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

function GroupTimeline({ beatings = [] }: GroupTimelineProps) {
  const hasBeatings = beatings.length > 0;

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

        {hasBeatings ? (
          <div className={styles.list}>
            {beatings.map((beating) => (
              <div key={beating.id} className={styles.item}>
                <div
                  className={styles.timeStamp}
                  aria-label={`討伐時刻 ${formatBeatedTime(beating.beatedAt)}`}
                >
                  <span className={styles.timeText}>{formatBeatedTime(beating.beatedAt)}</span>
                  <span className={styles.timeDot} aria-hidden />
                </div>
                <BeatingCard
                  choreIconCode={beating.choreIconCode}
                  choreName={beating.choreName}
                  userName={beating.userName}
                  userImageUrl={beating.userImageUrl}
                  likeCount={beating.likeCount}
                  commentCount={beating.commentCount}
                  userRoleLabel={beating.userRoleLabel}
                />
              </div>
            ))}
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
