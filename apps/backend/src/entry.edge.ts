import { handle } from "hono/vercel";
import app from "./routing/index";

export default handle(app);
