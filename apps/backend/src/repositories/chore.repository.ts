import { and, asc, eq, isNull, sql } from "drizzle-orm";

import type { Database } from "../db/client";
import * as schema from "../db/schema";
import type { GroupChoreModel } from "../models/chore";
import type { GroupChoreIconCode } from "../constants/chores";
import { isGroupChoreIconCode } from "../constants/chores";

export class ChoreRepository {
  constructor(private readonly db: Database) {}

  async addGroupChoresFromMaster(groupId: string): Promise<void> {
    await this.db.execute(sql`
      INSERT INTO "group_chores" ("group_id", "chore_name", "icon_code")
      SELECT ${groupId}, "chore_name", "icon_code"
      FROM "master_chores"
    `);
  }

  async findByGroupId(groupId: string): Promise<GroupChoreModel[]> {
    const rows = await this.db
      .select({
        id: schema.groupChores.id,
        groupId: schema.groupChores.groupId,
        name: schema.groupChores.choreName,
        iconCode: schema.groupChores.iconCode,
        createdAt: schema.groupChores.createdAt,
        deletedAt: schema.groupChores.deletedAt,
      })
      .from(schema.groupChores)
      .where(and(eq(schema.groupChores.groupId, groupId), isNull(schema.groupChores.deletedAt)))
      .orderBy(asc(schema.groupChores.id));

    type Row = (typeof rows)[number];
    const isRowWithValidIconCode = (row: Row): row is Row & { iconCode: GroupChoreIconCode } =>
      isGroupChoreIconCode(row.iconCode);

    return rows.filter(isRowWithValidIconCode);
  }
}
