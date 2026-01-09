import { z } from "zod";

export const searchUsersRequestSchema = z.object({
  email: z.email({ message: "メールアドレスの形式が不正です" }),
});

export type SearchUsersRequest = z.infer<typeof searchUsersRequestSchema>;
