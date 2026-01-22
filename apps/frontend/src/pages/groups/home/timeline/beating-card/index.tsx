import { Heart, MessageSquareHeart, User } from "lucide-react";
import { getChoreIcon, type ChoreIconCode } from "../../../../../constants/chores";
import HeartIcon from "../../../../../components/HeartIcon";
import styles from "./BeatingCard.module.css";

interface BeatingCardProps {
  choreIconCode: ChoreIconCode;
  choreName: string;
  userName: string;
  userImageUrl?: string | null;
  likeCount?: number;
  commentCount?: number;
  userRoleLabel?: string;
  messages?: {
    userName: string;
    userImageUrl?: string | null;
    mainMessage: string;
    describeMessage?: string;
  }[];
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
  const hasMessages = messages.length > 0;

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
      {hasMessages ? (
        <div className={styles.gratitudeList} aria-label="感謝メッセージ">
          {messages.map((message, index) => (
            <div
              key={`${message.userName}-${message.mainMessage}-${String(index)}`}
              className={styles.gratitudeItem}
            >
              <div className={styles.gratitudeHeader}>
                <div className={styles.gratitudeAvatar} aria-hidden>
                  {message.userImageUrl ? (
                    <img src={message.userImageUrl} alt="" />
                  ) : (
                    <User size={16} />
                  )}
                  <span className={styles.gratitudeBadge} aria-hidden>
                    <HeartIcon size="sm" />
                  </span>
                </div>
                <p className={styles.gratitudeName}>{message.userName}</p>
              </div>
              <p className={styles.gratitudeMain}>{message.mainMessage}</p>
              {message.describeMessage ? (
                <p className={styles.gratitudeDescribe}>{message.describeMessage}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
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
