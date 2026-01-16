import { Outlet, useLocation, useParams } from "react-router-dom";
import { Header } from "../../components";
import { useSessionUser } from "../../contexts/SessionUserContext";
import { useGroupUsersQuery } from "./hooks/useGroupUsersQuery";
import { GroupLayoutProvider } from "./GroupLayoutContext";
import { createGroupNavItems } from "./navItems";
import styles from "./groups.module.css";

function GroupLayout() {
  const { groupId } = useParams<{ groupId: string }>();
  const location = useLocation();
  const { data: members } = useGroupUsersQuery(groupId);
  const sessionUser = useSessionUser();

  if (!groupId) {
    return null;
  }

  const navItems = createGroupNavItems(groupId, location.pathname);

  return (
    <GroupLayoutProvider
      value={{
        groupId,
        groupName: groupId,
        navItems,
        members,
        currentUser: sessionUser,
      }}
    >
      <div className={styles.page}>
        <main className={styles.shell}>
          <Header
            navItems={navItems}
            groupName={groupId}
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
