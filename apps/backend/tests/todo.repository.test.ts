import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { getDb } from "../src/db/client";
import * as schema from "../src/db/schema";
import { TodoRepository } from "../src/repositories/todo.repository";

type Database = NeonHttpDatabase<typeof schema>;

describe("TodoRepository.findAll", () => {
  let db: Database;
  let repository: TodoRepository;

  const truncateTodos = async () => {
    await db.execute(sql`TRUNCATE TABLE todos RESTART IDENTITY`);
  };

  beforeAll(() => {
    db = getDb();
    repository = new TodoRepository(db);
  });

  beforeEach(async () => {
    await truncateTodos();
  });

  it("最新順期待した値が取得できていること", async () => {
    const baseTime = new Date("2024-01-01T00:00:00Z");

    await db.insert(schema.todos).values([
      {
        title: "Task A",
        completed: false,
        createdAt: new Date(baseTime.getTime() - 1_000),
      },
      {
        title: "Task B",
        completed: true,
        createdAt: baseTime,
      },
    ]);

    const todos = await repository.findAll();

    expect(todos).toHaveLength(2);
    expect(todos.map((todo) => todo.title)).toEqual(["Task B", "Task A"]);
    expect(todos[0]).toMatchObject({
      title: "Task B",
      isCompleted: true,
    });
    expect(todos[1]).toMatchObject({
      title: "Task A",
      isCompleted: false,
    });
  });
});
