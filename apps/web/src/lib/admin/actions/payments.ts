'use server';

import { adminResyncPayment } from '@repo/api-client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getAdminClient } from '../api';
import { withFlash } from './submit';

/**
 * Re-run the provider verification for one attempt, then land back on its
 * detail page. Idempotent by construction — a settled payment re-renders
 * unchanged — so this doubles as the "check again" button support reaches
 * for first.
 */
export async function resyncPaymentAction(reference: string): Promise<void> {
  const client = await getAdminClient();
  const result = await adminResyncPayment({ client, path: { reference } });
  revalidatePath(`/admin/payments/${reference}`);
  if (result.error !== undefined || !result.data) {
    redirect(
      withFlash(`/admin/payments/${reference}`, 'Re-sync failed — the provider did not answer.'),
    );
  }
  redirect(withFlash(`/admin/payments/${reference}`, `Re-synced: ${result.data.status}.`));
}
