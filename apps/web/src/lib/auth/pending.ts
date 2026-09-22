import { cookies } from 'next/headers';

/**
 * The email-verification pending state, parked between the password step and
 * the code step.
 *
 * The token is a credential — whoever holds it plus the emailed code can sign
 * in — so it travels in a short-lived httpOnly cookie, never in a URL (no
 * history, no referrer, no logs). Ten minutes matches the code's own
 * lifetime. The user id rides along when the sign-up step knows it, so the
 * verify page can offer a resend; the sign-in step does not know it, and the
 * resend affordance degrades accordingly.
 */
const PENDING_COOKIE = 'workos_pending';
const PENDING_MAX_AGE = 600;

export interface PendingAuth {
  token: string;
  userId?: string;
}

function cookieFlags() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    /* Local dev runs http; anything else is expected to terminate TLS. */
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: PENDING_MAX_AGE,
  };
}

export async function parkPendingAuth(pending: PendingAuth): Promise<void> {
  const jar = await cookies();
  jar.set(PENDING_COOKIE, JSON.stringify(pending), cookieFlags());
}

export async function peekPendingAuth(): Promise<PendingAuth | null> {
  const jar = await cookies();
  const raw = jar.get(PENDING_COOKIE)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<PendingAuth>;
    if (typeof parsed.token !== 'string' || parsed.token.length === 0) return null;
    return typeof parsed.userId === 'string' ? { token: parsed.token, userId: parsed.userId } : { token: parsed.token };
  } catch {
    return null;
  }
}

/** Read and clear: a code is single-use, so a consumed token must not linger. */
export async function takePendingAuth(): Promise<PendingAuth | null> {
  const pending = await peekPendingAuth();
  if (pending) {
    const jar = await cookies();
    jar.delete(PENDING_COOKIE);
  }
  return pending;
}
