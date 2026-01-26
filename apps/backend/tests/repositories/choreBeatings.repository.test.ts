import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";

import { getDb } from "../../src/db/client";
import * as schema from "../../src/db/schema";
import { ChoreBeatingsRepository } from "../../src/repositories/choreBeatings.repository";
import {
  createChoreBeating,
  createChoreBeatingThankMessage,
  createGroup,
  createGroupChore,
  createUser,
} from "../helpers/db";

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

describe("findTimelineByGroupIdAndUtcRange", () => {
  const setupGroupFixtures = async () => {
    await createUser({ id: "user-1", name: "Beater", image: "beater.png" });
    await createUser({ id: "user-2", name: "Sender", image: "sender.png" });
    await createUser({ id: "user-3", name: "Other", image: "other.png" });
    await createGroup({ id: "group-1", name: "家族", ownerId: "user-1", image: null });
    await createGroup({ id: "group-2", name: "別グループ", ownerId: "user-3", image: null });
    await createGroupChore({
      id: 1,
      groupId: "group-1",
      choreName: "食器洗い",
      iconCode: "dish-wash",
    });
    await createGroupChore({ id: 2, groupId: "group-1", choreName: "掃除", iconCode: "clean" });
    await createGroupChore({ id: 3, groupId: "group-2", choreName: "洗濯", iconCode: "laundry" });
  };

  it("UTC範囲とグループで絞り込み、JSTの時間単位でグルーピングしてタイムライン情報を取得できること", async () => {
    await setupGroupFixtures();

    const beating1Id = await createChoreBeating({
      groupId: "group-1",
      choreId: 1,
      userId: "user-1",
      likeCount: 2,
      beatedAt: new Date("2025-01-10T01:15:00Z"),
      createdAt: new Date("2025-01-10T01:16:00Z"),
      updatedAt: new Date("2025-01-10T01:17:00Z"),
    });

    const beating2Id = await createChoreBeating({
      groupId: "group-1",
      choreId: 2,
      userId: "user-1",
      likeCount: 0,
      beatedAt: new Date("2025-01-10T01:45:00Z"),
      createdAt: new Date("2025-01-10T01:46:00Z"),
      updatedAt: new Date("2025-01-10T01:47:00Z"),
    });

    const beating3Id = await createChoreBeating({
      groupId: "group-1",
      choreId: 1,
      userId: "user-1",
      likeCount: 1,
      beatedAt: new Date("2025-01-10T02:05:00Z"),
      createdAt: new Date("2025-01-10T02:06:00Z"),
      updatedAt: new Date("2025-01-10T02:07:00Z"),
    });

    await createChoreBeatingThankMessage({
      groupId: "group-1",
      userId: "user-2",
      beatingId: beating1Id,
      mainMessage: "ありがとう",
      descriptionMessage: "助かりました",
      createdAt: new Date("2025-01-10T02:00:00Z"),
    });
    await createChoreBeatingThankMessage({
      groupId: "group-1",
      userId: "user-1",
      beatingId: beating1Id,
      mainMessage: "おつかれ！",
      descriptionMessage: null,
      createdAt: new Date("2025-01-10T02:01:00Z"),
    });
    await createChoreBeatingThankMessage({
      groupId: "group-1",
      userId: "user-2",
      beatingId: beating3Id,
      mainMessage: "次もよろしく",
      descriptionMessage: null,
      createdAt: new Date("2025-01-10T02:10:00Z"),
    });

    const result = await repository.findTimelineByGroupIdAndUtcRange("group-1", {
      startUtc: new Date("2025-01-09T15:00:00Z"),
      endUtc: new Date("2025-01-10T15:00:00Z"),
    });

    // 範囲内の時刻と討伐が取得できていることを確認
    expect(result).toHaveLength(2);
    expect(result[0].hour).toBe("10:00");
    expect(result[1].hour).toBe("11:00");

    // beatedAtの昇順となっていることも確認している
    const tenItems = result[0].items;
    expect(tenItems).toHaveLength(2);
    const tenIds = tenItems.map((item) => item.beatingId);
    expect(tenIds).toEqual([beating1Id, beating2Id]);

    const itemWithMessages = tenItems.find((item) => item.beatingId === beating1Id);
    if (!itemWithMessages) throw new Error("Missing beating1");
    expect(itemWithMessages.choreName).toBe("食器洗い");
    expect(itemWithMessages.thanksCount).toBe(2);
    expect(itemWithMessages.messages).toHaveLength(2);
    expect(itemWithMessages.messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: "user-2",
          userName: "Sender",
          imgUrl: "sender.png",
          mainMessage: "ありがとう",
          descriptionMessage: "助かりました",
        }),
        expect.objectContaining({
          userId: "user-1",
          userName: "Beater",
          imgUrl: "beater.png",
          mainMessage: "おつかれ！",
          descriptionMessage: null,
        }),
      ]),
    );

    const itemWithoutMessages = tenItems.find((item) => item.beatingId === beating2Id);
    if (!itemWithoutMessages) throw new Error("Missing beating2");
    expect(itemWithoutMessages.messages).toEqual([]);

    const elevenItems = result[1].items;
    expect(elevenItems).toHaveLength(1);
    expect(elevenItems[0].beatingId).toBe(beating3Id);
    expect(elevenItems[0].messages).toHaveLength(1);
  });

  it("日付の範囲外の討伐が含まれないこと", async () => {
    await setupGroupFixtures();

    const inRangeId = await createChoreBeating({
      groupId: "group-1",
      choreId: 1,
      userId: "user-1",
      likeCount: 1,
      beatedAt: new Date("2025-01-10T01:15:00Z"),
      createdAt: new Date("2025-01-10T01:16:00Z"),
      updatedAt: new Date("2025-01-10T01:17:00Z"),
    });

    const outOfRangeId = await createChoreBeating({
      groupId: "group-1",
      choreId: 1,
      userId: "user-1",
      likeCount: 9,
      beatedAt: new Date("2025-01-10T15:00:00Z"),
      createdAt: new Date("2025-01-10T15:01:00Z"),
      updatedAt: new Date("2025-01-10T15:02:00Z"),
    });

    const result = await repository.findTimelineByGroupIdAndUtcRange("group-1", {
      startUtc: new Date("2025-01-09T15:00:00Z"),
      endUtc: new Date("2025-01-10T15:00:00Z"),
    });

    const allIds = result.flatMap((group) => group.items.map((item) => item.beatingId));
    expect(allIds).toContain(inRangeId);
    expect(allIds).not.toContain(outOfRangeId);
  });

  it("別グループの討伐が含まれないこと", async () => {
    await setupGroupFixtures();

    const inRangeId = await createChoreBeating({
      groupId: "group-1",
      choreId: 1,
      userId: "user-1",
      likeCount: 1,
      beatedAt: new Date("2025-01-10T01:15:00Z"),
      createdAt: new Date("2025-01-10T01:16:00Z"),
      updatedAt: new Date("2025-01-10T01:17:00Z"),
    });

    const otherGroupId = await createChoreBeating({
      groupId: "group-2",
      choreId: 3,
      userId: "user-3",
      likeCount: 5,
      beatedAt: new Date("2025-01-10T01:30:00Z"),
      createdAt: new Date("2025-01-10T01:31:00Z"),
      updatedAt: new Date("2025-01-10T01:32:00Z"),
    });

    const result = await repository.findTimelineByGroupIdAndUtcRange("group-1", {
      startUtc: new Date("2025-01-09T15:00:00Z"),
      endUtc: new Date("2025-01-10T15:00:00Z"),
    });

    const allIds = result.flatMap((group) => group.items.map((item) => item.beatingId));
    expect(allIds).toContain(inRangeId);
    expect(allIds).not.toContain(otherGroupId);
  });
});

describe("addLikeAndIncrementCount", () => {
  it("良いねを追加し like_count を +1 して updated_at を更新できること", async () => {
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
