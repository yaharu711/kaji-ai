import { z } from "zod";

export const errorDetailSchema = z.object({
  field: z.string(),
  message: z.string(),
});

export const badRequestSchema = z.object({
  status: z.literal(400),
  errors: z.array(errorDetailSchema).min(1),
});

export const unprocessableEntitySchema = z.object({
  status: z.literal(422),
  errors: z.array(errorDetailSchema).min(1),
});

export const unauthorizedSchema = z.object({
  status: z.literal(401),
  message: z.string(),
});

export type ErrorDetail = z.infer<typeof errorDetailSchema>;
export type BadRequestResponse = z.infer<typeof badRequestSchema>;
export type UnprocessableEntityResponse = z.infer<typeof unprocessableEntitySchema>;
export type UnauthorizedResponse = z.infer<typeof unauthorizedSchema>;
