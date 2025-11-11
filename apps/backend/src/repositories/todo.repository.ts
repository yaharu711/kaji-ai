import { sql } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";
import type { TodoRecord } from "../db/schema";

type Database = NeonHttpDatabase<typeof schema>;

// いったんサンプルだから、ここにモデルも定義しちゃっている。
export type TodoModel = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
};

export class TodoRepository {
  constructor(private readonly db: Database) {}

  async findAll(): Promise<TodoModel[]> {
    const result = await this.db.execute<TodoRecord>(
      sql`SELECT id, title, completed, created_at FROM todos ORDER BY created_at DESC`,
    );

    return result.rows.map(TodoRepository.toDomain);
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
