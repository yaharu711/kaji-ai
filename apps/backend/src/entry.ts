import { serve } from "@hono/node-server";
import app from "./routing/index.js";

if (process.env.VERCEL === undefined) {
  const port = Number(process.env.PORT ?? 3000);
  serve({
    fetch: app.fetch,
    port,
  });
  console.log(`Local server running at http://localhost:${port}`);
}

export default app;
