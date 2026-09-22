'use client';

import { useActionState, useId } from 'react';

import { Field } from '@/components/ui/form/field';
import { errorIdFor, inputClass } from '@/components/ui/form/input-class';
import { resendCodeAction, verifyEmailAction } from '@/lib/auth/actions';
import { initialAuthState } from '@/lib/auth/form-state';

/**
 * The emailed 6-digit code, plus a resend line.
 *
 * Two independent `useActionState` forms share the card: the code form posts
 * the code, the resend form posts nothing (the pending token comes from its
 * cookie). `canResend` is decided server-side — the sign-in path never learns
 * the user id, so there the resend half renders the "sign in again" guidance
 * inline instead of a dead button.
 */
export function VerifyEmailForm({ next, canResend }: { next: string; canResend: boolean }) {
  const [state, formAction, pending] = useActionState(verifyEmailAction, initialAuthState);
  const [resendState, resendAction, resending] = useActionState(resendCodeAction, initialAuthState);
  const formId = useId();
  const codeId = `${formId}-code`;

  return (
    <div className="rounded-lg border border-line bg-surface px-7 py-8 shadow-card sm:px-9 sm:py-10">
      {state.message ? (
        <p
          role="alert"
          className="mb-7 rounded-sm border border-danger/30 border-l-[3px] border-l-danger bg-danger-soft px-5 py-4 text-[14.5px] leading-[1.55] text-ink-soft"
        >
          {state.message}
        </p>
      ) : null}

      <form action={formAction} noValidate>
        <input type="hidden" name="next" value={next} />

        <Field id={codeId} label="6-digit code" error={state.errors?.code}>
          <input
            id={codeId}
            name="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            maxLength={6}
            placeholder="123456"
            aria-describedby={state.errors?.code ? errorIdFor(codeId) : undefined}
            aria-invalid={state.errors?.code ? true : undefined}
            className={inputClass(Boolean(state.errors?.code))}
          />
        </Field>

        <button
          type="submit"
          disabled={pending}
          className="mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-ink px-[30px] py-4 text-[15px] font-semibold text-on-ink shadow-cta transition-colors duration-200 hover:bg-ink-soft disabled:cursor-progress disabled:opacity-70"
        >
          {pending ? 'Checking…' : 'Verify email'}
        </button>
      </form>

      <div className="mt-6 border-t border-line pt-6 text-center">
        {canResend ? (
          <form action={resendAction}>
            <button
              type="submit"
              disabled={resending}
              className="cursor-pointer rounded-sm text-[14px] font-semibold text-brand-ink underline-offset-4 hover:underline disabled:cursor-progress disabled:opacity-70"
            >
              {resending ? 'Sending…' : 'Send the code again'}
            </button>
            {resendState.message ? (
              <p role="status" className="mt-3 text-[13.5px] leading-[1.5] text-muted">
                {resendState.message}
              </p>
            ) : null}
          </form>
        ) : (
          <p className="text-[13.5px] leading-[1.5] text-muted">
            No code yet? Signing in again sends a fresh one.
          </p>
        )}
      </div>
    </div>
  );
}
