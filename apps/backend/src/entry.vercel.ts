import { handle } from "hono/vercel";
import app from "./routing";

type Runtime = "edge" | "nodejs";

const resolveRuntime = (): Runtime => {
  const value = process.env.RUNTIME?.toLowerCase();
  if (value === "node" || value === "nodejs") {
    return "nodejs";
  }
  return "edge";
};

const runtime = resolveRuntime();

export const config = {
  runtime,
};

export default runtime === "edge" ? app : handle(app);
