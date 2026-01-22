import { MessageSquareHeart, User } from "lucide-react";
import { getChoreIcon, type ChoreIconCode } from "../../../../../constants/chores";
import HeartIcon from "../../../../../components/HeartIcon";
import BeatingMessages, { type BeatingMessage } from "../beating-messages";
import styles from "./BeatingCard.module.css";

interface BeatingCardProps {
  choreIconCode: ChoreIconCode;
  choreName: string;
  userName: string;
  userImageUrl?: string | null;
  likeCount?: number;
  commentCount?: number;
  userRoleLabel?: string;
  messages?: BeatingMessage[];
}

function BeatingCard({
  choreIconCode,
  choreName,
  userName,
  userImageUrl,
  likeCount = 0,
  commentCount = 0,
  userRoleLabel = "討伐者",
  messages = [],
}: BeatingCardProps) {
  return (
    <article className={styles.card} aria-label={`${userName}が${choreName}を討伐`}>
      <div className={styles.header}>
        <div className={styles.choreIcon} aria-hidden>
          {getChoreIcon(choreIconCode)}
        </div>
        <div className={styles.headerBody}>
          <p className={styles.choreName}>{choreName}</p>
          <div className={styles.reactions}>
            <div className={styles.reactionItem} role="group" aria-label="ハート">
              <span className={styles.reactionIcon} aria-hidden>
                <HeartIcon variant="outline" size="lg" />
              </span>
              {likeCount > 0 ? <span className={styles.reactionCount}>{likeCount}</span> : null}
            </div>
            <div className={styles.reactionItem} role="group" aria-label="メッセージ">
              <span className={styles.reactionIcon} aria-hidden>
                <MessageSquareHeart size={20} />
              </span>
              {commentCount > 0 ? (
                <span className={styles.reactionCount}>{commentCount}</span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <BeatingMessages messages={messages} />
      <div className={styles.divider} aria-hidden />
      <div className={styles.footer}>
        <div className={styles.user}>
          <div className={styles.avatar} aria-hidden>
            {userImageUrl ? <img src={userImageUrl} alt="" /> : <User size={22} />}
          </div>
          <div className={styles.userText}>
            <p className={styles.userName}>{userName}</p>
            <p className={styles.userRole}>{userRoleLabel}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BeatingCard;
