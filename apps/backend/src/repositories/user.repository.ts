import { eq } from "drizzle-orm";

import * as schema from "../db/schema";
import type { Database } from "../db/client";
import type { UserRecord } from "../db/schema";

export class UserRepository {
  constructor(private readonly db: Database) {}

  async findByEmail(email: string): Promise<UserRecord | null> {
    const [user] = await this.db.select().from(schema.users).where(eq(schema.users.email, email));
    return user ?? null;
  }
}
