import { Hono } from "hono";

import { getDb } from "../db/client";
import { GroupRepository } from "../repositories/group.repository";
import { createGroupRequestSchema } from "./schemas/requests/createGroupRequest";
import { unauthorizedSchema } from "./schemas/responses/common";
import { createGroupSuccessSchema } from "./schemas/responses/createGroupResponse";
import { getGroupsSuccessSchema } from "./schemas/responses/getGroupsResponse";
import { validateJson } from "./middlewares/validator";

const groupRepository = new GroupRepository(getDb());

const app = new Hono()
  .get("/", async (c) => {
    const auth = c.get("authUser");
    const userId = auth?.session?.user?.id;
    if (!userId) {
      const body = unauthorizedSchema.parse({ status: 401, message: "Unauthorized" });
      return c.json(body, 401);
    }

    const groups = await groupRepository.findAllWithMemberCount(userId);
    console.log("Fetched groups:", groups, userId);

    const response = getGroupsSuccessSchema.parse({
      groups: groups.map((group) => ({
        id: group.id,
        name: group.name,
        image: group.image,
        member_count: group.memberCount,
      })),
    });

    return c.json(response, 200);
  })
  .post("/", validateJson(createGroupRequestSchema), async (c) => {
    const now = new Date();

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
