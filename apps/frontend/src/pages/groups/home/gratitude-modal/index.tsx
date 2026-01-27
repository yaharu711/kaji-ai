import { useId, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { getChoreIcon, type ChoreIconCode } from "../../../../constants/chores";
import { HalfModal } from "../../../../components";
import styles from "./GratitudeModal.module.css";

interface GratitudeMessageOption {
  id: string;
  label: string;
}

interface GratitudeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  choreIconCode: ChoreIconCode;
  choreName: string;
  userName: string;
  isSubmitting?: boolean;
  onSubmit: (payload: { messageId: string; note: string }) => Promise<void>;
}

const NOTE_LIMIT = 100;
const MESSAGE_OPTIONS: GratitudeMessageOption[] = [
  { id: "1", label: "忙しいのにありがとう！" },
  { id: "2", label: "大変な家事なのにやってくれてありがとう！" },
  { id: "3", label: "いつも助かってます！" },
  { id: "4", label: "これやってくれるのほんと助かる！" },
];
const DEFAULT_MESSAGE_ID = MESSAGE_OPTIONS[0]?.id ?? null;

function GratitudeModal({
  open,
  onOpenChange,
  choreIconCode,
  choreName,
  userName,
  isSubmitting = false,
  onSubmit,
}: GratitudeModalProps) {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(DEFAULT_MESSAGE_ID);
  const [note, setNote] = useState("");
  const textareaId = useId();
  const isOverNoteLimit = note.length > NOTE_LIMIT;

  const handleClose = () => {
    setSelectedMessageId(DEFAULT_MESSAGE_ID);
    setNote("");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && isSubmitting) return;
    if (!nextOpen) {
      handleClose();
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = async () => {
    if (!selectedMessageId || isSubmitting) return;
    try {
      await onSubmit({ messageId: selectedMessageId, note });
      handleOpenChange(false);
    } catch {
      // エラーモーダル側で扱うため、ここでは閉じない
    }
  };

  const isPrimaryDisabled = !selectedMessageId || isSubmitting || isOverNoteLimit;

  return (
    <HalfModal
      open={open}
      onOpenChange={handleOpenChange}
      title="感謝を伝える"
      headerIcon={
        <span className={styles.headerIcon} aria-hidden>
          <Heart size={18} fill="currentColor" stroke="currentColor" />
        </span>
      }
      primaryActionLabel="感謝を伝える"
      secondaryActionLabel="キャンセル"
      primaryActionDisabled={isPrimaryDisabled}
      primaryActionLoading={isSubmitting}
      secondaryActionDisabled={isSubmitting}
      primaryActionIcon={<Heart size={16} fill="currentColor" stroke="currentColor" />}
      height="lg"
      onPrimaryAction={() => {
        void handleSubmit();
      }}
      onSecondaryAction={() => {
        handleOpenChange(false);
      }}
    >
      <div className={styles.container}>
        <section className={styles.section} aria-labelledby="gratitude-recipient">
          <div id="gratitude-recipient" className={styles.sectionHeading}>
            <span className={styles.sectionLabel}>感謝を伝える相手</span>
          </div>
          <div className={styles.recipientCard}>
            <div className={styles.recipientIcon} aria-hidden>
              <span>{getChoreIcon(choreIconCode)}</span>
            </div>
            <div className={styles.recipientInfo}>
              <p className={styles.recipientName}>{userName}</p>
              <p className={styles.recipientDetail}>{choreName}</p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="gratitude-message">
          <div id="gratitude-message" className={styles.sectionHeading}>
            <Sparkles size={16} className={styles.sectionIcon} aria-hidden />
            <span className={styles.sectionTitle}>感謝のメッセージを選ぶ</span>
          </div>
          <div className={styles.options} role="radiogroup" aria-label="感謝のメッセージ">
            {MESSAGE_OPTIONS.map((option) => {
              const isSelected = option.id === selectedMessageId;
              return (
                <button
                  key={option.id}
                  type="button"
                  className={[styles.optionButton, isSelected ? styles.optionSelected : ""]
                    .filter(Boolean)
                    .join(" ")}
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => {
                    setSelectedMessageId(option.id);
                  }}
                >
                  <span className={styles.optionIcon} aria-hidden>
                    <Heart size={18} />
                  </span>
                  <span className={styles.optionText}>{option.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="gratitude-note">
          <label id="gratitude-note" className={styles.sectionHeading} htmlFor={textareaId}>
            <span className={styles.sectionTitle}>補足メッセージ（任意）</span>
          </label>
          <textarea
            id={textareaId}
            className={[styles.textarea, isOverNoteLimit ? styles.textareaError : ""]
              .filter(Boolean)
              .join(" ")}
            placeholder="自分の言葉でも感謝を伝えてみましょう！"
            rows={4}
            value={note}
            aria-invalid={isOverNoteLimit}
            onChange={(event) => {
              setNote(event.target.value);
            }}
          />
          <div className={styles.noteFooter}>
            <span
              className={[styles.noteCounter, isOverNoteLimit ? styles.noteCounterError : ""]
                .filter(Boolean)
                .join(" ")}
            >
              {note.length}/{NOTE_LIMIT}文字
            </span>
          </div>
        </section>
      </div>
    </HalfModal>
  );
}

export default GratitudeModal;
