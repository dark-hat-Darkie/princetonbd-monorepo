'use server';

import { adminUpdateUserCounselor } from '@repo/api-client';
import { redirect } from 'next/navigation';

import { getAdminClient } from '../api';
import type { AdminFormState } from '../form-state';
import { counselorFormOptions, counselorSchema } from '../schemas/counselor';
import { submitForm, withFlash } from './submit';

export async function updateCounselorAction(
  id: string,
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const client = await getAdminClient();
  const result = await submitForm({
    formData,
    schema: counselorSchema,
    options: counselorFormOptions,
    send: (body) => adminUpdateUserCounselor({ client, path: { id }, body }),
  });
  if (!result.ok) return result.state;

  redirect(withFlash('/admin/students', 'Counselor saved'));
}
