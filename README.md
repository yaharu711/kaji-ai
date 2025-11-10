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
│     ├─ api/index.ts     # Vercel から利用されるエントリブリッジ（dist/entry.edge.js を再利用）
│     ├─ src/
│     │  ├─ entry.edge.ts     # Vercel Edge 用のエントリ
│     │  ├─ entry.local.ts    # ローカル Node.js サーバー起動用エントリ
│     │  ├─ db/              # schema 定義と Drizzle クライアント
│     │  ├─ repositories/    # DB へアクセスするリポジトリ層
│     │  └─ routing/         # Hono のルーティング定義
│     └─ tests/              # Vitest（DB 結合テストを含む）
```

## Node.js + TypeScript + ESM 方針

- `package.json` は `"type": "module"`、`tsconfig.json` の `module` / `moduleResolution` は `NodeNext` で統一し、Node.js v20 以降で推奨されるESM構成に合わせています。
  - (参考) https://blog.koh.dev/2024-04-23-nodejs-typescript-module/#%E6%96%B0%E8%A6%8F%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88
- すべての相対 `import` / `export` では **最終的に生成される `.js` ファイル名まで含めて記述** します（例: `import app from "./routing/index.js";`）。ES Modules では拡張子や `index` の自動解決がないため、ランタイムとビルド成果物の整合性を保証するためのルールです。
- Vercel や Supabase などESMネイティブなサービスとの互換性を優先し、CommonJSへのダウングレードは行いません。`api/index.ts` は `dist/entry.edge.js`（Edge 用）を再エクスポートする薄いブリッジで、ローカルは `entry.local.ts` から Node.js サーバーを起動します。

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

- ルート直下の `.env` には `DATABASE_URL` / `POSTGRES_USER`（ローカル Postgres 利用時のみ）に加えて **必ず `TEST_DATABASE_URL`** を定義してください。`apps/backend/docker/docker-entrypoint.sh` は開発用 DB とテスト用 DB の両方に migrate を流す設計になっており、どちらかが欠けると起動前にエラーで停止します。Drizzle Kit もこのファイルを参照します（`apps/backend/drizzle.config.cjs`）。
- `apps/backend/.env.test` はテスト専用です。Vitest 実行時に読み込まれる `DATABASE_URL` に加え、Docker 上でも同じ値を共有したい場合は `TEST_DATABASE_URL` を必ず定義してください。
  - まず `cp apps/backend/.env.test.example apps/backend/.env.test` でテンプレートをコピーしてから値を調整すると楽です。
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

- `apps/backend/api/index.ts` が Vercel の「ファイルベースルーティング」で検出されるエントリポイントで、`dist/entry.edge.js`（Edge Runtime 用）を再エクスポートするだけの薄いファイルです。
- `src/entry.edge.ts` が Vercel Edge 上で動く Hono アプリ本体、`src/entry.local.ts` がローカル開発用に `@hono/node-server` で HTTP サーバーを立ち上げるファイルです。Edge 環境に Node 固有のモジュールが混ざらないよう完全に分離しています。
- Postgres ドライバの都合で Node.js Runtime 固定です（Edge Runtime を使いたい場合は別エントリを用意してください）。

---

## 今後の予定

- 共有スキーマ（`packages/schema`）を追加し、バックエンドとフロントエンドで zod 定義を共通化する。
- フロントエンドは Vite + React + TanStack Query を想定し、`apps/frontend` に構築する。

---
