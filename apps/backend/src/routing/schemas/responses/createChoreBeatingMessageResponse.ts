import { z } from "zod";

export const createChoreBeatingMessageSuccessSchema = z.object({
  status: z.literal(201),
});

export type CreateChoreBeatingMessageResponse = z.infer<
  typeof createChoreBeatingMessageSuccessSchema
>;
