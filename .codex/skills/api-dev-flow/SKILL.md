---
name: api-dev-flow
description: End-to-end API開発フローとコード規約（Hono + Drizzle + zod + Vitest）を統一するスキル。kaiji-aiバックエンドで新規/既存APIを実装・修正する際に必ず使用し、リクエスト/レスポンス型定義、バリデーション、共通レスポンス、認証確認、リポジトリ層、ルーティングテストまで一貫した手順を提供する。
---

# API Dev Flow (kaiji-ai)

## 使うタイミング（トリガー）
- `apps/backend` で新しい API 追加・既存 API 改修を行うとき
- リクエスト/レスポンスの型や zod バリデーションを整備したいとき
- 共通エラーレスポンス(401/422/201など)や RPC 型補完を揃えたいとき
- ルーティング／リポジトリのテストを追加・更新するとき

## クイックフロー
1) **スキーマ定義**
   - リクエスト: `src/routing/schemas/requests/<endpoint>Request.ts` で zod。`export type XxxRequest = z.infer<...>`.
   - レスポンス: `src/routing/schemas/responses/<endpoint>Response.ts`。成功/エラー（422, 401 など共通スキーマは `responses/common.ts`）を型で明示。
2) **ルート実装 (`src/routing/<endpoint>.ts`)**
   - `validateJson(schema)` ミドルウェアで 422 を共通化。
   - 認証必須なら `verifyAuth` 経由。`authUser` がなければ `unauthorizedSchema`.
   - 成功時は成功スキーマを `parse` して返却（RPC 型に乗せるため）。
   - 現在時刻はハンドラ内で `const now = new Date();`
3) **リポジトリ層**
   - `src/models/` にドメインモデルを置き、リポジトリはモデル受け渡し。副作用メソッドは `Promise<void>` 方針。
4) **テスト**
   - ルーティング: `tests/routing/<endpoint>.test.ts` で `testClient<RoutingApp>`。`CreateXRequest` 型を import し、`postX` ヘルパー経由で `$post` を呼び型安全にする。
   - リポジトリ: TRUNCATE で初期化 → 必要な外部キーを挿入 → 期待件数/値を検証。日時は固定 `Date` を渡して一致を確認。
   - DB共有時はワーカ1つ or スキーマ分離で競合回避。
5) **型補完/RPC**
   - 成功・エラーともスキーマ経由で返し、`testClient.api...` の引数/戻り値が推論されるようにする。

## コーディング規約（抜粋）
- バリデーション: zod + `validateJson`。エラーは 422 にフィールド別 `errors[{field,message}]`.
- 認証: `verifyAuth` 通過後も `authUser` をチェックし、401 は `unauthorizedSchema`.
- レスポンス: 201 など成功時もスキーマ化し `parse` して返却。
- 副作用: `create` などは `Promise<void>`（ID生成は呼び出し側）。
- 日時: ハンドラ内で `new Date()` を生成し、テストでは固定日時を渡す。
- 依存追加: バリデーション用途のライブラリは `npm --workspace apps/backend install ...`

## よくある落とし穴と回避策
- 並列テストでレコード競合: ワーカ数1にするか、ワーカーごとにスキーマを分ける。
- `testClient` で `json` が `any` になる: リクエスト型を import し、ヘルパーで `$post({json: body})` を包む。
- 認証情報未挿入で外部キー違反: テストで `users` へ事前 insert。
- `now` をモジュールスコープに置かない。リクエストごとに生成。

## 追加で読むもの
- 共通レスポンススキーマ: `src/routing/schemas/responses/common.ts`
- バリデーション共通化: `src/routing/middlewares/validator.ts`
- 参考実装: `src/routing/groups.ts`, `tests/routing/groups.test.ts`, `src/repositories/group.repository.ts`
- ガイドライン総覧: `references/api-dev-guidelines.md`
