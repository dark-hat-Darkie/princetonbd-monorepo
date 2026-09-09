'use client';

import Link from 'next/link';
import { useActionState, useId } from 'react';

import { submitLead } from '@/lib/actions/lead';
import {
  initialLeadState,
  leadInterests,
  type LeadField,
  type LeadPrefill,
  type LeadState,
} from '@/lib/actions/lead-shape';
import { campuses } from '@/content/site/contact';
import { cn } from '@/lib/cn';

/**
 * The enquiry form behind every "book a consultation" call to action.
 *
 * Progressive by construction: `useActionState` wires a Server Action to a
 * plain `<form action>`, so the form posts and works before — and without —
 * hydration. The client half only adds the pending state and the inline errors.
 *
 * `prefill` seeds the selects from the page — the interest a lead page is
 * about, or the exam, campus and batch an exam page's "Reserve a seat" button
 * put in the URL. The batch travels as a hidden field and is echoed back in
 * words above the form so the visitor can see what they are asking about.
 */
export function LeadForm({ prefill }: { prefill?: LeadPrefill }) {
  const [state, formAction, pending] = useActionState<LeadState, FormData>(
    submitLead,
    initialLeadState,
  );
  const formId = useId();

  if (state.status === 'success') {
    return (
      <div
        role="status"
        className="rounded-lg border border-brand/25 bg-brand-soft px-8 py-10 shadow-card"
      >
        <div className="mb-3 text-[10.5px] font-bold tracking-[.16em] text-brand-ink uppercase">
          Received
        </div>
        <p className="font-display text-[24px] leading-[1.25] font-semibold tracking-[-.02em] text-ink">
          {state.message}
        </p>
      </div>
    );
  }

  const fieldId = (field: LeadField) => `${formId}-${field}`;
  const errorId = (field: LeadField) => `${formId}-${field}-error`;

  /* Once a submission has been rejected, the echoed values win over the
     page's prefill — otherwise a visitor who cleared the batch would see it
     come back. */
  const batch =
    state.values?.batch !== undefined
      ? state.values.batch
        ? { id: state.values.batch, label: prefill?.batch?.label ?? state.values.batch }
        : undefined
      : prefill?.batch;

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

      {batch ? (
        <div className="mb-7 rounded-sm border border-brand/25 bg-brand-soft px-5 py-4 text-[14px] leading-[1.55] text-ink-soft">
          <span className="font-semibold text-ink">You&rsquo;re enquiring about:</span>{' '}
          {batch.label}
          {' · '}
          <Link href="/contact" className="text-brand-ink underline underline-offset-4">
            change
          </Link>
          <FieldError id={errorId('batch')} message={state.errors?.batch} />
        </div>
      ) : null}

      <input type="hidden" name="batch" value={batch?.id ?? ''} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Your name"
          field="name"
          id={fieldId('name')}
          errorId={errorId('name')}
          error={state.errors?.name}
          defaultValue={state.values?.name}
          autoComplete="name"
          required
        />
        <Field
          label="Mobile number"
          field="phone"
          id={fieldId('phone')}
          errorId={errorId('phone')}
          error={state.errors?.phone}
          defaultValue={state.values?.phone}
          type="tel"
          autoComplete="tel"
          placeholder="01700-000000"
          required
        />
        <Field
          label="Email"
          field="email"
          id={fieldId('email')}
          errorId={errorId('email')}
          error={state.errors?.email}
          defaultValue={state.values?.email}
          type="email"
          autoComplete="email"
          className="sm:col-span-2"
          required
        />

        <Label htmlFor={fieldId('interest')} className="flex flex-col gap-2">
          I&rsquo;m interested in
          <select
            id={fieldId('interest')}
            name="interest"
            required
            defaultValue={state.values?.interest ?? prefill?.interest ?? ''}
            aria-describedby={state.errors?.interest ? errorId('interest') : undefined}
            aria-invalid={state.errors?.interest ? true : undefined}
            className={inputClass(Boolean(state.errors?.interest))}
          >
            <option value="" disabled>
              Choose one
            </option>
            {leadInterests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
          <FieldError id={errorId('interest')} message={state.errors?.interest} />
        </Label>

        <Label htmlFor={fieldId('campus')} className="flex flex-col gap-2">
          Preferred campus
          <select
            id={fieldId('campus')}
            name="campus"
            defaultValue={state.values?.campus ?? prefill?.campus ?? ''}
            className={inputClass(false)}
          >
            <option value="">Live online</option>
            {campuses.map((campus) => (
              <option key={campus.name} value={campus.name}>
                {campus.name}
              </option>
            ))}
          </select>
        </Label>

        <Label htmlFor={fieldId('message')} className="flex flex-col gap-2 sm:col-span-2">
          Anything we should know? <span className="text-muted-2">(optional)</span>
          <textarea
            id={fieldId('message')}
            name="message"
            rows={4}
            defaultValue={state.values?.message}
            className={cn(inputClass(Boolean(state.errors?.message)), 'resize-y')}
          />
          <FieldError id={errorId('message')} message={state.errors?.message} />
        </Label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-8 inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-ink px-[30px] py-4 text-[15px] font-semibold text-on-ink shadow-cta transition-colors duration-200 hover:bg-ink-soft disabled:cursor-progress disabled:opacity-70"
      >
        {pending ? 'Sending…' : 'Request a call back'}
      </button>

      <p className="mt-4 text-[12.5px] leading-[1.5] text-muted-2">
        We use these details only to contact you about your enquiry. Read our{' '}
        <a href="/legal/privacy" className="text-ink underline">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}

function inputClass(invalid: boolean): string {
  return cn(
    'w-full rounded-sm border bg-canvas px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-200 focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
    invalid ? 'border-danger bg-danger-soft/40' : 'border-line-strong',
  );
}

function Label({
  children,
  htmlFor,
  className,
}: {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('text-[11px] font-bold tracking-[.12em] text-ink-soft uppercase', className)}
    >
      {children}
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

function Field({
  label,
  field,
  id,
  errorId,
  error,
  className,
  ...input
}: {
  label: string;
  field: LeadField;
  id: string;
  errorId: string;
  error?: string;
  className?: string;
} & React.ComponentPropsWithoutRef<'input'>) {
  return (
    <Label htmlFor={id} className={cn('flex flex-col gap-2', className)}>
      {label}
      <input
        {...input}
        id={id}
        name={field}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        className={inputClass(Boolean(error))}
      />
      <FieldError id={errorId} message={error} />
    </Label>
  );
}
