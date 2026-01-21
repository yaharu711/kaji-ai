import { useState } from "react";
import { Clock3, Swords } from "lucide-react";
import {
  DropdownSelect,
  HalfModal,
  LoaderCircle,
  type DropdownOption,
} from "../../../../components";
import styles from "./ChoreBeatingModal.module.css";

interface ChoreBeatingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  choreOptions: DropdownOption[];
  choresLoading?: boolean;
  isSubmitting?: boolean;
  onSubmit: (payload: { choreId: number; startHour: number }) => Promise<void>;
}

const formatHour = (hour: number) => `${String(hour)}時`;

const getJstDateParts = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const getPart = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    year: getPart("year"),
    month: getPart("month"),
    day: getPart("day"),
    hour: getPart("hour"),
  };
};

const timeOptions = Array.from({ length: 24 }, (_, hour) => {
  const start = formatHour(hour);
  const end = formatHour((hour + 1) % 24);
  const label = `${start}〜${end}`;
  return { value: label, label };
});

const getDefaultTimeRange = () => {
  const now = new Date();
  const hourText = getJstDateParts(now).hour;
  const hour = Number(hourText);
  const resolvedHour = Number.isNaN(hour) ? now.getHours() : hour;
  const start = formatHour(resolvedHour);
  const end = formatHour((resolvedHour + 1) % 24);
  return `${start}〜${end}`;
};

const parseStartHour = (value: string) => {
  const match = /^(\d{1,2})時〜/.exec(value);
  if (!match) return null;
  const hour = Number(match[1]);
  if (Number.isNaN(hour) || hour < 0 || hour > 23) return null;
  return hour;
};

function ChoreBeatingModal({
  open,
  onOpenChange,
  choreOptions,
  choresLoading = false,
  isSubmitting = false,
  onSubmit,
}: ChoreBeatingModalProps) {
  const [selectedChore, setSelectedChore] = useState<string | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>(getDefaultTimeRange);
  const isPrimaryDisabled = !selectedChore || isSubmitting;

  const todayParts = getJstDateParts(new Date());
  const todayText = `${todayParts.month}月${todayParts.day}日`;
  const timeHelperText = `本日 ${todayText}の討伐として記録されます！`;

  const handleClose = () => {
    setSelectedChore(undefined);
    setSelectedTime(getDefaultTimeRange());
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      handleClose();
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = async () => {
    if (!selectedChore || isSubmitting) return;
    const hour = parseStartHour(selectedTime);
    if (hour === null) return;
    try {
      await onSubmit({ choreId: Number(selectedChore), startHour: hour });
      handleOpenChange(false);
    } catch {
      // エラーモーダル側で扱うため、ここでは閉じない
    }
  };

  return (
    <HalfModal
      open={open}
      onOpenChange={handleOpenChange}
      title="家事を討伐する"
      headerIcon={<Swords size={20} />}
      primaryActionLabel="討伐完了"
      secondaryActionLabel="キャンセル"
      primaryActionDisabled={isPrimaryDisabled}
      onPrimaryAction={() => {
        void handleSubmit();
      }}
      onSecondaryAction={() => {
        handleOpenChange(false);
      }}
    >
      <div className={styles.form}>
        <section className={styles.section} aria-labelledby="chore-select-heading">
          <div id="chore-select-heading" className={styles.sectionHeader}>
            <Swords className={styles.sectionIcon} aria-hidden />
            <span>討伐する家事を選択</span>
          </div>
          <DropdownSelect
            placeholder="家事を選択しよう！"
            emptyMessage={
              choresLoading ? (
                <LoaderCircle size="md" ariaLabel="家事を読み込み中" />
              ) : (
                "討伐する家事がありません、、！"
              )
            }
            options={choreOptions}
            value={selectedChore}
            onChange={setSelectedChore}
            disabled={choresLoading}
          />
        </section>

        <section className={styles.section} aria-labelledby="battle-time-heading">
          <div id="battle-time-heading" className={styles.sectionHeader}>
            <Clock3 className={styles.sectionIcon} aria-hidden />
            <span>討伐時刻</span>
          </div>
          <DropdownSelect
            options={timeOptions}
            value={selectedTime}
            onChange={setSelectedTime}
            helperText={timeHelperText}
            helperTextVariant="notice"
          />
        </section>
      </div>
    </HalfModal>
  );
}

export default ChoreBeatingModal;
