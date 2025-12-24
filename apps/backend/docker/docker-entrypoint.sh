#!/bin/sh
set -euo pipefail

# node_modules がボリュームで空になるため、起動時に依存をインストール
npm install --workspace apps/backend

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL が設定されていません。"
  exit 1
fi

run_migrate() {
  local url="$1"
  echo "Running migrations for ${url}"
  DATABASE_URL="$url" npm run migrate --workspace apps/backend
}

DEFAULT_DB_URL="${DATABASE_URL}"
run_migrate "${DEFAULT_DB_URL}"

if [ -z "${TEST_DATABASE_URL:-}" ]; then
  echo "TEST_DATABASE_URL が設定されていません。kaji_ai_test などテスト用DBの接続文字列を .env に追加してください。"
  exit 1
fi

run_migrate "${TEST_DATABASE_URL}"

exec npm run dev --workspace apps/backend
