import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";

import { getDb } from "../../src/db/client";
import * as schema from "../../src/db/schema";
import { ChoreRepository } from "../../src/repositories/chore.repository";
import { createGroup, createGroupChore, createMasterChores, createUser } from "../helpers/db";

type Database = NeonHttpDatabase<typeof schema>;

let db: Database;
let repository: ChoreRepository;

const truncateTables = async () => {
  await db.execute(sql`TRUNCATE TABLE "group_chores" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "master_chores" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "groups" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "user" CASCADE`);
};

beforeAll(() => {
  db = getDb();
  repository = new ChoreRepository(db);
});

beforeEach(async () => {
  await truncateTables();
});

describe("addGroupChoresFromMaster", () => {
  it("master_chores の内容を group_chores に複製できること", async () => {
    await createUser({ id: "owner-1", name: "Owner" });
    await createGroup({
      id: "group-1",
      name: "家族",
      ownerId: "owner-1",
      image: null,
    });

    await createMasterChores([
      { choreName: "食器洗い", iconCode: "dish-wash" },
      { choreName: "掃除", iconCode: "cleaning" },
    ]);

    await repository.addGroupChoresFromMaster("group-1");

    const rows = await db
      .select({
        groupId: schema.groupChores.groupId,
        choreName: schema.groupChores.choreName,
        iconCode: schema.groupChores.iconCode,
      })
      .from(schema.groupChores)
      .orderBy(schema.groupChores.id);

    expect(rows).toEqual([
      { groupId: "group-1", choreName: "食器洗い", iconCode: "dish-wash" },
      { groupId: "group-1", choreName: "掃除", iconCode: "cleaning" },
    ]);
  });
});

describe("findByGroupId", () => {
  it("deleted_at が null の家事のみを返すこと", async () => {
    await createUser({ id: "owner-1", name: "Owner" });
    await createGroup({
      id: "group-1",
      name: "家族",
      ownerId: "owner-1",
      image: null,
    });

    await createGroupChore({
      groupId: "group-1",
      choreName: "食器洗い",
      iconCode: "dish-wash",
    });
    await createGroupChore({
      groupId: "group-1",
      choreName: "掃除",
      iconCode: "cleaning",
      deletedAt: new Date("2025-01-01T00:00:00Z"),
    });

    const result = await repository.findByGroupId("group-1");

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ name: "食器洗い", iconCode: "dish-wash" });
  });
});
