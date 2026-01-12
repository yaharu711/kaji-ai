import { z } from "zod";

export const noContentResponseSchema = z.undefined();

export type NoContentResponse = z.infer<typeof noContentResponseSchema>;
