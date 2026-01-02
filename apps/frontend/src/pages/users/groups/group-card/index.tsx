import { ArrowRight, Mail } from "lucide-react";

import styles from "./group-card.module.css";

interface GroupCardProps {
  name: string;
  memberCount: number;
  imageUrl?: string | null;
  onInviteClick?: () => void;
  onOpenClick?: () => void;
}

function GroupCard({ name, memberCount, imageUrl, onInviteClick, onOpenClick }: GroupCardProps) {
  const handleInvite = () => {
    onInviteClick?.();
  };

  const handleOpen = () => {
    onOpenClick?.();
  };

  return (
    <div className={styles.card} aria-label={`${name} のグループカード`}>
      <button
        type="button"
        className={styles.cardHeader}
        onClick={handleOpen}
        aria-label={`${name}の詳細へ`}
      >
        <div className={styles.avatar} aria-hidden="true">
          {imageUrl ? (
            <img src={imageUrl} alt="" />
          ) : (
            <span className={styles.avatarEmoji}>🏠</span>
          )}
        </div>
        <div className={styles.meta}>
          <p className={styles.name}>{name}</p>
          <p className={styles.member}>メンバー {memberCount}人</p>
        </div>
        <span className={styles.arrowIcon} aria-hidden>
          <ArrowRight size={20} strokeWidth={2.5} />
        </span>
      </button>

      <div className={styles.divider} aria-hidden="true" />

      <button type="button" className={styles.inviteButton} onClick={handleInvite}>
        <span className={styles.inviteLabel}>
          <Mail size={18} strokeWidth={2.2} />
          メンバーを招待
        </span>
      </button>
    </div>
  );
}

export default GroupCard;
