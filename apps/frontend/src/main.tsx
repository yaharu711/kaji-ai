import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SessionProvider, authConfigManager } from "@hono/auth-js/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./theme.css";
import "./index.css";
import App from "./App.tsx";
import ErrorModalProvider from "./components/ErrorModalProvider";

const AUTH_BASE_PATH = "/api/auth";
const backendOrigin = import.meta.env.VITE_BACKEND_ORIGIN.trim();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

authConfigManager.setConfig({
  baseUrl: backendOrigin,
  basePath: AUTH_BASE_PATH,
  // 異なるオリジンでもサブドメインなので、csrfトークンが送信されるようにする
  // csrfトークンはCookieに入っていて、ちゃんとsmae-site: laxになっている
  credentials: "include",
});

const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find the root element");
}

createRoot(container).render(
  <StrictMode>
    {/*
     * refetchOnWindowFocusがあるおかげで、ずっと同じ画面開きっぱなしでも、フォーカスが戻った時にsession APIをリフェッチしてくれる。
     * これで、axiosのinterceptorとかで401が返ってきた時の共通処理を実装しなくても一旦大丈夫そう
     */}
    <SessionProvider refetchOnWindowFocus>
      <QueryClientProvider client={queryClient}>
        <ErrorModalProvider>
          <App />
        </ErrorModalProvider>
      </QueryClientProvider>
    </SessionProvider>
  </StrictMode>,
);
