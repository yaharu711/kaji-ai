import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let singleton: PostgresJsDatabase<typeof schema> | null = null;

const createDbClient = (): PostgresJsDatabase<typeof schema> => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined");
  }

  const client = postgres(databaseUrl, {
    ssl: "require",
  });

  return drizzle(client, { schema });
};

export const getDb = (): PostgresJsDatabase<typeof schema> => {
  if (!singleton) {
    singleton = createDbClient();
  }
  return singleton;
};
