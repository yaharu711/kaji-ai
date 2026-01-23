import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import PageCard from "../../../../components/PageCard";
import styles from "./DateNavigator.module.css";

interface DateNavigatorProps {
  label: string;
  isToday: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
}

function DateNavigator({ label, isToday, canGoNext, onPrev, onNext, onReset }: DateNavigatorProps) {
  return (
    <div className={styles.card}>
      <PageCard padding="sm">
        <div className={styles.navigator} role="group" aria-label="日付の切り替え">
          <button type="button" className={styles.navButton} onClick={onPrev}>
            <ChevronLeft size={18} aria-hidden />
            前日
          </button>
          <div className={styles.center}>
            <p className={styles.label}>{label}</p>
            {isToday ? (
              <span className={styles.todayLabel}>今日</span>
            ) : (
              <button type="button" className={styles.todayButton} onClick={onReset}>
                <Calendar size={14} aria-hidden />
                今日に戻る
              </button>
            )}
          </div>
          {canGoNext ? (
            <button type="button" className={styles.navButton} onClick={onNext}>
              次の日
              <ChevronRight size={18} aria-hidden />
            </button>
          ) : (
            <div className={styles.navSpacer} aria-hidden />
          )}
        </div>
      </PageCard>
    </div>
  );
}

export default DateNavigator;
