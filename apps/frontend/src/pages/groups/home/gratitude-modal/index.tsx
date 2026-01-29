import { useId, useState } from "react";
import { Heart, Sparkles, Swords } from "lucide-react";
import { getChoreIcon, type ChoreIconCode } from "../../../../constants/chores";
import { HalfModal } from "../../../../components";
import styles from "./GratitudeModal.module.css";
import type { ChoreBeatingMessageLimits } from "@kaiji-ai/backend/contracts";

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
  isMyBeating?: boolean;
  isSubmitting?: boolean;
  onSubmit: (payload: { mainMessage: string; descriptionMessage: string }) => Promise<void>;
}

const NOTE_LIMIT: ChoreBeatingMessageLimits["description"] = 150;

const MESSAGE_OPTIONS: GratitudeMessageOption[] = [
  { id: "1", label: "忙しいのにありがとう！" },
  { id: "2", label: "大変な家事なのにやってくれてありがとう！" },
  { id: "3", label: "いつも助かってます！" },
  { id: "4", label: "これやってくれるのほんと助かる！" },
];
const DEFAULT_MESSAGE_ID = MESSAGE_OPTIONS[0]?.id ?? null;
const MESSAGE_LABEL_MAP = new Map(MESSAGE_OPTIONS.map((option) => [option.id, option.label]));

function GratitudeModal({
  open,
  onOpenChange,
  choreIconCode,
  choreName,
  userName,
  isMyBeating = false,
  isSubmitting = false,
  onSubmit,
}: GratitudeModalProps) {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(DEFAULT_MESSAGE_ID);
  const [note, setNote] = useState("");
  const textareaId = useId();
  const isOverNoteLimit = note.length > NOTE_LIMIT;
  const isSelfComment = isMyBeating;

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
    if (isSubmitting) return;
    const mainMessage = isSelfComment ? "" : (MESSAGE_LABEL_MAP.get(selectedMessageId ?? "") ?? "");
    if (!isSelfComment && !mainMessage) return;
    try {
      await onSubmit({ mainMessage, descriptionMessage: note });
      handleOpenChange(false);
    } catch {
      // エラーモーダル側で扱うため、ここでは閉じない
    }
  };

  const isPrimaryDisabled =
    (isSelfComment ? note.trim().length === 0 : !selectedMessageId) ||
    isSubmitting ||
    isOverNoteLimit;

  return (
    <HalfModal
      open={open}
      onOpenChange={handleOpenChange}
      title={isSelfComment ? "討伐カードにコメントができます！" : "感謝を伝えよう！"}
      headerIcon={
        <span className={styles.headerIcon} aria-hidden>
          <Heart size={18} fill="currentColor" stroke="currentColor" />
        </span>
      }
      primaryActionLabel={isSelfComment ? "コメントする" : "感謝を伝える"}
      secondaryActionLabel="キャンセル"
      primaryActionDisabled={isPrimaryDisabled}
      primaryActionLoading={isSubmitting}
      secondaryActionDisabled={isSubmitting}
      primaryActionIcon={<Heart size={16} fill="currentColor" stroke="currentColor" />}
      height={isSelfComment ? "md" : "lg"}
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
            <span className={styles.sectionLabel}>
              {isSelfComment ? "コメントする討伐カード" : "感謝を伝える相手"}
            </span>
          </div>
          <div className={styles.recipientCard}>
            <div className={styles.recipientIcon} aria-hidden>
              <span>{getChoreIcon(choreIconCode)}</span>
            </div>
            <div className={styles.recipientInfo}>
              <p className={styles.recipientName}>{userName}</p>
              <p className={styles.recipientDetail}>
                <Swords size={16} />
                {choreName}を討伐
              </p>
            </div>
          </div>
        </section>

        {isSelfComment ? null : (
          <section className={styles.section} aria-labelledby="gratitude-message">
            <div id="gratitude-message" className={styles.sectionHeading}>
              <Sparkles size={16} className={styles.sectionIcon} aria-hidden />
              <span className={styles.sectionTitle}>感謝のメッセージ</span>
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
        )}

        <section className={styles.section} aria-labelledby="gratitude-note">
          <label id="gratitude-note" className={styles.sectionHeading} htmlFor={textareaId}>
            <span className={styles.sectionTitle}>補足メッセージ（任意）</span>
          </label>
          <textarea
            id={textareaId}
            className={[styles.textarea, isOverNoteLimit ? styles.textareaError : ""]
              .filter(Boolean)
              .join(" ")}
            placeholder={
              isSelfComment
                ? "知って欲しいこと・褒めて欲しいことがあれば書いてみよう！"
                : "自分の言葉でも感謝を伝えてみよう！"
            }
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
