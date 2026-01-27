import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { getChoreIcon } from "../../../../../constants/chores";
import BeatingCard from "../beating-card";
import type { BeatingLog } from "../../../types/beatings";
import styles from "./BeatingAccordion.module.css";

interface BeatingAccordionProps {
  timeLabel: string;
  items: readonly BeatingLog[];
}

function BeatingAccordion({ timeLabel, items }: BeatingAccordionProps) {
  const iconCodes = items.map((item) => item.choreIconCode).slice(0, 3);
  // 一つのStateだけにしてopacityやheightでアニメーションでできるが、
  // DOM要素としてレンダリングしておく必要があるのでこうしている
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <details className={styles.accordion} open={isDetailsOpen}>
      <summary
        className={styles.accordionSummary}
        onClick={(event) => {
          event.preventDefault();
          if (isOpen) {
            setIsOpen(false);
            return;
          }

          setIsOpen(true);
          setIsDetailsOpen(true);
        }}
      >
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
      <AnimatePresence
        initial={false}
        onExitComplete={() => {
          setIsDetailsOpen(false);
        }}
      >
        {isOpen ? (
          <motion.div
            className={styles.accordionBody}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transitionDuration: "0.3",
              transition: { ease: "easeIn" },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transitionDuration: "0.3",
              transition: { ease: "easeOut" },
            }}
          >
            <div className={styles.accordionBodyInner}>
              {items.map((beating) => (
                <BeatingCard
                  key={beating.id}
                  groupId={beating.groupId}
                  beatingId={beating.beatingId}
                  date={beating.date}
                  choreIconCode={beating.choreIconCode}
                  choreName={beating.choreName}
                  userName={beating.userName}
                  userImageUrl={beating.userImageUrl}
                  likeCount={beating.likeCount}
                  likedByMe={beating.likedByMe}
                  messagedByMe={beating.messagedByMe}
                  commentCount={beating.commentCount}
                  userRoleLabel={beating.userRoleLabel}
                  messages={beating.messages}
                />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </details>
  );
}

export default BeatingAccordion;
