# 家事可視化アプリ Frontend

Vite + React で構築しているフロントエンドのドキュメントです。`apps/frontend` はモノレポ（npm workspaces）直下にあり、Storybook と Vitest を組み合わせて UI/ロジックを検証します。

## 技術スタック

- React 19 + TypeScript 5 / Vite 7
- Storybook 10（`@storybook/react-vite`、a11y・Docs・Vitest アドオン）
- Vitest 4 + Playwright（Chromium）
- ESLint Flat Config（`eslint-plugin-storybook` を含む）

## 主なディレクトリ

| パス                | 役割                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/`              | アプリ本体のコンポーネント群。今後こちらに実装を集約する                                                                                    |
| `.storybook/`       | Storybook 設定（`main.ts`, `preview.ts`, `vitest.setup.ts`）。Vitest から Storybook の設定を再利用できるよう `setProjectAnnotations` を実行 |
| `vitest.shims.d.ts` | `@vitest/browser-playwright` の型定義をグローバルに読み込むシム                                                                             |

## 開発コマンド

```bash
# 依存関係のインストール（モノレポ root で実行）
npm install

# フロントエンドの開発サーバー
npm run dev:frontend

# Storybook
npm run storybook --workspace apps/frontend

# ビルド
npm run build:frontend
```

## テスト戦略

### コマンド一覧

| コマンド                                 | 内容                                                                               |
| ---------------------------------------- | ---------------------------------------------------------------------------------- |
| `npm --workspace apps/frontend run test` | Vitest の全プロジェクト（unit + storybook）を実行。CI でもこのコマンドを利用       |
| `npx vitest run --project unit`          | JS/TS ファイル向けの通常テスト (`src/**/*.{test,spec}.{ts,tsx}`) を `jsdom` で実行 |
| `npx vitest run --project storybook`     | Storybook の play 関数＋a11y チェックを Playwright (Chromium) 上で実行             |

### Playwright の準備

- 初回のみ `cd apps/frontend && npx playwright install --with-deps chromium` を実行してください。ブラウザバイナリが `~/.cache/ms-playwright` に入るため、以降は `npm run test` だけで動きます。
- CI（`frontend-test.yml`）では毎回クリーン環境になるので、GitHub Actions 上で同コマンドを明示的に実行しています。

### Storybook × Vitest の連携

- `vite.config.ts` の `test.projects` で `unit` と `storybook` を分離しつつ同時に実行できる設計にしています。
- Storybook プロジェクトでは `storybookTest` プラグインがストーリーをテストケースとして読み込み、`@storybook/addon-a11y` が `axe-core` ベースでアクセシビリティ違反を検出します。
- 失敗例として `src/stories/Header.tsx` には意図的に `alt` 属性のない画像があり、`npx vitest run --project storybook` で a11y エラーが再現できます。

## Lint / フォーマット

- `npm run lint:frontend` … ESLint（Flat Config）を実行。Storybook の推奨ルールも読み込まれるため `*.stories.tsx` もチェック対象です。
- `npm run lint:frontend:fix` … ESLint の自動修正。
- `npm run format` … ルートの Prettier を利用。

## その他メモ

- `tsconfig.app.json` には `.storybook` を含めており、Storybook の設定ファイルでも型補完が効くようにしています。
- Storybook の Chromatic 連携は現在無効化済みです（必要になれば `@chromatic-com/storybook` を再インストールして `.storybook/main.ts` の addons に追加してください）。
