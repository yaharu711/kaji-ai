// Vercel Edge Function (catch-all) はビルド済みの JS を読む。
export const config = { runtime: "edge" };
export { default } from "../src/entry.edge";
