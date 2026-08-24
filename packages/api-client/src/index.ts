import { createClient, createConfig } from './generated/client/index.js';

export * from './generated/index.js';
export type { Client } from './generated/client/index.js';

export interface ApiClientOptions {
  /** Base URL of the NestJS API, e.g. http://localhost:3001 */
  baseUrl: string;
  /** WorkOS AuthKit access token, forwarded as a bearer credential. */
  accessToken?: string | null;
  /** Propagated so a browser request and its API call share a trace id. */
  requestId?: string;
  fetch?: typeof globalThis.fetch;
}

/**
 * Build an isolated client instance.
 *
 * Deliberately not the generated module-level singleton: on the server a
 * single process serves many users concurrently, so configuring a shared
 * client with `setConfig({ headers: { Authorization } })` would leak one
 * caller's token into another's request. Each call site creates its own
 * instance bound to that request's token.
 */
export function createApiClient({ baseUrl, accessToken, requestId, fetch }: ApiClientOptions) {
  const headers: Record<string, string> = {};

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  if (requestId) {
    headers['X-Request-Id'] = requestId;
  }

  return createClient(
    createConfig({
      baseUrl,
      headers,
      ...(fetch ? { fetch } : {}),
    }),
  );
}
