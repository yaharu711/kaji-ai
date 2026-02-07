import * as Sentry from "@sentry/vercel-edge";

import { createLogger } from "./logger";

export function initSentry() {
  const dsn = process.env.SENTRY_DSN;
  console.log("[sentry] init", { enabled: Boolean(dsn) });
  if (!dsn) return;
  console.log("[sentry] initializing Sentry SDK", process.env.APP_ENV);

  Sentry.init({
    dsn,
    environment: process.env.APP_ENV ?? process.env.VERCEL_ENV ?? "unknown",
    enabled: true,
    tracesSampleRate: 0.1,
  });
}

export { Sentry };

export const sentryCapture = {
  // 自動でstack traceとかつく、エラーを送るときに使う
  captureException: (err: unknown) => Sentry.captureException(err),
  // 自動でstack traceとかつかない、メッセージを送るだけで使う
  captureMessage: (message: string, level?: Sentry.SeverityLevel) =>
    Sentry.captureMessage(message, level),
  withScope: Sentry.withScope,
};

export const createSentryLogger = (feature?: string) =>
  createLogger({
    capture: ({ level, err, message, tags, contexts }) => {
      if (level === "info") return;
      console.log("[sentry] capturing before withScope", { level, message, tags, contexts });

      sentryCapture.withScope((scope) => {
        // withScope()の中にそもそも処理が入っていることを確認するためのログ
        console.log("[sentry] capturing in withScope", { level, message, tags, contexts });
        scope.setLevel(level);
        if (feature && !tags.feature) {
          scope.setTag("feature", feature);
        }
        for (const [key, value] of Object.entries(tags)) {
          scope.setTag(key, value);
        }
        for (const [key, value] of Object.entries(contexts)) {
          if (value === null || typeof value === "object") {
            scope.setContext(key, value as Record<string, unknown> | null);
          }
        }

        if (err) {
          console.log("[sentry] capturing start exception", { level, message, tags, contexts });
          sentryCapture.captureException(err);
          console.log("[sentry] captured exception");
        } else if (message) {
          console.log("[sentry] capturing start message!!", { level, message, tags, contexts });
          sentryCapture.captureMessage(message, level);
          console.log("[sentry] captured start message!!", { level, message, tags, contexts });
        }
      });
    },
  });
