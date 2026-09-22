import 'server-only';

import { getWorkOS } from '@workos-inc/authkit-nextjs';
import { getWebServerEnv } from '@repo/env/web';

/**
 * WorkOS User Management client for the custom auth pages.
 *
 * AuthKit's `getWorkOS()` builds the SDK from `WORKOS_API_KEY` but carries
 * no client id, and the `clientId` authenticate-option falls back to the
 * constructor value — so every call site would silently send an empty one.
 * These helpers pin the validated `WORKOS_CLIENT_ID` from the server env
 * next to the client, so callers cannot forget it.
 */
export function workosClientId(): string {
  return getWebServerEnv().WORKOS_CLIENT_ID;
}

export function userManagement() {
  return getWorkOS().userManagement;
}
