'use server';

import { saveSession } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { siteUrl } from '@/lib/site';
import {
  classifyAuthError,
  isConflictError,
  isValidationError,
  INVALID_CREDENTIALS_MESSAGE,
} from './errors';
import type { AuthFormState } from './form-state';
import { parkPendingAuth, peekPendingAuth, takePendingAuth } from './pending';
import { safeNextPath } from './return-to';
import { userManagement, workosClientId } from './workos';

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

const signInSchema = z.object({
  email: z.string().min(1, 'Enter your email address.').email('That email address looks incomplete.'),
  /* Passwords are never trimmed: spaces can be significant. Length only. */
  password: z.string().min(1, 'Enter your password.'),
});

/**
 * Sign in with email and password, entirely against our own form.
 *
 * The WorkOS call and the session-cookie write both happen here on the
 * server — the browser only ever posts the form and follows the redirect.
 * Success ends in `redirect()`, so the happy path never returns state.
 *
 * An unverified address does not fail: WorkOS answers the password grant
 * with `email_verification_required` (and emails a code), so the pending
 * token is parked and the user continues on `/verify-email`.
 */
export async function signInAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = text(formData, 'email');
  const password = typeof formData.get('password') === 'string' ? (formData.get('password') as string) : '';
  const next = safeNextPath(text(formData, 'next'));

  const parsed = signInSchema.safeParse({ email, password });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'email');
      errors[key] ??= issue.message;
    }
    /* The email echoes so a typo does not wipe the field; the password never
       does — retyping it is the point. */
    return { status: 'error', errors, values: { email } };
  }

  let destination: string | null = null;
  let state: AuthFormState = { status: 'idle' };

  try {
    const response = await userManagement().authenticateWithPassword({
      clientId: workosClientId(),
      email: parsed.data.email,
      password: parsed.data.password,
    });

    await saveSession(
      {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: response.user,
        impersonator: response.impersonator,
      },
      siteUrl,
    );
    destination = next;
  } catch (error) {
    const failure = classifyAuthError(error);

    if (failure.kind === 'verification-required') {
      await parkPendingAuth({ token: failure.pendingToken });
      destination = `/verify-email?next=${encodeURIComponent(next)}`;
    } else {
      /* One structured line, no PII: the email and password stay out of the
         log even though the failure is ours to diagnose. */
      console.error('[auth] sign-in failed', { kind: failure.kind });
      state = {
        status: 'error',
        values: { email },
        message:
          failure.kind === 'rate-limited'
            ? 'Too many attempts. Wait a little while and try again.'
            : failure.kind === 'unavailable'
              ? 'We could not reach the sign-in service. Try again in a moment.'
              : INVALID_CREDENTIALS_MESSAGE,
      };
    }
  }

  if (destination) redirect(destination);
  return state;
}

const signUpSchema = z.object({
  firstName: z.string().min(1, 'Enter your first name.').max(100),
  lastName: z.string().max(100).optional(),
  email: z.string().min(1, 'Enter your email address.').email('That email address looks incomplete.'),
  /* Eight characters is the floor WorkOS enforces; longer is better. */
  password: z.string().min(8, 'Use at least 8 characters.').max(256),
});

/**
 * Create the account, then sign straight in.
 *
 * `createUser` followed by the password grant in one action, so the browser
 * makes a single POST. A fresh address usually needs verification first:
 * WorkOS answers with `email_verification_required` (and emails a code), and
 * the flow continues on `/verify-email` exactly like an unverified sign-in.
 * If verification is not required, the session lands immediately.
 */
export async function signUpAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const firstName = text(formData, 'firstName');
  const lastName = text(formData, 'lastName');
  const email = text(formData, 'email');
  const password = typeof formData.get('password') === 'string' ? (formData.get('password') as string) : '';
  const next = safeNextPath(text(formData, 'next'));

  const parsed = signUpSchema.safeParse({ firstName, lastName, email, password });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'email');
      errors[key] ??= issue.message;
    }
    return { status: 'error', errors, values: { firstName, lastName, email } };
  }

  let userId: string | null = null;
  try {
    const created = await userManagement().createUser({
      email: parsed.data.email,
      password: parsed.data.password,
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName === '' ? undefined : parsed.data.lastName,
    });
    userId = created.id;
  } catch (error) {
    if (isConflictError(error)) {
      return {
        status: 'error',
        values: { firstName, lastName, email },
        message: 'An account with that email already exists. Try signing in instead.',
      };
    }
    if (isValidationError(error)) {
      return {
        status: 'error',
        values: { firstName, lastName, email },
        errors: { password: 'That password does not meet the requirements. Try a longer one.' },
      };
    }
    console.error('[auth] sign-up failed', { kind: classifyAuthError(error).kind });
    return {
      status: 'error',
      values: { firstName, lastName, email },
      message: 'We could not create your account just now. Try again in a moment.',
    };
  }

  let destination: string | null = null;
  let state: AuthFormState = { status: 'idle' };

  try {
    const response = await userManagement().authenticateWithPassword({
      clientId: workosClientId(),
      email: parsed.data.email,
      password: parsed.data.password,
    });

    await saveSession(
      {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: response.user,
        impersonator: response.impersonator,
      },
      siteUrl,
    );
    destination = next;
  } catch (error) {
    const failure = classifyAuthError(error);

    if (failure.kind === 'verification-required') {
      await parkPendingAuth({ token: failure.pendingToken, ...(userId ? { userId } : {}) });
      destination = `/verify-email?next=${encodeURIComponent(next)}`;
    } else {
      console.error('[auth] sign-up sign-in failed', { kind: failure.kind });
      state = {
        status: 'error',
        values: { firstName, lastName, email },
        message:
          failure.kind === 'rate-limited'
            ? 'Too many attempts. Wait a little while and try again.'
            : 'Your account was created, but signing in failed. Try signing in.',
      };
    }
  }

  if (destination) redirect(destination);
  return state;
}

