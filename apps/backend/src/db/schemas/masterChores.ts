import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const masterChores = pgTable("master_chores", {
  id: serial("id").primaryKey(),
  choreName: text("chore_name").notNull(),
  iconCode: text("icon_code").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type MasterChoreRecord = typeof masterChores.$inferSelect;
export type NewMasterChoreRecord = typeof masterChores.$inferInsert;
