# 汎用コンポーネント作成時のチェックリスト

新規コンポーネント（Button/Modal などの共通 UI）を追加・改修する際は、以下を順に確認してください。

1. **デザイン / 設計**
   - `className` / `style` を props で受け取らない（アプリ全体の一貫性を守る）。
   - サイズ・角丸・バリアントなどは **定数マップ**（例: `SIZE_CLASS`, `RADIUS_CLASS`, `VARIANT_CLASS`）で管理し、指定したキーに紐づくスタイルのみ適用する。
   - スタイルは **CSS Modules** で実装し、色・影・背景は `src/theme.css` のトークンを必ず参照。足りないトークンを追加する場合は、用途と意図をコメントで添える。
   - 既存のトーン＆マナー（グラデーション、影、角丸感）に合わせる。レイアウトやインタラクションの見え方は既存コンポーネントを踏襲する。

2. **アクセシビリティ**
   - Radix UI などのヘッドレスコンポーネントを活用し、`aria-*` が適切になるようにする（例: `Dialog.Title`/`Dialog.Description`）。
   - フォーカスリングをカスタムしている場合でもキーボード操作で視認できることを確認。

3. **ストーリー / ドキュメント**
   - Storybook の stories を追加。最低限:
     - デフォルトの表示
     - バリアントごとの表示
     - サイズ／角丸など可変パラメータのサンプル
     - `disabled` 状態（操作不能時の見え方確認用）
   - レイアウトは `layout: "centered"` など用途に合うものを設定。

4. **型 / props 設計**
   - 受け付ける props は必要最小限。`ButtonHTMLAttributes` などを継承する場合は `className`/`style` を除外する。
   - イベントハンドラは `void` を返す通常のコールバックで統一。

5. **開発フロー**
   - コードを書いたら必ず `npm run lint`と`npm run test` を実行（AGENTS.md での約束事項）。
   - 可能なら Storybook で目視確認してから PR へ。
   - 追加したテーマトークンや挙動の意図はコメントで明示する。

6. **作成するファイルと命名**
   - ファイル構成は `components/ComponentName/index.tsx` と `ComponentName.module.css`、`ComponentName.stories.tsx` を基本形にする。
   - エクスポートは `components/index.ts` に追記しておく。

このチェックリストを満たせば、既存の Button / Modal と同等の一貫性で汎用コンポーネントを追加できます。新しい要件が出たら本ドキュメントを更新してください。
