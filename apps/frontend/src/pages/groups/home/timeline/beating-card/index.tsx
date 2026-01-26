import { MessageSquareHeart } from "lucide-react";
import { getChoreIcon, type ChoreIconCode } from "../../../../../constants/chores";
import UserProfileImg from "../../../../../components/UserProfileImg";
import BeatingMessages from "../beating-messages";
import type { BeatingMessage } from "../../../types/beatings";
import LikeReaction from "./like-reaction";
import { useCreateChoreBeatingLikeMutation } from "../../../hooks/useCreateChoreBeatingLikeMutation";
import styles from "./BeatingCard.module.css";

interface BeatingCardProps {
  groupId: string;
  beatingId: number;
  date: string;
  choreIconCode: ChoreIconCode;
  choreName: string;
  userName: string;
  userImageUrl?: string | null;
  likeCount?: number;
  likedByMe?: boolean;
  commentCount?: number;
  userRoleLabel?: string;
  messages?: readonly BeatingMessage[];
}

function BeatingCard({
  groupId,
  beatingId,
  date,
  choreIconCode,
  choreName,
  userName,
  userImageUrl,
  likeCount = 0,
  likedByMe = false,
  commentCount = 0,
  userRoleLabel = "討伐者",
  messages = [],
}: BeatingCardProps) {
  const { mutate: sendLike, isPending: isLiking } = useCreateChoreBeatingLikeMutation();

  return (
    <article className={styles.card} aria-label={`${userName}が${choreName}を討伐`}>
      <div className={styles.header}>
        <div className={styles.choreIcon} aria-hidden>
          {getChoreIcon(choreIconCode)}
        </div>
        <div className={styles.headerBody}>
          <p className={styles.choreName}>{choreName}</p>
          <div className={styles.reactions}>
            <LikeReaction
              likedByMe={likedByMe}
              likeCount={likeCount}
              isLiking={isLiking}
              onLike={() => {
                sendLike({ groupId, beatingId, date });
              }}
            />
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
          <UserProfileImg name={userName} imageUrl={userImageUrl} size="md" tone="purple" />
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
