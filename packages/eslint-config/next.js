import globals from 'globals';
import tseslint from 'typescript-eslint';

import { config as base } from './base.js';

/**
 * Shared browser/React layer for the Next.js app.
 *
 * Deliberately does NOT pull in `eslint-config-next`. That package resolves
 * `next/dist/compiled/...` internals at load time, so it only works when it
 * sits next to an installed `next`. Under pnpm's isolated node_modules a copy
 * living in this package cannot see `apps/web`'s `next`. The app therefore
 * owns `eslint-config-next` directly and composes it on top of this — see
 * apps/web/eslint.config.js.
 */
export const config = tseslint.config(
  ...base,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      /* Server Components are async functions handed straight to JSX, which
         the default checksVoidReturn flags as a misused promise. */
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
    },
  },
);

export default config;
