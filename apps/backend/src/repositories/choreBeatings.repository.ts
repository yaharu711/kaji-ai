import { eq, sql } from "drizzle-orm";

import type { Database } from "../db/client";
import * as schema from "../db/schema";
import type {
  BeatingTimelineGroupDto,
  BeatingTimelineItemDto,
  BeatingTimelineMessageDto,
} from "../dtos/choreBeating";
import type { DateRangeUtcDto } from "../dtos/dateRangeUtc";
import type { NewChoreBeatingModel } from "../models/choreBeating";
import { fromDbTimestampUtc } from "../util/datetime";

export class ChoreBeatingsRepository {
  constructor(private readonly db: Database) {}

  async create(beating: NewChoreBeatingModel): Promise<void> {
    await this.db.insert(schema.choreBeatings).values(beating);
  }

  async incrementLikeCount(beatingId: number, updatedAt: Date): Promise<void> {
    await this.db
      .update(schema.choreBeatings)
      .set({
        likeCount: sql<number>`${schema.choreBeatings.likeCount} + 1`,
        updatedAt,
      })
      .where(eq(schema.choreBeatings.id, beatingId));
  }

  async findTimelineByGroupIdAndUtcRange(
    groupId: string,
    dateRange: DateRangeUtcDto,
  ): Promise<BeatingTimelineGroupDto[]> {
    const { startUtc, endUtc } = dateRange;
    const result = await this.db.execute(sql`
      WITH beatings AS (
        SELECT
          chore_beatings.id AS beating_id,
          chore_beatings.beated_at AS beated_at,
          chore_beatings.chore_id AS chore_id,
          group_chores.chore_name AS chore_name,
          group_chores.icon_code AS icon_code,
          chore_beatings.like_count AS thanks_count,
          "user".id AS user_id,
          "user".name AS user_name,
          "user".image AS img_url,
          to_char(
            date_trunc('hour', (chore_beatings.beated_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Tokyo')),
            'HH24:MI'
          ) AS hour_label,
          json_agg(
            json_build_object(
              'id', chore_beating_thank_messages.id,
              'userId', chore_beating_thank_messages.user_id,
              'userName', message_user.name,
              'imgUrl', message_user.image,
              'mainMessage', chore_beating_thank_messages.main_message,
              'descriptionMessage', chore_beating_thank_messages.description_message
            )
          ) FILTER (WHERE chore_beating_thank_messages.id IS NOT NULL) AS messages
        FROM chore_beatings
        INNER JOIN group_chores ON chore_beatings.chore_id = group_chores.id
        INNER JOIN "user" ON chore_beatings.user_id = "user".id
        LEFT JOIN chore_beating_thank_messages
          ON chore_beating_thank_messages.beating_id = chore_beatings.id
          AND chore_beating_thank_messages.group_id = chore_beatings.group_id
        LEFT JOIN "user" AS message_user ON chore_beating_thank_messages.user_id = message_user.id
        WHERE chore_beatings.group_id = ${groupId}
          AND (chore_beatings.beated_at AT TIME ZONE 'UTC') >= ${startUtc}
          AND (chore_beatings.beated_at AT TIME ZONE 'UTC') < ${endUtc}
        GROUP BY
          chore_beatings.id,
          chore_beatings.beated_at,
          chore_beatings.chore_id,
          group_chores.chore_name,
          group_chores.icon_code,
          chore_beatings.like_count,
          "user".id,
          "user".name,
          "user".image
      )
      SELECT
        hour_label AS hour,
        json_agg(
          json_build_object(
            'beatingId', beating_id,
            'beatedAt', beated_at,
            'choreId', chore_id,
            'choreName', chore_name,
            'iconCode', icon_code,
            'thanksCount', thanks_count,
            'messages', COALESCE(messages, '[]'::json),
            'userId', user_id,
            'userName', user_name,
            'imgUrl', img_url
          )
          ORDER BY beated_at, beating_id
        ) AS items
      FROM beatings
      GROUP BY hour_label
      ORDER BY hour_label
    `);

    const normalizeJson = <T>(value: unknown, fallback: T): T => {
      if (value === null || value === undefined) {
        return fallback;
      }
      if (typeof value === "string") {
        return JSON.parse(value) as T;
      }
      return value as T;
    };

    const rows = (result as { rows?: unknown[] }).rows ?? [];
    const toDate = (value: unknown) => {
      if (value instanceof Date) return value;
      const parsed = fromDbTimestampUtc(String(value));
      return parsed ? parsed.toDate() : new Date(String(value));
    };

    return rows.map((row) => {
      const record = row as { hour: string; items: unknown };
      const items = normalizeJson<BeatingTimelineItemDto[]>(record.items, []);
      return {
        hour: record.hour,
        items: items.map((item) => ({
          ...item,
          beatedAt: toDate(item.beatedAt),
          messages: normalizeJson<BeatingTimelineMessageDto[]>(item.messages, []),
        })),
      };
    });
  }
}
