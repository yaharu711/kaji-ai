// Hono エントリーポイントを個別ルートとしてエクスポートし、Vercel がこのパスを確実に Edge Function として認識するようにする。
export const config = { runtime: "edge" };
export { default } from "../../../src/entry.edge";
