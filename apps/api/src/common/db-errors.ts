/**
 * Postgres error codes the services translate into HTTP responses.
 * https://www.postgresql.org/docs/current/errcodes-appendix.html
 */
export const PG_UNIQUE_VIOLATION = '23505';
export const PG_FOREIGN_KEY_VIOLATION = '23503';
export const PG_CHECK_VIOLATION = '23514';

/**
 * Whether `error` is (or wraps) a Postgres error with the given SQLSTATE.
 *
 * Drizzle wraps driver errors in a `DrizzleQueryError` whose `cause` is the
 * original `pg` error, so the code is found by walking the cause chain rather
 * than by looking at the outermost object.
 */
export function isPgError(error: unknown, code: string): boolean {
  let current: unknown = error;
  for (let depth = 0; depth < 5 && typeof current === 'object' && current !== null; depth += 1) {
    const candidate = current as { code?: unknown; cause?: unknown };
    if (candidate.code === code) return true;
    current = candidate.cause;
  }
  return false;
}
