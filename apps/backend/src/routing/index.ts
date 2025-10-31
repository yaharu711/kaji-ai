import { Hono } from "hono";
import hello from "./hello";

const app = new Hono();

app.route("/api", hello);

export default app;
export type RoutingApp = typeof app;
