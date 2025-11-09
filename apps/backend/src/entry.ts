import { serve } from "@hono/node-server";
import { handle } from "hono/vercel";
import app from "./routing/index.js";

const runtime = "nodejs" as const;

export const config = {
  runtime,
};

console.log(`Before Running in ${runtime} runtime`);
const handler = handle(app);
console.log(`Running in ${runtime} runtime`);

if (process.env.VERCEL === undefined) {
  const port = Number(process.env.PORT ?? 3000);
  serve({
    fetch: app.fetch,
    port,
  });
  console.log(`Local server running at http://localhost:${port}`);
}

export default handler;
