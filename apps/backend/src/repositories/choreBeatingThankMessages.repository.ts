import * as schema from "../db/schema";
import type { Database } from "../db/client";
import type { NewChoreBeatingThankMessageRecord } from "../db/schema";

export class ChoreBeatingThankMessagesRepository {
  constructor(private readonly db: Database) {}

  async create(message: NewChoreBeatingThankMessageRecord): Promise<void> {
    await this.db.insert(schema.choreBeatingThankMessages).values(message);
  }
}
