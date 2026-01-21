import { Hono } from "hono";

import {
  acceptGroupInvitationController,
  createChoreBeatingController,
  createGroupController,
  denyGroupInvitationController,
  getGroupChoresController,
  getGroupUsersController,
  getGroupsController,
  inviteGroupController,
  searchUsersController,
} from "../controllers/groups.controller";
import { createChoreBeatingRequestSchema } from "./schemas/requests/createChoreBeatingRequest";
import { createGroupRequestSchema } from "./schemas/requests/createGroupRequest";
import { inviteGroupRequestSchema, searchUsersRequestSchema } from "./schemas/requests";
import { validateJson, validateQuery } from "./middlewares/validator";

const app = new Hono()
  .get("/", async (c) => {
    const requesterId = c.var.requesterId;
    return getGroupsController(c, requesterId);
  })
  .get("/:groupId/chores", async (c) => {
    const { groupId } = c.req.param();
    return getGroupChoresController(c, groupId);
  })
  .get("/:groupId/users", async (c) => {
    const requesterId = c.var.requesterId;
    const { groupId } = c.req.param();
    return getGroupUsersController(c, requesterId, groupId);
  })
  .post("/:groupId/beatings", validateJson(createChoreBeatingRequestSchema), async (c) => {
    const requesterId = c.var.requesterId;
    const { groupId } = c.req.param();
    const { chore_id, beated_at } = c.req.valid("json");
    return createChoreBeatingController(c, requesterId, groupId, chore_id, beated_at);
  })
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
