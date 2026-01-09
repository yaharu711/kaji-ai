import { z } from "zod";

export const searchUserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  image_url: z.string().nullable(),
  is_invited: z.boolean(),
});

export const searchUsersSuccessSchema = z.object({
  users: z.array(searchUserSchema),
});

export type SearchUser = z.infer<typeof searchUserSchema>;
export type SearchUsersResponse = z.infer<typeof searchUsersSuccessSchema>;
