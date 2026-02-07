import type { Context } from "hono";

type ErrorLevel = "error" | "warning" | "info";

type ErrorLogMeta = {
  feature?: string; // Example: "group-invite"
  context?: Record<string, unknown>; // Extra info for investigation (avoid PII)
  level?: ErrorLevel; // Default is "error"
};

export type ErrorLogger = {
  error: (c: Context, err: unknown, message: string, meta?: Omit<ErrorLogMeta, "level">) => void;
  warn: (c: Context, err: unknown, meta?: Omit<ErrorLogMeta, "level">) => void;
  info: (c: Context, message: string, meta?: Omit<ErrorLogMeta, "level">) => void;
};

/**
 * capture is an injected Sentry (or future logger) hook.
 * When we add pino later, we can extend this in one place.
 */
export function createLogger(params: {
  capture: (payload: {
    level: ErrorLevel;
    err?: unknown;
    message?: string;
    tags: Record<string, string>;
    contexts: Record<string, unknown>;
  }) => void;
}): ErrorLogger {
  const send = (
    c: Context,
    input: { level: ErrorLevel; err?: unknown; message?: string; meta?: ErrorLogMeta },
  ) => {
    const url = new URL(c.req.url);
    const level = input.meta?.level ?? input.level;

    if (input.err) {
      if (level === "error") {
        console.error("[log]", input.message ?? "error", input.err);
      } else if (level === "warning") {
        console.warn("[log]", input.message ?? "warning", input.err);
      } else {
        console.info("[log]", input.message ?? "info", input.err);
      }
    } else if (input.message) {
      if (level === "error") {
        console.error("[log]", input.message);
      } else if (level === "warning") {
        console.warn("[log]", input.message);
      } else {
        console.info("[log]", input.message);
      }
    }

    const tags: Record<string, string> = {};
    if (input.meta?.feature) tags.feature = input.meta.feature;

    const contexts: Record<string, unknown> = {
      request: {
        method: c.req.method,
        path: url.pathname,
        // Query can contain PII. Whitelist if you need it.
        query: Object.fromEntries(url.searchParams),
      },
    };
    if (input.meta?.context) contexts.app = input.meta.context;

    params.capture({
      level,
      err: input.err,
      message: input.message,
      tags,
      contexts,
    });
  };

  return {
    error: (c, err, message, meta) =>
      send(c, { level: "error", err, message, meta: { ...meta, level: "error" } }),
    warn: (c, err, meta) => send(c, { level: "warning", err, meta: { ...meta, level: "warning" } }),
    info: (c, message, meta) =>
      send(c, { level: "info", message, meta: { ...meta, level: "info" } }),
  };
}
