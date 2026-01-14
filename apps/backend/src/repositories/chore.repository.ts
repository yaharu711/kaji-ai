import { and, asc, eq, isNull, sql } from "drizzle-orm";

import type { Database } from "../db/client";
import * as schema from "../db/schema";

export class ChoreRepository {
  constructor(private readonly db: Database) {}

  async addGroupChoresFromMaster(groupId: string): Promise<void> {
    await this.db.execute(sql`
      INSERT INTO "group_chores" ("group_id", "chore_name", "icon_code")
      SELECT ${groupId}, "chore_name", "icon_code"
      FROM "master_chores"
    `);
  }

  async findByGroupId(groupId: string) {
    return this.db
      .select({
        id: schema.groupChores.id,
        name: schema.groupChores.choreName,
        iconCode: schema.groupChores.iconCode,
      })
      .from(schema.groupChores)
      .where(and(eq(schema.groupChores.groupId, groupId), isNull(schema.groupChores.deletedAt)))
      .orderBy(asc(schema.groupChores.id));
  }
}
