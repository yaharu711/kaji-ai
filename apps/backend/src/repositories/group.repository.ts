import { alias } from "drizzle-orm/pg-core";
import { and, asc, eq, sql } from "drizzle-orm";

import type { GroupModel } from "../models/group";
import type { BelongingDto, GroupUserDto, GroupWithMemberCountDto } from "../dtos/group";
import * as schema from "../db/schema";
import type { GroupRecord } from "../db/schema";
import type { Database } from "../db/client";

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

  async addBelonging(params: BelongingDto): Promise<void> {
    await this.db.insert(schema.userGroupBelongings).values(params);
  }

  async deleteById(id: string): Promise<void> {
    await this.db.delete(schema.groups).where(eq(schema.groups.id, id));
  }

  async findAllWithMemberCount(userId: string): Promise<GroupWithMemberCountDto[]> {
    const countedBelongings = alias(schema.userGroupBelongings, "counted_belongings");

    const rows = await this.db
      .select({
        id: schema.groups.id,
        name: schema.groups.name,
        image: schema.groups.image,
        memberCount: sql<number>`count(*) filter (where ${countedBelongings.acceptedAt} is not null)`,
        invitedCount: sql<number>`count(*) filter (where ${countedBelongings.acceptedAt} is null)`,
        // innerJoin で絞った「本人の所属レコード」が未承諾かどうかを集計（1件想定だが bool_or で安全に）
        isInvited: sql<boolean>`bool_or(${schema.userGroupBelongings.acceptedAt} is null)`,
      })
      .from(schema.groups)
      // ユーザーが所属(承諾済み)しているグループに絞り込み
      .innerJoin(
        schema.userGroupBelongings,
        and(
          eq(schema.userGroupBelongings.groupId, schema.groups.id),
          eq(schema.userGroupBelongings.userId, userId),
        ),
      )
      // グループの人数をカウントするための結合
      .leftJoin(countedBelongings, eq(countedBelongings.groupId, schema.groups.id))
      .groupBy(schema.groups.id, schema.groups.name, schema.groups.image)
      .orderBy(asc(schema.groups.createdAt));

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      image: row.image,
      memberCount: Number(row.memberCount),
      invitedCount: Number(row.invitedCount),
      isInvited: row.isInvited,
    }));
  }

  async findById(id: string): Promise<GroupModel | null> {
    const [row] = await this.db.select().from(schema.groups).where(eq(schema.groups.id, id));
    if (!row) return null;
    return GroupRepository.toDomain(row);
  }

  async findUsersByGroupId(groupId: string): Promise<GroupUserDto[]> {
    const rows = await this.db
      .select({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        image: schema.users.image,
        acceptedAt: schema.userGroupBelongings.acceptedAt,
      })
      .from(schema.userGroupBelongings)
      .innerJoin(schema.users, eq(schema.userGroupBelongings.userId, schema.users.id))
      .where(eq(schema.userGroupBelongings.groupId, groupId))
      .orderBy(asc(schema.userGroupBelongings.createdAt));

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      image: row.image,
      acceptedAt: row.acceptedAt,
    }));
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
