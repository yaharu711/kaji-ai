import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SessionProvider, authConfigManager } from "@hono/auth-js/react";
import "./index.css";
import App from "./App.tsx";

const AUTH_BASE_PATH = "/auth";
const backendOrigin = import.meta.env.VITE_BACKEND_ORIGIN.trim();
const fallbackBaseUrl = window.location.origin;
const baseUrl = backendOrigin && backendOrigin.length > 0 ? backendOrigin : fallbackBaseUrl;

authConfigManager.setConfig({
  baseUrl,
  basePath: AUTH_BASE_PATH,
  // 異なるオリジンでもサブドメインなので、csrfトークンが送信されるようにする
  // csrfトークンはCookienに入っていて、ちゃんとsmae-site: laxになっている
  credentials: "include",
});

const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find the root element");
}

createRoot(container).render(
  <StrictMode>
    <SessionProvider refetchOnWindowFocus>
      <App />
    </SessionProvider>
  </StrictMode>,
);
