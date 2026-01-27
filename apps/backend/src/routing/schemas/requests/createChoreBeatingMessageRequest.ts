import { z } from "zod";

export const MESSAGE_LIMITS = {
  main: 100,
  description: 150,
} as const;

export const createChoreBeatingMessageRequestSchema = z.object({
  main_message: z.string().min(1, "main_message は必須です").max(MESSAGE_LIMITS.main),
  description_message: z.string().max(MESSAGE_LIMITS.description).nullable().optional(),
});

export type CreateChoreBeatingMessageRequest = z.infer<
  typeof createChoreBeatingMessageRequestSchema
>;
