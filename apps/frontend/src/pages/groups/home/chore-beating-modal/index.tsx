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
}

const formatHour = (hour: number) => `${String(hour)}時`;

const timeOptions = Array.from({ length: 24 }, (_, hour) => {
  const start = formatHour(hour);
  const end = formatHour((hour + 1) % 24);
  const label = `${start}〜${end}`;
  return { value: label, label };
});

const getDefaultTimeRange = () => {
  const now = new Date();
  const hour = now.getHours();
  const start = formatHour(hour);
  const end = formatHour((hour + 1) % 24);
  return `${start}〜${end}`;
};

function ChoreBeatingModal({
  open,
  onOpenChange,
  choreOptions,
  choresLoading = false,
}: ChoreBeatingModalProps) {
  const [selectedChore, setSelectedChore] = useState<string | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>(getDefaultTimeRange);

  const today = new Date();
  const todayText = `${String(today.getMonth() + 1)}月${String(today.getDate())}日`;

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

  return (
    <HalfModal
      open={open}
      onOpenChange={handleOpenChange}
      title="家事を討伐する"
      headerIcon={<Swords size={20} />}
      primaryActionLabel="討伐完了"
      secondaryActionLabel="キャンセル"
      onPrimaryAction={() => {
        handleOpenChange(false);
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
            helperText={`本日 ${todayText}の討伐として記録されます！`}
          />
        </section>
      </div>
    </HalfModal>
  );
}

export default ChoreBeatingModal;
