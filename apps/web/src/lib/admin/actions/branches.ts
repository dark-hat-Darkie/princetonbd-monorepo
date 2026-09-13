'use server';

import { adminCreateBranch, adminDeleteBranch, adminUpdateBranch } from '@repo/api-client';
import { redirect } from 'next/navigation';

import { getAdminClient } from '../api';
import type { AdminFormState } from '../form-state';
import { revalidateCms } from '../revalidate';
import { branchFormOptions, branchSchema } from '../schemas/branch';
import { submitCommand, submitForm, withFlash } from './submit';

/**
 * Branch writes. Each one parses the form against `branchSchema`, calls the
 * API with the admin's token, and either returns the errors for the form or
 * refreshes the public site and redirects with a confirmation.
 *
 * Only async functions may live in a `'use server'` file; the schema and the
 * helpers are imported from beside it.
 */

export async function createBranchAction(
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const client = await getAdminClient();
  const result = await submitForm({
    formData,
    schema: branchSchema,
    options: branchFormOptions,
    send: (body) => adminCreateBranch({ client, body }),
  });
  if (!result.ok) return result.state;

  revalidateCms();
  redirect(withFlash('/admin/branches', 'Branch created'));
}

export async function updateBranchAction(
  id: string,
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const client = await getAdminClient();
  const result = await submitForm({
    formData,
    schema: branchSchema,
    options: branchFormOptions,
    send: (body) => adminUpdateBranch({ client, path: { id }, body }),
  });
  if (!result.ok) return result.state;

  revalidateCms();
  redirect(withFlash('/admin/branches', 'Branch saved'));
}

export async function deleteBranchAction(id: string): Promise<void> {
  const client = await getAdminClient();
  const problem = await submitCommand(() => adminDeleteBranch({ client, path: { id } }));
  if (problem) {
    redirect(withFlash(`/admin/branches/${id}`, problem));
  }

  revalidateCms();
  redirect(withFlash('/admin/branches', 'Branch deleted'));
}
