import { z } from "zod";

export const groupChoreSchema = z.object({
  id: z.number(),
  name: z.string(),
  icon_code: z.enum([
    "dish-wash",
    "cleaning",
    "laundry",
    "cooking",
    "trash",
    "shopping",
    "bath-cleaning",
    "toilet-cleaning",
  ]),
});

export const getGroupChoresSuccessSchema = z.array(groupChoreSchema);

export type GetGroupChoresResponse = z.infer<typeof getGroupChoresSuccessSchema>;
