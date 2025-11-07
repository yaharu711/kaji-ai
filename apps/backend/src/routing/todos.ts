import { Hono } from "hono";
import { TodoRepository } from "../db/repositories/todo";

const app = new Hono().get("/", async (c) => {
  try {
    const todos = await TodoRepository.findAll();
    return c.json({ todos });
  } catch (error) {
    console.error("Failed to fetch todos", error);
    return c.json({ message: "Failed to fetch todos" }, 500);
  }
});

export default app;
export type TodosRoute = typeof app;
