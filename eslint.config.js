import path from 'node:path'
import { fileURLToPath } from 'node:url'

import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import { FlatCompat } from '@eslint/eslintrc'

const projectRoot = path.dirname(fileURLToPath(new URL(import.meta.url)))
const compat = new FlatCompat({ baseDirectory: projectRoot })

export const sharedConfig = tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/eslint.config.js'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends('prettier'),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: globals.es2021,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  }
)

export default sharedConfig
