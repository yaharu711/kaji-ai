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
│     ├─ api/index.ts     # /api ルート用のエントリブリッジ
│     ├─ api/[[...path]].ts # /api 以下を丸ごと Edge エントリへ委譲するキャッチオール
│     ├─ src/
│     │  ├─ entry.edge.ts     # Vercel Edge 用のエントリ
│     │  ├─ entry.local.ts    # ローカル Node.js サーバー起動用エントリ
│     │  ├─ db/              # schema 定義と Drizzle クライアント
│     │  ├─ repositories/    # DB へアクセスするリポジトリ層
│     │  └─ routing/         # Hono のルーティング定義
│     └─ tests/              # Vitest（DB 結合テストを含む）
```

## Node.js + TypeScript + ESM 方針

- `package.json` は `"type": "module"`、`tsconfig.json` の `module` / `moduleResolution` は `ESNext` / `Bundler` に設定し、Edge Runtime や Bun などモダンな ESM 実行環境に最適化しています。
- 相対 `import` / `export` では **拡張子を付けない** 方針です。Bundler 解決により `import app from "./routing/index";` のように TypeScript でも Edge Runtime でも解決されます（local dev は `tsx` で src を直接実行）。
- Vercel や Supabase など ESM ネイティブなサービスとの互換性を優先し、CommonJS へのダウングレードは行いません。`api/index.ts` と `api/[[...path]].ts` が `src/entry.edge.ts`（ビルド済み `dist/entry.edge.js`）を再エクスポートするブリッジとなり、ローカルは `entry.local.ts` から Node.js サーバーを起動します。
  （TODO: ローカル環境でもvercelと同じ環境として、vercel devで立ち上げられるようにする予定）

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

- ルート直下の `.env` には `DATABASE_URL` / `POSTGRES_USER`（ローカル Postgres 利用時のみ）に加えて **必ず `TEST_DATABASE_URL`** を定義してください。`apps/backend/docker/docker-entrypoint.sh` は開発用 DB とテスト用 DB の両方に migrate を流す設計になっており、どちらかが欠けると起動前にエラーで停止します。Drizzle Kit もこのファイルを参照します（`apps/backend/drizzle.config.ts`）。
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

常に `.env` の `DATABASE_URL` を参照して適用されます。
また、backendコンテナが立ち上がった時点で、開発環境・テスト環境のDBに対してmigrateが実行されるようになっています（`kaiji-ai/apps/backend/docker/docker-entrypoint.sh`）。

---

## テスト

- `npm run test --workspace apps/backend`
  - Vitest が `apps/backend/.env.test` を読み込み、テスト用 DB に接続します（`apps/backend/vitest.config.ts:1-20`）。
  - `tests/todo.repository.test.ts:1-47` のように実 DB を操作する結合テストが含まれるため、事前に Postgres（`docker compose up postgres` など）を起動しておく必要があります。
- API の疎通確認は `docker compose up backend` で `/api/hello` や `/api/todos` を叩くのが簡単です。

---

## Vercel へのデプロイの考え方

- `apps/backend/api/index.ts` と `apps/backend/api/[[...path]].ts` が Vercel の「ファイルベースルーティング」で検出されるエントリポイントで、`dist/entry.edge.js`（Edge Runtime 用）を再エクスポートするだけの薄いファイルです。これにより `/api` および `/api/*` が同じ Edge Function にルーティングされます。
- `src/entry.edge.ts` が Vercel Edge 上で動く Hono アプリ本体、`src/entry.local.ts` がローカル開発用に `@hono/node-server` で HTTP サーバーを立ち上げるファイルです。Edge 環境に Node 固有のモジュールが混ざらないよう完全に分離しています。
- DB には Neon（HTTP 接続）を使用しているため、Edge Runtime でも問題なく動作します。Node.js Runtime を使いたい場合は `entry.local.ts` をそのままデプロイすれば OK です。
