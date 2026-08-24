import globals from 'globals';
import tseslint from 'typescript-eslint';

import { config as base } from './base.js';

/** Flat config for the NestJS API. */
export const config = tseslint.config(...base, {
  languageOptions: {
    globals: { ...globals.node },
  },
  rules: {
    /* `@Module({...}) export class AppModule {}` is an empty class by design. */
    '@typescript-eslint/no-extraneous-class': 'off',
    /* Nest resolves providers by decorator metadata, so parameter properties
       are the idiomatic injection form. */
    '@typescript-eslint/parameter-properties': 'off',
    /* Interfaces used purely as DI tokens legitimately have no members. */
    '@typescript-eslint/no-empty-interface': 'off',
  },
});

export default config;
