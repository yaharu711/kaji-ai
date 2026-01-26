import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";

import { getDb } from "../../src/db/client";
import * as schema from "../../src/db/schema";
import { ChoreBeatingLikesRepository } from "../../src/repositories/choreBeatingLikes.repository";
import { createChoreBeating, createGroup, createGroupChore, createUser } from "../helpers/db";

type Database = NeonHttpDatabase<typeof schema>;

let db: Database;
let repository: ChoreBeatingLikesRepository;

const truncateTables = async () => {
  await db.execute(sql`TRUNCATE TABLE "chore_beating_likes" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "chore_beatings" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "group_chores" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "groups" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "user" CASCADE`);
};

beforeAll(() => {
  db = getDb();
  repository = new ChoreBeatingLikesRepository(db);
});

beforeEach(async () => {
  await truncateTables();
});

describe("addLikeAndIncrementCount", () => {
  it("良いねを追加し like_count を +1 して updated_at を更新できること", async () => {
    await createUser({ id: "user-1", name: "User" });
    await createGroup({ id: "group-1", name: "家族", ownerId: "user-1", image: null });
    await createGroupChore({
      id: 1,
      groupId: "group-1",
      choreName: "食器洗い",
      iconCode: "dish-wash",
    });

    const initialUpdatedAt = new Date("2025-01-10T09:02:00Z");
    const beatingId = await createChoreBeating({
      groupId: "group-1",
      choreId: 1,
      userId: "user-1",
      likeCount: 2,
      beatedAt: new Date("2025-01-10T09:00:00Z"),
      createdAt: new Date("2025-01-10T09:01:00Z"),
      updatedAt: initialUpdatedAt,
    });

    const now = new Date("2025-01-10T10:00:00Z");
    await repository.addLikeAndIncrementCount("group-1", "user-1", beatingId, now, now);

    const [row] = await db.select().from(schema.choreBeatings);
    expect(row).toMatchObject({
      likeCount: 3,
      updatedAt: now,
    });

    const likes = await db.select().from(schema.choreBeatingLikes);
    expect(likes).toHaveLength(1);
    expect(likes[0]).toMatchObject({
      groupId: "group-1",
      userId: "user-1",
      beatingId,
    });
  });

  it("同じユーザーの重複良いねでも like_count が増えないこと", async () => {
    await createUser({ id: "user-1", name: "User" });
    await createGroup({ id: "group-1", name: "家族", ownerId: "user-1", image: null });
    await createGroupChore({
      id: 1,
      groupId: "group-1",
      choreName: "食器洗い",
      iconCode: "dish-wash",
    });

    const beatingId = await createChoreBeating({
      groupId: "group-1",
      choreId: 1,
      userId: "user-1",
      likeCount: 0,
      beatedAt: new Date("2025-01-10T09:00:00Z"),
      createdAt: new Date("2025-01-10T09:01:00Z"),
      updatedAt: new Date("2025-01-10T09:02:00Z"),
    });

    await repository.addLikeAndIncrementCount(
      "group-1",
      "user-1",
      beatingId,
      new Date("2025-01-10T10:00:00Z"),
      new Date("2025-01-10T10:00:00Z"),
    );
    await repository.addLikeAndIncrementCount(
      "group-1",
      "user-1",
      beatingId,
      new Date("2025-01-10T11:00:00Z"),
      new Date("2025-01-10T11:00:00Z"),
    );

    const [row] = await db.select().from(schema.choreBeatings);
    expect(row.likeCount).toBe(1);

    const likes = await db.select().from(schema.choreBeatingLikes);
    expect(likes).toHaveLength(1);
  });
});
