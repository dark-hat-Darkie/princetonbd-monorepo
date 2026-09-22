import type { z } from 'zod';

import { toFormError } from '../api-errors';
import { echoValues, firstErrors, readForm, type ReadFormOptions } from '../form-data';
import type { AdminFormState } from '../form-state';

/** The shape every generated SDK call resolves to. */
interface SdkResult<R> {
  data?: R;
  error?: unknown;
  response?: Response;
}

export type SubmitOutcome<R> = { ok: false; state: AdminFormState } | { ok: true; data: R };

/**
 * The steps every admin form action shares: parse the form, validate it,
 * send it, and turn any failure into the state the form renders.
 *
 * On success the saved record comes back so the action can revalidate the
 * exact public pages it touched. `redirect()` throws and must not sit inside
 * anything that catches, so it stays in the action itself rather than here.
 */
export async function submitForm<T, R>({
  formData,
  schema,
  options,
  send,
}: {
  formData: FormData;
  schema: z.ZodType<T>;
  options: ReadFormOptions;
  send: (data: T) => Promise<SdkResult<R>>;
}): Promise<SubmitOutcome<R>> {
  const parsed = schema.safeParse(readForm(formData, options));
  if (!parsed.success) {
    return {
      ok: false,
      state: {
        status: 'error',
        message: 'Some fields need attention.',
        errors: firstErrors(parsed.error),
        values: echoValues(formData),
      },
    };
  }

  const result = await send(parsed.data);
  if (result.error !== undefined || result.data === undefined) {
    return {
      ok: false,
      state: {
        status: 'error',
        ...toFormError(result.error, result.response),
        values: echoValues(formData),
      },
    };
  }

  return { ok: true, data: result.data };
}

/** For `<form action>` buttons that carry no fields: delete, publish, archive. */
export async function submitCommand(
  send: () => Promise<SdkResult<unknown>>,
): Promise<string | null> {
  const result = await send();
  if (result.error !== undefined) {
    return toFormError(result.error, result.response).message ?? 'The request failed.';
  }
  return null;
}

/** `?flash=` for the page the action redirects to. */
export function withFlash(path: string, message: string): string {
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}flash=${encodeURIComponent(message)}`;
}
