/**
 * Shared shape for the auth forms. Lives outside `actions.ts` on purpose: a
 * `'use server'` module may only export async functions, so the state and its
 * initial value live here where both the form and the action can import them.
 * Same split as the enrollment form (`lib/enroll/form-state.ts`).
 */
export interface AuthFormState {
  status: 'idle' | 'error';
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
}

export const initialAuthState: AuthFormState = { status: 'idle' };
