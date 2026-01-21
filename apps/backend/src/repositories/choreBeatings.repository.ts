import type { Database } from "../db/client";
import * as schema from "../db/schema";
import type { NewChoreBeatingModel } from "../models/choreBeating";

export class ChoreBeatingsRepository {
  constructor(private readonly db: Database) {}

  async create(beating: NewChoreBeatingModel): Promise<void> {
    await this.db.insert(schema.choreBeatings).values(beating);
  }
}
