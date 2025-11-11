// Vercel Edge Function から Hono アプリを参照できるよう、エントリーファイルを再エクスポートする。
export const config = { runtime: "edge" };
export { default } from "../src/entry.edge";
