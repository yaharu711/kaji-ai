import { useEffect, useMemo, useState } from "react";
import { Swords } from "lucide-react";
import styles from "./home.module.css";
import { useGroupLayout } from "../GroupLayoutContext";
import ChoreBeatingModal from "./chore-beating-modal";
import AddToHomeModal from "./add-to-home-modal";
import { useGroupChoresQuery } from "../hooks/useGroupChoresQuery";
import { getChoreIcon } from "../../../constants/chores";
import { useCreateChoreBeatingMutation } from "../hooks/useCreateChoreBeatingMutation";
import GroupTimeline from "./timeline";
import { useGroupBeatingsQuery } from "../hooks/useGroupBeatingsQuery";
import {
  getJstDateParts,
  getJstDateString,
  nowJst,
  shiftJstDate,
  toJstDate,
} from "../../../util/datetime";
import DateNavigator from "./date-navigator";
import { hideAddToHomeModal, shouldShowAddToHomeModal } from "./add-to-home-modal/storage";

const formatJstDateLabel = (dateString: string) => {
  const date = toJstDate(dateString);
  const { year, month, day, weekday } = getJstDateParts(date);
  return `${year}年${String(Number(month))}月${String(Number(day))}日 (${weekday})`;
};

function GroupHomePage() {
  const { groupId } = useGroupLayout();
  const today = useMemo(() => getJstDateString(nowJst()), []);
  const [selectedDate, setSelectedDate] = useState(() => today);
  const [isBattleOpen, setIsBattleOpen] = useState(false);
  const [isAddToHomeOpen, setIsAddToHomeOpen] = useState(false);
  const { data: chores, isLoading: choresLoading } = useGroupChoresQuery(groupId);
  const { data: beatingGroups, isLoading: beatingLoading } = useGroupBeatingsQuery(
    groupId,
    selectedDate,
  );
  const { mutateAsync: createBeating, isPending: isCreatingBeating } =
    useCreateChoreBeatingMutation();
  const isToday = selectedDate === today;
  const canGoNext = selectedDate < today;

  // 説明モーダルは少し遅延させてページ遷移したことを認識しやすくする
  useEffect(() => {
    if (!shouldShowAddToHomeModal()) return undefined;
    const timer = window.setTimeout(() => {
      setIsAddToHomeOpen(true);
    }, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const choreOptions =
    chores?.map((chore) => ({
      value: String(chore.id),
      label: chore.name,
      icon: <span aria-hidden>{getChoreIcon(chore.icon_code)}</span>,
    })) ?? [];

  return (
    <>
      <ChoreBeatingModal
        open={isBattleOpen}
        onOpenChange={setIsBattleOpen}
        choreOptions={choreOptions}
        choresLoading={choresLoading}
        isSubmitting={isCreatingBeating}
        onSubmit={async ({ choreId, startHour }) => {
          if (!groupId) return;
          await createBeating({ groupId, choreId, startHour });
        }}
      />
      <AddToHomeModal
        open={isAddToHomeOpen}
        onClose={(dontShowAgain) => {
          if (dontShowAgain) hideAddToHomeModal();
          setIsAddToHomeOpen(false);
        }}
      />
      <DateNavigator
        label={formatJstDateLabel(selectedDate)}
        isToday={isToday}
        canGoNext={canGoNext}
        onPrev={() => {
          setSelectedDate((current) => shiftJstDate(current, -1));
        }}
        onNext={() => {
          setSelectedDate((current) => shiftJstDate(current, 1));
        }}
        onReset={() => {
          setSelectedDate(today);
        }}
      />
      <GroupTimeline
        beatingGroups={beatingGroups ?? []}
        isLoading={beatingLoading}
        isToday={isToday}
      />
      {isToday ? (
        <button
          type="button"
          className={styles.floatingAction}
          aria-label="バトルを開く"
          aria-haspopup="dialog"
          onClick={() => {
            setIsBattleOpen(true);
          }}
        >
          <Swords size={30} />
        </button>
      ) : null}
    </>
  );
}

export default GroupHomePage;
