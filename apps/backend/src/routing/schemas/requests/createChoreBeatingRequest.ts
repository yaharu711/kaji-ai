import { z } from "zod";
import dayjs from "dayjs";

const isoJstRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+09:00$/;

export const createChoreBeatingRequestSchema = z.object({
  chore_id: z.number().int(),
  beated_at: z
    .string()
    .refine(
      (value) => isoJstRegex.test(value) && dayjs(value).isValid(),
      "beated_at は ISO8601 の JST 形式で指定してください",
    ),
});

export type CreateChoreBeatingRequest = z.infer<typeof createChoreBeatingRequestSchema>;
