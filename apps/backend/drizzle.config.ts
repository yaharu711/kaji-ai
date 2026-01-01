import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(currentDir, ".env");
const envTestPath = resolve(currentDir, ".env.test");

// まずローカル用 .env を読む
if (existsSync(envPath)) {
  loadEnv({ path: envPath });
}
// テスト時のみ .env.test で上書き（migrate:test は NODE_ENV=test で実行）
if (process.env.NODE_ENV === "test" && existsSync(envTestPath)) {
  // テスト時は .env の値を上書きできるよう override: true を指定
  loadEnv({ path: envTestPath, override: true });
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
