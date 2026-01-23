import { z } from "zod";

import { isoDateString } from "./common";

export const getGroupBeatingsRequestSchema = z.object({
  date: isoDateString("date"),
});

export type GetGroupBeatingsRequest = z.infer<typeof getGroupBeatingsRequestSchema>;
