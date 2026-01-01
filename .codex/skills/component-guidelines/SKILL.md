---
name: component-guidelines
description: 汎用UIコンポーネント(Button/Modalなど)を新規追加・改修するときの社内ルールと手順。className/styleを受け付けない設計、テーマトークン使用、サイズ/角丸/バリアントを定数マップで管理、Storybookとlint実行などを指示する。これらのガイドが必要なときに使う。
---

# コンポーネント作成ガイド (概要)

このスキルは `docs/component-guidelines.md` のチェックリストを参照して、汎用コンポーネントを一貫したデザインで実装するための手順を提供する。

## 使い方
1. `docs/component-guidelines.md` を開き、チェックリストを順に確認する。
2. 必要なテーマトークンが足りなければ `apps/frontend/src/theme.css` に追加し、用途コメントを残す。
3. 新規コンポーネントは `components/<Name>/` に `index.tsx`, `<Name>.module.css`, `<Name>.stories.tsx` を作成し、`components/index.ts` にエクスポートを追加する。
4. props 設計では `className`/`style` を受け付けない。サイズ・角丸・バリアントは定数マップでスタイルを切り替える。
5. Storybook にはバリアント/サイズ/角丸/disabled などの代表ケースを用意する。
6. 実装後は必ず `npm run lint` を実行（AGENTS.md での約束事項）。

## 参照
- プロジェクト内: `docs/component-guidelines.md`
- テーマトークン: `apps/frontend/src/theme.css`

## メモ
- Radix UI 等のヘッドレスコンポーネントを優先利用し、a11y属性を確保する。
- 追加したテーマトークンは用途と意図をコメントで残す。
- 既存のトーン＆マナー（グラデーション、影、角丸感）を踏襲する。
