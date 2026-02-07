import type { Context } from "hono";

type ErrorLevel = "error" | "warning" | "info";

type ErrorLogMeta = {
  feature?: string; // 例: "group-invite"
  context?: Record<string, unknown>; // 調査に必要な追加情報
};

export type ErrorLogger = {
  error: (c: Context, err: unknown, message?: string, meta?: Omit<ErrorLogMeta, "level">) => void;
  warn: (c: Context, err: unknown, message?: string, meta?: Omit<ErrorLogMeta, "level">) => void;
  info: (c: Context, message: string, meta?: Omit<ErrorLogMeta, "level">) => void;
};

/**
 * capture は「Sentryや監視ツールに送る実装」を注入する。
 * 後から pino を入れたいなら、この中に pino 出力を足すだけでOK。
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
    const level = input.level;

    const logMethod =
      level === "error" ? console.error : level === "warning" ? console.warn : console.info;
    if (input.err) {
      logMethod("[log]", input.message ?? "メッセージはありません。", input.err);
    } else if (input.message) {
      logMethod("[log]", input.message);
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
      send(c, { level: "error", err, message, meta: { ...(meta ?? {}) } }),
    warn: (c, err, message, meta) =>
      send(c, { level: "warning", err, message, meta: { ...(meta ?? {}) } }),
    info: (c, message, meta) => send(c, { level: "info", message, meta: { ...(meta ?? {}) } }),
  };
}
