# Kaiji AI アプリ（バックエンド環境構築ガイド）

このリポジトリはモノレポ構成で、バックエンド（Hono）、フロントエンド（後日追加予定）、共有スキーマパッケージを同一リポジトリで管理します。ここでは **バックエンドを初めてセットアップする人向け** に環境構築の手順をまとめます。

---

## 前提ツール

- Node.js 20 以上（`node -v` で確認）
- npm 9 以上（ワークスペース機能を利用）
- Docker / Docker Compose

---

## ディレクトリ構成（抜粋）

```
kaiji-ai/
├─ package.json           # npm ワークスペース設定
├─ docker-compose.yml     # 開発用 Docker サービス定義
├─ apps/
│  └─ backend/            # 今回構築する Hono バックエンド
│     ├─ package.json
│     ├─ api/index.ts     # Vercel から利用されるエントリ
│     ├─ src/
│     │  ├─ entry.local.ts   # ローカル開発エントリ
│     │  ├─ entry.vercel.ts  # Vercel 用エントリ（Edge/Node 切替対応）
│     │  ├─ db/              # schema 定義と Drizzle クライアント
│     │  ├─ repositories/    # DB へアクセスするリポジトリ層
│     │  └─ routing/         # Hono のルーティング定義
│     └─ tests/              # Vitest（DB 結合テストを含む）
```

---

## セットアップ手順

1. **依存インストール（任意だが推奨）**

   ```bash
   npm install --workspace apps/backend
   ```

   - Docker を使う場合でも、IDE の補完用にローカルへ依存を展開しておくと便利です。

2. **Docker でバックエンドを起動**

   ```bash
   docker compose up backend
   ```

   - 初回起動時にイメージをビルドし、`http://localhost:3000/api/hello` で `{"message":"Hello World"}` が返ることを確認してください。
   - `docker compose down` で停止できます。

---

## 環境変数

- ルート直下の `.env` に `DATABASE_URL` / `POSTGRES_USER` などを定義します。Drizzle Kit もこのファイルを参照します（`apps/backend/drizzle.config.cjs`）。
- `apps/backend/.env.test` はテスト専用です。Vitest 実行時に必ず読み込まれるため、テスト DB を指す `DATABASE_URL` を用意してください。
- `NODE_ENV=production` で起動すると、DB クライアントが自動的に SSL を必須化します（`apps/backend/src/db/client.ts:1-22`）。

---

## DB マイグレーション

Drizzle Kit を利用しています。以下はバックエンドワークスペースで実行してください。

```bash
npm run migration:gen --workspace apps/backend
npm run migrate --workspace apps/backend
```

常に `.env` の `DATABASE_URL` を参照して適用されます。テスト DB に適用したい場合は一時的に環境変数を差し替えてください。
また、backendコンテナが立ち上がった時点で、開発環境・テスト環境のDBに対してmigrateが実行されるようになっています（`kaiji-ai/apps/backend/docker/docker-entrypoint.sh`）。

---

## テスト

- `npm run test --workspace apps/backend`
  - Vitest が `apps/backend/.env.test` を読み込み、テスト DB に接続します（`apps/backend/vitest.config.ts:1-20`）。
  - `tests/todo.repository.test.ts:1-47` のように実 DB を操作する結合テストが含まれるため、事前に Postgres（`docker compose up postgres` など）を起動しておく必要があります。
- API の疎通確認は `docker compose up backend` で `/api/hello` や `/api/todos` を叩くのが簡単です。

---

## Vercel へのデプロイの考え方

- `apps/backend/api/index.ts` が Vercel の「ファイルベースルーティング」で検出されるエントリポイントです。
- `src/entry.vercel.ts` で `export const config = { runtime: 'edge' | 'nodejs' }` を切り替え可能にしており、環境変数 `RUNTIME` を `edge`（既定）か `node` にセットすることで Edge Runtime / Node.js Serverless を選択できます。

例: Edge Runtime でデプロイ

```
RUNTIME=edge
```

例: DB などで Node.js Runtime が必要な場合

```
RUNTIME=node
```

---

## 今後の予定

- 共有スキーマ（`packages/schema`）を追加し、バックエンドとフロントエンドで zod 定義を共通化する。
- フロントエンドは Vite + React + TanStack Query を想定し、`apps/frontend` に構築する。

---
