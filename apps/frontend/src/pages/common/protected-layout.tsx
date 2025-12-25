import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSession } from "@hono/auth-js/react";

function ProtectedLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      void navigate("/login", { replace: true, state: { from: location } });
    },
  });

  if (status === "loading") {
    return <div>読み込み中...</div>;
  }

  return <Outlet />;
}

export default ProtectedLayout;
