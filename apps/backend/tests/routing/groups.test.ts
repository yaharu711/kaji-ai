import { beforeEach, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import { testClient } from "hono/testing";

import { AUTH_USER } from "../helpers/mockAuth";
import app, { RoutingApp } from "../../src/routing/index";
import { getDb } from "../../src/db/client";
import * as schema from "../../src/db/schema";
import {
  createBelonging,
  createGroup,
  createGroupChore,
  createUser,
  createBelongings,
  createGroups,
  createMasterChores,
  createUsers,
  findBelongingsByGroupId,
} from "../helpers/db";

const client = testClient<RoutingApp>(app);
const db = getDb();

beforeEach(async () => {
  await db.execute(sql`TRUNCATE TABLE "group_chores" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "master_chores" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "user_group_belongings" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "groups" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "user" CASCADE`);
  // mockAuth のユーザーを外部キー整合性のために挿入
  await createUser({ id: AUTH_USER.id, name: AUTH_USER.name });
  await createMasterChores([
    { choreName: "食器洗い", iconCode: "dish-wash" },
    { choreName: "掃除", iconCode: "cleaning" },
  ]);
});

describe("POST /api/groups", () => {
  it("有効なリクエストで201が返り、グループが作成されオーナーの所属情報も作成される", async () => {
    const res = await client.api.groups.$post({
      json: { name: "家族グループ" },
    });

    expect(res.status).toBe(201);

    const rows = await db.select().from(schema.groups);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      name: "家族グループ",
      ownerId: AUTH_USER.id,
      image: null,
    });
    // 所属情報も作成されていることを確認
    const belongings = await findBelongingsByGroupId(rows[0].id);
    expect(belongings).toHaveLength(1);
    expect(belongings[0]).toMatchObject({
      groupId: rows[0].id,
      userId: AUTH_USER.id,
    });

    const groupChores = await db.select().from(schema.groupChores);
    expect(groupChores).toHaveLength(2);
    expect(groupChores).toEqual([
      expect.objectContaining({
        groupId: rows[0].id,
        choreName: "食器洗い",
        iconCode: "dish-wash",
      }),
      expect.objectContaining({
        groupId: rows[0].id,
        choreName: "掃除",
        iconCode: "cleaning",
      }),
    ]);
  });

  it("name が101文字であれば422を返す", async () => {
    const longName = "あ".repeat(101);
    const res = await client.api.groups.$post({
      json: { name: longName },
    });

    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({
      status: 422,
      errors: [
        {
          field: "name",
          message: expect.any(String),
        },
      ],
    });
  });

  it("name が100文字であれば201を返す", async () => {
    const longName = "あ".repeat(100);
    const res = await client.api.groups.$post({
      json: { name: longName },
    });

    expect(res.status).toBe(201);
  });
});

describe("GET /api/groups", () => {
  it("所属グループの一覧を返し、必要なプロパティが含まれる", async () => {
    const now = new Date("2024-01-01T00:00:00Z");

    await createUsers([
      { id: "other-user", name: "Other User" },
      { id: "pending-user", name: "Pending User" },
    ]);

    await createGroups([
      {
        id: "group-1",
        name: "Group One",
        ownerId: AUTH_USER.id,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "group-2",
        name: "Group Two",
        ownerId: AUTH_USER.id,
        createdAt: new Date("2024-01-02T00:00:00Z"),
        updatedAt: new Date("2024-01-02T00:00:00Z"),
      },
    ]);

    await createBelongings([
      { groupId: "group-1", userId: AUTH_USER.id, acceptedAt: now },
      { groupId: "group-1", userId: "other-user", acceptedAt: now },
      { groupId: "group-1", userId: "pending-user", acceptedAt: null },
    ]);

    const res = await client.api.groups.$get();

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      groups: [
        {
          id: "group-1",
          name: "Group One",
          image: null,
          member_count: 2,
          invited_count: 1,
          is_invited: false,
        },
      ],
    });
  });
});

