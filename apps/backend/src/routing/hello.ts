import { Hono } from "hono";

const app = new Hono().get("/", (c) => {
  try {
    return c.json({ message: "Hello World" });
  } catch (error) {
    console.error("Error in /hello route:", error);
    return c.json({ message: "Internal Server Error" }, 500);
  }
});

export default app;
export type HelloRoute = typeof app;
