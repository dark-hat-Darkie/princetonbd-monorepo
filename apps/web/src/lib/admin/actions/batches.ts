'use server';

import { adminCreateBatch, adminDeleteBatch, adminUpdateBatch } from '@repo/api-client';
import { redirect } from 'next/navigation';

import { getAdminClient } from '../api';
import type { AdminFormState } from '../form-state';
import { revalidateCms } from '../revalidate';
import { batchFormOptions, batchSchema } from '../schemas/batch';
import { submitCommand, submitForm, withFlash } from './submit';

export async function createBatchAction(
  courseId: string,
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const client = await getAdminClient();
  const result = await submitForm({
    formData,
    schema: batchSchema,
    options: batchFormOptions,
    send: (body) => adminCreateBatch({ client, path: { courseId }, body }),
  });
  if (!result.ok) return result.state;

  revalidateCms({ courseSlugs: [result.data.courseSlug] });
  redirect(withFlash(`/admin/courses/${courseId}/batches`, 'Batch scheduled'));
}

export async function updateBatchAction(
  id: string,
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const client = await getAdminClient();
  const result = await submitForm({
    formData,
    schema: batchSchema,
    options: batchFormOptions,
    send: (body) => adminUpdateBatch({ client, path: { id }, body }),
  });
  if (!result.ok) return result.state;

  revalidateCms({ courseSlugs: [result.data.courseSlug] });
  redirect(withFlash(`/admin/courses/${result.data.courseId}/batches`, 'Batch saved'));
}

export async function deleteBatchAction(
  id: string,
  courseId: string,
  courseSlug: string,
): Promise<void> {
  const client = await getAdminClient();
  const problem = await submitCommand(() => adminDeleteBatch({ client, path: { id } }));
  if (problem) {
    redirect(withFlash(`/admin/courses/${courseId}/batches/${id}`, problem));
  }

  revalidateCms({ courseSlugs: [courseSlug] });
  redirect(withFlash(`/admin/courses/${courseId}/batches`, 'Batch deleted'));
}
