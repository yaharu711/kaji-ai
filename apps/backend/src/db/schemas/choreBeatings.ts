import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./authjs";
import { groupChores } from "./groupChores";
import { groups } from "./groups";

export const choreBeatings = pgTable("chore_beatings", {
  id: serial("id").primaryKey(),
  groupId: text("group_id")
    .notNull()
    .references(() => groups.id, { onDelete: "cascade" }),
  choreId: integer("chore_id")
    .notNull()
    .references(() => groupChores.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  likeCount: integer("like_count").notNull().default(0),
  beatedAt: timestamp("beated_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type ChoreBeatingRecord = typeof choreBeatings.$inferSelect;
export type NewChoreBeatingRecord = typeof choreBeatings.$inferInsert;
