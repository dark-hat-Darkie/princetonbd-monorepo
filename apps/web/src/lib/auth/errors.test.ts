import { describe, expect, it } from 'vitest';

import { classifyAuthError } from './errors';

function authException(code: string, extra: Record<string, unknown> = {}) {
  return {
    name: 'AuthenticationException',
    code,
    message: 'WorkOS says no',
    status: 400,
    ...extra,
  };
}

describe('classifyAuthError', () => {
  it('routes bad credentials to the generic failure', () => {
    expect(classifyAuthError(authException('invalid_grant'))).toEqual({
      kind: 'invalid-credentials',
    });
  });

  it('routes the verification challenge with its pending token', () => {
    expect(
      classifyAuthError(authException('email_verification_required', { pendingAuthenticationToken: 'tok_123' })),
    ).toEqual({ kind: 'verification-required', pendingToken: 'tok_123' });
  });

  it('matches the verification code in the message for older SDK wording', () => {
    expect(
      classifyAuthError({
        ...authException('other'),
        message: 'email_verification_required: verify first',
        pendingAuthenticationToken: 'tok_abc',
      }),
    ).toEqual({ kind: 'verification-required', pendingToken: 'tok_abc' });
  });

  it('degrades a verification code without a token to unavailable', () => {
    expect(classifyAuthError(authException('email_verification_required'))).toEqual({
      kind: 'unavailable',
    });
  });

  it('routes rate limits from status or name', () => {
    expect(classifyAuthError({ name: 'RateLimitExceededException', status: 429 })).toEqual({
      kind: 'rate-limited',
    });
    expect(classifyAuthError({ name: 'Error', status: 429, message: 'slow down' })).toEqual({
      kind: 'rate-limited',
    });
  });

  it('degrades everything else to unavailable', () => {
    expect(classifyAuthError(new Error('boom'))).toEqual({ kind: 'unavailable' });
    expect(classifyAuthError(null)).toEqual({ kind: 'unavailable' });
    expect(classifyAuthError('string failure')).toEqual({ kind: 'unavailable' });
  });
});
