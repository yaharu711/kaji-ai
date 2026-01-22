import { Heart, MessageSquareHeart, User } from "lucide-react";
import { getChoreIcon, type ChoreIconCode } from "../../../../../constants/chores";
import styles from "./BeatingCard.module.css";

interface BeatingCardProps {
  choreIconCode: ChoreIconCode;
  choreName: string;
  userName: string;
  userImageUrl?: string | null;
  likeCount?: number;
  commentCount?: number;
  emptyReactionMessage?: string;
  userRoleLabel?: string;
}

function BeatingCard({
  choreIconCode,
  choreName,
  userName,
  userImageUrl,
  likeCount = 0,
  commentCount = 0,
  emptyReactionMessage = "感謝を伝えてみよう！✨",
  userRoleLabel = "討伐者",
}: BeatingCardProps) {
  const hasReactions = likeCount > 0 || commentCount > 0;

  return (
    <article className={styles.card} aria-label={`${userName}が${choreName}を討伐`}>
      <div className={styles.header}>
        <div className={styles.choreIcon} aria-hidden>
          {getChoreIcon(choreIconCode)}
        </div>
        <div className={styles.headerBody}>
          <p className={styles.choreName}>{choreName}</p>
          <div className={styles.reactions}>
            <div className={styles.reactionItem} aria-label="ハート">
              <span className={styles.reactionIcon} aria-hidden>
                <Heart size={18} />
              </span>
              {likeCount > 0 ? <span className={styles.reactionCount}>{likeCount}</span> : null}
            </div>
            <div className={styles.reactionItem} aria-label="メッセージ">
              <span className={styles.reactionIcon} aria-hidden>
                <MessageSquareHeart size={18} />
              </span>
              {commentCount > 0 ? (
                <span className={styles.reactionCount}>{commentCount}</span>
              ) : null}
            </div>
            {!hasReactions ? (
              <span className={styles.emptyMessage}>{emptyReactionMessage}</span>
            ) : null}
          </div>
        </div>
      </div>
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
