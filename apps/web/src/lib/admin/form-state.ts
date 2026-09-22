/**
 * What an admin form action hands back to `useActionState`.
 *
 * Same contract as the enquiry form's `LeadState`, widened to any field name:
 * a rejected submission returns the messages keyed by field path (dotted for
 * nested rows, e.g. `modules.2.title`) and echoes the typed values so nothing
 * is lost. A successful action never returns — it `redirect()`s, so the only
 * statuses are "nothing yet" and "here is what to fix".
 */
export interface AdminFormState {
  status: 'idle' | 'error';
  /** A form-level message: an API failure, a conflict, a permission problem. */
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
}

export const initialAdminFormState: AdminFormState = { status: 'idle' };
