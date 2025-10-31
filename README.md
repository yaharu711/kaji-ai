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
│     │  ├─ entry.local.ts  # ローカル開発エントリ
│     │  ├─ entry.vercel.ts # Vercel 用エントリ（検証用としてEdge/Node 切替対応）
│     │  └─ routing/        # 機能別ルーティング（Hello など）
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

## テスト・今後の予定

- 次ステップとして、`apps/backend` に Vitest・hono のテストユーティリティを導入し、`/api/hello` のレスポンス検証を行う予定です。
- 共有スキーマ（`packages/schema`）を追加し、バックエンドとフロントエンドで zod 定義を共通化します。
- フロントエンドは Vite + React + TanStack Query を想定し、`apps/frontend` に構築します。

---
