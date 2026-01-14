import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { groups } from "./groups";

export const groupChores = pgTable("group_chores", {
  id: serial("id").primaryKey(),
  groupId: text("group_id")
    .notNull()
    .references(() => groups.id, { onDelete: "cascade" }),
  choreName: text("chore_name").notNull(),
  iconCode: text("icon_code").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type GroupChoreRecord = typeof groupChores.$inferSelect;
export type NewGroupChoreRecord = typeof groupChores.$inferInsert;
