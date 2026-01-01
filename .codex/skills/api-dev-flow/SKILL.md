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
