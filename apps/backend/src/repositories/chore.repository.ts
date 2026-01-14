import { sql } from "drizzle-orm";

import type { Database } from "../db/client";

export class ChoreRepository {
  constructor(private readonly db: Database) {}

  async addGroupChoresFromMaster(groupId: string): Promise<void> {
    await this.db.execute(sql`
      INSERT INTO "group_chores" ("group_id", "chore_name", "icon_code")
      SELECT ${groupId}, "chore_name", "icon_code"
      FROM "master_chores"
    `);
  }
}
