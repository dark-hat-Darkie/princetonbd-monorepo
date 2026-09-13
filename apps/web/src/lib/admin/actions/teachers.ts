'use server';

import { adminCreateTeacher, adminDeleteTeacher, adminUpdateTeacher } from '@repo/api-client';
import { redirect } from 'next/navigation';

import { getAdminClient } from '../api';
import type { AdminFormState } from '../form-state';
import { revalidateCms } from '../revalidate';
import { teacherFormOptions, teacherSchema } from '../schemas/teacher';
import { submitCommand, submitForm, withFlash } from './submit';

export async function createTeacherAction(
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const client = await getAdminClient();
  const result = await submitForm({
    formData,
    schema: teacherSchema,
    options: teacherFormOptions,
    send: (body) => adminCreateTeacher({ client, body }),
  });
  if (!result.ok) return result.state;

  revalidateCms();
  redirect(withFlash('/admin/teachers', 'Teacher created'));
}

export async function updateTeacherAction(
  id: string,
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const client = await getAdminClient();
  const result = await submitForm({
    formData,
    schema: teacherSchema,
    options: teacherFormOptions,
    send: (body) => adminUpdateTeacher({ client, path: { id }, body }),
  });
  if (!result.ok) return result.state;

  revalidateCms();
  redirect(withFlash('/admin/teachers', 'Teacher saved'));
}

export async function deleteTeacherAction(id: string): Promise<void> {
  const client = await getAdminClient();
  const problem = await submitCommand(() => adminDeleteTeacher({ client, path: { id } }));
  if (problem) {
    redirect(withFlash(`/admin/teachers/${id}`, problem));
  }

  revalidateCms();
  redirect(withFlash('/admin/teachers', 'Teacher deleted'));
}
