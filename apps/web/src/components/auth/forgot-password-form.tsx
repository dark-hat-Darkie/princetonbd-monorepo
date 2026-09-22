'use client';

import Link from 'next/link';
import { useActionState, useId } from 'react';

import { Field } from '@/components/ui/form/field';
import { errorIdFor, inputClass } from '@/components/ui/form/input-class';
import { requestPasswordResetAction } from '@/lib/auth/actions';
import { initialAuthState } from '@/lib/auth/form-state';

/**
 * "I forgot my password": one email field. The result panel is identical
 * whether the address is registered or not — the action enforces that, this
 * form just renders whatever message comes back.
 */
export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordResetAction, initialAuthState);
  const formId = useId();
  const emailId = `${formId}-email`;

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-lg border border-line bg-surface px-7 py-8 shadow-card sm:px-9 sm:py-10"
    >
      {state.message ? (
        <p
          role="status"
          className="mb-7 rounded-sm border border-brand/25 bg-brand-soft px-5 py-4 text-[14.5px] leading-[1.55] text-ink-soft"
        >
          {state.message}
        </p>
      ) : null}

      <Field id={emailId} label="Email address" error={state.errors?.email}>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-describedby={state.errors?.email ? errorIdFor(emailId) : undefined}
          aria-invalid={state.errors?.email ? true : undefined}
          className={inputClass(Boolean(state.errors?.email))}
        />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-ink px-[30px] py-4 text-[15px] font-semibold text-on-ink shadow-cta transition-colors duration-200 hover:bg-ink-soft disabled:cursor-progress disabled:opacity-70"
      >
        {pending ? 'Sending…' : 'Send reset link'}
      </button>

      <p className="mt-6 text-center text-[14px] text-muted">
        Remembered it?{' '}
        <Link
          href="/sign-in"
          className="rounded-sm font-semibold text-brand-ink underline-offset-4 hover:underline"
        >
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
