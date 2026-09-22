import type { ScheduleSelection } from '@/lib/schedule';

/**
 * The batch-schedule page's "recently searched" rail, kept in the visitor's
 * own browser.
 *
 * Stored as slugs, never labels, so a renamed campus still resolves and an
 * entry for a course that has since been unpublished simply fails to
 * resolve and is skipped. Exposed as an external store for
 * `useSyncExternalStore`: the server snapshot is always empty, so the page
 * hydrates cleanly and the list appears on the first client render — the
 * one pattern that reads browser storage without a hydration mismatch or a
 * setState-in-effect.
 *
 * Every storage access is wrapped: private windows and blocked site data
 * throw on read or write, and either way the page must still work.
 */

const KEY = 'prbd:batch-schedule:recent';
const MAX_ENTRIES = 5;
const EMPTY: readonly ScheduleSelection[] = [];

const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedValue: readonly ScheduleSelection[] = EMPTY;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function isSelection(value: unknown): value is ScheduleSelection {
  if (typeof value !== 'object' || value === null) return false;
  const { branch, course } = value as Record<string, unknown>;
  const ok = (field: unknown) => field === null || typeof field === 'string';
  return ok(branch) && ok(course) && (branch !== null || course !== null);
}

function parse(raw: string | null): readonly ScheduleSelection[] {
  if (!raw) return EMPTY;
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return EMPTY;
    return value
      .filter(isSelection)
      .map(({ branch, course }) => ({ branch, course }))
      .slice(0, MAX_ENTRIES);
  } catch {
    return EMPTY;
  }
}

function notify(): void {
  for (const listener of listeners) listener();
}

export function sameSelection(a: ScheduleSelection, b: ScheduleSelection): boolean {
  return a.branch === b.branch && a.course === b.course;
}

/** Stable across calls while storage is unchanged, as `useSyncExternalStore` requires. */
export function getRecentSearches(): readonly ScheduleSelection[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = parse(raw);
  }
  return cachedValue;
}

export function getRecentSearchesServerSnapshot(): readonly ScheduleSelection[] {
  return EMPTY;
}

export function subscribeRecentSearches(listener: () => void): () => void {
  listeners.add(listener);
  /* Another tab's search shows up here too. */
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

/** Put a search at the top of the list; an "any / any" search is not worth remembering. */
export function rememberSearch(selection: ScheduleSelection): void {
  if (selection.branch === null && selection.course === null) return;

  const next = [
    selection,
    ...getRecentSearches().filter((entry) => !sameSelection(entry, selection)),
  ].slice(0, MAX_ENTRIES);

  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    return;
  }
  notify();
}

export function forgetSearches(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    return;
  }
  notify();
}
