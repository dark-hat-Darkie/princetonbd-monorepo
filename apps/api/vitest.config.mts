// .mts because this package is "type": "commonjs" and Vite's native config
// loader would otherwise parse this ES module as CommonJS.
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

/**
 * Vitest transpiles with esbuild, which does not implement
 * `emitDecoratorMetadata` — it transpiles file-by-file and has no type
 * information to emit. Without `design:paramtypes`, every Nest constructor
 * injection resolves to undefined and any test that builds a testing module
 * fails with "Nest can't resolve dependencies of X (?)".
 *
 * unplugin-swc swaps in SWC, which does emit that metadata. This is the same
 * reason `src/openapi/generate.ts` must run compiled rather than under tsx.
 */
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.spec.ts', 'test/**/*.e2e-spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts', 'src/main.ts', 'src/openapi/**'],
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
      jsc: {
        target: 'es2023',
        parser: { syntax: 'typescript', decorators: true },
        transform: { legacyDecorator: true, decoratorMetadata: true },
      },
    }),
  ],
});
