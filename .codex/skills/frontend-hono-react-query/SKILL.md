---
name: frontend-hono-react-query
description: kaiji-aiフロントエンドでHonoのhcクライアントとTanStack Queryを使ってAPI呼び出し・データ取得フックを実装するための最小手順とディレクトリ構成ガイド。フロントでバックエンドRPC型を参照しつつ、MSWモックやStorybookでも動くように設定するときに使う。
---

# Frontend Hono + React Query ガイド（kaiji-ai）

## 使うタイミング（トリガー）
- フロントで新しいAPIモジュールや取得系フックを追加するとき（hc + useQuery）
- APIクライアントを共通化したいとき（credentials: include などの設定を一元化）
- Storybook/MSWでモックしつつCORSを避けたいとき
- バックエンドの型（AppRoutes / DTO / AppSessionUser）をフロントから参照したいとき

## ディレクトリ構成パターン
- `src/api/client.ts` … hcクライアントを1か所に集約。`backendOrigin`は `VITE_BACKEND_ORIGIN?.trim() ?? ""` で、未設定なら相対パス→MSWが捕捉しやすい。`fetch`は`credentials: "include"`をデフォルト付与。
- `src/api/<resource>/index.ts` … リソース別にAPIメソッドをまとめる。例: `groups/index.ts` で `const groupsApi = honoClient.api.groups; export const fetchGroups = async () => { ... }`
- `src/pages/<feature>/hooks/` … 取得フックを配置。`useGroupsQuery` のように`queryFn`でAPIメソッドを呼ぶ。
- `src/pages/<feature>/hooks/queryKeys.ts` … `const GROUPS_QUERY_KEY = ["groups"] as const;`

## React Query設定
- `main.tsx` で `new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false }}})` を作成し、`QueryClientProvider` でアプリをラップする。
- Storybookでも同様に各ストーリーのデコレータ内で `QueryClient` を生成し、`QueryClientProvider` でラップ。

## APIメソッド実装の型付け
- バックエンドの型を type-only import: `import type { RoutingApp } from "../../../../backend/src/routing";` など。バンドルに含まれないのでコスト最小。
- 応答スキーマ型（例: `GetGroupsResponse`）を使い、`res.ok` で判定して `throw new Error(...)` する簡潔なエラーハンドリング。

## MSW / Storybook でのモック
- `public/mockServiceWorker.js` を `npx msw init public --save` で配置。
- `.storybook/preview.ts` で `initialize` ＋ `mswLoader` を登録（旧 `mswDecorator` は非推奨）。
- ストーリーごとに `parameters.msw.handlers` を設定。URLは相対/絶対どちらでも拾えるよう `http.get(/\\/api\\/groups$/,... )` のように正規表現で書く。
- APIクライアントは `backendOrigin` が空のとき相対パスでリクエスト → MSWが確実に捕捉する。

## Lintで躓かないために
- ESLint設定の `globalIgnores` に `public/mockServiceWorker.js` を入れる（TypeScriptパーサが複数tsconfigを検出する問題を回避）。
- StorybookのStoryは `@storybook/react-vite` から型をimport（`@storybook/react`直 import はlint違反）。

## バックエンド型をフロントで安全に使う手順（契約ファイル一本化）
**なぜ @kaiji-ai/backend パッケージ経由にするのか**  
- モノレポ内の相対import（例: `../../backend/src/...`）だと、実装ソースを辿って Drizzle などバックエンド依存まで読み込まれ、フロントビルドが失敗することがある。  
- パッケージの exports で「型だけ」を公開し、`emitDeclarationOnly` した .d.ts を参照させることで、余計な依存をフロントに引き込まずに型補完を維持できる。  
- `file:../backend` + `prepare` で型生成を自動化すると、CI/Vercelでも型が常に揃う。

**なぜ barrel を使うのか**  
- リクエスト/レスポンス型が増えるたびに複数ファイルへ import 先を追加する手間と漏れを防ぐため。  
- `schemas/{requests,responses}/index.ts` → `schemas/index.ts` → `types/contracts.ts` の1本に集約することで、追加時は barrel に1行足すだけで全利用箇所へ行き渡る。

1. **バックエンドで型用エントリを分離**
   - `src/types/app-routes.ts` … `export type AppRoutes = typeof app;`（ルート用）
   - `src/routing/schemas/{requests,responses}/index.ts` を barrel 化。
   - `src/types/contracts.ts` … `export * from "../routing/schemas"; export type { AppSessionUser } from "./auth";`
2. **型だけを出力する tsconfig を用意**
   - `tsconfig.types.json`: `emitDeclarationOnly: true`, `outDir: "dist/types"`, `include: ["src/types/*.ts"]`
3. **package.json の exports で型を公開**
   ```json
   "exports": {
     ".": "./dist/entry.edge.js",
     "./app-routes": { "types": "./dist/types/types/app-routes.d.ts", "import": "./dist/types/types/app-routes.d.ts" },
     "./contracts": { "types": "./dist/types/types/contracts.d.ts", "import": "./dist/types/types/contracts.d.ts" }
   },
   "types": "./dist/types/types/app-routes.d.ts",
   "scripts": { "build:types": "tsc -p tsconfig.types.json", "prepare": "npm run build:types" }
   ```
   - `prepare` により依存インストール時に型が自動生成される（CI/Vercel対応）。
4. **フロントでの import 例**
   - `hc` の型: `import type { AppRoutes } from "@kaiji-ai/backend/app-routes";`
   - DTO/ユーザー型: `import type { GetGroupsResponse, AppSessionUser } from "@kaiji-ai/backend/contracts";`
5. **CI/デプロイ**
   - 通常は追加の前処理不要（`prepare` が型生成を担保）。`prepare` を無効化する場合のみ、フロントビルド前に `npm --workspace apps/backend run build:types` を挟む。

## 実装手順まとめ（最短ルート）
1. `src/api/client.ts` を用意し、hcクライアント＋`credentials: "include"`を共通化。
2. `src/api/<resource>/index.ts` にAPIメソッドを実装（バックエンド型をtype import）。
3. `queryKeys.ts` でクエリキー定義、`use<Thing>Query` を作成。
4. `main.tsx` と Storybookデコレータで `QueryClientProvider` をセットし、`refetchOnWindowFocus: false` を指定。
5. MSWのワーカーを生成し、ストーリーでハンドラを登録。CORSが出るときはURLパターンと`backendOrigin`の相対化を確認。

これで hc + TanStack Query のパターンを一貫して適用できる。
