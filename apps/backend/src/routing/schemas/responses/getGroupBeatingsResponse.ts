import { z } from "zod";

export const beatingMessageSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  user_name: z.string().nullable(),
  img_url: z.string().nullable(),
  main_message: z.string(),
  description_message: z.string().nullable(),
});

export const beatingItemSchema = z.object({
  beating_id: z.number(),
  beated_at: z.string(),
  chore_id: z.number(),
  chore_name: z.string(),
  icon_code: z.string(),
  thanks_count: z.number(),
  liked_by_me: z.boolean(),
  messaged_by_me: z.boolean(),
  messages: z.array(beatingMessageSchema),
  user_id: z.string(),
  user_name: z.string().nullable(),
  img_url: z.string().nullable(),
});

export const beatingGroupSchema = z.object({
  hour: z.string(),
  items: z.array(beatingItemSchema),
});

export const getGroupBeatingsSuccessSchema = z.array(beatingGroupSchema);

export type BeatingMessageResponse = z.infer<typeof beatingMessageSchema>;
export type BeatingItemResponse = z.infer<typeof beatingItemSchema>;
export type BeatingGroupResponse = z.infer<typeof beatingGroupSchema>;
export type GetGroupBeatingsResponse = z.infer<typeof getGroupBeatingsSuccessSchema>;
