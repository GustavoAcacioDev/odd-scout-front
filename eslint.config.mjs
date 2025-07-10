import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  {
    extends: compat.extends(
      '@rocketseat/eslint-config/next',
      'next/core-web-vitals',
    ),

    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'simple-import-sort/imports': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-var-requires': 'off',
      'handle-callback-err': 'warn',
    },
  },
])
