import "../../App.css";
import GoogleLoginButton from "./components/google-login-button";
import { googleSignIn } from "./lib/googleSignIn";
import { useEffect } from "react";
import { useSession } from "@hono/auth-js/react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const { data: session, status } = useSession();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  useEffect(() => {
    if (status === "authenticated" && userId) {
      // ログイン済みならユーザー詳細へリダイレクト
      void navigate(`/users/${userId}`, { replace: true });
    }
  }, [status, userId, navigate]);

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
