/**
 * Turn a WorkOS SDK throw into a form-safe outcome.
 *
 * The SDK raises `AuthenticationException` (with a machine `code` and, for
 * the verification case, a `pendingAuthenticationToken`) for credential
 * problems, and plain `Error` subclasses (`RateLimitExceededException`,
 * network failures) for everything else. Only the shape is matched here —
 * messages are ours, so nothing WorkOS-internal ever reaches the browser.
 * Anything unrecognised degrades to `unavailable`, the safe direction.
 */
export type AuthFailure =
  | { kind: 'invalid-credentials' }
  | { kind: 'verification-required'; pendingToken: string }
  | { kind: 'rate-limited' }
  | { kind: 'unavailable' };

/** Read a field off a thrown value without casting it into a shape. */
function prop(error: unknown, key: string): unknown {
  if (typeof error !== 'object' || error === null) return undefined;
  return Reflect.get(error, key);
}

const VERIFICATION_CODE = 'email_verification_required';
const CREDENTIAL_CODES = new Set(['invalid_grant', 'invalid_request', 'unauthorized']);

export function classifyAuthError(error: unknown): AuthFailure {
  const rawCode = prop(error, 'code');
  const rawMessage = prop(error, 'message');
  const rawStatus = prop(error, 'status');
  const rawPending = prop(error, 'pendingAuthenticationToken');

  const code = typeof rawCode === 'string' ? rawCode : '';
  const message = typeof rawMessage === 'string' ? rawMessage : '';
  const status = typeof rawStatus === 'number' ? rawStatus : undefined;

  const pendingToken = typeof rawPending === 'string' && rawPending.length > 0 ? rawPending : null;

  /* Unverified address: WorkOS answers the password grant with a dedicated
     code (older versions surface it in the message instead). The pending
     token continues the flow on the verify page. */
  if (code === VERIFICATION_CODE || message.includes(VERIFICATION_CODE)) {
    if (pendingToken) return { kind: 'verification-required', pendingToken };
    return { kind: 'unavailable' };
  }

  if (CREDENTIAL_CODES.has(code)) return { kind: 'invalid-credentials' };

  /* 429s arrive as `RateLimitExceededException` (status 429); match all three
     so a wording change on either side still lands here. */
  if (
    status === 429 ||
    prop(error, 'name') === 'RateLimitExceededException' ||
    /too many|rate.?limit/i.test(message)
  ) {
    return { kind: 'rate-limited' };
  }

  return { kind: 'unavailable' };
}

/** The one generic line a failed sign-in shows. No enumeration, no internals. */
export const INVALID_CREDENTIALS_MESSAGE = 'That email and password did not match our records.';

/**
 * Whether the throw is a 409-style duplicate (sign-up for an address that
 * already has an account). Matched on status and name, never on message
 * wording.
 */
export function isConflictError(error: unknown): boolean {
  return prop(error, 'status') === 409 || prop(error, 'name') === 'ConflictException';
}

/** Whether the throw is a 422 field-validation rejection (weak password, …). */
export function isValidationError(error: unknown): boolean {
  return prop(error, 'status') === 422 || prop(error, 'name') === 'UnprocessableEntityException';
}
