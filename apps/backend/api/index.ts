// Vercel Edge Function はビルド済みの JS を読むため、dist の成果物を再エクスポートする。
export const config = { runtime: "edge" };
export { default } from "../src/entry.edge.js";
