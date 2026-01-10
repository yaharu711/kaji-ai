import { z } from "zod";

export const inviteGroupRequestSchema = z.object({
  user_id: z.string().min(1, "user_id is required"),
});

export type InviteGroupRequest = z.infer<typeof inviteGroupRequestSchema>;
