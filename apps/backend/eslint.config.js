import path from "node:path";
import { fileURLToPath } from "node:url";

import globals from "globals";

import { sharedConfig } from "../../eslint.config.js";
import { globalIgnores } from "eslint/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  ...sharedConfig,
  globalIgnores(["sentrySourcemapUpload.js"]),
  {
    files: ["src/**/*.{ts,tsx}", "api/**/*.ts", "tests/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.eslint.json"],
        tsconfigRootDir: dirname,
        ecmaVersion: 2021,
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];
