import { Hono } from "hono";

import { getDb } from "../db/client";
import { GroupRepository } from "../repositories/group.repository";
import { UserRepository } from "../repositories/user.repository";
import { createGroupRequestSchema } from "./schemas/requests/createGroupRequest";
import { inviteGroupRequestSchema, searchUsersRequestSchema } from "./schemas/requests";
import {
  forbiddenSchema,
  unauthorizedSchema,
  unprocessableEntitySchema,
} from "./schemas/responses/common";
import { createGroupSuccessSchema } from "./schemas/responses/createGroupResponse";
import { getGroupsSuccessSchema } from "./schemas/responses/getGroupsResponse";
import { inviteGroupSuccessSchema } from "./schemas/responses/inviteGroupResponse";
import { searchUsersSuccessSchema } from "./schemas/responses/searchUsersResponse";
import { validateJson, validateQuery } from "./middlewares/validator";

const db = getDb();
const groupRepository = new GroupRepository(db);
const userRepository = new UserRepository(db);

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
        invited_count: group.invitedCount,
        is_invited: group.isInvited,
      })),
    });

    return c.json(response, 200);
  })
  .get("/:groupId/search/users", validateQuery(searchUsersRequestSchema), async (c) => {
    const auth = c.get("authUser");
    const requesterId = auth?.session?.user?.id;
    if (!requesterId) {
      const body = unauthorizedSchema.parse({ status: 401, message: "Unauthorized" });
      return c.json(body, 401);
    }

    const { email } = c.req.valid("query");
    const { groupId } = c.req.param();

    const user = await userRepository.findByEmail(email);
    if (!user) {
      const body = searchUsersSuccessSchema.parse({ users: [] });
      return c.json(body, 200);
    }

    const belongings = await groupRepository.findUsersByGroupId(groupId);
    const belonging = belongings.find((member) => member.id === user.id);
    const isInvited = belonging !== undefined && belonging.acceptedAt === null;

    const body = searchUsersSuccessSchema.parse({
      users: [
        {
          id: user.id,
          name: user.name ?? null,
          email: user.email ?? null,
          image_url: user.image ?? null,
          is_invited_or_belonging: isInvited || belonging !== undefined,
        },
      ],
    });

    return c.json(body, 200);
  })
  .post("/:groupId/invitations", validateJson(inviteGroupRequestSchema), async (c) => {
    const auth = c.get("authUser");
    const requesterId = auth?.session?.user?.id;
    if (!requesterId) {
      const body = unauthorizedSchema.parse({ status: 401, message: "Unauthorized" });
      return c.json(body, 401);
    }

    const now = new Date();
    const { groupId } = c.req.param();
    const { user_id } = c.req.valid("json");

    const belongings = await groupRepository.findUsersByGroupId(groupId);
    // 招待リクエスト送信者がグループ所属者であることを確認(グループ所属者なら誰でも招待可能)
    const requesterBelonging = belongings.find((member) => member.id === requesterId);
    if (!requesterBelonging) {
      const body = forbiddenSchema.parse({ status: 403, message: "Forbidden" });
      return c.json(body, 403);
    }
    const belonging = belongings.find((member) => member.id === user_id);
    if (belonging) {
      const body = unprocessableEntitySchema.parse({
        status: 422,
        errors: [{ field: "user_id", message: "既に加入または招待しています" }],
      });
      return c.json(body, 422);
    }

    await groupRepository.addBelonging({
      groupId,
      userId: user_id,
      createdAt: now,
      acceptedAt: null,
    });

    return c.body(null, 204);
  })
  .post("/:groupId/invitations/accept", async (c) => {
    const auth = c.get("authUser");
    const userId = auth?.session?.user?.id;
    if (!userId) {
      const body = unauthorizedSchema.parse({ status: 401, message: "Unauthorized" });
      return c.json(body, 401);
    }

    const now = new Date();
    const { groupId } = c.req.param();
    const belongings = await groupRepository.findUsersByGroupId(groupId);
    const belonging = belongings.find((member) => member.id === userId);
    // 他のユーザーがリクエストしてきている場合でも422を返す仕様（手抜き）
    if (!belonging || belonging.acceptedAt !== null) {
      const body = unprocessableEntitySchema.parse({
        status: 422,
        errors: [{ field: "group_id", message: "招待が存在しません" }],
      });
      return c.json(body, 422);
    }

    await groupRepository.updateBelonging({
      groupId,
      userId,
      createdAt: now,
      acceptedAt: now,
    });

    return c.body(null, 204);
  })
  .post("/:groupId/invitations/deny", async (c) => {
    const auth = c.get("authUser");
    const userId = auth?.session?.user?.id;
    if (!userId) {
      const body = unauthorizedSchema.parse({ status: 401, message: "Unauthorized" });
      return c.json(body, 401);
    }

    const { groupId } = c.req.param();
    const belongings = await groupRepository.findUsersByGroupId(groupId);
    const belonging = belongings.find((member) => member.id === userId);
    if (!belonging || belonging.acceptedAt !== null) {
      const body = unprocessableEntitySchema.parse({
        status: 422,
        errors: [{ field: "group_id", message: "招待が存在しません" }],
      });
      return c.json(body, 422);
    }

    await groupRepository.deleteBelonging(userId, groupId);

    const response = inviteGroupSuccessSchema.parse({ status: 201 });
    return c.json(response, 201);
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
    // 作成者なので所属済みとして登録するためのデータ
    const beloging = { groupId, userId, createdAt: now, acceptedAt: now };

    try {
      await groupRepository.create(group);
      // 作成者を所属済みとして登録
      await groupRepository.addBelonging(beloging);
    } catch (error) {
      // neon-http ドライバはトランザクション非対応のため、失敗時は手動で作成済みグループを削除して整合性を保つ
      await groupRepository.deleteById(group.id).catch(() => {
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
