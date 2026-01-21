import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";

import { getDb } from "../../src/db/client";
import * as schema from "../../src/db/schema";
import { ChoreBeatingsRepository } from "../../src/repositories/choreBeatings.repository";
import { createGroup, createGroupChore, createUser } from "../helpers/db";

type Database = NeonHttpDatabase<typeof schema>;

let db: Database;
let repository: ChoreBeatingsRepository;

const truncateTables = async () => {
  await db.execute(sql`TRUNCATE TABLE "chore_beatings" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "group_chores" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "groups" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "user" CASCADE`);
};

beforeAll(() => {
  db = getDb();
  repository = new ChoreBeatingsRepository(db);
});

beforeEach(async () => {
  await truncateTables();
});

describe("create", () => {
  it("家事討伐の記録を作成できること", async () => {
    await createUser({ id: "user-1", name: "User" });
    await createGroup({
      id: "group-1",
      name: "家族",
      ownerId: "user-1",
      image: null,
    });
    await createGroupChore({
      id: 1,
      groupId: "group-1",
      choreName: "食器洗い",
      iconCode: "dish-wash",
    });

    const beatedAt = new Date("2025-01-10T09:00:00Z");
    const createdAt = new Date("2025-01-10T09:01:00Z");
    const updatedAt = new Date("2025-01-10T09:02:00Z");

    await repository.create({
      groupId: "group-1",
      choreId: 1,
      userId: "user-1",
      likeCount: 3,
      beatedAt,
      createdAt,
      updatedAt,
    });

    const rows = await db.select().from(schema.choreBeatings);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      groupId: "group-1",
      choreId: 1,
      userId: "user-1",
      likeCount: 3,
    });
    expect(rows[0].beatedAt).toEqual(beatedAt);
    expect(rows[0].createdAt).toEqual(createdAt);
    expect(rows[0].updatedAt).toEqual(updatedAt);
  });
});
