import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";

import { getDb } from "../../src/db/client";
import * as schema from "../../src/db/schema";
import { UserRepository } from "../../src/repositories/user.repository";
import { createUser, createUsers } from "../helpers/db";

type Database = NeonHttpDatabase<typeof schema>;

let db: Database;
let repository: UserRepository;

const truncateTables = async () => {
  await db.execute(sql`TRUNCATE TABLE "user" CASCADE`);
};

beforeAll(() => {
  db = getDb();
  repository = new UserRepository(db);
});

beforeEach(async () => {
  await truncateTables();
});

describe("findByEmail", () => {
  it("メールアドレスでユーザーを取得できること", async () => {
    await createUsers([
      { id: "user-1", name: "Alice", email: "alice@example.com" },
      { id: "user-2", name: "Bob", email: "bob@example.com" },
    ]);

    const expectedUser = {
      id: "user-2",
      name: "Bob",
      email: "bob@example.com",
    };

    const result = await repository.findByEmail(expectedUser.email);

    expect(result).toMatchObject(expectedUser);
  });

  it("存在しないメールアドレスの場合は null を返すこと", async () => {
    await createUser({ id: "user-1", name: "Alice", email: "alice@example.com" });

    const result = await repository.findByEmail("notfound@example.com");

    expect(result).toBeNull();
  });
});
