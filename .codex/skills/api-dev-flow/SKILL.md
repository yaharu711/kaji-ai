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

## 追加で読むもの
- 共通レスポンススキーマ: `src/routing/schemas/responses/common.ts`
- バリデーション共通化: `src/routing/middlewares/validator.ts`
- 参考実装: `src/routing/groups.ts`, `tests/routing/groups.test.ts`, `src/repositories/group.repository.ts`
- ガイドライン総覧: `references/api-dev-guidelines.md`

## 作業チェックリスト（新規API）
- スキーマ: `src/routing/schemas/requests|responses/` にリクエスト/レスポンス zod スキーマを追加。ハンドラで `.parse` した値を返す。
- ルート: `src/routing/<name>.ts` に Hono ルートを追加し、`validateJson` と認証チェックを適用。`src/routing/index.ts` へ登録。
- リポジトリ: 新規メソッドを `src/repositories/` に追加。副作用は `Promise<void>`、クエリはドメイン/DTOを返す。
- テスト: ルーティングテスト（`tests/routing/`）とリポジトリテスト（`tests/repositories/`）を必ず用意。新しいリポジトリメソッドを追加したら対応するリポジトリテストをセットで書く。

## テストの書き方メモ
- 共通準備: `beforeEach` で `user_group_belongings` など関連テーブルを TRUNCATE。`mockAuth` を import して認証を通し、外部キー用のユーザーを挿入。
- ルーティング: `testClient<RoutingApp>` を使い、エンドポイント単位で `describe("POST /api/xxx")` のように区切る。レスポンスの型（フィールド名・値）を検証し、422/401 などの共通スキーマも期待する。
- リポジトリ: Drizzle の生クエリで初期データを投入し、返り値や副作用を検証。日時は固定値を使って一致を確認する。集計系はフィルタ条件（例: `acceptedAt IS NOT NULL`）もテストする。
