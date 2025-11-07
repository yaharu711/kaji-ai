import { sql } from "drizzle-orm";

import { getDb } from "../client";
import type { TodoRecord } from "../schema";

export type TodoModel = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
};

export class TodoRepository {
  static async findAll(): Promise<TodoModel[]> {
    const db = getDb();
    const result = await db.execute<TodoRecord>(
      sql`SELECT id, title, completed, created_at FROM todos ORDER BY created_at DESC`,
    );

    return result.map(this.toDomain);
  }

  private static toDomain(row: TodoRecord): TodoModel {
    return {
      id: row.id,
      title: row.title,
      isCompleted: row.completed ?? false,
      createdAt: row.createdAt,
    };
  }
}
