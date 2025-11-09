import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";

let singleton: PostgresJsDatabase<typeof schema> | null = null;

const createDbClient = (): PostgresJsDatabase<typeof schema> => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined");
  }

  const client = postgres(databaseUrl, {
    // 本番ではSupabaseのPostgresに接続するためSSLを有効化
    ssl: process.env.NODE_ENV === "production" ? "require" : false,
  });

  return drizzle(client, { schema });
};

export const getDb = (): PostgresJsDatabase<typeof schema> => {
  if (!singleton) {
    singleton = createDbClient();
  }
  return singleton;
};
