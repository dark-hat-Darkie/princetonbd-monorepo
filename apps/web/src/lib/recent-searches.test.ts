import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  forgetSearches,
  getRecentSearches,
  getRecentSearchesServerSnapshot,
  rememberSearch,
  subscribeRecentSearches,
} from './recent-searches';

const KEY = 'prbd:batch-schedule:recent';

beforeEach(() => {
  window.localStorage.clear();
});

describe('recent searches', () => {
  it('starts empty and is always empty on the server', () => {
    expect(getRecentSearches()).toEqual([]);
    expect(getRecentSearchesServerSnapshot()).toEqual([]);
  });

  it('remembers the newest search first, without duplicates, up to five', () => {
    rememberSearch({ branch: 'gulshan', course: 'ielts' });
    rememberSearch({ branch: null, course: 'sat' });
    rememberSearch({ branch: 'gulshan', course: 'ielts' });

    expect(getRecentSearches()).toEqual([
      { branch: 'gulshan', course: 'ielts' },
      { branch: null, course: 'sat' },
    ]);

    for (const course of ['a', 'b', 'c', 'd', 'e']) rememberSearch({ branch: null, course });
    expect(getRecentSearches()).toHaveLength(5);
    expect(getRecentSearches()[0]).toEqual({ branch: null, course: 'e' });
  });

  it('ignores an any/any search', () => {
    rememberSearch({ branch: null, course: null });
    expect(getRecentSearches()).toEqual([]);
  });

  it('returns the same array while storage is unchanged', () => {
    rememberSearch({ branch: 'gulshan', course: null });
    expect(getRecentSearches()).toBe(getRecentSearches());
  });

  it('drops malformed storage rather than throwing', () => {
    window.localStorage.setItem(KEY, '{not json');
    expect(getRecentSearches()).toEqual([]);

    window.localStorage.setItem(
      KEY,
      JSON.stringify([
        { branch: 1 },
        'x',
        { branch: null, course: null },
        { branch: 'ok', course: null },
      ]),
    );
    expect(getRecentSearches()).toEqual([{ branch: 'ok', course: null }]);
  });

  it('notifies subscribers on remember and forget', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeRecentSearches(listener);

    rememberSearch({ branch: 'gulshan', course: null });
    forgetSearches();
    expect(listener).toHaveBeenCalledTimes(2);
    expect(getRecentSearches()).toEqual([]);

    unsubscribe();
    rememberSearch({ branch: 'gulshan', course: null });
    expect(listener).toHaveBeenCalledTimes(2);
  });
});
