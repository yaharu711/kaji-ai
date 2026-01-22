import { useState } from "react";
import { Swords } from "lucide-react";
import styles from "./home.module.css";
import { useGroupLayout } from "../GroupLayoutContext";
import ChoreBeatingModal from "./chore-beating-modal";
import { useGroupChoresQuery } from "../hooks/useGroupChoresQuery";
import { getChoreIcon } from "../../../constants/chores";
import { useCreateChoreBeatingMutation } from "../hooks/useCreateChoreBeatingMutation";
import GroupTimeline from "./timeline";

function GroupHomePage() {
  const { groupId } = useGroupLayout();
  const [isBattleOpen, setIsBattleOpen] = useState(false);
  const { data: chores, isLoading: choresLoading } = useGroupChoresQuery(groupId);
  const { mutateAsync: createBeating, isPending: isCreatingBeating } =
    useCreateChoreBeatingMutation();

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
      <GroupTimeline />
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
