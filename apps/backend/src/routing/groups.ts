import { Hono } from "hono";

import { getDb } from "../db/client";
import { GroupRepository } from "../repositories/group.repository";
import { createGroupRequestSchema } from "./schemas/requests/createGroupRequest";
import { unauthorizedSchema } from "./schemas/responses/common";
import { createGroupSuccessSchema } from "./schemas/responses/createGroupResponse";
import { validateJson } from "./middlewares/validator";

const groupRepository = new GroupRepository(getDb());
const now = new Date();

const app = new Hono().post("/", validateJson(createGroupRequestSchema), async (c) => {
  const { name } = c.req.valid("json");
  const auth = c.get("authUser");

  // verifyAuth ミドルウェアを通過しているので基本は存在する想定だが、安全のためチェック
  const userId = auth?.session?.user?.id;
  if (!userId) {
    const body = unauthorizedSchema.parse({ status: 401, message: "Unauthorized" });
    return c.json(body, 401);
  }

  await groupRepository.create({
    id: crypto.randomUUID(),
    name,
    ownerId: userId,
    image: null,
    createdAt: now,
    updatedAt: now,
  });

  // POST 成功のみを伝える。ステータスを明示したレスポンスを返す。
  const response = createGroupSuccessSchema.parse({ status: 201 });
  return c.json(response, 201);
});

export default app;
export type GroupsRoute = typeof app;
