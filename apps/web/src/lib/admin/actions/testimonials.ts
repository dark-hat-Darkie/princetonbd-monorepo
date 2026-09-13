'use server';

import {
  adminCreateTestimonial,
  adminDeleteTestimonial,
  adminUpdateTestimonial,
} from '@repo/api-client';
import { redirect } from 'next/navigation';

import { getAdminClient } from '../api';
import type { AdminFormState } from '../form-state';
import { revalidateCms } from '../revalidate';
import { testimonialFormOptions, testimonialSchema } from '../schemas/testimonial';
import { submitCommand, submitForm, withFlash } from './submit';

export async function createTestimonialAction(
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const client = await getAdminClient();
  const result = await submitForm({
    formData,
    schema: testimonialSchema,
    options: testimonialFormOptions,
    send: (body) => adminCreateTestimonial({ client, body }),
  });
  if (!result.ok) return result.state;

  revalidateCms({ courseSlugs: result.data.courses.map((c) => c.slug) });
  redirect(withFlash('/admin/testimonials', 'Testimonial created'));
}

export async function updateTestimonialAction(
  id: string,
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const client = await getAdminClient();
  const result = await submitForm({
    formData,
    schema: testimonialSchema,
    options: testimonialFormOptions,
    send: (body) => adminUpdateTestimonial({ client, path: { id }, body }),
  });
  if (!result.ok) return result.state;

  revalidateCms({ courseSlugs: result.data.courses.map((c) => c.slug) });
  redirect(withFlash('/admin/testimonials', 'Testimonial saved'));
}

export async function deleteTestimonialAction(id: string): Promise<void> {
  const client = await getAdminClient();
  const problem = await submitCommand(() => adminDeleteTestimonial({ client, path: { id } }));
  if (problem) {
    redirect(withFlash(`/admin/testimonials/${id}`, problem));
  }

  revalidateCms();
  redirect(withFlash('/admin/testimonials', 'Testimonial deleted'));
}
