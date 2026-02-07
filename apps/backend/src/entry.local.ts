import { serve } from "@hono/node-server";
import { initSentry } from "./observability/sentry";
import app from "./routing/index";

const port = Number(process.env.PORT ?? 3000);

initSentry();

serve({
  fetch: app.fetch,
  port,
});

console.log(`Local server running at http://localhost:${port}`);

export default app;
