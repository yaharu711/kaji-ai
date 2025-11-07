const { config } = require("dotenv");
const { defineConfig } = require("drizzle-kit");
const { existsSync } = require("node:fs");
const { resolve } = require("node:path");

const envPath = resolve(__dirname, ".env");

if (existsSync(envPath)) {
  config({ path: envPath });
}

module.exports = defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
