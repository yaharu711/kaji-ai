import { alias } from "drizzle-orm/pg-core";
import { and, asc, count, eq, isNotNull } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";

import type { GroupModel } from "../models/group";
import type { GroupWithMemberCountDto } from "../dtos/group";
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

  async findAllWithMemberCount(userId: string): Promise<GroupWithMemberCountDto[]> {
    const countedBelongings = alias(schema.userGroupBelongings, "counted_belongings");

    const rows = await this.db
      .select({
        id: schema.groups.id,
        name: schema.groups.name,
        image: schema.groups.image,
        memberCount: count(countedBelongings.userId),
      })
      .from(schema.groups)
      // ユーザーが所属(承諾済み)しているグループに絞り込み
      .innerJoin(
        schema.userGroupBelongings,
        and(
          eq(schema.userGroupBelongings.groupId, schema.groups.id),
          eq(schema.userGroupBelongings.userId, userId),
          isNotNull(schema.userGroupBelongings.acceptedAt),
        ),
      )
      // メンバー数をカウントするために acceptedAt が null でないものだけを対象
      .leftJoin(
        countedBelongings,
        and(
          eq(countedBelongings.groupId, schema.groups.id),
          isNotNull(countedBelongings.acceptedAt),
        ),
      )
      .groupBy(schema.groups.id, schema.groups.name, schema.groups.image)
      .orderBy(asc(schema.groups.createdAt));

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      image: row.image ?? null,
      memberCount: Number(row.memberCount),
    }));
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
