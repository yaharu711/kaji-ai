import { Hono } from "hono";
import hello from "./hello.js";
import todos from "./todos.js";

console.log("Setting up routing...");
const app = new Hono().route("/api", hello).route("/api/todos", todos);

export default app;
export type RoutingApp = typeof app;
