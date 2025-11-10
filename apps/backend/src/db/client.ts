import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema.js";

let singleton: NeonHttpDatabase<typeof schema> | null = null;

const createDbClient = (): NeonHttpDatabase<typeof schema> => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined");
  }

  neonConfig.fetchConnectionCache = true;

  const httpClient = neon(databaseUrl);

  return drizzle(httpClient, { schema });
};

export const getDb = (): NeonHttpDatabase<typeof schema> => {
  if (!singleton) {
    singleton = createDbClient();
  }
  return singleton;
};
