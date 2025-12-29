import styles from "./login-view.module.css";
import { LoaderCircle } from "lucide-react";
import GoogleLoginButton from "../google-login-button";
import PageCard from "../../../../components/PageCard";

type LoginViewProps = {
  isLoading: boolean;
  isBusy: boolean;
  onGoogleLogin: () => void;
};

function LoginView({ isLoading, isBusy, onGoogleLogin }: LoginViewProps) {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.cardShell}>
          <PageCard align="center">
            <div className={styles.loadingContent} aria-busy>
              <LoaderCircle className={styles.spinner} aria-hidden />
              <div className={styles.loadingTexts}>
                <p className={styles.loadingEyebrow}>しばらくお待ちください</p>
                <p className={styles.loadingTitle}>ログイン処理を実行中です</p>
                <p className={styles.loadingDescription}>認証完了後、自動的にページ遷移します。</p>
              </div>
            </div>
          </PageCard>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardShell}>
        <PageCard align="center">
          <div className={styles.content}>
            <header className={styles.header}>
              <p className={styles.eyebrow}>家事可視化アプリ</p>
              <h1 className={styles.title}>Googleでログイン</h1>
              <p className={styles.description}>
                Googleアカウントを使ってすぐにサインインできます。
              </p>
            </header>
            <GoogleLoginButton
              disabled={isBusy}
              onClick={() => {
                onGoogleLogin();
              }}
            />
          </div>
        </PageCard>
      </div>
    </div>
  );
}

export default LoginView;
