import { MessageSquareHeart } from "lucide-react";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { getChoreIcon, type ChoreIconCode } from "../../../../../constants/chores";
import HeartIcon from "../../../../../components/HeartIcon";
import UserProfileImg from "../../../../../components/UserProfileImg";
import BeatingMessages from "../beating-messages";
import type { BeatingMessage } from "../../../types/beatings";
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
  const [burstId, setBurstId] = useState(0);
  const [isBursting, setIsBursting] = useState(false);
  const burstTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  const heartParticles = [
    { x: -26, y: -34, delay: 0 },
    { x: 0, y: -44, delay: 40 },
    { x: 26, y: -34, delay: 80 },
    { x: -34, y: 6, delay: 120 },
    { x: 34, y: 6, delay: 160 },
  ] as const;

  const triggerBurst = () => {
    setBurstId((current) => current + 1);
    setIsBursting(true);

    if (burstTimeoutRef.current) {
      window.clearTimeout(burstTimeoutRef.current);
    }

    burstTimeoutRef.current = window.setTimeout(() => {
      setIsBursting(false);
    }, 900);
  };

  useEffect(() => {
    return () => {
      if (burstTimeoutRef.current) {
        window.clearTimeout(burstTimeoutRef.current);
      }
    };
  }, []);

  return (
    <article className={styles.card} aria-label={`${userName}が${choreName}を討伐`}>
      <div className={styles.header}>
        <div className={styles.choreIcon} aria-hidden>
          {getChoreIcon(choreIconCode)}
        </div>
        <div className={styles.headerBody}>
          <p className={styles.choreName}>{choreName}</p>
          <div className={styles.reactions}>
            <div className={styles.reactionWithBurst}>
              {likedByMe ? (
                <div className={styles.reactionItem} role="img" aria-label="いいね済み">
                  <span className={styles.reactionIcon} aria-hidden>
                    <HeartIcon variant="solid" size="lg" />
                  </span>
                  {likeCount > 0 ? <span className={styles.reactionCount}>{likeCount}</span> : null}
                </div>
              ) : (
                <button
                  type="button"
                  className={`${styles.reactionItem} ${styles.reactionButton} ${
                    isBursting ? styles.reactionButtonBurst : ""
                  }`}
                  aria-label="いいね"
                  disabled={isLiking}
                  onClick={() => {
                    if (isLiking) return;
                    triggerBurst();
                    sendLike({ groupId, beatingId, date });
                  }}
                >
                  <span className={styles.reactionIcon} aria-hidden>
                    <HeartIcon variant="outline" size="lg" />
                  </span>
                  {likeCount > 0 ? <span className={styles.reactionCount}>{likeCount}</span> : null}
                </button>
              )}
              {isBursting ? (
                <span key={burstId} className={styles.heartBurst} aria-hidden>
                  {heartParticles.map((particle, index) => (
                    <span
                      key={index}
                      className={styles.heartParticle}
                      style={
                        {
                          "--burst-x": `${particle.x}px`,
                          "--burst-y": `${particle.y}px`,
                          "--burst-delay": `${particle.delay}ms`,
                        } as CSSProperties
                      }
                    >
                      <HeartIcon variant="solid" size="sm" />
                    </span>
                  ))}
                </span>
              ) : null}
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
