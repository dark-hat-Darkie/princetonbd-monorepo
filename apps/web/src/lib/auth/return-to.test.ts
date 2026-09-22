import { describe, expect, it } from 'vitest';

import { DEFAULT_NEXT, safeNextPath, signInHref } from './return-to';

describe('safeNextPath', () => {
  it('passes root-relative paths through, query and hash included', () => {
    expect(safeNextPath('/dashboard')).toBe('/dashboard');
    expect(safeNextPath('/enroll?course=sat&batch=abc')).toBe('/enroll?course=sat&batch=abc');
    expect(safeNextPath('/')).toBe('/');
  });

  it('falls back for anything that could leave this origin', () => {
    expect(safeNextPath('https://evil.example.com')).toBe(DEFAULT_NEXT);
    expect(safeNextPath('//evil.example.com/path')).toBe(DEFAULT_NEXT);
    expect(safeNextPath('javascript:alert(1)')).toBe(DEFAULT_NEXT);
    expect(safeNextPath('/\\/evil.example.com')).toBe(DEFAULT_NEXT);
    expect(safeNextPath('/\\evil')).toBe(DEFAULT_NEXT);
    expect(safeNextPath('dashboard')).toBe(DEFAULT_NEXT);
  });

  it('falls back for missing or non-string values', () => {
    expect(safeNextPath(undefined)).toBe(DEFAULT_NEXT);
    expect(safeNextPath(null)).toBe(DEFAULT_NEXT);
    expect(safeNextPath('')).toBe(DEFAULT_NEXT);
    expect(safeNextPath(['/dashboard'])).toBe(DEFAULT_NEXT);
  });

  it('honours a custom fallback', () => {
    expect(safeNextPath('https://evil.example.com', '/sign-in')).toBe('/sign-in');
  });
});

describe('signInHref', () => {
  it('returns the plain path when there is nothing to preserve', () => {
    expect(signInHref()).toBe('/sign-in');
    expect(signInHref(null)).toBe('/sign-in');
    expect(signInHref(DEFAULT_NEXT)).toBe('/sign-in');
  });

  it('encodes the return path so query strings survive', () => {
    expect(signInHref('/enroll?course=sat&batch=abc')).toBe(
      '/sign-in?next=%2Fenroll%3Fcourse%3Dsat%26batch%3Dabc',
    );
  });
});
