import { handle } from "hono/vercel";
import app from "./routing/index.js";

export default handle(app);
