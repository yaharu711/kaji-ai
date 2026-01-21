import type { Database } from "../db/client";
import * as schema from "../db/schema";
import type { NewChoreBeatingModel } from "../models/choreBeating";

export class ChoreBeatingsRepository {
  constructor(private readonly db: Database) {}

  async create(beating: NewChoreBeatingModel): Promise<void> {
    await this.db.insert(schema.choreBeatings).values({
      groupId: beating.groupId,
      choreId: beating.choreId,
      userId: beating.userId,
      likeCount: beating.likeCount,
      beatedAt: beating.beatedAt,
      createdAt: beating.createdAt,
      updatedAt: beating.updatedAt,
    });
  }
}
