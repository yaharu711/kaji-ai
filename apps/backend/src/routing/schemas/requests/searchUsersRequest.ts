import { z } from "zod";

export const searchUsersRequestSchema = z.object({
  email: z.string().email(),
});

export type SearchUsersRequest = z.infer<typeof searchUsersRequestSchema>;
