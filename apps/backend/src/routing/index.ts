import { Hono } from "hono";
import hello from "./hello";

const app = new Hono().route("/api", hello);

export default app;
export type RoutingApp = typeof app;
