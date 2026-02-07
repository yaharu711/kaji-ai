import { handle } from "hono/vercel";
import { initSentry } from "./observability/sentry";
import app from "./routing/index";

initSentry();

export default handle(app);
