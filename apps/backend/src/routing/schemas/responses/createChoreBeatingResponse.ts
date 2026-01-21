import { z } from "zod";

export const createChoreBeatingSuccessSchema = z.object({
  status: z.literal(201),
});

export type CreateChoreBeatingResponse = z.infer<typeof createChoreBeatingSuccessSchema>;
