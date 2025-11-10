// Vercel の Serverless Function はビルド済みの JS を読むため、dist の成果物を再エクスポートする。
// TypeScript 変換後に生成されるファイルを指しているので、型チェックでは無視する。
export { default } from "../src/entry.js";
console.log(`run api/index.ts`);
