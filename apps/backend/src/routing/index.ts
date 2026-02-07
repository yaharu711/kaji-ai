import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";
import { cors } from "hono/cors";

import authConfig from "../auth.config";
import { createSentryLogger } from "../observability/sentry";
import env from "../util/env";
import groups from "./groups";
import { requireRequester } from "./middlewares/requester";
import { sentryScopeMiddleware } from "./middlewares/sentryScope";

const log = createSentryLogger("routing");

const frontendOrigin = env("FRONTEND_ORIGIN");
const app = new Hono()
  .onError((err, c) => {
    log.error(c, err, "予期していない(キャッチされていない)エラーが発生しました。");
    return c.json({ status: 500, message: "Internal Server Error" }, 500);
  })
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
  .use("/api/*", requireRequester())
  .use("/api/*", sentryScopeMiddleware())
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
