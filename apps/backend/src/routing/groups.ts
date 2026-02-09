import { Hono } from "hono";
import type { Context } from "hono";

import {
  acceptGroupInvitationController,
  createChoreBeatingController,
  createChoreBeatingLikeController,
  createChoreBeatingMessageController,
  createGroupController,
  denyGroupInvitationController,
  getGroupBeatingsController,
  getGroupChoresController,
  getGroupUsersController,
  getGroupsController,
  inviteGroupController,
  searchUsersController,
} from "../controllers/groups.controller";
import { createChoreBeatingRequestSchema } from "./schemas/requests/createChoreBeatingRequest";
import { createChoreBeatingMessageRequestSchema } from "./schemas/requests/createChoreBeatingMessageRequest";
import { createGroupRequestSchema } from "./schemas/requests/createGroupRequest";
import {
  getGroupBeatingsRequestSchema,
  inviteGroupRequestSchema,
  searchUsersRequestSchema,
} from "./schemas/requests";
import { validateJson, validateQuery } from "./middlewares/validator";
import { unprocessableEntitySchema } from "./schemas/responses/common";
import { createSentryLogger } from "../observability/sentry";

const log = createSentryLogger("groups");

const sentryTest = async (c: Context) => {
  const mode = c.req.query("sentry_test");
  if (!mode) return null;

  if (mode === "exception") {
    const err = new Error("Sentry test exception");
    throw err;
  }
  if (mode === "error") {
    await log.error(
      c,
      new Error("Sentry test error"),
      "エラーがSentryに通知されるかのテストです！",
      {
        feature: "sentry-test",
        context: {
          test_mode: "exception",
          group_id: c.req.param("groupId") ?? null,
        },
      },
    );
    return c.json({ status: "500", sentry_test: "warning" }, 500);
  }
  if (mode === "typeerror") {
    const value = null as unknown as { toString: () => string };
    value.toString(); // This will cause a TypeError
  }
  if (mode === "warning") {
    await log.warn(
      c,
      new Error("Sentry test warning"),
      "ワーニングがSentryに通知されるかのテストです！",
      {
        feature: "sentry-test",
        context: { test_mode: "warning", group_id: c.req.param("groupId") ?? null },
      },
    );
    return c.json({ status: "ok", sentry_test: "warning" });
  }

  return c.json({ status: "skipped", sentry_test: mode });
};

