import { z } from "zod";

import { isoJstDateTimeString } from "./common";

export const createChoreBeatingRequestSchema = z.object({
  chore_id: z.number().int(),
  beated_at: isoJstDateTimeString("beated_at"),
});

export type CreateChoreBeatingRequest = z.infer<typeof createChoreBeatingRequestSchema>;
