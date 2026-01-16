import { z } from "zod";

export const groupUserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  image_url: z.string().nullable(),
  is_owner: z.boolean(),
  is_invited: z.boolean(),
});

export const getGroupUsersSuccessSchema = z.array(groupUserSchema);

export type GroupUserResponse = z.infer<typeof groupUserSchema>;
export type GetGroupUsersResponse = z.infer<typeof getGroupUsersSuccessSchema>;
