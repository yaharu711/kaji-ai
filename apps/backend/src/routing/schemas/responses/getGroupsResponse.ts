import { z } from "zod";

export const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().nullable(),
  member_count: z.number(),
  invited_count: z.number(),
  is_invited: z.boolean(),
});

export const getGroupsSuccessSchema = z.object({
  groups: z.array(groupSchema),
});

export type GetGroupsResponse = z.infer<typeof getGroupsSuccessSchema>;
