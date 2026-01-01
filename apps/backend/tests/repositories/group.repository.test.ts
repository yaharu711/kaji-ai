import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";

import { getDb } from "../../src/db/client";
import * as schema from "../../src/db/schema";
import { GroupRepository } from "../../src/repositories/group.repository";

type Database = NeonHttpDatabase<typeof schema>;

describe("GroupRepository", () => {
  let db: Database;
  let repository: GroupRepository;

  const truncateTables = async () => {
    await db.execute(sql`TRUNCATE TABLE "groups" CASCADE`);
    await db.execute(sql`TRUNCATE TABLE "user" CASCADE`);
  };

  const insertOwner = async (id: string) => {
    await db.insert(schema.users).values({ id, name: "Owner" });
  };

  beforeAll(() => {
    db = getDb();
    repository = new GroupRepository(db);
  });

  beforeEach(async () => {
    await truncateTables();
  });

  it("グループを作成できること", async () => {
    const ownerId = "owner-1";
    await insertOwner(ownerId);

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
    await insertOwner(ownerId);

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
