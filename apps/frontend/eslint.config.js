import path from "node:path";
import { fileURLToPath } from "node:url";

import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

import { sharedConfig } from "../../eslint.config.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const typeAwareConfigs = tseslint.configs.recommendedTypeChecked.map((config) => ({
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
