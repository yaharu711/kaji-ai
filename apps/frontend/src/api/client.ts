import { hc } from "hono/client";

import type { RoutingApp } from "../../../backend/src/routing";

const rawOrigin = import.meta.env.VITE_BACKEND_ORIGIN;
export const backendOrigin = rawOrigin ? rawOrigin.trim() : "";

export const honoClient = hc<RoutingApp>(backendOrigin, {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: "include",
    }),
});
