import { hc } from "hono/client";
import type { AppRoutes } from "@kaiji-ai/backend/app-routes";

const rawOrigin = import.meta.env.VITE_BACKEND_ORIGIN;
export const backendOrigin = rawOrigin ? rawOrigin.trim() : "";

export const honoClient = hc<AppRoutes>(backendOrigin, {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: "include",
    }),
});
