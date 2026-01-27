import { z } from "zod";

export const createChoreBeatingMessageRequestSchema = z.object({
  main_message: z.string().min(1, "main_message は必須です").max(100),
  description_message: z.string().max(150).nullable().optional(),
});

export type CreateChoreBeatingMessageRequest = z.infer<
  typeof createChoreBeatingMessageRequestSchema
>;
