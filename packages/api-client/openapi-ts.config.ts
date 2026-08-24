import { defineConfig } from '@hey-api/openapi-ts';

/**
 * Generates the typed API client from the NestJS OpenAPI document.
 *
 * The output under src/generated IS committed. Vercel builds only apps/web and
 * its dependency graph; generating at build time would drag apps/api — and a
 * full Nest bootstrap — into every web deploy. Committing keeps builds
 * deterministic, and CI guards against drift by regenerating and failing on a
 * non-empty `git diff`.
 */
export default defineConfig({
  input: '../../apps/api/openapi.json',
  output: {
    path: './src/generated',
    // Prettier/ESLint run over the repo as their own tasks; letting the
    // generator shell out to them here just makes codegen slower and its
    // output dependent on tool versions.
    postProcess: [],
  },
  plugins: ['@hey-api/client-fetch', '@hey-api/typescript', '@hey-api/sdk'],
});
