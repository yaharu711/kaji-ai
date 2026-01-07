import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase, type NeonTransaction } from "drizzle-orm/neon-http";
import type { TablesRelationalConfig } from "drizzle-orm";
import * as schema from "./schema";

let singleton: NeonHttpDatabase<typeof schema> | null = null;

/**
 * Repository で共通して使う DB 型。
 * - トランザクション内では `NeonTransaction` が渡されるため DB と Tx の union にする。
 * - `NeonTransaction` の第2型引数は `TablesRelationalConfig` を要求するが、
 *   リレーション定義を持っていなくても `TablesRelationalConfig` を指定しないと
 *   `typeof schema` では制約に合わず型エラーになるため、この形を採用している。
 */
export type Database =
  | NeonHttpDatabase<typeof schema>
  | NeonTransaction<typeof schema, TablesRelationalConfig>;

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
