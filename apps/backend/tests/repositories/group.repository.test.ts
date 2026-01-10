import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";

import { getDb } from "../../src/db/client";
import * as schema from "../../src/db/schema";
import { GroupRepository } from "../../src/repositories/group.repository";
import {
  createBelonging,
  createBelongings,
  createGroup,
  createGroups,
  createUser,
  createUsers,
} from "../helpers/db";

type Database = NeonHttpDatabase<typeof schema>;

let db: Database;
let repository: GroupRepository;

const truncateTables = async () => {
  await db.execute(sql`TRUNCATE TABLE "user_group_belongings" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "groups" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "user" CASCADE`);
};

beforeAll(() => {
  db = getDb();
  repository = new GroupRepository(db);
});

beforeEach(async () => {
  await truncateTables();
});

describe("create", () => {
  it("グループを作成できること", async () => {
    const ownerId = "owner-1";
    await createUser({ id: ownerId, name: "Owner" });

    const fixedDate = new Date("2024-12-31T12:34:56Z");

    await repository.create({
      id: "group-1",
      name: "家族",
      ownerId,
      image: null,
      createdAt: fixedDate,
      updatedAt: fixedDate,
    });

    const groups = await db.select().from(schema.groups);
    expect(groups).toHaveLength(1);
    expect(groups[0]).toMatchObject({
      name: "家族",
      ownerId,
      image: null,
    });
    expect(groups[0].createdAt).toEqual(fixedDate);
    expect(groups[0].updatedAt).toEqual(fixedDate);
  });

  it("画像URLを指定して作成できること", async () => {
    const ownerId = "owner-2";
    await createUser({ id: ownerId, name: "Owner" });

    const fixedDate = new Date("2025-01-01T00:00:00Z");

    await repository.create({
      id: "group-2",
      name: "友人",
      ownerId,
      image: "https://example.com/image.png",
      createdAt: fixedDate,
      updatedAt: fixedDate,
    });

    const groups = await db.select().from(schema.groups);
    expect(groups[0].image).toBe("https://example.com/image.png");
    expect(groups[0].createdAt).toEqual(fixedDate);
    expect(groups[0].updatedAt).toEqual(fixedDate);
  });
});

describe("addBelonging", () => {
  const ownerId = "owner-1";
  const groupId = "group-1";

  beforeEach(async () => {
    await createUser({ id: ownerId, name: "Owner" });
    const fixedDate = new Date("2024-12-31T00:00:00Z");

    await createGroup({
      id: groupId,
      name: "Test Group",
      ownerId,
      image: null,
      createdAt: fixedDate,
      updatedAt: fixedDate,
    });
  });

  it("ユーザー（所有者）とグループの紐付けを作成できること", async () => {
    const createdAt = new Date("2025-01-01T00:00:00Z");

    await repository.addBelonging({
      groupId,
      userId: ownerId,
      createdAt,
      acceptedAt: createdAt,
    });

    const belongings = await db.select().from(schema.userGroupBelongings);
    expect(belongings).toHaveLength(1);
    expect(belongings[0]).toMatchObject({
      groupId,
      userId: ownerId,
      createdAt,
      acceptedAt: createdAt,
    });
    expect(belongings[0].createdAt).toEqual(createdAt);
  });
});

