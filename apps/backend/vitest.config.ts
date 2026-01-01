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

console.log("vitest" + process.env.DATABASE_URL);

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
  },
});
