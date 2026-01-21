import { integer, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

import { users } from "./authjs";
import { choreBeatings } from "./choreBeatings";
import { groups } from "./groups";

export const choreBeatingLikes = pgTable(
  "chore_beating_likes",
  {
    id: serial("id").primaryKey(),
    groupId: text("group_id")
      .notNull()
      .references(() => groups.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    beatingId: integer("beating_id")
      .notNull()
      .references(() => choreBeatings.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("chore_beating_likes_beating_id_user_id_unique").on(t.beatingId, t.userId)],
);

export type ChoreBeatingLikeRecord = typeof choreBeatingLikes.$inferSelect;
export type NewChoreBeatingLikeRecord = typeof choreBeatingLikes.$inferInsert;
