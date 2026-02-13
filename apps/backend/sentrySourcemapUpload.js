import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

function run(cmd) {
  console.log(`\n$ ${cmd}`);
  execSync(cmd, {
    stdio: "inherit", // ✅ これで sentry-cli の stdout/stderr が Vercel ログに出る
    env: process.env, // 念のため明示
  });
}

const distDir = "./dist"; // ← build:vercel の出力先に合わせて変更

// 0) 事前チェック：dist の存在
if (!existsSync(distDir)) {
  throw new Error(`dist directory not found: ${distDir}`);
}

// 1) 事前チェック：必要な環境変数
// sentry-cli は SENTRY_AUTH_TOKEN / SENTRY_ORG / SENTRY_PROJECT を自動で読む
for (const key of ["SENTRY_AUTH_TOKEN", "SENTRY_ORG", "SENTRY_PROJECT"]) {
  if (!process.env[key]) {
    throw new Error(`Missing env: ${key} (set it in Vercel Environment Variables)`);
  }
}

// 2) sentry-cli の存在/バージョン確認（ここでエラー内容が出る）
run("npx sentry-cli --version");

// 3) Debug IDs 注入 → アップロード → map削除（公開防止）
run(`npx sentry-cli sourcemaps inject ${distDir}`);
run(`npx sentry-cli sourcemaps upload ${distDir}`);
run(`find ${distDir} -name "*.map" -type f -delete`);
