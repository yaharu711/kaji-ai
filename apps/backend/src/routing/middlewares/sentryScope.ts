import type { MiddlewareHandler } from "hono";

import { sentryCapture } from "../../observability/sentry";

export const sentryScopeMiddleware = (): MiddlewareHandler => async (c, next) =>
  sentryCapture.withScope(async (scope) => {
    const requesterId = c.get("requesterId") as string | undefined;
    if (requesterId) {
      scope.setUser({ id: requesterId });
      scope.setTag("user_id", requesterId);
    }
    scope.setTag("service", "api");
    scope.setTag("api", `${c.req.method} ${new URL(c.req.url).pathname}`);

    // request bodyはストリームを消費するみたいなので、ここでは無闇に取得しない
    // request内容はログ側でcontextに含めてもらい、拾うようにする
    await next();
  });
