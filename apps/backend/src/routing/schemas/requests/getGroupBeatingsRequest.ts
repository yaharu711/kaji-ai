import { z } from "zod";

import { dateOnlyString } from "./common";

export const getGroupBeatingsRequestSchema = z.object({
  date: dateOnlyString("date"),
});

export type GetGroupBeatingsRequest = z.infer<typeof getGroupBeatingsRequestSchema>;