describe("GET /api/groups/:groupId/search/users", () => {
  it("招待中のユーザーを email で検索し、is_invited=true で返す", async () => {
    const groupId = "group-1";
    const invitedUser = {
      id: "user-1",
      name: "Invited User",
      email: "invited@example.com",
    };
    const now = new Date("2025-01-01T00:00:00Z");

    await createGroup({
      id: groupId,
      name: "Test Group",
      ownerId: AUTH_USER.id,
      createdAt: now,
      updatedAt: now,
    });
    await createUser({ ...invitedUser, image: null });
    await createBelonging({
      groupId,
      userId: invitedUser.id,
      createdAt: now,
      acceptedAt: null,
    });

    const res = await client.api.groups[":groupId"].search.users.$get({
      param: { groupId },
      query: { email: invitedUser.email },
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      users: [
        {
          id: invitedUser.id,
          name: invitedUser.name,
          email: invitedUser.email,
          image_url: null,
          is_invited_or_belonging: true,
        },
      ],
    });
  });

  it("メール一致するが承諾済みの場合も is_invited=true で返す", async () => {
    const groupId = "group-2";
    const member = {
      id: "user-2",
      name: "Accepted User",
      email: "accepted@example.com",
    };
    const now = new Date("2025-01-02T00:00:00Z");

    await createGroup({
      id: groupId,
      name: "Accepted Group",
      ownerId: AUTH_USER.id,
      createdAt: now,
      updatedAt: now,
    });
    await createUser({ ...member, image: null });
    await createBelonging({
      groupId,
      userId: member.id,
      createdAt: now,
      acceptedAt: now,
    });

    const res = await client.api.groups[":groupId"].search.users.$get({
      param: { groupId },
      query: { email: member.email },
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      users: [
        {
          id: member.id,
          name: member.name,
          email: member.email,
          image_url: null,
          is_invited_or_belonging: true,
        },
      ],
    });
  });

  it("一致するユーザーがいなければ空配列を返す", async () => {
    const res = await client.api.groups[":groupId"].search.users.$get({
      param: { groupId: "group-x" },
      query: { email: "none@example.com" },
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ users: [] });
  });
});