describe("findAllWithMemberCount", () => {
  it("承諾済みのみをカウントし、作成日時昇順で返す", async () => {
    // グループのオーナーを作成
    await createUser({ id: "owner-1", name: "Owner" });
    const date1 = new Date("2024-01-01T00:00:00Z");
    const date2 = new Date("2024-01-02T00:00:00Z");

    // メンバーを作成
    await createUsers([
      { id: "member-1", name: "Member 1" },
      { id: "member-2", name: "Member 2" },
      { id: "pending", name: "Pending" },
    ]);

    // グループ作成
    await createGroups([
      {
        id: "group-1",
        name: "Group1",
        ownerId: "owner-1",
        image: null,
        createdAt: date1,
        updatedAt: date1,
      },
      {
        id: "group-2",
        name: "Group2",
        ownerId: "owner-1",
        image: "img",
        createdAt: date2,
        updatedAt: date2,
      },
    ]);

    // メンバーシップを作成、一部承諾済み、一部未承諾
    await createBelongings([
      { groupId: "group-1", userId: "owner-1", acceptedAt: date1 },
      { groupId: "group-1", userId: "member-1", acceptedAt: date1 },
      { groupId: "group-1", userId: "pending", acceptedAt: null },
      { groupId: "group-2", userId: "member-2", acceptedAt: null },
    ]);

    const result = await repository.findAllWithMemberCount("owner-1");

    expect(result).toEqual([
      {
        id: "group-1",
        name: "Group1",
        image: null,
        memberCount: 2,
        invitedCount: 1,
        isInvited: false,
      },
    ]);
  });

  it("ユーザーが所属する複数グループをすべて返す", async () => {
    await createUsers([
      { id: "owner-1", name: "Owner" },
      { id: "member-1", name: "Member 1" },
    ]);

    const date1 = new Date("2024-01-01T00:00:00Z");
    const date2 = new Date("2024-01-02T00:00:00Z");

    await createGroups([
      {
        id: "group-a",
        name: "GroupA",
        ownerId: "owner-1",
        image: null,
        createdAt: date1,
        updatedAt: date1,
      },
      {
        id: "group-b",
        name: "GroupB",
        ownerId: "owner-1",
        image: null,
        createdAt: date2,
        updatedAt: date2,
      },
    ]);

    await createBelongings([
      { groupId: "group-a", userId: "owner-1", acceptedAt: date1 },
      { groupId: "group-a", userId: "member-1", acceptedAt: date1 },
      { groupId: "group-b", userId: "owner-1", acceptedAt: date2 },
    ]);

    const result = await repository.findAllWithMemberCount("owner-1");

    expect(result).toEqual([
      {
        id: "group-a",
        name: "GroupA",
        image: null,
        memberCount: 2,
        invitedCount: 0,
        isInvited: false,
      },
      {
        id: "group-b",
        name: "GroupB",
        image: null,
        memberCount: 1,
        invitedCount: 0,
        isInvited: false,
      },
    ]);
  });
  it("自分が招待中であるグループの時、isInvitedがtrueになっていること", async () => {
    // グループのオーナーを作成
    await createUser({ id: "owner-1", name: "Owner" });
    const date1 = new Date("2024-01-01T00:00:00Z");
    const date2 = new Date("2024-01-02T00:00:00Z");

    // メンバーを作成
    await createUsers([
      { id: "member-1", name: "Member 1" },
      { id: "member-2", name: "Member 2" },
      { id: "pending", name: "Pending" },
    ]);

    // グループ作成
    await createGroups([
      {
        id: "group-1",
        name: "Group1",
        ownerId: "owner-1",
        image: null,
        createdAt: date1,
        updatedAt: date1,
      },
      {
        id: "group-2",
        name: "Group2",
        ownerId: "owner-1",
        image: "img",
        createdAt: date2,
        updatedAt: date2,
      },
    ]);

    // メンバーシップを作成、一部承諾済み、一部未承諾
    await createBelongings([
      { groupId: "group-1", userId: "owner-1", acceptedAt: date1 },
      { groupId: "group-1", userId: "member-1", acceptedAt: date1 },
      { groupId: "group-1", userId: "pending", acceptedAt: null },
      { groupId: "group-2", userId: "member-2", acceptedAt: null },
    ]);

    const result = await repository.findAllWithMemberCount("pending");

    expect(result).toEqual([
      {
        id: "group-1",
        name: "Group1",
        image: null,
        memberCount: 2,
        invitedCount: 1,
        isInvited: true,
      },
    ]);
  });
});

describe("findUsersByGroupId", () => {
  it("招待中を含む所属ユーザーを作成日時昇順で返す", async () => {
    const groupId = "group-1";
    const ownerId = "owner-1";
    const memberId = "member-1";
    const pendingId = "pending-1";

    // ユーザーとグループ作成
    await createUsers([
      { id: ownerId, name: "Owner" },
      { id: memberId, name: "Member One", email: "member1@example.com" },
      { id: pendingId, name: "Pending User", email: "pending@example.com" },
    ]);

    const createdAt = new Date("2025-01-01T00:00:00Z");
    await createGroup({
      id: groupId,
      name: "Test Group",
      ownerId,
      image: null,
      createdAt,
      updatedAt: createdAt,
    });

    const belongingCreated1 = new Date("2025-01-02T00:00:00Z");
    const belongingCreated2 = new Date("2025-01-03T00:00:00Z");
    const belongingCreated3 = new Date("2025-01-04T00:00:00Z");

    // 所属レコード（acceptedAt の有無を混在させる）
    await createBelongings([
      {
        groupId,
        userId: ownerId,
        createdAt: belongingCreated1,
        acceptedAt: belongingCreated1,
      },
      {
        groupId,
        userId: pendingId,
        createdAt: belongingCreated2,
        acceptedAt: null,
      },
      {
        groupId,
        userId: memberId,
        createdAt: belongingCreated3,
        acceptedAt: belongingCreated3,
      },
    ]);

    const result = await repository.findUsersByGroupId(groupId);

    expect(result).toEqual([
      {
        id: ownerId,
        name: "Owner",
        email: null,
        image: null,
        acceptedAt: belongingCreated1,
      },
      {
        id: pendingId,
        name: "Pending User",
        email: "pending@example.com",
        image: null,
        acceptedAt: null,
      },
      {
        id: memberId,
        name: "Member One",
        email: "member1@example.com",
        image: null,
        acceptedAt: belongingCreated3,
      },
    ]);
  });
});
