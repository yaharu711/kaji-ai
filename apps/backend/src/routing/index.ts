import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";
import { cors } from "hono/cors";

import authConfig from "../auth.config";
import env from "../util/env";
import groups from "./groups";

const frontendOrigin = env("FRONTEND_ORIGIN");

const app = new Hono()
  .use(
    "*",
    cors({
      origin: frontendOrigin,
      credentials: true,
      allowMethods: ["GET", "POST", "OPTIONS"],
      // Auth.jsではX-Auth-Return-Redirectが必要になるため、ここで許可する
      allowHeaders: ["Content-Type", "Authorization", "X-Auth-Return-Redirect"],
    }),
  )
  .use(
    "*",
    initAuthConfig(() => authConfig),
  )
  .use("/api/auth/*", authHandler())
  .use("/api/*", verifyAuth())
  .route("/api/groups", groups)
  .get("/api/me", (c) => {
    const auth = c.get("authUser");
    if (!auth) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    return c.json({ user: auth.session?.user ?? null });
  });

export default app;
export type RoutingApp = typeof app;
