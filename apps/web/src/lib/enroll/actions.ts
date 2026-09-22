'use server';

import { createEnrollment, initEnrollmentPayment, updateEnrollmentDetails } from '@repo/api-client';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getApiClient } from '@/lib/api';
import { toFormError } from '@/lib/admin/api-errors';
import type { EnrollFormState } from './form-state';

/**
 * Checkout submission: draft → details → payment-init, then off to the
 * provider's hosted page.
 *
 * The three API calls run in order inside this one action so the browser
 * makes a single POST and lands on SSLCommerz directly. Anything failing
 * returns field errors in the same shape the admin forms render; only a
 * successful init redirects away.
 *
 * The enrollment id is parked in a short-lived cookie before leaving: the
 * provider returns the browser to a fixed success URL with no reference of
 * its own, so the return pages read this cookie to know what to verify.
 */

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function echo(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const key of [
    'fullName',
    'dateOfBirth',
    'phone',
    'educationLevel',
    'institution',
    'graduationYear',
    'addressLine1',
    'addressLine2',
    'city',
    'notes',
  ]) {
    values[key] = text(formData, key);
  }
  return values;
}

export async function submitEnrollment(
  previous: EnrollFormState,
  formData: FormData,
): Promise<EnrollFormState> {
  const { user } = await withAuth();
  if (!user) {
    redirect('/sign-in');
  }

  const values = echo(formData);
  const fail = (message: string, errors: Record<string, string> = {}): EnrollFormState => ({
    status: 'error',
    message,
    errors,
    values,
    enrollmentId: previous.enrollmentId ?? text(formData, 'enrollmentId') ?? undefined,
  });

  const courseId = text(formData, 'courseId');
  const batchRaw = text(formData, 'batchId');
  const batchId = batchRaw === '' ? null : batchRaw;
  if (!UUID_PATTERN.test(courseId)) {
    return fail('That course is no longer available. Pick a course and try again.', {
      courseId: 'Course no longer available',
    });
  }
  if (batchId && !UUID_PATTERN.test(batchId)) {
    return fail('That batch is no longer available. Pick a batch and try again.', {
      batchId: 'Batch no longer available',
    });
  }

  const fullName = values.fullName ?? '';
  if (fullName.length < 2) {
    return fail('Some fields need attention.', { fullName: 'Enter the student name' });
  }
  const dateOfBirth = values.dateOfBirth ?? '';
  if (dateOfBirth !== '' && (!DATE_PATTERN.test(dateOfBirth) || dateOfBirth >= todayDhaka())) {
    return fail('Some fields need attention.', {
      dateOfBirth: 'Date of birth must be a past date, YYYY-MM-DD',
    });
  }
  const graduationYearRaw = values.graduationYear ?? '';
  let graduationYear: number | undefined;
  if (graduationYearRaw !== '') {
    graduationYear = Number(graduationYearRaw);
    if (!Number.isInteger(graduationYear) || graduationYear < 1980 || graduationYear > 2100) {
      return fail('Some fields need attention.', {
        graduationYear: 'Graduation year must be between 1980 and 2100',
      });
    }
  }

  const client = await getApiClient();

  /* Draft first (idempotent per learner+batch), so a retry after a details
     failure resumes the same enrollment instead of opening a second one. */
  const draftId = previous.enrollmentId ?? text(formData, 'enrollmentId');
  let enrollmentId = draftId && UUID_PATTERN.test(draftId) ? draftId : null;
  if (!enrollmentId) {
    const created = await createEnrollment({ client, body: { courseId, batchId } });
    if (created.error !== undefined || !created.data) {
      const mapped = toFormError(created.error, created.response);
      return {
        status: 'error',
        message: mapped.message,
        errors: mapped.errors,
        values,
      };
    }
    enrollmentId = created.data.id;
  }

  const details = await updateEnrollmentDetails({
    client,
    path: { id: enrollmentId },
    body: {
      fullName,
      ...(dateOfBirth !== '' ? { dateOfBirth } : {}),
      ...(values.phone !== '' ? { phone: values.phone } : {}),
      ...(values.educationLevel !== '' ? { educationLevel: values.educationLevel } : {}),
      ...(values.institution !== '' ? { institution: values.institution } : {}),
      ...(graduationYear !== undefined ? { graduationYear } : {}),
      ...(values.addressLine1 !== '' ? { addressLine1: values.addressLine1 } : {}),
      ...(values.addressLine2 !== '' ? { addressLine2: values.addressLine2 } : {}),
      ...(values.city !== '' ? { city: values.city } : {}),
      ...(values.notes !== '' ? { notes: values.notes } : {}),
    },
  });
  if (details.error !== undefined || !details.data) {
    const mapped = toFormError(details.error, details.response);
    return {
      status: 'error',
      message: mapped.message,
      errors: mapped.errors,
      values,
      enrollmentId,
    };
  }

  const payment = await initEnrollmentPayment({ client, path: { id: enrollmentId } });
  if (payment.error !== undefined || !payment.data) {
    const mapped = toFormError(payment.error, payment.response);
    return {
      status: 'error',
      message: mapped.message,
      errors: mapped.errors,
      values,
      enrollmentId,
    };
  }

  /* Parked before leaving for the provider: the fixed return URL carries no
     reference, so the return pages read these to know what to verify and
     where a retry should point. */
  const jar = await cookies();
  jar.set('enroll_pending', enrollmentId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 6 * 60 * 60,
  });
  jar.set(
    'enroll_context',
    JSON.stringify({ courseSlug: text(formData, 'courseSlug'), batchId: batchRaw }),
    { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 6 * 60 * 60 },
  );
  redirect(payment.data.paymentUrl);
}

/** Dhaka calendar day, YYYY-MM-DD — same rule the API enforces. */
function todayDhaka(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}
