import { zValidator } from "@hono/zod-validator";
import type { ZodType } from "zod";

import { unprocessableEntitySchema } from "../schemas/responses/common";

/**
 * 共通の zod バリデーションミドルウェア
 * - 422 Unprocessable Entity でフィールドごとのエラーを返す
 */
export const validateJson = (schema: ZodType) =>
  zValidator("json", schema, (result, c) => {
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join(".") || "unknown",
        message: issue.message,
      }));
      const body = unprocessableEntitySchema.parse({ status: 422, errors });
      return c.json(body, 422);
    }
  });