const app = new Hono()
  .get("/", async (c) => {
    try {
      const testResponse = await sentryTest(c);
      if (testResponse) return testResponse;
      const requesterId = c.var.requesterId;
      return await getGroupsController(c, requesterId);
    } catch (err) {
      await log.error(c, err, "groups一覧の取得に失敗しました。");
      return c.json({ status: 500, message: "Internal Server Error" }, 500);
    }
  })
  .get("/:groupId/chores", async (c) => {
    try {
      const testResponse = await sentryTest(c);
      if (testResponse) return testResponse;
      const { groupId } = c.req.param();
      return await getGroupChoresController(c, groupId);
    } catch (err) {
      await log.error(c, err, "グループの家事一覧取得に失敗しました。", {
        context: { group_id: c.req.param("groupId") ?? null },
      });
      return c.json({ status: 500, message: "Internal Server Error" }, 500);
    }
  })
  .get("/:groupId/users", async (c) => {
    try {
      const requesterId = c.var.requesterId;
      const { groupId } = c.req.param();
      return await getGroupUsersController(c, requesterId, groupId);
    } catch (err) {
      await log.error(c, err, "グループのユーザー一覧取得に失敗しました。", {
        context: { group_id: c.req.param("groupId") ?? null },
      });
      return c.json({ status: 500, message: "Internal Server Error" }, 500);
    }
  })
  .get("/:groupId/beatings", validateQuery(getGroupBeatingsRequestSchema), async (c) => {
    try {
      const requesterId = c.var.requesterId;
      const { groupId } = c.req.param();
      const { date } = c.req.valid("query");
      return await getGroupBeatingsController(c, requesterId, groupId, date);
    } catch (err) {
      await log.error(c, err, "家事実行の取得に失敗しました。", {
        context: { group_id: c.req.param("groupId") ?? null, query: c.req.valid("query") },
      });
      return c.json({ status: 500, message: "Internal Server Error" }, 500);
    }
  })
  .post("/:groupId/beatings", validateJson(createChoreBeatingRequestSchema), async (c) => {
    try {
      const testResponse = await sentryTest(c);
      if (testResponse) return testResponse;
      const requesterId = c.var.requesterId;
      const { groupId } = c.req.param();
      const { chore_id, beated_at } = c.req.valid("json");
      return await createChoreBeatingController(
        c,
        requesterId,
        groupId,
        chore_id,
        new Date(beated_at),
      );
    } catch (err) {
      await log.error(c, err, "家事実行の作成に失敗しました。", {
        context: { group_id: c.req.param("groupId") ?? null, body: c.req.valid("json") },
      });
      return c.json({ status: 500, message: "Internal Server Error" }, 500);
    }
  })
  .post("/:groupId/beatings/:beatingId/likes", async (c) => {
    try {
      const requesterId = c.var.requesterId;
      const { groupId, beatingId } = c.req.param();
      const parsedBeatingId = Number(beatingId);
      if (Number.isNaN(parsedBeatingId)) {
        const body = unprocessableEntitySchema.parse({
          status: 422,
          errors: [{ field: "beating_id", message: "beating_id は数値で指定してください" }],
        });
        return c.json(body, 422);
      }
      return await createChoreBeatingLikeController(c, requesterId, groupId, parsedBeatingId);
    } catch (err) {
      await log.error(c, err, "家事実行へのいいねに失敗しました。", {
        context: {
          group_id: c.req.param("groupId") ?? null,
          beating_id: c.req.param("beatingId") ?? null,
        },
      });
      return c.json({ status: 500, message: "Internal Server Error" }, 500);
    }
  })
  .post(
    "/:groupId/beatings/:beatingId/messages",
    validateJson(createChoreBeatingMessageRequestSchema),
    async (c) => {
      try {
        const requesterId = c.var.requesterId;
        const { groupId, beatingId } = c.req.param();
        const parsedBeatingId = Number(beatingId);
        if (Number.isNaN(parsedBeatingId)) {
          const body = unprocessableEntitySchema.parse({
            status: 422,
            errors: [{ field: "beating_id", message: "beating_id は数値で指定してください" }],
          });
          return c.json(body, 422);
        }
        const { main_message, description_message } = c.req.valid("json");
        return await createChoreBeatingMessageController(
          c,
          requesterId,
          groupId,
          parsedBeatingId,
          main_message,
          description_message ?? null,
        );
      } catch (err) {
        await log.error(c, err, "家事実行メッセージの作成に失敗しました。", {
          context: {
            group_id: c.req.param("groupId") ?? null,
            beating_id: c.req.param("beatingId") ?? null,
            body: c.req.valid("json"),
          },
        });
        return c.json({ status: 500, message: "Internal Server Error" }, 500);
      }
    },
  )
  .get("/:groupId/search/users", validateQuery(searchUsersRequestSchema), async (c) => {
    try {
      const { email } = c.req.valid("query");
      const { groupId } = c.req.param();
      return await searchUsersController(c, groupId, email);
    } catch (err) {
      await log.error(c, err, "ユーザー検索に失敗しました。", {
        context: { group_id: c.req.param("groupId") ?? null, query: c.req.valid("query") },
      });
      return c.json({ status: 500, message: "Internal Server Error" }, 500);
    }
  })
  .post("/:groupId/invitations", validateJson(inviteGroupRequestSchema), async (c) => {
    try {
      const requesterId = c.var.requesterId;
      const { groupId } = c.req.param();
      const { user_id } = c.req.valid("json");
      return await inviteGroupController(c, requesterId, groupId, user_id);
    } catch (err) {
      await log.error(c, err, "グループ招待の作成に失敗しました。", {
        context: { group_id: c.req.param("groupId") ?? null, body: c.req.valid("json") },
      });
      return c.json({ status: 500, message: "Internal Server Error" }, 500);
    }
  })
  .post("/:groupId/invitations/accept", async (c) => {
    try {
      const userId = c.var.requesterId;
      const { groupId } = c.req.param();
      return await acceptGroupInvitationController(c, userId, groupId);
    } catch (err) {
      await log.error(c, err, "グループ招待の承認に失敗しました。", {
        context: { group_id: c.req.param("groupId") ?? null },
      });
      return c.json({ status: 500, message: "Internal Server Error" }, 500);
    }
  })
  .post("/:groupId/invitations/deny", async (c) => {
    try {
      const userId = c.var.requesterId;
      const { groupId } = c.req.param();
      return await denyGroupInvitationController(c, userId, groupId);
    } catch (err) {
      await log.error(c, err, "グループ招待の拒否に失敗しました。", {
        context: { group_id: c.req.param("groupId") ?? null },
      });
      return c.json({ status: 500, message: "Internal Server Error" }, 500);
    }
  })
  .post("/", validateJson(createGroupRequestSchema), async (c) => {
    try {
      const { name } = c.req.valid("json");
      const requesterId = c.var.requesterId;
      return await createGroupController(c, requesterId, name);
    } catch (err) {
      await log.error(c, err, "グループ作成に失敗しました。", {
        context: { body: c.req.valid("json") },
      });
      return c.json({ status: 500, message: "Internal Server Error" }, 500);
    }
  });

export default app;
export type GroupsRoute = typeof app;
