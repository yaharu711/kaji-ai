import { z } from "zod";

const MESSAGE_LIMITS = {
  main: 100,
  description: 150,
} as const;

export type ChoreBeatingMessageLimits = typeof MESSAGE_LIMITS;

export const createChoreBeatingMessageRequestSchema = z
  .object({
    main_message: z.string().max(MESSAGE_LIMITS.main),
    description_message: z.string().max(MESSAGE_LIMITS.description).nullable().optional(),
  })
  .refine(
    (value) => {
      const mainMessage = value.main_message.trim();
      const descriptionMessage = value.description_message?.trim() ?? "";
      return mainMessage.length > 0 || descriptionMessage.length > 0;
    },
    {
      message: "main_message または description_message のいずれかは必須です",
      path: ["main_message"],
    },
  );

export type CreateChoreBeatingMessageRequest = z.infer<
  typeof createChoreBeatingMessageRequestSchema
>;
