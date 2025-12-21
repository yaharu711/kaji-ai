// Vercel Edge Function から Hono アプリを参照できるよう、エントリーファイルを再エクスポートする。
// [[...path]].ts 側の catch-all でも /api 配下は受けられるが、環境によっては
// /api 直下のみ個別のファイルを要求するケースがあるため二重化している。
// （運用上は片方を差し替えても /api が常に Edge ルーターを指すようにしておきたい。）
export const config = { runtime: "edge" };
export { default } from "../src/entry.edge";
