import { useMemo, useState } from "react";
import { Swords } from "lucide-react";
import styles from "./home.module.css";
import { useGroupLayout } from "../GroupLayoutContext";
import ChoreBeatingModal from "./chore-beating-modal";
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

const formatJstDateLabel = (dateString: string) => {
  const date = toJstDate(dateString);
  const { year, month, day, weekday } = getJstDateParts(date);
  return `${year}年${Number(month)}月${Number(day)}日 (${weekday})`;
};

function GroupHomePage() {
  const { groupId } = useGroupLayout();
  const today = useMemo(() => getJstDateString(nowJst()), []);
  const [selectedDate, setSelectedDate] = useState(() => today);
  const [isBattleOpen, setIsBattleOpen] = useState(false);
  const { data: chores, isLoading: choresLoading } = useGroupChoresQuery(groupId);
  const { data: beatingGroups, isLoading: beatingLoading } = useGroupBeatingsQuery(
    groupId,
    selectedDate,
  );
  const { mutateAsync: createBeating, isPending: isCreatingBeating } =
    useCreateChoreBeatingMutation();
  const isToday = selectedDate === today;
  const canGoNext = selectedDate < today;

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
      <GroupTimeline beatingGroups={beatingGroups ?? []} isLoading={beatingLoading} />
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
    </>
  );
}

export default GroupHomePage;