describe("GET /api/groups/:groupId/chores", () => {
  it("deleted_at が null の家事一覧を返す", async () => {
    const groupId = "group-chores-1";
    const now = new Date("2025-01-01T00:00:00Z");

    await createGroup({
      id: groupId,
      name: "Chores Group",
      ownerId: AUTH_USER.id,
      createdAt: now,
      updatedAt: now,
    });

    await createGroupChore({
      groupId,
      choreName: "食器洗い",
      iconCode: "dish-wash",
    });
    await createGroupChore({
      groupId,
      choreName: "掃除",
      iconCode: "cleaning",
      deletedAt: new Date("2025-01-02T00:00:00Z"),
    });

    const res = await client.api.groups[":groupId"].chores.$get({
      param: { groupId },
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([
      {
        id: expect.any(Number),
        name: "食器洗い",
        icon_code: "dish-wash",
      },
    ]);
  });
});

describe("POST /api/groups/:groupId/invitations", () => {
  it("未所属のユーザーを招待すると201が返り、招待レコードが作成される", async () => {
    const groupId = "group-invite-1";
    const targetUserId = "invite-user-1";
    const now = new Date("2025-01-03T00:00:00Z");

    await createGroup({
      id: groupId,
      name: "Invite Group",
      ownerId: AUTH_USER.id,
      createdAt: now,
      updatedAt: now,
    });
    await createBelonging({
      groupId,
      userId: AUTH_USER.id,
      createdAt: now,
      acceptedAt: now,
    });
    await createUser({ id: targetUserId, name: "Invite User" });

    const res = await client.api.groups[":groupId"].invitations.$post({
      param: { groupId },
      json: { user_id: targetUserId },
    });

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ status: 201 });

    const belongings = await findBelongingsByGroupId(groupId);
    // リクエストしているユーザーと招待ユーザーの2件が存在すること
    expect(belongings).toHaveLength(2);

    const invitedBelongings = await findBelongingsByGroupId(groupId, targetUserId);
    expect(invitedBelongings).toHaveLength(1);
    expect(invitedBelongings[0]).toMatchObject({
      groupId,
      userId: targetUserId,
      acceptedAt: null,
    });
  });

  it("既に所属/招待済みのユーザーには422を返す", async () => {
    const groupId = "group-invite-2";
    const targetUserId = "invite-user-2";
    const now = new Date("2025-01-04T00:00:00Z");

    await createGroup({
      id: groupId,
      name: "Invite Group 2",
      ownerId: AUTH_USER.id,
      createdAt: now,
      updatedAt: now,
    });
    await createBelonging({
      groupId,
      userId: AUTH_USER.id,
      createdAt: now,
      acceptedAt: now,
    });
    await createUser({ id: targetUserId, name: "Invite User 2" });
    await createBelonging({
      groupId,
      userId: targetUserId,
      createdAt: now,
      acceptedAt: null,
    });

    const res = await client.api.groups[":groupId"].invitations.$post({
      param: { groupId },
      json: { user_id: targetUserId },
    });

    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({
      status: 422,
      errors: [
        {
          field: "user_id",
          message: expect.any(String),
        },
      ],
    });
  });

  it("リクエストユーザーがグループに所属していない場合は403を返す", async () => {
    const groupId = "group-invite-3";
    const ownerId = "owner-3";
    const targetUserId = "invite-user-3";
    const now = new Date("2025-01-05T00:00:00Z");

    await createUser({ id: ownerId, name: "Owner 3" });
    await createGroup({
      id: groupId,
      name: "Invite Group 3",
      ownerId,
      createdAt: now,
      updatedAt: now,
    });
    await createBelonging({
      groupId,
      userId: ownerId,
      createdAt: now,
      acceptedAt: now,
    });
    await createUser({ id: targetUserId, name: "Invite User 3" });

    const res = await client.api.groups[":groupId"].invitations.$post({
      param: { groupId },
      json: { user_id: targetUserId },
    });

    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({
      status: 403,
      message: expect.any(String),
    });
  });
});

describe("POST /api/groups/:groupId/invitations/accept", () => {
  it("招待中のユーザーが承諾すると204が返り、acceptedAtが更新される", async () => {
    const groupId = "group-accept-1";
    const ownerId = "owner-accept-1";
    const now = new Date("2025-01-06T00:00:00Z");

    await createUser({ id: ownerId, name: "Owner" });
    await createGroup({
      id: groupId,
      name: "Accept Group",
      ownerId,
      createdAt: now,
      updatedAt: now,
    });
    await createBelonging({
      groupId,
      userId: ownerId,
      createdAt: now,
      acceptedAt: now,
    });
    await createBelonging({
      groupId,
      userId: AUTH_USER.id,
      createdAt: now,
      acceptedAt: null, // 招待中
    });

    const res = await client.api.groups[":groupId"].invitations.accept.$post({
      param: { groupId },
    });

    expect(res.status).toBe(204);

    const belongings = await findBelongingsByGroupId(groupId);
    const authBelonging = belongings.find((belonging) => belonging.userId === AUTH_USER.id);
    expect(authBelonging).toBeTruthy();
    expect(authBelonging?.acceptedAt).not.toBeNull();
  });

  it("招待が存在しない場合は422を返す", async () => {
    const groupId = "group-accept-2";
    const ownerId = "owner-accept-2";
    const now = new Date("2025-01-06T00:00:00Z");

    await createUser({ id: ownerId, name: "Owner" });
    await createGroup({
      id: groupId,
      name: "Accept Group 2",
      ownerId,
      createdAt: now,
      updatedAt: now,
    });
    await createBelonging({
      groupId,
      userId: ownerId,
      createdAt: now,
      acceptedAt: now,
    });

    const res = await client.api.groups[":groupId"].invitations.accept.$post({
      param: { groupId },
    });

    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({
      status: 422,
      errors: [
        {
          field: "group_id",
          message: expect.any(String),
        },
      ],
    });
  });

  it("別ユーザー宛の招待は承諾できず422を返す", async () => {
    const groupId = "group-accept-3";
    const ownerId = "owner-accept-3";
    const invitedUserId = "invited-user-3";
    const now = new Date("2025-01-06T00:00:00Z");

    await createUsers([
      { id: ownerId, name: "Owner" },
      { id: invitedUserId, name: "Invited User" },
    ]);
    await createGroup({
      id: groupId,
      name: "Accept Group 3",
      ownerId,
      createdAt: now,
      updatedAt: now,
    });
    await createBelonging({
      groupId,
      userId: ownerId,
      createdAt: now,
      acceptedAt: now,
    });
    await createBelonging({
      groupId,
      userId: invitedUserId,
      createdAt: now,
      acceptedAt: null,
    });

    const res = await client.api.groups[":groupId"].invitations.accept.$post({
      param: { groupId },
    });

    expect(res.status).toBe(422);
  });
});

