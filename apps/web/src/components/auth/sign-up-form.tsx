'use client';

import Link from 'next/link';
import { useActionState, useId } from 'react';

import { Field } from '@/components/ui/form/field';
import { errorIdFor, inputClass } from '@/components/ui/form/input-class';
import { signUpAction } from '@/lib/auth/actions';
import { initialAuthState } from '@/lib/auth/form-state';

/**
 * Account creation: name, email, password. One POST creates the user and
 * signs them in (or continues to email verification) — the page behind this
 * form never shows an intermediate state.
 */
export function SignUpForm({ next, signInHref }: { next: string; signInHref: string }) {
  const [state, formAction, pending] = useActionState(signUpAction, initialAuthState);
  const formId = useId();
  const fieldId = (field: string) => `${formId}-${field}`;

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

      <input type="hidden" name="next" value={next} />

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id={fieldId('firstName')} label="First name" error={state.errors?.firstName}>
            <input
              id={fieldId('firstName')}
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              defaultValue={state.values?.firstName ?? ''}
              aria-describedby={state.errors?.firstName ? errorIdFor(fieldId('firstName')) : undefined}
              aria-invalid={state.errors?.firstName ? true : undefined}
              className={inputClass(Boolean(state.errors?.firstName))}
            />
          </Field>

          <Field id={fieldId('lastName')} label="Last name" error={state.errors?.lastName}>
            <input
              id={fieldId('lastName')}
              name="lastName"
              type="text"
              autoComplete="family-name"
              defaultValue={state.values?.lastName ?? ''}
              aria-describedby={state.errors?.lastName ? errorIdFor(fieldId('lastName')) : undefined}
              aria-invalid={state.errors?.lastName ? true : undefined}
              className={inputClass(Boolean(state.errors?.lastName))}
            />
          </Field>
        </div>

        <Field id={fieldId('email')} label="Email address" error={state.errors?.email}>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values?.email ?? ''}
            aria-describedby={state.errors?.email ? errorIdFor(fieldId('email')) : undefined}
            aria-invalid={state.errors?.email ? true : undefined}
            className={inputClass(Boolean(state.errors?.email))}
          />
        </Field>

        <Field
          id={fieldId('password')}
          label="Password"
          hint="At least 8 characters — longer is better."
          error={state.errors?.password}
        >
          <input
            id={fieldId('password')}
            name="password"
            type="password"
            autoComplete="new-password"
            required
            aria-describedby={state.errors?.password ? errorIdFor(fieldId('password')) : undefined}
            aria-invalid={state.errors?.password ? true : undefined}
            className={inputClass(Boolean(state.errors?.password))}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-7 inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-ink px-[30px] py-4 text-[15px] font-semibold text-on-ink shadow-cta transition-colors duration-200 hover:bg-ink-soft disabled:cursor-progress disabled:opacity-70"
      >
        {pending ? 'Creating your account…' : 'Create account'}
      </button>

      <p className="mt-6 text-center text-[14px] text-muted">
        Already have an account?{' '}
        <Link
          href={signInHref}
          className="rounded-sm font-semibold text-brand-ink underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
