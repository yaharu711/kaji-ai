import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./authjs";
import { groups } from "./groups";

// user_group_beloging: ユーザーの所属と招待状態を保持する中間テーブル
export const userGroupBelongings = pgTable(
  "user_group_beloging",
  {
    groupId: text("group_id")
      .notNull()
      .references(() => groups.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    // 招待をユーザーが承諾した日時。pending 判定に利用する。
    acceptedAt: timestamp("accepted_at"),
  },
  (t) => [
    primaryKey({
      columns: [t.userId, t.groupId],
    }),
  ],
);

export type UserGroupBelongingRecord = typeof userGroupBelongings.$inferSelect;
export type NewUserGroupBelongingRecord = typeof userGroupBelongings.$inferInsert;
