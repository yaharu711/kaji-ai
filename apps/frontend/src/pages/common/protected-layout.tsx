import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSession } from "@hono/auth-js/react";
import type { AppSessionUser } from "../../../../backend/src/types/auth";
import { SessionUserProvider } from "../../contexts/SessionUserContext";

function ProtectedLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const sessionResult = useSession({
    required: true,
    onUnauthenticated: () => {
      void navigate("/login", { replace: true, state: { from: location } });
    },
  });

  if (sessionResult.status === "loading") {
    return <div>読み込み中...</div>;
  }

  const sessionUser = sessionResult.data?.user as AppSessionUser | undefined;

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
