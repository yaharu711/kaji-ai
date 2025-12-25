// /api/auth/* 向けのブリッジ。
// Vercel のルーティングで catch-all ([[...path]].ts) より
// サブディレクトリ側が優先されるケースに備えて二重化している。
export const config = { runtime: "edge" };
export { default } from "../../src/entry.edge";
