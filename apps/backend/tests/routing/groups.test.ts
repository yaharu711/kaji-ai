import { beforeEach, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import { testClient } from "hono/testing";

import "../helpers/mockAuth";
import app, { RoutingApp } from "../../src/routing/index";
import { getDb } from "../../src/db/client";
import * as schema from "../../src/db/schema";

describe("POST /api/groups", () => {
  const client = testClient<RoutingApp>(app);
  const db = getDb();

  beforeEach(async () => {
    await db.execute(sql`TRUNCATE TABLE "groups" CASCADE`);
    await db.execute(sql`TRUNCATE TABLE "user" CASCADE`);
    // mockAuth で userId を test-user に固定しているため、外部キー整合性のためにユーザーを挿入
    await db.insert(schema.users).values({ id: "test-user", name: "Test User" });
  });

  it("有効なリクエストで201が返り、レコードが作成される", async () => {
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
    expect(rows[0].createdAt).toBeInstanceOf(Date);
    expect(rows[0].updatedAt).toBeInstanceOf(Date);
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
});
