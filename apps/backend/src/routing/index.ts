import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";

import authConfig from "../auth.config";
import hello from "./hello";
import todos from "./todos";

const app = new Hono()
  .use(
    "*",
    initAuthConfig(() => authConfig),
  )
  .use("/auth/*", authHandler())
  .use("/api/*", verifyAuth())
  .route("/api", hello)
  .route("/api/todos", todos)
  .get("/api/me", (c) => {
    const auth = c.get("authUser");
    if (!auth) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    return c.json({ user: auth.session?.user ?? null });
  });

export default app;
export type RoutingApp = typeof app;
