import { useState } from "react";
import { getChoreIcon, type ChoreIconCode } from "../../../../../constants/chores";
import UserProfileImg from "../../../../../components/UserProfileImg";
import BeatingMessages from "../beating-messages";
import type { BeatingMessage } from "../../../types/beatings";
import LikeReaction from "./like-reaction";
import MessageReaction from "./message-reaction";
import { useCreateChoreBeatingLikeMutation } from "../../../hooks/useCreateChoreBeatingLikeMutation";
import { useCreateChoreBeatingMessageMutation } from "../../../hooks/useCreateChoreBeatingMessageMutation";
import GratitudeModal from "../../gratitude-modal";
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
  messagedByMe?: boolean;
  commentCount?: number;
  userRoleLabel?: string;
  isMyBeating?: boolean;
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
  messagedByMe = false,
  commentCount = 0,
  userRoleLabel = "討伐者",
  isMyBeating = false,
  messages = [],
}: BeatingCardProps) {
  const { mutate: sendLike, isPending: isLiking } = useCreateChoreBeatingLikeMutation();
  const { mutateAsync: sendMessage, isPending: isSendingMessage } =
    useCreateChoreBeatingMessageMutation();
  const [isGratitudeOpen, setIsGratitudeOpen] = useState(false);

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
            <MessageReaction
              messagedByMe={messagedByMe}
              commentCount={commentCount}
              onClick={() => {
                setIsGratitudeOpen(true);
              }}
            />
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
      <GratitudeModal
        open={isGratitudeOpen}
        onOpenChange={setIsGratitudeOpen}
        choreIconCode={choreIconCode}
        choreName={choreName}
        userName={userName}
        isMyBeating={isMyBeating}
        isSubmitting={isSendingMessage}
        onSubmit={async ({ mainMessage, descriptionMessage }) => {
          await sendMessage({
            groupId,
            beatingId,
            date,
            mainMessage,
            descriptionMessage,
          });
        }}
      />
    </article>
  );
}

export default BeatingCard;
