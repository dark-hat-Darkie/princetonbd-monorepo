'use client';

import Link from 'next/link';
import { useActionState, useId } from 'react';

import { Field } from '@/components/ui/form/field';
import { errorIdFor, inputClass } from '@/components/ui/form/input-class';
import { signInAction } from '@/lib/auth/actions';
import { initialAuthState } from '@/lib/auth/form-state';

/**
 * Email + password sign-in against our own endpoint.
 *
 * Progressive like the enrollment form: a plain `<form action>` behind
 * `useActionState`, so the POST works before hydration and the client half
 * only adds pending + errors. The `next` return path rides along as a hidden
 * field and is re-validated server-side — the hidden input is convenience,
 * not trust.
 */
export function SignInForm({ next, signUpHref }: { next: string; signUpHref: string }) {
  const [state, formAction, pending] = useActionState(signInAction, initialAuthState);
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

        <Field id={fieldId('password')} label="Password" error={state.errors?.password}>
          <input
            id={fieldId('password')}
            name="password"
            type="password"
            autoComplete="current-password"
            required
            aria-describedby={state.errors?.password ? errorIdFor(fieldId('password')) : undefined}
            aria-invalid={state.errors?.password ? true : undefined}
            className={inputClass(Boolean(state.errors?.password))}
          />
        </Field>
      </div>

      <div className="mt-4 text-right">
        <Link
          href="/forgot-password"
          className="rounded-sm text-[13.5px] font-semibold text-brand-ink underline-offset-4 hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-ink px-[30px] py-4 text-[15px] font-semibold text-on-ink shadow-cta transition-colors duration-200 hover:bg-ink-soft disabled:cursor-progress disabled:opacity-70"
      >
        {pending ? 'Signing you in…' : 'Sign in'}
      </button>

      <p className="mt-6 text-center text-[14px] text-muted">
        New here?{' '}
        <Link
          href={signUpHref}
          className="rounded-sm font-semibold text-brand-ink underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
