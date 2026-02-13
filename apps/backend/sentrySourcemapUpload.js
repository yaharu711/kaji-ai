import { execSync } from "node:child_process";

// Sentryにエラーが出た時に、Stack Tracesを正しく表示するためのSource Mapアップロードスクリプト

const distDir = "./dist";

// 1 Debug IDsを注入
execSync(`npx sentry-cli sourcemaps inject ${distDir}`, { stdio: "inherit" });

// 2 注入済みの成果物をSentryへアップロード
execSync(
  `npx sentry-cli sourcemaps upload --org ${process.env.SENTRY_ORG} --project ${process.env.SENTRY_PROJECT} ${distDir}`,
  { stdio: "inherit" },
);

// 3 公開防止のため .map を削除（Sentryにアップロード済みなので復元は可能）
execSync(`find ${distDir} -name "*.map" -type f -delete`, { stdio: "inherit" });
