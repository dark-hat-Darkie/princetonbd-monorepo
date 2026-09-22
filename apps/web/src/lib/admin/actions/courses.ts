'use server';

import {
  adminCreateCourse,
  adminDeleteCourse,
  adminReplaceCourseTeachers,
  adminReplaceCurriculum,
  adminUpdateCourse,
} from '@repo/api-client';
import { redirect } from 'next/navigation';

import { getAdminClient } from '../api';
import type { AdminFormState } from '../form-state';
import { revalidateCms } from '../revalidate';
import { courseFormOptions, courseSchema } from '../schemas/course';
import { courseTeachersFormOptions, courseTeachersSchema } from '../schemas/course-teachers';
import { curriculumFormOptions, curriculumSchema } from '../schemas/curriculum';
import { submitCommand, submitForm, withFlash } from './submit';

/**
 * Course writes: the record, its curriculum and its teacher list.
 *
 * Every success expires the course's own public page outright (so the admin
 * sees the change on the very next visit) and marks the listings stale.
 * Curriculum and teacher replacements do not return the course, so the page
 * binds the slug in alongside the id.
 */

export async function createCourseAction(
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const client = await getAdminClient();
  const result = await submitForm({
    formData,
    schema: courseSchema,
    options: courseFormOptions,
    send: (body) => adminCreateCourse({ client, body }),
  });
  if (!result.ok) return result.state;

  revalidateCms({ courseSlugs: [result.data.slug] });
  redirect(withFlash(`/admin/courses/${result.data.id}`, 'Course created'));
}

export async function updateCourseAction(
  id: string,
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const client = await getAdminClient();
  const result = await submitForm({
    formData,
    schema: courseSchema,
    options: courseFormOptions,
    send: (body) => adminUpdateCourse({ client, path: { id }, body }),
  });
  if (!result.ok) return result.state;

  revalidateCms({ courseSlugs: [result.data.slug] });
  redirect(withFlash(`/admin/courses/${id}`, 'Course saved'));
}

export async function deleteCourseAction(id: string, slug: string): Promise<void> {
  const client = await getAdminClient();
  const problem = await submitCommand(() => adminDeleteCourse({ client, path: { id } }));
  if (problem) {
    redirect(withFlash(`/admin/courses/${id}`, problem));
  }

  revalidateCms({ courseSlugs: [slug] });
  redirect(withFlash('/admin/courses', 'Course deleted'));
}

export async function replaceCurriculumAction(
  id: string,
  slug: string,
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const client = await getAdminClient();
  const result = await submitForm({
    formData,
    schema: curriculumSchema,
    options: curriculumFormOptions,
    send: (body) => adminReplaceCurriculum({ client, path: { id }, body }),
  });
  if (!result.ok) return result.state;

  revalidateCms({ courseSlugs: [slug] });
  redirect(withFlash(`/admin/courses/${id}/curriculum`, 'Curriculum saved'));
}

export async function replaceCourseTeachersAction(
  id: string,
  slug: string,
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const client = await getAdminClient();
  const result = await submitForm({
    formData,
    schema: courseTeachersSchema,
    options: courseTeachersFormOptions,
    send: (body) => adminReplaceCourseTeachers({ client, path: { id }, body }),
  });
  if (!result.ok) return result.state;

  revalidateCms({ courseSlugs: [slug] });
  redirect(withFlash(`/admin/courses/${id}/teachers`, 'Teachers saved'));
}
