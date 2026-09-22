import { beforeEach, describe, expect, it, vi } from 'vitest';

const authenticateWithPassword = vi.hoisted(() => vi.fn());
const createUser = vi.hoisted(() => vi.fn());
const authenticateWithEmailVerification = vi.hoisted(() => vi.fn());
const sendVerificationEmail = vi.hoisted(() => vi.fn());
const createPasswordReset = vi.hoisted(() => vi.fn());
const resetPassword = vi.hoisted(() => vi.fn());
const saveSession = vi.hoisted(() => vi.fn());
const cookieJar = vi.hoisted(() => new Map<string, string>());

vi.mock('@/lib/auth/workos', () => ({
  workosClientId: () => 'client_test',
  userManagement: () => ({
    authenticateWithPassword,
    createUser,
    authenticateWithEmailVerification,
    sendVerificationEmail,
    createPasswordReset,
    resetPassword,
  }),
}));

vi.mock('@workos-inc/authkit-nextjs', () => ({ saveSession }));

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: (key: string, value: string) => {
      cookieJar.set(key, value);
    },
    get: (key: string) => {
      const value = cookieJar.get(key);
      return value === undefined ? undefined : { value };
    },
    delete: (key: string) => {
      cookieJar.delete(key);
    },
  }),
}));

vi.mock('next/navigation', () => ({
  redirect: (url: string) => {
    throw new Error(`REDIRECT:${url}`);
  },
}));

import {
  requestPasswordResetAction,
  resendCodeAction,
  resetPasswordAction,
  signInAction,
  signUpAction,
  verifyEmailAction,
} from './actions';
import { initialAuthState } from './form-state';

