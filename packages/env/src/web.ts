import { z } from 'zod';

import { parseEnv } from './parse.js';

/**
 * Environment contract for the Next.js app (`apps/web`).
 *
 * Split into server and client halves deliberately. Next.js inlines
 * `NEXT_PUBLIC_*` at build time by statically replacing literal
 * `process.env.NEXT_PUBLIC_FOO` expressions — a dynamic lookup such as
 * `process.env[name]` is NOT replaced and reads as `undefined` in the browser.
 * That is why the client block below spells each variable out longhand.
 *
 * Server secrets are only ever read inside `getWebServerEnv()`, which throws if
 * called from the browser, so they cannot be pulled into a client bundle.
 */
const serverSchema = z.object({
  WORKOS_API_KEY: z.string().min(1),
  WORKOS_CLIENT_ID: z.string().min(1),
  /** AuthKit seals the session cookie with this. Must be >= 32 characters. */
  WORKOS_COOKIE_PASSWORD: z.string().min(32, 'must be at least 32 characters'),
});

const clientSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().min(1).describe('Base URL of the NestJS API'),
  NEXT_PUBLIC_WORKOS_REDIRECT_URI: z.string().min(1),
});

export type WebServerEnv = z.infer<typeof serverSchema>;
export type WebClientEnv = z.infer<typeof clientSchema>;

let cachedServer: WebServerEnv | undefined;
let cachedClient: WebClientEnv | undefined;

/* Checked via globalThis rather than a bare `window` reference so this package
   compiles against the Node lib set alone and needs no DOM types. */
const isBrowser = typeof globalThis !== 'undefined' && 'window' in globalThis;

export function getWebServerEnv(): WebServerEnv {
  if (isBrowser) {
    throw new Error('getWebServerEnv() was called in the browser. Use getWebClientEnv().');
  }
  cachedServer ??= parseEnv(serverSchema, process.env, 'web server');
  return cachedServer;
}

export function getWebClientEnv(): WebClientEnv {
  // Longhand on purpose — see the module comment.
  cachedClient ??= parseEnv(
    clientSchema,
    {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_WORKOS_REDIRECT_URI: process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI,
      SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION,
    },
    'web client',
  );
  return cachedClient;
}
