import { z } from "zod";

export const inviteGroupSuccessSchema = z.object({
  status: z.literal(201),
});

export type InviteGroupResponse = z.infer<typeof inviteGroupSuccessSchema>;
