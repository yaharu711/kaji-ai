import { Check, X } from "lucide-react";
import Button from "../../../../components/Button";

import styles from "./invite-card.module.css";

interface GroupInviteCardProps {
  groupName: string;
  inviterName?: string;
  disabled?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
}

function GroupInviteCard({
  groupName,
  inviterName,
  disabled = false,
  onAccept,
  onDecline,
}: GroupInviteCardProps) {
  const handleAccept = () => {
    if (disabled) return;
    onAccept?.();
  };

  const handleDecline = () => {
    if (disabled) return;
    onDecline?.();
  };

  return (
    <article className={styles.card} aria-label={`${groupName} への招待カード`}>
      <div className={styles.summary}>
        <div className={styles.avatar} aria-hidden="true">
          <span className={styles.avatarEmoji}>🏠</span>
        </div>

        <div className={styles.meta}>
          <div className={styles.titleRow}>
            <p className={styles.groupName}>{groupName}</p>
            <span className={styles.badge}>招待中</span>
          </div>
          {inviterName ? (
            <p className={styles.inviteText}>
              <span className={styles.inviterName}>{inviterName}</span>
              <span> さんから招待されました</span>
            </p>
          ) : (
            <p className={styles.inviteText}>このグループに招待されています</p>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          size="md"
          radius="pill"
          variant="primary"
          fullWidth
          onClick={handleAccept}
          disabled={disabled}
          icon={<Check size={18} strokeWidth={2.4} aria-hidden />}
        >
          参加する
        </Button>

        <Button
          type="button"
          size="md"
          radius="pill"
          variant="outline"
          fullWidth
          onClick={handleDecline}
          disabled={disabled}
          icon={<X size={18} strokeWidth={2.4} aria-hidden />}
        >
          拒否
        </Button>
      </div>
    </article>
  );
}

export default GroupInviteCard;
