import { z } from "zod";

export const createGroupSuccessSchema = z.object({
  status: z.literal(201),
});

export type CreateGroupResponse = z.infer<typeof createGroupSuccessSchema>;
