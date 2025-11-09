import { serve } from "@hono/node-server";
import { handle } from "hono/vercel";
import app from "./routing/index.js";

const runtime = "nodejs" as const;

export const config = {
  runtime,
};

const handler = handle(app);

if (process.env.VERCEL === undefined) {
  const port = Number(process.env.PORT ?? 3000);
  serve({
    fetch: app.fetch,
    port,
  });
  console.log(`Local server running at http://localhost:${port}`);
}

export default handler;
