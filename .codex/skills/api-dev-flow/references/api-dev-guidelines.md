# kaiji-ai API 開発ガイドライン（Hono + Drizzle + zod + Vitest）

## リクエスト/レスポンス設計
- **場所**: `apps/backend/src/routing/schemas/requests|responses/`
- **ルール**
  - リクエスト: zod で `XxxRequestSchema` を定義し、`export type XxxRequest = z.infer<...>`.
  - レスポンス: 成功/エラーともスキーマ化。成功例は `XxxSuccessSchema`（例: 201）、エラーは共通 `responses/common.ts`（401/422 など）。
  - RPC 型補完のため、ハンドラ内でスキーマを `parse` した値を返す。
  - バリデーション失敗は 422 を使い、`errors[{field,message}]` でフィールド別に返す。

## ルーティング実装
- **場所**: `apps/backend/src/routing/<endpoint>.ts`
- **手順**
  1. `validateJson(schema)` ミドルウェアで 422 エラーを共通化。
  2. 認証必須なら `verifyAuth` 経由。`authUser` が無ければ `unauthorizedSchema` で 401。
  3. 現在時刻はハンドラ内で `const now = new Date();` を生成。
  4. 成功レスポンスは成功スキーマを `parse` → `c.json(parsed, 201/200...)`.

## リポジトリ
- **場所**: `apps/backend/src/repositories/`
- **ルール**
  - ドメインモデルは `apps/backend/src/models/` に置き、リポジトリはモデルを受け取る/返す。
  - 副作用メソッド（create/update/delete）は `Promise<void>` 方針。ID 生成は呼び出し側。
  - 日時は呼び出し側から受け取り、テストで固定日時を渡せるようにする。

## テスト
- **ルーティングテスト**: `apps/backend/tests/routing/`
  - `testClient<RoutingApp>` を使用。`XxxRequest` 型を import し、ヘルパー経由で `$post({json: body})` を呼び型安全に。
  - 422 のエラー配列、201 の成功レスポンスを検証。
- **リポジトリテスト**: `apps/backend/tests/repositories/`
  - TRUNCATE で初期化 → 外部キーを満たすための初期データを insert → 件数/値を検証。
  - 固定日時を渡して `createdAt/updatedAt` の一致を確認。
- **並列実行**: DB 共有の場合はワーカ1つ、またはワーカーごとにスキーマ分離を検討。

## 共通スキーマ
- `responses/common.ts`: 401/422 用の共通スキーマと errorDetail。
- `middlewares/validator.ts`: `validateJson` で zod バリデーションと 422 応答を共通化。

## 参考実装
- ルート: `src/routing/groups.ts`
- テスト: `tests/routing/groups.test.ts`
- リポジトリ: `src/repositories/group.repository.ts`

## 依存
- zod, @hono/zod-validator, hono, drizzle-orm, @neondatabase/serverless, vitest