function form(values: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

async function redirectOf(promise: Promise<unknown>): Promise<string | null> {
  try {
    await promise;
    return null;
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    return message.startsWith('REDIRECT:') ? message.slice('REDIRECT:'.length) : null;
  }
}

function pendingCookie(): { token: string; userId?: string } | null {
  const raw = cookieJar.get('workos_pending');
  return raw ? (JSON.parse(raw) as { token: string; userId?: string }) : null;
}

const SESSION = {
  accessToken: 'at',
  refreshToken: 'rt',
  user: { object: 'user', id: 'user_1', email: 'ada@example.com' },
  impersonator: undefined,
};

describe('signInAction', () => {
  beforeEach(() => {
    cookieJar.clear();
    authenticateWithPassword.mockReset().mockResolvedValue(SESSION);
    saveSession.mockReset();
  });

  it('validates the fields before touching WorkOS', async () => {
    const state = await signInAction(initialAuthState, form({ email: 'not-an-email', password: '' }));

    expect(state.status).toBe('error');
    expect(state.errors?.email).toBeTruthy();
    expect(state.errors?.password).toBeTruthy();
    expect(authenticateWithPassword).not.toHaveBeenCalled();
  });

  it('saves the session and follows the validated return path', async () => {
    const destination = await redirectOf(
      signInAction(initialAuthState, form({ email: 'ada@example.com', password: 's3cret', next: '/enroll?course=sat' })),
    );

    expect(authenticateWithPassword).toHaveBeenCalledWith({
      clientId: 'client_test',
      email: 'ada@example.com',
      password: 's3cret',
    });
    expect(saveSession).toHaveBeenCalledOnce();
    expect(destination).toBe('/enroll?course=sat');
  });

  it('ignores an external return path', async () => {
    const destination = await redirectOf(
      signInAction(initialAuthState, form({ email: 'ada@example.com', password: 's3cret', next: 'https://evil.example.com' })),
    );

    expect(destination).toBe('/dashboard');
  });

  it('parks the pending token and continues to verification', async () => {
    authenticateWithPassword.mockRejectedValue({
      name: 'AuthenticationException',
      code: 'email_verification_required',
      pendingAuthenticationToken: 'pending_123',
    });

    const destination = await redirectOf(
      signInAction(initialAuthState, form({ email: 'ada@example.com', password: 's3cret', next: '/enroll' })),
    );

    expect(pendingCookie()).toEqual({ token: 'pending_123' });
    expect(destination).toBe('/verify-email?next=%2Fenroll');
  });

  it('answers bad credentials with the generic message and echoes the email', async () => {
    authenticateWithPassword.mockRejectedValue({ name: 'AuthenticationException', code: 'invalid_grant' });

    const state = await signInAction(initialAuthState, form({ email: 'ada@example.com', password: 'wrong' }));

    expect(state).toEqual({
      status: 'error',
      values: { email: 'ada@example.com' },
      message: 'That email and password did not match our records.',
    });
    expect(saveSession).not.toHaveBeenCalled();
  });
});

describe('signUpAction', () => {
  beforeEach(() => {
    cookieJar.clear();
    createUser.mockReset().mockResolvedValue({ id: 'user_9', email: 'ada@example.com' });
    authenticateWithPassword.mockReset();
    saveSession.mockReset();
  });

  it('validates locally, echoing everything but the password', async () => {
    const state = await signUpAction(
      initialAuthState,
      form({ firstName: '', email: 'ada@example.com', password: 'short' }),
    );

    expect(state.status).toBe('error');
    expect(state.errors?.firstName).toBeTruthy();
    expect(state.errors?.password).toBeTruthy();
    expect(state.values).toEqual({ firstName: '', lastName: '', email: 'ada@example.com' });
    expect(createUser).not.toHaveBeenCalled();
  });

  it('points an existing address at sign-in', async () => {
    createUser.mockRejectedValue({ name: 'ConflictException', status: 409 });

    const state = await signUpAction(
      initialAuthState,
      form({ firstName: 'Ada', email: 'ada@example.com', password: 'long-enough-password' }),
    );

    expect(state.message).toMatch(/already exists/);
    expect(authenticateWithPassword).not.toHaveBeenCalled();
  });

  it('continues to verification with the user id parked for resends', async () => {
    authenticateWithPassword.mockRejectedValue({
      name: 'AuthenticationException',
      code: 'email_verification_required',
      pendingAuthenticationToken: 'pending_456',
    });

    const destination = await redirectOf(
      signUpAction(
        initialAuthState,
        form({ firstName: 'Ada', email: 'ada@example.com', password: 'long-enough-password', next: '/dashboard' }),
      ),
    );

    expect(createUser).toHaveBeenCalledWith({
      email: 'ada@example.com',
      password: 'long-enough-password',
      firstName: 'Ada',
      lastName: undefined,
    });
    expect(pendingCookie()).toEqual({ token: 'pending_456', userId: 'user_9' });
    expect(destination).toBe('/verify-email?next=%2Fdashboard');
  });

  it('signs straight in when no verification is required', async () => {
    authenticateWithPassword.mockResolvedValue(SESSION);

    const destination = await redirectOf(
      signUpAction(initialAuthState, form({ firstName: 'Ada', email: 'ada@example.com', password: 'long-enough-password' })),
    );

    expect(saveSession).toHaveBeenCalledOnce();
    expect(destination).toBe('/dashboard');
  });
});

describe('verifyEmailAction', () => {
  beforeEach(() => {
    cookieJar.clear();
    authenticateWithEmailVerification.mockReset().mockResolvedValue(SESSION);
    saveSession.mockReset();
  });

  it('refuses without a pending token instead of calling WorkOS', async () => {
    const state = await verifyEmailAction(initialAuthState, form({ code: '123456', next: '/dashboard' }));

    expect(state.message).toMatch(/expired/);
    expect(authenticateWithEmailVerification).not.toHaveBeenCalled();
  });

  it('rejects a malformed code before calling WorkOS', async () => {
    cookieJar.set('workos_pending', JSON.stringify({ token: 'pending_123' }));

    const state = await verifyEmailAction(initialAuthState, form({ code: 'abc', next: '/dashboard' }));

    expect(state.errors?.code).toBeTruthy();
    expect(authenticateWithEmailVerification).not.toHaveBeenCalled();
  });

  it('saves the session, consumes the token, and follows next', async () => {
    cookieJar.set('workos_pending', JSON.stringify({ token: 'pending_123', userId: 'user_9' }));

    const destination = await redirectOf(
      verifyEmailAction(initialAuthState, form({ code: '123456', next: '/enroll?course=sat' })),
    );

    expect(authenticateWithEmailVerification).toHaveBeenCalledWith({
      clientId: 'client_test',
      code: '123456',
      pendingAuthenticationToken: 'pending_123',
    });
    expect(saveSession).toHaveBeenCalledOnce();
    expect(cookieJar.has('workos_pending')).toBe(false);
    expect(destination).toBe('/enroll?course=sat');
  });

  it('keeps the token on a wrong code so the next attempt works', async () => {
    cookieJar.set('workos_pending', JSON.stringify({ token: 'pending_123' }));
    authenticateWithEmailVerification.mockRejectedValue({ name: 'AuthenticationException', code: 'invalid_grant' });

    const state = await verifyEmailAction(initialAuthState, form({ code: '000000', next: '/dashboard' }));

    expect(state.message).toMatch(/did not work/);
    expect(saveSession).not.toHaveBeenCalled();
    expect(cookieJar.has('workos_pending')).toBe(true);
  });
});

describe('resendCodeAction', () => {
  beforeEach(() => {
    cookieJar.clear();
    sendVerificationEmail.mockReset();
  });

  it('sends another code when the sign-up step knew the user', async () => {
    cookieJar.set('workos_pending', JSON.stringify({ token: 'pending_123', userId: 'user_9' }));

    const state = await resendCodeAction(initialAuthState);

    expect(sendVerificationEmail).toHaveBeenCalledWith({ userId: 'user_9' });
    expect(state.message).toMatch(/fresh code/);
  });

  it('points back at sign-in when there is nobody to resend to', async () => {
    cookieJar.set('workos_pending', JSON.stringify({ token: 'pending_123' }));

    const state = await resendCodeAction(initialAuthState);

    expect(sendVerificationEmail).not.toHaveBeenCalled();
    expect(state.message).toMatch(/Sign in again/);
  });
});

describe('requestPasswordResetAction', () => {
  beforeEach(() => {
    createPasswordReset.mockReset();
  });

  it('validates the email before calling WorkOS', async () => {
    const state = await requestPasswordResetAction(initialAuthState, form({ email: 'nope' }));

    expect(state.errors?.email).toBeTruthy();
    expect(createPasswordReset).not.toHaveBeenCalled();
  });

  it('renders the same panel on success', async () => {
    createPasswordReset.mockResolvedValue({ id: 'password_reset_1' });

    const state = await requestPasswordResetAction(initialAuthState, form({ email: 'ada@example.com' }));

    expect(createPasswordReset).toHaveBeenCalledWith({ email: 'ada@example.com' });
    expect(state.message).toMatch(/reset link is on its way/);
  });

  it('renders the identical panel when WorkOS rejects — no enumeration', async () => {
    createPasswordReset.mockRejectedValue({ name: 'NotFoundException', status: 404 });

    const state = await requestPasswordResetAction(initialAuthState, form({ email: 'ghost@example.com' }));

    expect(state.message).toMatch(/reset link is on its way/);
  });
});

describe('resetPasswordAction', () => {
  beforeEach(() => {
    resetPassword.mockReset();
  });

  it('requires the two passwords to match without calling WorkOS', async () => {
    const state = await resetPasswordAction(
      initialAuthState,
      form({ token: 'tok', newPassword: 'long-enough-password', confirmPassword: 'different-password' }),
    );

    expect(state.errors?.confirmPassword).toMatch(/do not match/);
    expect(resetPassword).not.toHaveBeenCalled();
  });

  it('redeems the token and bounces to sign-in with a notice', async () => {
    resetPassword.mockResolvedValue({ user: { id: 'user_1' } });

    const destination = await redirectOf(
      resetPasswordAction(
        initialAuthState,
        form({ token: 'tok_123', newPassword: 'long-enough-password', confirmPassword: 'long-enough-password' }),
      ),
    );

    expect(resetPassword).toHaveBeenCalledWith({ token: 'tok_123', newPassword: 'long-enough-password' });
    expect(destination).toBe('/sign-in?notice=password-updated');
  });

  it('answers a spent link with guidance, never the token', async () => {
    resetPassword.mockRejectedValue({ name: 'NotFoundException', status: 404 });

    const state = await resetPasswordAction(
      initialAuthState,
      form({ token: 'tok_spent', newPassword: 'long-enough-password', confirmPassword: 'long-enough-password' }),
    );

    expect(state.message).toMatch(/expired or already used/);
    expect(state.message).not.toContain('tok_spent');
  });
});
