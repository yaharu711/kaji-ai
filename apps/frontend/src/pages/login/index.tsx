import { googleSignIn } from "./lib/googleSignIn";
import { useMemo, useState } from "react";
import { useSession } from "@hono/auth-js/react";
import { Navigate, useLocation } from "react-router-dom";
import LoginView from "./components/login-view";

// TODO: ここのテストはどうするか要検討
function LoginPage() {
  const location = useLocation();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { data: session, status } = useSession();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const redirectPath = new URLSearchParams(location.search).get("redirect") ?? "";
  const origin = window.location.origin;
  const resolvedRedirect = (() => {
    if (!redirectPath || redirectPath === "/" || redirectPath === "/login") {
      return "";
    }
    const resolvedUrl = new URL(redirectPath, origin);
    if (resolvedUrl.origin !== origin) {
      return "";
    }
    return resolvedUrl.pathname + resolvedUrl.search + resolvedUrl.hash;
  })();
  // ここでfallbackを/loginにしているのは、まだuserIdが取れていないため。
  // userIdが取れたらfallbackPathのように/users/{userId}にリダイレクトをfallbackにしている
  const callbackUrl = new URL(resolvedRedirect || "/login", origin).toString();
  console.log({ callbackUrl });

  const isAuthChecking = status === "loading";
  const isLoading = useMemo(() => isAuthChecking || isSigningIn, [isAuthChecking, isSigningIn]);
  const isBusy = status === "loading" || status === "authenticated" || isSigningIn;

  if (status === "authenticated" && userId) {
    const fallbackPath = `/users/${userId}`;
    const targetPath = resolvedRedirect || fallbackPath;
    return <Navigate to={targetPath} replace />;
  }

  if (isLoading) {
    return (
      <LoginView
        isLoading
        isBusy
        onGoogleLogin={() => {
          setIsSigningIn(true);
          void googleSignIn(callbackUrl).catch((error: unknown) => {
            console.error(error);
            setIsSigningIn(false);
          });
        }}
      />
    );
  }

  return (
    <LoginView
      isLoading={false}
      isBusy={isBusy}
      onGoogleLogin={() => {
        if (isSigningIn) return;
        setIsSigningIn(true);
        void googleSignIn(callbackUrl).catch((error: unknown) => {
          console.error(error);
          setIsSigningIn(false);
        });
      }}
    />
  );
}

export default LoginPage;
