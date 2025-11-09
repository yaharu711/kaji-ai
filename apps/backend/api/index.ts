// Vercel の Serverless Function が参照するエントリ。
// Node.js Runtimeで実行するため、ソース側の entry.ts を re-export し、
// Vercel に TypeScript → JavaScript の変換を任せる。
export { default, config } from "../src/entry.js";
