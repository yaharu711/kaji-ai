import { useState } from "react";
import { ExternalLink, ListOrdered, Smartphone } from "lucide-react";
import HalfModal from "../../../../components/HalfModal";
import Button from "../../../../components/Button";
import styles from "./AddToHomeModal.module.css";

interface AddToHomeModalProps {
  open: boolean;
  onClose: (dontShowAgain: boolean) => void;
}

function AddToHomeModal({ open, onClose }: AddToHomeModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onClose(dontShowAgain);
    }
  };

  return (
    <HalfModal
      open={open}
      onOpenChange={handleOpenChange}
      title="ホーム画面に追加してみよう！"
      description="カジアイをもっと便利に使えます✨"
      headerIcon={
        <div className={styles.iconBadge} aria-hidden>
          <Smartphone size={26} />
        </div>
      }
      height="md"
    >
      <div className={styles.modalBody}>
        <div className={styles.stepsCard}>
          <div className={styles.stepsHeader}>
            <ListOrdered size={18} aria-hidden />
            <span>追加方法</span>
          </div>
          <ol className={styles.stepsList}>
            <li className={styles.stepItem}>
              <span className={styles.stepNumber}>1</span>
              <span className={styles.stepText}>
                ブラウザの<span className={styles.emphasis}>共有ボタン</span>をタップ
              </span>
            </li>
            <li className={styles.stepItem}>
              <span className={styles.stepNumber}>2</span>
              <span className={styles.stepText}>
                「<span className={styles.emphasis}>ホーム画面に追加</span>」を選択
              </span>
            </li>
            <li className={styles.stepItem}>
              <span className={styles.stepNumber}>3</span>
              <span className={styles.stepText}>
                毎回<span className={styles.emphasis}>今いるグループ画面</span>
                から開けます！
              </span>
            </li>
          </ol>
        </div>

        <div className={styles.articleLinks}>
          <a
            className={styles.articleLink}
            href="https://support.google.com/chrome/answer/15085120?hl=ja&co=GENIE.Platform%3DAndroid"
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={16} aria-hidden />
            Androidの手順を見る
          </a>
          <a
            className={styles.articleLink}
            href="https://support.apple.com/ja-jp/guide/iphone/iphea86e5236/ios"
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={16} aria-hidden />
            iPhoneの手順を見る
          </a>
        </div>

        <label className={styles.skipOption}>
          <input
            className={styles.skipCheckbox}
            type="checkbox"
            checked={dontShowAgain}
            onChange={(event) => {
              setDontShowAgain(event.target.checked);
            }}
          />
          <span>今後はもう表示しなくて大丈夫！</span>
        </label>

        <div className={styles.actionRow}>
          <Button
            fullWidth
            radius="pill"
            size="lg"
            onClick={() => {
              onClose(dontShowAgain);
            }}
          >
            閉じる
          </Button>
        </div>
      </div>
    </HalfModal>
  );
}

export default AddToHomeModal;
