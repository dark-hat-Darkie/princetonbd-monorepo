import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import { config as repoConfig } from '@repo/eslint-config/next';

/**
 * `eslint-config-next` is a dependency of this app rather than of
 * @repo/eslint-config: it resolves `next/dist/compiled/...` internals at load
 * time, so it only works when installed next to `next` itself.
 */
export default defineConfig([
  ...repoConfig,
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
