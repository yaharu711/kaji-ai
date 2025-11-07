const { config } = require("dotenv");
const { defineConfig } = require("drizzle-kit");
const { existsSync } = require("node:fs");
const { resolve } = require("node:path");

const envFileName = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
const envPath = resolve(__dirname, envFileName);

if (existsSync(envPath)) {
  // テスト実行時に、DBを切り替えるときだけ、環境変数を上書きする
  const shouldOverride = process.env.NODE_ENV === "test";
  config({ path: envPath, override: shouldOverride });
}

module.exports = defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
