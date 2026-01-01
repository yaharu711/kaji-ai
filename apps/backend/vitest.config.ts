import { defineConfig } from "vitest/config";
import { config as loadEnv } from "dotenv";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testEnvPath = path.resolve(__dirname, ".env.test");

if (existsSync(testEnvPath)) {
  loadEnv({ path: testEnvPath, override: true });
} else {
  throw new Error(".env.test が見つかりません。テスト実行前に作成してください。");
}

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    // DB 共有のためワーカ1つに制限
    pool: "threads",
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 1,
      },
    },
    sequence: {
      concurrent: false,
    },
    // もしNode専用のモジュールを使っていると、テストでは通っているけど番の Vercel Edge（Web 標準のみ・Node API なし）では落ちるリスクがあり
    environment: "node",
  },
});
