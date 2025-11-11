import { Hono } from "hono";

import { getDb } from "../db/client";
import { TodoRepository } from "../repositories/todo.repository";

const todoRepository = new TodoRepository(getDb());

const app = new Hono().get("/", async (c) => {
  try {
    const todos = await todoRepository.findAll();
    return c.json({ todos });
  } catch (error) {
    console.error("Failed to fetch todos", error);
    return c.json({ message: "Failed to fetch todos" }, 500);
  }
});

export default app;
export type TodosRoute = typeof app;
