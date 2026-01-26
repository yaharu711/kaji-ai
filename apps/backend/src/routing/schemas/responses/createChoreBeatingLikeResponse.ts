import { z } from "zod";

export const createChoreBeatingLikeSuccessSchema = z.object({
  status: z.literal(201),
});

export type CreateChoreBeatingLikeResponse = z.infer<typeof createChoreBeatingLikeSuccessSchema>;
