import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

/**
 * Shared flat config for every TypeScript package in the repo.
 *
 * Uses `recommendedTypeChecked` + `stylisticTypeChecked` rather than
 * `strictTypeChecked`: TypeScript's own `strict: true` already carries the
 * type-safety load, while strictTypeChecked's unsafe-`any` family fires
 * constantly on framework-generated Next.js and NestJS code without catching
 * much real. Opt a package up by appending `tseslint.configs.strictTypeChecked`.
 *
 * Type-aware rules require `projectService`, which is why typescript-eslint
 * needs the TypeScript compiler API — and why this repo pins TypeScript 6.x.
 */
export const config = tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/.next/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/.turbo/**',
      '**/*.generated.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  // Config files are not part of any tsconfig project.
  {
    files: ['**/*.config.{js,mjs,cjs,ts}', '**/*.setup.ts'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: { 'no-console': 'off' },
  },
  eslintConfigPrettier,
);

export default config;
