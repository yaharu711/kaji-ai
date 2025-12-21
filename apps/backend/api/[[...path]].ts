// Vercel Edge Function (catch-all) はビルド済みの JS を読む。
// Hono ルーターを 1 本にまとめて Edge Runtime で動かすため、/api 以下を
// [[...path]] で全て受け、それを entry.edge.ts に委譲している。
// Vercel の仕様上 catch-all がないと「ルートごとにファイルを置く必要がある」ため、
// この薄いブリッジでビルド成果物のみを読み込ませる構成にしている。
export const config = { runtime: "edge" };
export { default } from "../src/entry.edge";
