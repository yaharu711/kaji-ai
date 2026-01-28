import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSession } from "@hono/auth-js/react";
import type { AppSessionUser } from "@kaiji-ai/backend/contracts";
import { SessionUserProvider } from "../../contexts/SessionUserContext";
import { LoaderCircle } from "../../components";
import styles from "./protected-layout.module.css";

function ProtectedLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const sessionResult = useSession({
    required: true,
    onUnauthenticated: () => {
      const fromPath = `${location.pathname}${location.search}${location.hash}`;
      const redirectParam = encodeURIComponent(fromPath);
      void navigate(`/login?redirect=${redirectParam}`, {
        replace: true,
        state: { from: location, fromPath },
      });
    },
  });

  if (sessionResult.status === "loading") {
    return (
      <div className={styles.loadingContainer}>
        <LoaderCircle size="lg" ariaLabel="セッションを確認中" />
      </div>
    );
  }

  const { user } = sessionResult.data;
  const sessionUser = user as AppSessionUser | undefined;

  if (!sessionUser) {
    // required:true なので基本ここには来ないが、保険としてガード。
    return <div>ユーザー情報を取得できませんでした</div>;
  }

  return (
    <SessionUserProvider value={sessionUser}>
      <Outlet />
    </SessionUserProvider>
  );
}

export default ProtectedLayout;
