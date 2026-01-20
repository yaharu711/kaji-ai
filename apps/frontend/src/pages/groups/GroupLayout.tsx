import { Outlet, useLocation, useParams } from "react-router-dom";
import { Header } from "../../components";
import { useSessionUser } from "../../contexts/SessionUserContext";
import { useGroupUsersQuery } from "./hooks/useGroupUsersQuery";
import { GroupLayoutProvider } from "./GroupLayoutContext";
import { createGroupNavItems } from "./navItems";
import styles from "./group-layout.module.css";

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
          <Header
            navItems={navItems}
            groupName={groupName}
            currentUser={sessionUser}
            members={members}
          />
          <Outlet />
        </main>
      </div>
    </GroupLayoutProvider>
  );
}

export default GroupLayout;
