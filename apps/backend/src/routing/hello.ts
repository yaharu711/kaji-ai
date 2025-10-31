import { Hono } from "hono";

const app = new Hono().get("/", (c) => c.json({ message: "Hello World" }));

export default app;
export type HelloRoute = typeof app;
