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
  const sampleBeatingGroups = [
    {
      timeLabel: "09:00",
      items: [
        {
          id: "beating-1",
          choreIconCode: "laundry",
          choreName: "洗濯",
          userName: "山田 太郎",
          userImageUrl: "https://placehold.co/96x96/png",
          likeCount: 0,
          commentCount: 0,
          userRoleLabel: "討伐者",
          messages: [
            {
              userName: "山田 太郎",
              userImageUrl: "https://placehold.co/64x64/png",
              mainMessage: "いつも助かってます！",
              describeMessage: "朝からありがとう！",
            },
          ],
        },
      ],
    },
    {
      timeLabel: "10:00",
      items: [
        {
          id: "beating-2",
          choreIconCode: "dish-wash",
          choreName: "食器洗い",
          userName: "佐藤 花子",
          userImageUrl: null,
          likeCount: 12,
          commentCount: 3,
          userRoleLabel: "討伐者",
          messages: [
            {
              userName: "佐藤 花子",
              userImageUrl: null,
              mainMessage: "ナイス討伐！",
              describeMessage: "片付けが早く終わって助かったよ。",
            },
          ],
        },
        {
          id: "beating-3",
          choreIconCode: "shopping",
          choreName: "買い物",
          userName: "田中 花子",
          userImageUrl: null,
          likeCount: 4,
          commentCount: 1,
          userRoleLabel: "討伐者",
          messages: [
            {
              userName: "田中 花子",
              userImageUrl: null,
              mainMessage: "ありがとう！",
              describeMessage: "おかげで夕飯の準備がスムーズでした。",
            },
          ],
        },
      ],
    },
  ] as const;

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
      <GroupTimeline beatingGroups={sampleBeatingGroups} />
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
