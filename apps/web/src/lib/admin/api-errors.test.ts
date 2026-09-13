import { describe, expect, it } from 'vitest';

import { toFormError } from './api-errors';

const res = (status: number) => ({ status }) as Response;

describe('toFormError', () => {
  it('maps a validation 400 onto fields, first message each', () => {
    const result = toFormError(
      {
        statusCode: 400,
        message: 'Validation failed',
        errors: { name: ['a', 'b'], 'modules.1.title': ['c'] },
      },
      res(400),
    );
    expect(result.errors).toEqual({ name: 'a', 'modules.1.title': 'c' });
    expect(result.message).toMatch(/fields/);
  });

  it('surfaces a conflict message verbatim', () => {
    expect(toFormError({ statusCode: 409, message: 'slug taken' }, res(409)).message).toBe(
      'slug taken',
    );
  });

  it('explains a lost admin role and an expired session', () => {
    expect(toFormError({}, res(403)).message).toMatch(/no longer an admin/);
    expect(toFormError({}, res(401)).message).toMatch(/expired/);
  });

  it('treats a missing response as a transport failure', () => {
    expect(toFormError(new TypeError('fetch failed')).message).toMatch(/Could not reach/);
  });
});
