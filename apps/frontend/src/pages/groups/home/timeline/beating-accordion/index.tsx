import { ChevronDown } from "lucide-react";
import { getChoreIcon, type ChoreIconCode } from "../../../../../constants/chores";
import BeatingCard from "../beating-card";
import styles from "./BeatingAccordion.module.css";

interface BeatingLog {
  id: string;
  choreIconCode: ChoreIconCode;
  choreName: string;
  userName: string;
  userImageUrl?: string | null;
  likeCount?: number;
  commentCount?: number;
  userRoleLabel?: string;
}

interface BeatingAccordionProps {
  timeLabel: string;
  items: BeatingLog[];
}

function BeatingAccordion({ timeLabel, items }: BeatingAccordionProps) {
  const iconCodes = items.map((item) => item.choreIconCode).slice(0, 3);

  return (
    <details className={styles.accordion}>
      <summary className={styles.accordionSummary}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcons} aria-hidden>
            {iconCodes.map((code, index) => (
              <span key={`${timeLabel}-${code}-${String(index)}`} className={styles.summaryIcon}>
                {getChoreIcon(code)}
              </span>
            ))}
          </div>
          <div className={styles.summaryText}>
            <p className={styles.summaryTitle}>{items.length}件の討伐</p>
            <p className={styles.summaryHint}>
              <span className={styles.summaryHintClosed}>クリックして詳細を表示</span>
              <span className={styles.summaryHintOpen}>詳細を閉じる</span>
            </p>
          </div>
          <span className={styles.summaryChevron} aria-hidden>
            <ChevronDown size={18} />
          </span>
        </div>
      </summary>
      <div className={styles.accordionBody}>
        {items.map((beating) => (
          <BeatingCard
            choreIconCode={beating.choreIconCode}
            choreName={beating.choreName}
            userName={beating.userName}
            userImageUrl={beating.userImageUrl}
            likeCount={beating.likeCount}
            commentCount={beating.commentCount}
            userRoleLabel={beating.userRoleLabel}
          />
        ))}
      </div>
    </details>
  );
}

export type { BeatingLog };
export default BeatingAccordion;
