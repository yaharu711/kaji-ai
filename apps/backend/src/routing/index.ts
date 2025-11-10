import { Hono } from "hono";
import hello from "./hello.js";
import todos from "./todos.js";

const app = new Hono().route("/api", hello).route("/api/todos", todos);
console.log("Routing app initialized", app.routes);

export default app;
export type RoutingApp = typeof app;
