import "../../App.css";
import GoogleLoginButton from "./components/google-login-button";
import { googleSignIn } from "./lib/googleSignIn";

function LoginPage() {
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
