import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Header, UserProfileImg } from "../../components";
import { useSessionUser } from "../../contexts/SessionUserContext";
import { createUserNavItems } from "./navItems";
import styles from "./users.module.css";

function UserLayout() {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const sessionUser = useSessionUser();
  const resolvedUserId = userId ?? sessionUser.id;
  const navItems = createUserNavItems(resolvedUserId, location.pathname);
  const profilePath = `/users/${resolvedUserId}/profile`;

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <Header
          navItems={navItems}
          userAction={
            <Link to={profilePath} aria-label="プロフィールページへ">
              <UserProfileImg
                name={sessionUser.name}
                imageUrl={sessionUser.image}
                size="md"
                tone="primary"
              />
            </Link>
          }
        />
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
