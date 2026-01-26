import type { Database } from "../db/client";
import * as schema from "../db/schema";
import type { NewChoreBeatingLikeRecord } from "../db/schema";

export class ChoreBeatingLikesRepository {
  constructor(private readonly db: Database) {}

  async create(like: NewChoreBeatingLikeRecord): Promise<void> {
    await this.db.insert(schema.choreBeatingLikes).values(like);
  }
}
