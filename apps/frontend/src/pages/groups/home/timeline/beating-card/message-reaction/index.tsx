import { MessageSquareHeart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styles from "./MessageReaction.module.css";

interface MessageReactionProps {
  messagedByMe: boolean;
  commentCount: number;
  onClick: () => void;
}

const VARIANT_PROPS = {
  solid: { fill: "currentColor", stroke: "currentColor" },
  outline: { fill: "none", stroke: "currentColor" },
} as const;

function MessageReaction({ messagedByMe, commentCount, onClick }: MessageReactionProps) {
  const variant = messagedByMe ? "solid" : "outline";
  const variantProps = VARIANT_PROPS[variant];
  const [showThanks, setShowThanks] = useState(false);
  const [burstId, setBurstId] = useState(0);

  return (
    <button
      type="button"
      className={styles.button}
      aria-label="メッセージを送る"
      aria-pressed={messagedByMe}
      onClick={() => {
        if (messagedByMe) {
          setBurstId((current) => current + 1);
          setShowThanks(true);
          return;
        }
        onClick();
      }}
    >
      <span className={styles.icon} aria-hidden>
        <MessageSquareHeart size={20} {...variantProps} />
      </span>
      {commentCount > 0 ? <span className={styles.count}>{commentCount}</span> : null}
      <AnimatePresence>
        {showThanks ? (
          <motion.span
            key={burstId}
            className={styles.thanksBubble}
            aria-hidden
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: [0, 1, 0], y: [6, 0, -8], scale: [1.3, 1.4, 0.98] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            onAnimationComplete={() => {
              setShowThanks(false);
            }}
          >
            いつも感謝をありがとう！
          </motion.span>
        ) : null}
      </AnimatePresence>
    </button>
  );
}

export default MessageReaction;
