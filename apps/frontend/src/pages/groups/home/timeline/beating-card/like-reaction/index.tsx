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
  const [burstMode, setBurstMode] = useState<"local" | "screen">("local");

  const localHeartParticles = [
    { x: -26, y: -34, delay: 0 },
    { x: 0, y: -44, delay: 40 },
    { x: 26, y: -34, delay: 80 },
    { x: -34, y: 6, delay: 120 },
    { x: 34, y: 6, delay: 160 },
  ] as const;

  const screenHeartParticles = [
    { x: -72, y: -58, delay: 0 },
    { x: 0, y: -86, delay: 40 },
    { x: 72, y: -58, delay: 80 },
    { x: -88, y: 6, delay: 120 },
    { x: 88, y: 6, delay: 160 },
    { x: -48, y: 72, delay: 200 },
    { x: 48, y: 72, delay: 240 },
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
          setBurstMode(likedByMe ? "screen" : "local");
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
          burstMode === "screen" ? (
            <span key={burstId} className={styles.screenBurst} aria-hidden>
              <span className={styles.screenCenter}>
                <motion.span
                  className={styles.screenHeart}
                  initial={{ scale: 4, opacity: 0 }}
                  animate={{ scale: [0.2, 9, 1.2], opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <HeartIcon variant="solid" size="lg" />
                </motion.span>
                {screenHeartParticles.map((particle, index) => (
                  <motion.span
                    key={index}
                    className={[styles.particle, styles.screenParticle].join(" ")}
                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 3.0,
                      x: particle.x,
                      y: particle.y,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      delay: particle.delay / 1000,
                    }}
                    onAnimationComplete={
                      index === screenHeartParticles.length - 1
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
            </span>
          ) : (
            <span key={burstId} className={styles.burst} aria-hidden>
              {localHeartParticles.map((particle, index) => (
                <motion.span
                  key={index}
                  className={styles.particle}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 2.0,
                    x: particle.x,
                    y: particle.y,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: particle.delay / 1000,
                  }}
                  onAnimationComplete={
                    index === localHeartParticles.length - 1
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
          )
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default LikeReaction;
