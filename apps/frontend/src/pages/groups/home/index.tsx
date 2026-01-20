import { useState } from "react";
import { Swords } from "lucide-react";
import PageCard from "../../../components/PageCard";
import styles from "./groups.module.css";
import { useGroupLayout } from "../GroupLayoutContext";
import ChoreBeatingModal from "./chore-beating-modal";

function GroupHomePage() {
  const { groupId } = useGroupLayout();
  const [isBattleOpen, setIsBattleOpen] = useState(false);

  return (
    <>
      <ChoreBeatingModal open={isBattleOpen} onOpenChange={setIsBattleOpen} />
      <PageCard align="center">
        <section className={styles.content} aria-labelledby="group-heading">
          <p className={styles.badge}>グループ</p>
          <h1 id="group-heading" className={styles.title}>
            to be continue...
          </h1>
          <p className={styles.description}>グループ画面は現在準備中です。</p>
          {groupId ? <p className={styles.groupId}>groupId: {groupId}</p> : null}
        </section>
      </PageCard>
      <button
        type="button"
        className={styles.floatingAction}
        aria-label="バトルを開く"
        aria-haspopup="dialog"
        onClick={() => {
          setIsBattleOpen(true);
        }}
      >
        <Swords size={29} />
      </button>
    </>
  );
}

export default GroupHomePage;
