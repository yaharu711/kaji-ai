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
    const testResponse = await sentryTest(c);
    if (testResponse) return testResponse;
    const requesterId = c.var.requesterId;
    return getGroupsController(c, requesterId);
  })
  .get("/:groupId/chores", async (c) => {
    const testResponse = await sentryTest(c);
    if (testResponse) return testResponse;
    const { groupId } = c.req.param();
    return getGroupChoresController(c, groupId);
  })
  .get("/:groupId/users", async (c) => {
    const requesterId = c.var.requesterId;
    const { groupId } = c.req.param();
    return getGroupUsersController(c, requesterId, groupId);
  })
  .get("/:groupId/beatings", validateQuery(getGroupBeatingsRequestSchema), async (c) => {
    const requesterId = c.var.requesterId;
    const { groupId } = c.req.param();
    const { date } = c.req.valid("query");
    return getGroupBeatingsController(c, requesterId, groupId, date);
  })
  .post("/:groupId/beatings", validateJson(createChoreBeatingRequestSchema), async (c) => {
    const testResponse = await sentryTest(c);
    if (testResponse) return testResponse;
    const requesterId = c.var.requesterId;
    const { groupId } = c.req.param();
    const { chore_id, beated_at } = c.req.valid("json");
    return createChoreBeatingController(c, requesterId, groupId, chore_id, new Date(beated_at));
  })
  .post("/:groupId/beatings/:beatingId/likes", async (c) => {
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
    return createChoreBeatingLikeController(c, requesterId, groupId, parsedBeatingId);
  })
  .post(
    "/:groupId/beatings/:beatingId/messages",
    validateJson(createChoreBeatingMessageRequestSchema),
    async (c) => {
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
      return createChoreBeatingMessageController(
        c,
        requesterId,
        groupId,
        parsedBeatingId,
        main_message,
        description_message ?? null,
      );
    },
  )
  .get("/:groupId/search/users", validateQuery(searchUsersRequestSchema), async (c) => {
    const { email } = c.req.valid("query");
    const { groupId } = c.req.param();
    return searchUsersController(c, groupId, email);
  })
  .post("/:groupId/invitations", validateJson(inviteGroupRequestSchema), async (c) => {
    const requesterId = c.var.requesterId;
    const { groupId } = c.req.param();
    const { user_id } = c.req.valid("json");
    return inviteGroupController(c, requesterId, groupId, user_id);
  })
  .post("/:groupId/invitations/accept", async (c) => {
    const userId = c.var.requesterId;
    const { groupId } = c.req.param();
    return acceptGroupInvitationController(c, userId, groupId);
  })
  .post("/:groupId/invitations/deny", async (c) => {
    const userId = c.var.requesterId;
    const { groupId } = c.req.param();
    return denyGroupInvitationController(c, userId, groupId);
  })
  .post("/", validateJson(createGroupRequestSchema), async (c) => {
    const { name } = c.req.valid("json");
    const requesterId = c.var.requesterId;
    return createGroupController(c, requesterId, name);
  });

export default app;
export type GroupsRoute = typeof app;
