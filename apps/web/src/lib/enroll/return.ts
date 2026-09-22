import 'server-only';

import { getEnrollmentPaymentStatus, type PaymentStatusDto } from '@repo/api-client';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { cookies } from 'next/headers';

import { getApiClient } from '@/lib/api';
import { enrollHref } from '@/lib/enroll';

/**
 * What a payment-return page knows. Both `/enroll/success` and
 * `/enroll/failed` resolve through here so the two pages cannot disagree.
 * The enrollment comes from the short-lived cookie parked at init — the
 * return URLs stay bare paths by design — and everything rendered comes
 * from a live server-side verification, never from the fact the browser
 * landed here.
 */
export type ReturnModel =
  | { kind: 'anonymous' }
  | { kind: 'missing' }
  | { kind: 'unreachable' }
  | { kind: 'unknown' }
  | { kind: 'verified'; status: PaymentStatusDto; retryHref: string };

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function retryFromContext(raw: string | undefined): string {
  if (raw) {
    try {
      const context = JSON.parse(raw) as { courseSlug?: unknown; batchId?: unknown };
      if (typeof context.courseSlug === 'string' && context.courseSlug) {
        return enrollHref({
          courseSlug: context.courseSlug,
          batchId: typeof context.batchId === 'string' && context.batchId ? context.batchId : null,
        });
      }
    } catch {
      /* A hand-edited cookie retries from the catalogue instead. */
    }
  }
  return '/test-prep';
}

export async function resolveReturn(): Promise<ReturnModel> {
  const { user } = await withAuth();
  /* Unreachable while the proxy matcher covers /enroll/*; kept so a matcher
     mistake renders the sign-in prompt instead of crashing. */
  if (!user) return { kind: 'anonymous' };

  const jar = await cookies();
  const retryHref = retryFromContext(jar.get('enroll_context')?.value);
  const client = await getApiClient();

  const id = jar.get('enroll_pending')?.value;
  if (!id || !UUID_PATTERN.test(id)) return { kind: 'missing' };

  let status: PaymentStatusDto;
  try {
    const result = await getEnrollmentPaymentStatus({ client, path: { id } });
    if (result.error !== undefined || !result.data) {
      if (result.response?.status === 404) return { kind: 'unknown' };
      return { kind: 'unreachable' };
    }
    status = result.data;
  } catch {
    return { kind: 'unreachable' };
  }

  return { kind: 'verified', status, retryHref };
}