const codeSchema = z.object({
  code: z
    .string()
    .trim()
    .regex(/^[0-9]{6}$/, 'Enter the 6-digit code from the email.'),
});

/**
 * Finish sign-in with the emailed verification code.
 *
 * The pending token is only consumed on success: a wrong code must leave it
 * in place so the next attempt still works. No token at all (expired cookie,
 * fresh visit) renders guidance instead of calling WorkOS.
 */
export async function verifyEmailAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const next = safeNextPath(text(formData, 'next'));
  const parsed = codeSchema.safeParse({ code: formData.get('code') });

  const pending = await peekPendingAuth();
  if (!pending) {
    return {
      status: 'error',
      message: 'That verification step expired. Sign in again and a fresh code will be on its way.',
    };
  }

  if (!parsed.success) {
    return { status: 'error', errors: { code: parsed.error.issues[0]?.message ?? 'Enter the code.' } };
  }

  try {
    const response = await userManagement().authenticateWithEmailVerification({
      clientId: workosClientId(),
      code: parsed.data.code,
      pendingAuthenticationToken: pending.token,
    });

    await saveSession(
      {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: response.user,
        impersonator: response.impersonator,
      },
      siteUrl,
    );
    await takePendingAuth();
  } catch (error) {
    console.error('[auth] email verification failed', { kind: classifyAuthError(error).kind });
    return {
      status: 'error',
      message: 'That code did not work. Check the latest email and try again.',
    };
  }

  redirect(next);
}

/**
 * Send another verification code to the same address.
 *
 * Only possible when the sign-up step knew the user id — the sign-in path
 * never learns it, and there the answer is to sign in again (each password
 * attempt re-sends a fresh code). Never an error surfacing which case it
 * was: both render the same calm line.
 */
export async function resendCodeAction(_prevState: AuthFormState): Promise<AuthFormState> {
  const pending = await peekPendingAuth();
  if (!pending?.userId) {
    return {
      status: 'error',
      message: 'Sign in again and a fresh code will be on its way.',
    };
  }

  try {
    await userManagement().sendVerificationEmail({ userId: pending.userId });
  } catch (error) {
    console.error('[auth] verification resend failed', { kind: classifyAuthError(error).kind });
  }
  return { status: 'idle', message: 'A fresh code is on its way. It can take a minute to arrive.' };
}

const forgotSchema = z.object({
  email: z.string().min(1, 'Enter your email address.').email('That email address looks incomplete.'),
});

/**
 * Start a password reset.
 *
 * Always renders the same success panel — whether the address has an account
 * or not, whether WorkOS accepted or rejected the call. A reset request must
 * not tell a stranger which emails are registered. The emailed link points at
 * our `/reset-password` (dashboard Redirects setting) carrying `token`.
 */
export async function requestPasswordResetAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = text(formData, 'email');
  const parsed = forgotSchema.safeParse({ email });
  if (!parsed.success) {
    return { status: 'error', errors: { email: parsed.error.issues[0]?.message ?? 'Enter your email.' } };
  }

  try {
    await userManagement().createPasswordReset({ email: parsed.data.email });
  } catch (error) {
    /* Logged, never rendered: the panel below is identical either way. */
    console.error('[auth] password reset request failed', { kind: classifyAuthError(error).kind });
  }
  return {
    status: 'idle',
    message: 'If an account uses that address, a reset link is on its way. It expires after a while, so check soon.',
  };
}

const resetSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(8, 'Use at least 8 characters.').max(256),
  confirmPassword: z.string().min(1, 'Repeat the new password.'),
});

/**
 * Set the new password from a reset link.
 *
 * The token arrives as a hidden field (from the page's `?token=`), never
 * echoed back. Success bounces to sign-in with a one-shot notice; an
 * expired or spent token renders guidance towards a fresh link instead of
 * calling WorkOS again pointlessly.
 */
export async function resetPasswordAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const raw = {
    token: typeof formData.get('token') === 'string' ? (formData.get('token') as string) : '',
    newPassword: typeof formData.get('newPassword') === 'string' ? (formData.get('newPassword') as string) : '',
    confirmPassword:
      typeof formData.get('confirmPassword') === 'string' ? (formData.get('confirmPassword') as string) : '',
  };
  const parsed = resetSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'newPassword');
      errors[key] ??= issue.message;
    }
    return { status: 'error', errors };
  }
  if (parsed.data.newPassword !== parsed.data.confirmPassword) {
    return { status: 'error', errors: { confirmPassword: 'The two passwords do not match.' } };
  }

  try {
    /* A completed reset also verifies the address and revokes every other
       session — that is WorkOS's doing, and exactly what a reset should do. */
    await userManagement().resetPassword({
      token: parsed.data.token,
      newPassword: parsed.data.newPassword,
    });
  } catch (error) {
    console.error('[auth] password reset failed', { kind: classifyAuthError(error).kind });
    return {
      status: 'error',
      message: 'That link is expired or already used. Request a fresh one below.',
    };
  }

  redirect('/sign-in?notice=password-updated');
}
