import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";

import { getDb } from "../../src/db/client";
import * as schema from "../../src/db/schema";
import { ChoreBeatingThankMessagesRepository } from "../../src/repositories/choreBeatingThankMessages.repository";
import { createChoreBeating, createGroup, createGroupChore, createUser } from "../helpers/db";

type Database = NeonHttpDatabase<typeof schema>;

let db: Database;
let repository: ChoreBeatingThankMessagesRepository;

const truncateTables = async () => {
  await db.execute(sql`TRUNCATE TABLE "chore_beating_thank_messages" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "chore_beatings" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "group_chores" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "groups" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "user" CASCADE`);
};

beforeAll(() => {
  db = getDb();
  repository = new ChoreBeatingThankMessagesRepository(db);
});

beforeEach(async () => {
  await truncateTables();
});

describe("create", () => {
  it("感謝メッセージを追加できること", async () => {
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

    const createdAt = new Date("2025-01-10T10:00:00Z");
    await repository.create({
      groupId: "group-1",
      userId: "user-1",
      beatingId,
      mainMessage: "ありがとう！",
      descriptionMessage: "助かったよ",
      createdAt,
    });

    const messages = await db.select().from(schema.choreBeatingThankMessages);
    expect(messages).toHaveLength(1);
    expect(messages[0]).toMatchObject({
      groupId: "group-1",
      userId: "user-1",
      beatingId,
      mainMessage: "ありがとう！",
      descriptionMessage: "助かったよ",
      createdAt,
    });
  });
});
