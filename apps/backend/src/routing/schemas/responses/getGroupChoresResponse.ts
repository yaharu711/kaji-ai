import { z } from "zod";

import { groupChoreIconCodes } from "../../../constants/chores";

export { groupChoreIconCodes };

export const groupChoreSchema = z.object({
  id: z.number(),
  name: z.string(),
  icon_code: z.enum(groupChoreIconCodes),
});

export const getGroupChoresSuccessSchema = z.array(groupChoreSchema);

export type GetGroupChoresResponse = z.infer<typeof getGroupChoresSuccessSchema>;
