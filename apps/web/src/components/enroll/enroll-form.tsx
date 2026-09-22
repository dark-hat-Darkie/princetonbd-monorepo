'use client';

import Link from 'next/link';
import { useActionState, useId } from 'react';

import { errorIdFor, inputClass, labelClass } from '@/components/ui/form/input-class';
import { submitEnrollment } from '@/lib/enroll/actions';
import { initialEnrollState } from '@/lib/enroll/form-state';
import { formatFee, type EnrollTarget } from '@/lib/enroll';
import { cn } from '@/lib/cn';

/**
 * The enrollment details form: who is enrolling, then straight to payment.
 *
 * Same visual language as the enquiry form (card, echo band, pill submit)
 * so checkout feels like the site, not a third party bolted on. Progressive
 * like it too: a plain `<form action>` behind `useActionState`, so the POST
 * works before hydration and the client half only adds pending + errors.
 */
export function EnrollForm({
  target,
  defaultName,
}: {
  target: EnrollTarget;
  defaultName?: string;
}) {
  const [state, formAction, pending] = useActionState(submitEnrollment, initialEnrollState);
  const formId = useId();
  const fieldId = (field: string) => `${formId}-${field}`;

  const { course, batch } = target;

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-lg border border-line bg-surface px-7 py-8 shadow-card sm:px-9 sm:py-10"
    >
      {state.message ? (
        <p
          role="alert"
          className="mb-7 rounded-sm border border-danger/30 border-l-[3px] border-l-danger bg-danger-soft px-5 py-4 text-[14.5px] leading-[1.55] text-ink-soft"
        >
          {state.message}
        </p>
      ) : null}

      <div className="mb-7 rounded-sm border border-brand/25 bg-brand-soft px-5 py-4 text-[14px] leading-[1.55] text-ink-soft">
        <span className="font-semibold text-ink">You&rsquo;re enrolling in:</span> {course.name}
        {batch
          ? ` · starts ${batch.startsOn}${batch.branch ? ` · ${batch.branch.name}` : ' · Live online'}`
          : null}
        {' · '}
        <span className="font-semibold text-ink">{formatFee(target.feeAmount)}</span>
        {' · '}
        <Link
          href={courseLink(course.slug)}
          className="text-brand-ink underline underline-offset-4"
        >
          change
        </Link>
        <FieldError
          id={errorIdFor(fieldId('course'))}
          message={state.errors?.courseId ?? state.errors?.batchId}
        />
      </div>

      <input type="hidden" name="courseId" value={course.id} />
      <input type="hidden" name="batchId" value={batch?.id ?? ''} />
      <input type="hidden" name="courseSlug" value={course.slug} />
      {state.enrollmentId ? (
        <input type="hidden" name="enrollmentId" value={state.enrollmentId} />
      ) : null}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Student name"
          id={fieldId('fullName')}
          error={state.errors?.fullName}
          defaultValue={state.values?.fullName ?? defaultName ?? ''}
          name="fullName"
          autoComplete="name"
          required
          className="sm:col-span-2"
        />
        <Field
          label="Date of birth"
          id={fieldId('dateOfBirth')}
          error={state.errors?.dateOfBirth}
          defaultValue={state.values?.dateOfBirth ?? ''}
          name="dateOfBirth"
          type="date"
          autoComplete="bday"
        />
        <Field
          label="Mobile number"
          id={fieldId('phone')}
          error={state.errors?.phone}
          defaultValue={state.values?.phone ?? ''}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="01700-000000"
        />
        <Field
          label="Education level"
          id={fieldId('educationLevel')}
          error={state.errors?.educationLevel}
          defaultValue={state.values?.educationLevel ?? ''}
          name="educationLevel"
          placeholder="HSC, O Level, Bachelors…"
        />
        <Field
          label="Institution"
          id={fieldId('institution')}
          error={state.errors?.institution}
          defaultValue={state.values?.institution ?? ''}
          name="institution"
          placeholder="School, college or university"
        />
        <Field
          label="Graduation year"
          id={fieldId('graduationYear')}
          error={state.errors?.graduationYear}
          defaultValue={state.values?.graduationYear ?? ''}
          name="graduationYear"
          inputMode="numeric"
          placeholder="2024"
        />
        <Field
          label="Address line 1"
          id={fieldId('addressLine1')}
          error={state.errors?.addressLine1}
          defaultValue={state.values?.addressLine1 ?? ''}
          name="addressLine1"
          autoComplete="address-line1"
          className="sm:col-span-2"
        />
        <Field
          label="Address line 2 (optional)"
          id={fieldId('addressLine2')}
          error={state.errors?.addressLine2}
          defaultValue={state.values?.addressLine2 ?? ''}
          name="addressLine2"
          autoComplete="address-line2"
          className="sm:col-span-2"
        />
        <Field
          label="City"
          id={fieldId('city')}
          error={state.errors?.city}
          defaultValue={state.values?.city ?? ''}
          name="city"
          autoComplete="address-level2"
        />
        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId('notes')} className={labelClass}>
            Anything we should know? <span className="text-muted-2">(optional)</span>
          </label>
          <textarea
            id={fieldId('notes')}
            name="notes"
            rows={3}
            defaultValue={state.values?.notes ?? ''}
            className={cn(inputClass(Boolean(state.errors?.notes)), 'resize-y')}
          />
          <FieldError id={errorIdFor(fieldId('notes'))} message={state.errors?.notes} />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-8 inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-ink px-[30px] py-4 text-[15px] font-semibold text-on-ink shadow-cta transition-colors duration-200 hover:bg-ink-soft disabled:cursor-progress disabled:opacity-70"
      >
        {pending ? 'Starting secure checkout…' : `Pay ${formatFee(target.feeAmount)} securely`}
      </button>

      <p className="mt-4 text-[12.5px] leading-[1.5] text-muted-2">
        You will pay on our secure SSLCommerz checkout. Your seat is confirmed only after the
        payment verifies — simply returning here without paying enrolls nothing. Read our{' '}
        <Link href="/legal/enrollment-terms" className="text-ink underline">
          enrollment terms
        </Link>
        .
      </p>
    </form>
  );
}

function courseLink(slug: string): string {
  return `/test-prep/${slug}`;
}

function Field({
  label,
  id,
  error,
  className,
  ...input
}: {
  label: string;
  id: string;
  error?: string;
} & React.ComponentPropsWithoutRef<'input'>) {
  return (
    <label htmlFor={id} className={cn(labelClass, 'flex flex-col gap-2', className)}>
      {label}
      <input
        {...input}
        id={id}
        aria-describedby={error ? errorIdFor(id) : undefined}
        aria-invalid={error ? true : undefined}
        className={inputClass(Boolean(error))}
      />
      <FieldError id={errorIdFor(id)} message={error} />
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span id={id} className="block text-[13px] leading-[1.4] text-danger">
      {message}
    </span>
  );
}
