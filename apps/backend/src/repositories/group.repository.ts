import { eq } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";

import type { GroupModel } from "../models/group";
import * as schema from "../db/schema";
import type { GroupRecord } from "../db/schema";

type Database = NeonHttpDatabase<typeof schema>;

export class GroupRepository {
  constructor(private readonly db: Database) {}

  /**
   * 副作用系は戻り値なしの方針に合わせて void を返す。
   */
  async create(group: GroupModel): Promise<void> {
    await this.db.insert(schema.groups).values({
      id: group.id,
      name: group.name,
      ownerId: group.ownerId,
      image: group.image,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    });
  }

  async findById(id: string): Promise<GroupModel | null> {
    const [row] = await this.db.select().from(schema.groups).where(eq(schema.groups.id, id));
    if (!row) return null;
    return GroupRepository.toDomain(row);
  }

  private static toDomain(row: GroupRecord): GroupModel {
    return {
      id: row.id,
      name: row.name,
      ownerId: row.ownerId,
      image: row.image ?? null,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }
}
