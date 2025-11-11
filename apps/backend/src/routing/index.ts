import { Hono } from "hono";
import hello from "./hello";
import todos from "./todos";

const app = new Hono().route("/api", hello).route("/api/todos", todos);

export default app;
export type RoutingApp = typeof app;
