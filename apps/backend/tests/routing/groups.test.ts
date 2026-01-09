import { beforeEach, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import { testClient } from "hono/testing";

import "../helpers/mockAuth";
import app, { RoutingApp } from "../../src/routing/index";
import { getDb } from "../../src/db/client";
import * as schema from "../../src/db/schema";

const client = testClient<RoutingApp>(app);
const db = getDb();

beforeEach(async () => {
  await db.execute(sql`TRUNCATE TABLE "user_group_belongings" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "groups" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "user" CASCADE`);
  // mockAuth で userId を test-user に固定しているため、外部キー整合性のためにユーザーを挿入
  await db.insert(schema.users).values({ id: "test-user", name: "Test User" });
});

describe("POST /api/groups", () => {
  it("有効なリクエストで201が返り、グループが作成されオーナーの所属情報も作成される", async () => {
    const res = await client.api.groups.$post({
      json: { name: "家族グループ" },
    });

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ status: 201 });

    const rows = await db.select().from(schema.groups);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      name: "家族グループ",
      ownerId: "test-user",
      image: null,
    });
    // 所属情報も作成されていることを確認
    const belongings = await db.select().from(schema.userGroupBelongings);
    expect(belongings).toHaveLength(1);
    expect(belongings[0]).toMatchObject({
      groupId: rows[0].id,
      userId: "test-user",
    });
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

    await db.insert(schema.users).values([
      { id: "other-user", name: "Other User" },
      { id: "pending-user", name: "Pending User" },
    ]);

    await db.insert(schema.groups).values([
      {
        id: "group-1",
        name: "Group One",
        ownerId: "test-user",
        image: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "group-2",
        name: "Group Two",
        ownerId: "test-user",
        image: null,
        createdAt: new Date("2024-01-02T00:00:00Z"),
        updatedAt: new Date("2024-01-02T00:00:00Z"),
      },
    ]);

    await db.insert(schema.userGroupBelongings).values([
      { groupId: "group-1", userId: "test-user", acceptedAt: now },
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

    await db.insert(schema.groups).values({
      id: groupId,
      name: "Test Group",
      ownerId: "test-user",
      image: null,
      createdAt: now,
      updatedAt: now,
    });
    await db.insert(schema.users).values({ ...invitedUser, image: null });
    await db.insert(schema.userGroupBelongings).values({
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
          is_invited: true,
        },
      ],
    });
  });

  it("メール一致するが承諾済みの場合は is_invited=false", async () => {
    const groupId = "group-2";
    const member = {
      id: "user-2",
      name: "Accepted User",
      email: "accepted@example.com",
    };
    const now = new Date("2025-01-02T00:00:00Z");

    await db.insert(schema.groups).values({
      id: groupId,
      name: "Accepted Group",
      ownerId: "test-user",
      image: null,
      createdAt: now,
      updatedAt: now,
    });
    await db.insert(schema.users).values({ ...member, image: null });
    await db.insert(schema.userGroupBelongings).values({
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
          is_invited: false,
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
