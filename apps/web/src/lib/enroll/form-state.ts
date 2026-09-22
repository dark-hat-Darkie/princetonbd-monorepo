/**
 * State for the enrollment details form. Lives outside `actions.ts` on
 * purpose: a `'use server'` module may only export async functions, so the
 * initial state and its type live here where both the form and the action
 * can import them.
 */
export interface EnrollFormState {
  status: 'idle' | 'error';
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
  enrollmentId?: string;
}

export const initialEnrollState: EnrollFormState = { status: 'idle' };
