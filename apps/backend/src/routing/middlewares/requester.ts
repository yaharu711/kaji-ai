import type { MiddlewareHandler } from "hono";

import { unauthorizedSchema } from "../schemas/responses/common";

export const requireRequester = (): MiddlewareHandler => async (c, next) => {
  const auth = c.get("authUser");
  const requesterId = auth?.session?.user?.id;
  if (!requesterId) {
    const body = unauthorizedSchema.parse({ status: 401, message: "Unauthorized" });
    return c.json(body, 401);
  }

  c.set("requesterId", requesterId);
  await next();
};
