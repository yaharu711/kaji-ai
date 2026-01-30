import { Outlet, useLocation, useParams } from "react-router-dom";
import { Users } from "lucide-react";
import { Header } from "../../components";
import Popover from "../../components/Popover";
import UserPopoverContent from "./UserPopoverContent";
import { useSessionUser } from "../../contexts/SessionUserContext";
import { useGroupUsersQuery } from "./hooks/useGroupUsersQuery";
import { GroupLayoutProvider } from "./GroupLayoutContext";
import { createGroupNavItems } from "./navItems";
import styles from "./group-layout.module.css";
import headerStyles from "../../components/Header/Header.module.css";

function GroupLayout() {
  const { groupId } = useParams<{ groupId: string }>();
  const location = useLocation();
  const { data: members } = useGroupUsersQuery(groupId);
  const sessionUser = useSessionUser();

  if (!groupId) {
    return null;
  }

  const groupName = (location.state as { groupName?: string } | null)?.groupName ?? groupId;
  const navItems = createGroupNavItems(groupId, groupName, location.pathname);
  const popoverContent =
    groupName && members && members.length > 0 ? (
      <UserPopoverContent groupName={groupName} currentUser={sessionUser} members={members} />
    ) : null;
  const shouldShowUserPopover = Boolean(popoverContent);
  const userAction = (
    <Popover
      trigger={
        <button
          type="button"
          className={headerStyles.userTrigger}
          aria-label="ユーザー情報を開く"
          disabled={!shouldShowUserPopover}
        >
          <Users size={18} />
          <span>メンバー</span>
        </button>
      }
      ariaLabel="ユーザー情報"
      content={popoverContent}
      size="md"
      radius="xl"
      variant="soft"
      side="bottom"
      align="end"
    />
  );

  return (
    <GroupLayoutProvider
      value={{
        groupId,
        groupName,
        navItems,
        members,
        currentUser: sessionUser,
      }}
    >
      <div className={styles.page}>
        <main className={styles.shell}>
          <Header navItems={navItems} userAction={userAction} />
          <Outlet />
        </main>
      </div>
    </GroupLayoutProvider>
  );
}

export default GroupLayout;
