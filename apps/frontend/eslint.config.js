// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import path from "node:path";
import { fileURLToPath } from "node:url";

import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

import { sharedConfig } from "../../eslint.config.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// - no-unsafe-assignmentのような型情報がない時に検知ができる
// - any型にキャストしてしまっている時も検知できる
// - nullチェックがされないまま放置されることもlintで防げる
// - Promise型ではないのに、awaitをつけているのも検知できる
const baseTypeAwareConfigs = [
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
];

const typeAwareConfigs = baseTypeAwareConfigs.map((config) => ({
  ...config,
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ...(config.languageOptions ?? {}),
    parserOptions: {
      ...(config.languageOptions?.parserOptions ?? {}),
      project: ["./tsconfig.app.json", "./tsconfig.node.json"],
      tsconfigRootDir: dirname,
    },
    globals: {
      ...(config.languageOptions?.globals ?? {}),
      ...globals.browser,
    },
  },
}));

export default defineConfig([
  ...sharedConfig,
  ...typeAwareConfigs,
  ...storybook.configs["flat/recommended"],
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactRefresh.configs.vite.rules,
    },
  },
]);
