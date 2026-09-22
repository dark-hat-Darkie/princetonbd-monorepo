import type { AdminFormState } from './form-state';

/** The error body the API documents (see `ErrorResponseDto` / `ValidationErrorResponseDto`). */
interface ApiErrorBody {
  statusCode?: number;
  message?: string | string[];
  errors?: Record<string, string[]>;
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return typeof value === 'object' && value !== null;
}

/**
 * Turn a failed SDK call into what a form can render.
 *
 * A 400 carries a field map, and each field's first message goes under its
 * input. Everything else becomes one form-level message — a 409 says exactly
 * what collided, a 403 means the session is no longer an admin's, and the
 * rest is reported as the transport problem it probably is.
 */
export function toFormError(
  error: unknown,
  response?: Response,
): Pick<AdminFormState, 'message' | 'errors'> {
  /* No response at all means the request never completed: DNS, a refused
     connection, a timeout. The thrown error's text is a driver detail, not
     something an admin can act on. */
  if (!response) {
    return { message: 'Could not reach the API. Nothing was saved — try again in a moment.' };
  }

  const status = response.status;
  const body = isApiErrorBody(error) ? error : undefined;
  const message = Array.isArray(body?.message) ? body.message.join(' ') : body?.message;

  if (status === 400 && body?.errors) {
    const errors: Record<string, string> = {};
    for (const [field, messages] of Object.entries(body.errors)) {
      const first = messages[0];
      if (first) errors[field] = first;
    }
    return { errors, message: 'Some fields need attention.' };
  }

  if (status === 403) {
    return { message: 'Your account is no longer an admin. Sign in again or ask to be re-added.' };
  }

  if (status === 401) {
    return { message: 'Your session has expired. Sign in again to continue.' };
  }

  if (status === 404) {
    return { message: message ?? 'That record no longer exists.' };
  }

  if (status === 409) {
    return { message: message ?? 'That change conflicts with an existing record.' };
  }

  return {
    message: message
      ? `The API rejected the request: ${message}`
      : `The API answered with an unexpected status (${String(status)}). Nothing was saved.`,
  };
}
