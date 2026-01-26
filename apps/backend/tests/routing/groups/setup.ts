import { beforeEach } from "vitest";
import { sql } from "drizzle-orm";
import { testClient } from "hono/testing";

import { AUTH_USER } from "../../helpers/mockAuth";
import app, { RoutingApp } from "../../../src/routing/index";
import { getDb } from "../../../src/db/client";
import { createMasterChores, createUser } from "../../helpers/db";

export const client = testClient<RoutingApp>(app);
export const db = getDb();

export const setupGroupsRoutingTest = () => {
  beforeEach(async () => {
    await db.execute(sql`TRUNCATE TABLE "chore_beating_thank_messages" CASCADE`);
    await db.execute(sql`TRUNCATE TABLE "chore_beating_likes" CASCADE`);
    await db.execute(sql`TRUNCATE TABLE "chore_beatings" CASCADE`);
    await db.execute(sql`TRUNCATE TABLE "group_chores" CASCADE`);
    await db.execute(sql`TRUNCATE TABLE "master_chores" CASCADE`);
    await db.execute(sql`TRUNCATE TABLE "user_group_belongings" CASCADE`);
    await db.execute(sql`TRUNCATE TABLE "groups" CASCADE`);
    await db.execute(sql`TRUNCATE TABLE "user" CASCADE`);
    // mockAuth のユーザーを外部キー整合性のために挿入
    await createUser({ id: AUTH_USER.id, name: AUTH_USER.name });
    await createMasterChores([
      { choreName: "食器洗い", iconCode: "dish-wash" },
      { choreName: "掃除", iconCode: "cleaning" },
    ]);
  });
};
