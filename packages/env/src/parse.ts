import type { z } from 'zod';

/**
 * Validate a record against a Zod schema, failing loudly and immediately.
 *
 * Env problems should surface at process start with the full list of what is
 * wrong — not as an `undefined` threaded into a database driver on the first
 * request.
 *
 * `SKIP_ENV_VALIDATION=1` exists for build steps (Docker image builds, `next
 * build` in CI) that compile the app without runtime secrets present.
 */
export function parseEnv<T extends z.ZodType>(
  schema: T,
  source: Record<string, string | undefined>,
  label: string,
): z.infer<T> {
  if (source.SKIP_ENV_VALIDATION) {
    return source as z.infer<T>;
  }

  const result = schema.safeParse(source);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid ${label} environment variables:\n${issues}\n`);
  }

  return result.data;
}
