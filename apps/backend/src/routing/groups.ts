import { Hono } from "hono";

import { getDb } from "../db/client";
import { GroupRepository } from "../repositories/group.repository";
import { createGroupRequestSchema } from "./schemas/requests/createGroupRequest";
import { unauthorizedSchema } from "./schemas/responses/common";
import { createGroupSuccessSchema } from "./schemas/responses/createGroupResponse";
import { getGroupsSuccessSchema } from "./schemas/responses/getGroupsResponse";
import { validateJson } from "./middlewares/validator";

const db = getDb();
const groupRepository = new GroupRepository(db);

const app = new Hono()
  .get("/", async (c) => {
    const auth = c.get("authUser");
    const userId = auth?.session?.user?.id;
    if (!userId) {
      const body = unauthorizedSchema.parse({ status: 401, message: "Unauthorized" });
      return c.json(body, 401);
    }

    const groups = await groupRepository.findAllWithMemberCount(userId);

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

    const groupId = crypto.randomUUID();
    const group = {
      id: groupId,
      name,
      ownerId: userId,
      image: null,
      createdAt: now,
      updatedAt: now,
    };

    const repository = new GroupRepository(db);

    try {
      await repository.create(group);
      // 作成者を所属済みとして登録
      await repository.addBelonging(group);
    } catch (error) {
      // neon-http ドライバはトランザクション非対応のため、失敗時は手動で作成済みグループを削除して整合性を保つ
      await repository.deleteById(group.id).catch(() => {
        // 二次的な削除失敗はログだけにとどめる（ここでは throw せず元のエラーを優先）
        console.error("Failed to rollback group creation", group.id);
      });
      throw error;
    }

    // POST 成功のみを伝える。ステータスを明示したレスポンスを返す。
    const response = createGroupSuccessSchema.parse({ status: 201 });
    return c.json(response, 201);
  });

export default app;
export type GroupsRoute = typeof app;
