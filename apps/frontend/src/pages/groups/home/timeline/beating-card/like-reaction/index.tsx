import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import HeartIcon from "../../../../../../components/HeartIcon";
import styles from "./LikeReaction.module.css";

interface LikeReactionProps {
  likedByMe: boolean;
  likeCount: number;
  isLiking: boolean;
  onLike: () => void;
}

function LikeReaction({ likedByMe, likeCount, isLiking, onLike }: LikeReactionProps) {
  const [burstId, setBurstId] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  const heartParticles = [
    { x: -26, y: -34, delay: 0 },
    { x: 0, y: -44, delay: 40 },
    { x: 26, y: -34, delay: 80 },
    { x: -34, y: 6, delay: 120 },
    { x: 34, y: 6, delay: 160 },
  ] as const;

  const triggerBurst = () => {
    setBurstId((current) => current + 1);
    setShowHearts(true);
  };

  return (
    <div className={styles.root}>
      <motion.button
        type="button"
        className={styles.button}
        aria-label={likedByMe ? "いいね済み" : "いいね"}
        disabled={isLiking}
        whileTap={{ scale: 0.8 }}
        onClick={() => {
          if (isLiking) return;
          triggerBurst();
          if (!likedByMe) {
            onLike();
          }
        }}
      >
        <motion.span
          className={styles.icon}
          aria-hidden
          animate={showHearts ? { scale: [1, 1.4, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <HeartIcon variant={likedByMe ? "solid" : "outline"} size="lg" />
        </motion.span>
        {likeCount > 0 ? <span className={styles.count}>{likeCount}</span> : null}
      </motion.button>
      <AnimatePresence>
        {showHearts ? (
          <span key={burstId} className={styles.burst} aria-hidden>
            {heartParticles.map((particle, index) => (
              <motion.span
                key={index}
                className={styles.particle}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: likedByMe ? 4.5 : 2.0,
                  x: particle.x,
                  y: particle.y,
                }}
                // 上記のanimateでopacityを0にしているが、
                // exitがないと連打した時にアニメーションが途中で消えてしまうのでexitも定義
                exit={{ opacity: 0 }}
                // animateにもexitのアニメーションにも効く変化を定義
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: particle.delay / 1000,
                }}
                onAnimationComplete={
                  index === heartParticles.length - 1
                    ? () => {
                        setShowHearts(false);
                      }
                    : undefined
                }
              >
                <HeartIcon variant="solid" size="sm" />
              </motion.span>
            ))}
          </span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default LikeReaction;
