import "../../App.css";
import GoogleLoginButton from "./components/google-login-button";
import { googleSignIn } from "./lib/googleSignIn";
import { useEffect } from "react";
import { useSession } from "@hono/auth-js/react";
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: session, status } = useSession();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const from = (location.state as { from?: Location } | null)?.from;

  useEffect(() => {
    if (status === "authenticated" && userId) {
      // ログイン済みなら元の遷移先、なければユーザー詳細へリダイレクト
      const fallbackPath = `/users/${userId}`;
      const targetPath = from?.pathname ?? fallbackPath;
      void navigate(targetPath, { replace: true });
    }
  }, [status, userId, from?.pathname, navigate]);

  return (
    <div className="app">
      <main className="login-card">
        <header className="login-header">
          <p className="login-eyebrow">家事可視化アプリ</p>
          <h1 className="login-title">Googleでログイン</h1>
          <p className="login-description">Googleアカウントを使ってすぐにサインインできます。</p>
        </header>
        <GoogleLoginButton
          onClick={() => {
            void googleSignIn();
          }}
        />
      </main>
    </div>
  );
}

export default LoginPage;
