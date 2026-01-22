import { ChevronDown } from "lucide-react";
import HeartIcon from "../../../../../components/HeartIcon";
import UserProfileImg from "../../../../../components/UserProfileImg";
import styles from "./BeatingMessages.module.css";

export interface BeatingMessage {
  id: string;
  userName: string;
  userImageUrl?: string | null;
  mainMessage: string;
  describeMessage?: string;
}

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
      <p className={styles.gratitudeMain}>{message.mainMessage}</p>
      {message.describeMessage ? (
        <p className={styles.gratitudeDescribe}>{message.describeMessage}</p>
      ) : null}
    </div>
  );
}

function BeatingMessages({ messages = [] }: BeatingMessagesProps) {
  if (messages.length === 0) {
    return null;
  }

  const primaryMessage = messages[0];
  const extraMessages = messages.slice(1);

  return (
    <div className={styles.gratitudeList} aria-label="感謝メッセージ">
      <BeatingMessageItem message={primaryMessage} />
      {extraMessages.length > 0 ? (
        <details className={styles.gratitudeAccordion}>
          <summary className={styles.gratitudeSummary}>
            <span className={styles.gratitudeSummaryIcon} aria-hidden>
              <ChevronDown size={16} />
            </span>
            <span className={styles.gratitudeSummaryText}>
              他{extraMessages.length}件の感謝を見る
            </span>
          </summary>
          <div className={styles.gratitudeExtraList}>
            {extraMessages.map((message) => (
              <BeatingMessageItem key={message.id} message={message} />
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}

export default BeatingMessages;
