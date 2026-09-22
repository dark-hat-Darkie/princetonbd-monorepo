import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Next.js rejects a `'use server'` module that exports anything but async
 * functions ("found object") — the enroll checkout died exactly this way
 * when its initial form state lived in the action module. Types are erased
 * and always fine; every other value export must be an async function.
 *
 * Resolved from the working directory like `routes.test.ts`: Vitest runs
 * with the app package as its root.
 */
const srcDir = join(process.cwd(), 'src');

function serverFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      serverFiles(full, acc);
    } else if (/\.(ts|tsx)$/.test(entry) && !/\.test\.(ts|tsx)$/.test(entry)) {
      const source = readFileSync(full, 'utf8');
      const [directive] = source.split('\n');
      if (directive?.trim().replace(/;$/, '') === "'use server'") acc.push(full);
    }
  }
  return acc;
}

/** Export statements that a `'use server'` module must not carry. */
function illegalExports(source: string): string[] {
  return source
    .split('\n')
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.startsWith('export ') &&
        !line.startsWith('export async function ') &&
        !line.startsWith('export type ') &&
        !line.startsWith('export interface '),
    );
}

describe('use server modules', () => {
  it('export only async functions (and types)', () => {
    const offenders = serverFiles(srcDir).flatMap((file) =>
      illegalExports(readFileSync(file, 'utf8')).map((line) => ({
        file: relative(process.cwd(), file),
        line,
      })),
    );

    expect(offenders).toEqual([]);
  });
});
