#!/bin/sh
set -euo pipefail

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

if [ -n "${TEST_DATABASE_URL:-}" ]; then
  TEST_DB_URL="${TEST_DATABASE_URL}"
else
  TEST_DB_URL="$(node -e "try { const url = new URL(process.argv[1]); url.pathname = '/kaji_ai_test'; process.stdout.write(url.toString()); } catch (err) { console.error(err); process.exit(1); }" "${DEFAULT_DB_URL}")"
fi

run_migrate "${TEST_DB_URL}"

exec npm run dev --workspace apps/backend
