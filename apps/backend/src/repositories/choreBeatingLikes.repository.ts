import { sql } from "drizzle-orm";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { Database } from "../db/client";

dayjs.extend(utc);

export class ChoreBeatingLikesRepository {
  constructor(private readonly db: Database) {}

  async addLikeAndIncrementCount(
    groupId: string,
    userId: string,
    beatingId: number,
    createdAt: Date,
    updatedAt: Date,
  ): Promise<void> {
    const createdAtUtc = dayjs(createdAt).utc().format("YYYY-MM-DD HH:mm:ss");
    const updatedAtUtc = dayjs(updatedAt).utc().format("YYYY-MM-DD HH:mm:ss");
    await this.db.execute(sql`
      WITH inserted AS (
        INSERT INTO chore_beating_likes (group_id, user_id, beating_id, created_at)
        VALUES (${groupId}, ${userId}, ${beatingId}, ${createdAtUtc})
        ON CONFLICT DO NOTHING
        RETURNING 1
      )
      UPDATE chore_beatings
      SET like_count = like_count + 1,
          updated_at = ${updatedAtUtc}
      WHERE id = ${beatingId}
        AND EXISTS (SELECT 1 FROM inserted)
    `);
  }
}
