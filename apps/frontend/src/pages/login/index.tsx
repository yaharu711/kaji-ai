import { googleSignIn } from "./lib/googleSignIn";
import { useEffect, useMemo } from "react";
import { useSession } from "@hono/auth-js/react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginView from "./components/login-view";

// TODO: ここのテストはどうするか要検討
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: session, status } = useSession();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const from = (location.state as { from?: Location } | null)?.from;

  const isAuthChecking = status === "loading";
  const isRedirecting = status === "authenticated" && Boolean(userId);
  const isLoading = useMemo(() => isAuthChecking || isRedirecting, [isAuthChecking, isRedirecting]);
  const isBusy = status === "loading" || status === "authenticated";

  useEffect(() => {
    if (status === "authenticated" && userId) {
      // ログイン済みなら元の遷移先、なければユーザー詳細へリダイレクト
      const fallbackPath = `/users/${userId}`;
      const targetPath = from?.pathname ?? fallbackPath;
      void navigate(targetPath, { replace: true });
    }
  }, [status, userId, from?.pathname, navigate]);

  if (isLoading) {
    return (
      <LoginView
        isLoading
        isBusy
        onGoogleLogin={() => {
          void googleSignIn();
        }}
      />
    );
  }

  return (
    <LoginView
      isLoading={false}
      isBusy={isBusy}
      onGoogleLogin={() => {
        void googleSignIn();
      }}
    />
  );
}

export default LoginPage;
