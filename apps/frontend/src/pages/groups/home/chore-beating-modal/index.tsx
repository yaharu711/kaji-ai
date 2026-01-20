import { useState } from "react";
import { Clock3, Swords } from "lucide-react";
import { DropdownSelect, HalfModal } from "../../../../components";
import styles from "./ChoreBeatingModal.module.css";

interface ChoreBeatingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const timeOptions = Array.from({ length: 24 }, (_, hour) => {
  const label = `${String(hour).padStart(2, "0")}:00`;
  return { value: label, label };
});

function ChoreBeatingModal({ open, onOpenChange }: ChoreBeatingModalProps) {
  const [selectedChore, setSelectedChore] = useState<string | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:00`;
  });

  const today = new Date();
  const todayText = `${String(today.getMonth() + 1)}月${String(today.getDate())}日`;

  return (
    <HalfModal
      open={open}
      onOpenChange={onOpenChange}
      title="家事を討伐する"
      headerIcon={<Swords size={20} />}
      primaryActionLabel="討伐完了"
      secondaryActionLabel="キャンセル"
      onPrimaryAction={() => {
        onOpenChange(false);
      }}
      onSecondaryAction={() => {
        onOpenChange(false);
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
            emptyMessage="討伐する家事がありません、、！"
            options={[]}
            value={selectedChore}
            onChange={setSelectedChore}
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
