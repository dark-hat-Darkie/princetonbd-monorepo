'use client';

import Link from 'next/link';
import { useActionState, useId } from 'react';

import { Field } from '@/components/ui/form/field';
import { errorIdFor, inputClass } from '@/components/ui/form/input-class';
import { resetPasswordAction } from '@/lib/auth/actions';
import { initialAuthState } from '@/lib/auth/form-state';

/**
 * The new password, twice. The reset token rides along as a hidden field —
 * it came from the emailed link's `?token=` and is never rendered back.
 */
export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState(resetPasswordAction, initialAuthState);
  const formId = useId();
  const fieldId = (field: string) => `${formId}-${field}`;

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-lg border border-line bg-surface px-7 py-8 shadow-card sm:px-9 sm:py-10"
    >
      {state.message ? (
        <div
          role="alert"
          className="mb-7 rounded-sm border border-danger/30 border-l-[3px] border-l-danger bg-danger-soft px-5 py-4 text-[14.5px] leading-[1.55] text-ink-soft"
        >
          <p>{state.message}</p>
          <Link
            href="/forgot-password"
            className="mt-2 inline-block rounded-sm font-semibold text-brand-ink underline-offset-4 hover:underline"
          >
            Request a fresh link
          </Link>
        </div>
      ) : null}

      <input type="hidden" name="token" value={token} />

      <div className="flex flex-col gap-5">
        <Field
          id={fieldId('newPassword')}
          label="New password"
          hint="At least 8 characters — longer is better."
          error={state.errors?.newPassword}
        >
          <input
            id={fieldId('newPassword')}
            name="newPassword"
            type="password"
            autoComplete="new-password"
            required
            aria-describedby={state.errors?.newPassword ? errorIdFor(fieldId('newPassword')) : undefined}
            aria-invalid={state.errors?.newPassword ? true : undefined}
            className={inputClass(Boolean(state.errors?.newPassword))}
          />
        </Field>

        <Field
          id={fieldId('confirmPassword')}
          label="Repeat new password"
          error={state.errors?.confirmPassword}
        >
          <input
            id={fieldId('confirmPassword')}
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            aria-describedby={state.errors?.confirmPassword ? errorIdFor(fieldId('confirmPassword')) : undefined}
            aria-invalid={state.errors?.confirmPassword ? true : undefined}
            className={inputClass(Boolean(state.errors?.confirmPassword))}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-7 inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-ink px-[30px] py-4 text-[15px] font-semibold text-on-ink shadow-cta transition-colors duration-200 hover:bg-ink-soft disabled:cursor-progress disabled:opacity-70"
      >
        {pending ? 'Updating…' : 'Update password'}
      </button>
    </form>
  );
}
