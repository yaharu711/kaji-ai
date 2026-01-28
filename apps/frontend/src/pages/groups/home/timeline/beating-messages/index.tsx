import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import HeartIcon from "../../../../../components/HeartIcon";
import UserProfileImg from "../../../../../components/UserProfileImg";
import type { BeatingMessage } from "../../../types/beatings";
import styles from "./BeatingMessages.module.css";

interface BeatingMessagesProps {
  messages?: readonly BeatingMessage[];
}

interface BeatingMessageItemProps {
  message: BeatingMessage;
}

function BeatingMessageItem({ message }: BeatingMessageItemProps) {
  return (
    <div className={styles.gratitudeItem}>
      <div className={styles.gratitudeHeader}>
        <UserProfileImg
          name={message.userName}
          imageUrl={message.userImageUrl}
          size="sm"
          tone="orange"
          badge={
            <span className={styles.gratitudeBadge} aria-hidden>
              <HeartIcon size="sm" />
            </span>
          }
        />
        <p className={styles.gratitudeName}>{message.userName}</p>
      </div>
      {message.isMyBeating ? null : <p className={styles.gratitudeMain}>{message.mainMessage}</p>}
      {message.describeMessage ? (
        <p className={styles.gratitudeDescribe}>{message.describeMessage}</p>
      ) : null}
    </div>
  );
}

function BeatingMessages({ messages = [] }: BeatingMessagesProps) {
  const primaryMessage = messages[0];
  const extraMessages = messages.slice(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className={styles.gratitudeList} aria-label="感謝メッセージ">
      <BeatingMessageItem message={primaryMessage} />
      {extraMessages.length > 0 ? (
        <details className={styles.gratitudeAccordion} open={isDetailsOpen}>
          <summary
            className={styles.gratitudeSummary}
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
            <span className={styles.gratitudeSummaryIcon} aria-hidden>
              <ChevronDown size={16} />
            </span>
            <span className={styles.gratitudeSummaryText}>
              他{extraMessages.length}件の感謝を見る
            </span>
          </summary>
          <AnimatePresence
            initial={false}
            onExitComplete={() => {
              setIsDetailsOpen(false);
            }}
          >
            {isOpen ? (
              <motion.div
                className={styles.gratitudeAccordionBody}
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
                <div className={styles.gratitudeExtraList}>
                  {extraMessages.map((message) => (
                    <BeatingMessageItem key={message.id} message={message} />
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </details>
      ) : null}
    </div>
  );
}

export default BeatingMessages;
