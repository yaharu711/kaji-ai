import * as Sentry from "@sentry/vercel-edge";

import { createLogger } from "./logger";

export function initSentry() {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return;

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
  captureException: (err: unknown) => {
    const result = Sentry.captureException(err);
    console.log("[sentry] captured exception and completed captureException", { result });
  },
  // 自動でstack traceとかつかない、メッセージを送るだけで使う
  captureMessage: (message: string, level?: Sentry.SeverityLevel) => {
    const result = Sentry.captureMessage(message, level);
    console.log("[sentry] captured message and completed captureMessage", { result });
  },
  withScope: Sentry.withScope,
};

export const createSentryLogger = (feature?: string) =>
  createLogger({
    capture: async ({ level, err, message, tags, contexts }) => {
      if (level === "info") return;
      sentryCapture.withScope((scope) => {
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
          sentryCapture.captureException(err);
        } else if (message) {
          sentryCapture.captureMessage(message, level);
        }
      });

      await Sentry.flush(2000);
    },
  });
