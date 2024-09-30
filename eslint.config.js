// eslint.config.js
import { defineConfig } from 'eslint-define-config';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier'; // Prettier 플러그인 추가
import prettierConfig from 'eslint-config-prettier'; // Prettier 설정 추가

export default defineConfig([
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        // 필요에 따라 전역 변수 추가
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      typescript: typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // Prettier 규칙 적용 (Prettier 규칙을 ESLint 규칙으로 사용)
    },
  },
  prettierConfig, // Prettier 설정 추가
]);