describe("POST /api/groups/:groupId/invitations/deny", () => {
  it("招待中のユーザーが拒否すると204が返り、招待レコードが削除される", async () => {
    const groupId = "group-deny-1";
    const ownerId = "owner-deny-1";
    const now = new Date("2025-01-07T00:00:00Z");

    await createUser({ id: ownerId, name: "Owner" });
    await createGroup({
      id: groupId,
      name: "Deny Group",
      ownerId,
      createdAt: now,
      updatedAt: now,
    });
    await createBelonging({
      groupId,
      userId: ownerId,
      createdAt: now,
      acceptedAt: now,
    });
    await createBelonging({
      groupId,
      userId: AUTH_USER.id,
      createdAt: now,
      acceptedAt: null,
    });

    const res = await client.api.groups[":groupId"].invitations.deny.$post({
      param: { groupId },
    });

    expect(res.status).toBe(204);

    const belongings = await findBelongingsByGroupId(groupId);
    const authBelonging = belongings.find((belonging) => belonging.userId === AUTH_USER.id);
    expect(authBelonging).toBeUndefined();
  });

  it("招待が存在しない場合は422を返す", async () => {
    const groupId = "group-deny-2";
    const ownerId = "owner-deny-2";
    const now = new Date("2025-01-07T00:00:00Z");

    await createUser({ id: ownerId, name: "Owner" });
    await createGroup({
      id: groupId,
      name: "Deny Group 2",
      ownerId,
      createdAt: now,
      updatedAt: now,
    });
    await createBelonging({
      groupId,
      userId: ownerId,
      createdAt: now,
      acceptedAt: now,
    });

    const res = await client.api.groups[":groupId"].invitations.deny.$post({
      param: { groupId },
    });

    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({
      status: 422,
      errors: [
        {
          field: "group_id",
          message: expect.any(String),
        },
      ],
    });
  });

  it("別ユーザー宛の招待は拒否できず422を返す", async () => {
    const groupId = "group-deny-3";
    const ownerId = "owner-deny-3";
    const invitedUserId = "invited-user-3";
    const now = new Date("2025-01-07T00:00:00Z");

    await createUsers([
      { id: ownerId, name: "Owner" },
      { id: invitedUserId, name: "Invited User" },
    ]);
    await createGroup({
      id: groupId,
      name: "Deny Group 3",
      ownerId,
      createdAt: now,
      updatedAt: now,
    });
    await createBelonging({
      groupId,
      userId: ownerId,
      createdAt: now,
      acceptedAt: now,
    });
    await createBelonging({
      groupId,
      userId: invitedUserId,
      createdAt: now,
      acceptedAt: null,
    });

    const res = await client.api.groups[":groupId"].invitations.deny.$post({
      param: { groupId },
    });

    expect(res.status).toBe(422);
  });
});
