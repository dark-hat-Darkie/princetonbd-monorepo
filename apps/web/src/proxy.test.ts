import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * `withAuth()` throws "isn't covered by the AuthKit middleware" on any route
 * the proxy matcher skips — the enroll checkout hit exactly this. So the
 * matcher and the callers are checked against each other: every page or
 * layout under `src/app` that calls `withAuth` must resolve to a route the
 * matcher covers.
 *
 * The matcher is read as source text rather than imported: importing
 * `proxy.ts` pulls in AuthKit's Next.js runtime (`next/cache`), which has no
 * meaning under Vitest.
 *
 * Resolved from the working directory like `routes.test.ts`: Vitest runs
 * with the app package as its root.
 */
const srcDir = join(process.cwd(), 'src');
const appDir = join(srcDir, 'app');

function readMatcher(): string[] {
  const source = readFileSync(join(srcDir, 'proxy.ts'), 'utf8');
  const block = /matcher:\s*\[([\s\S]*?)\]/.exec(source)?.[1] ?? '';
  return [...block.matchAll(/'([^']+)'/g)].map((match) => match[1]!);
}

const SOURCE_PATTERN = /\bawait\s+withAuth\s*\(/;

/**
 * Every source file that calls `withAuth`. `await withAuth(` rather than a
 * bare substring so comments that merely mention it (the root layout
 * documents why it does *not* call it) do not count as callers.
 */
function collectCallers(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      collectCallers(full, acc);
    } else if (
      /\.(ts|tsx)$/.test(entry) &&
      !/\.test\.(ts|tsx)$/.test(entry) &&
      SOURCE_PATTERN.test(readFileSync(full, 'utf8'))
    ) {
      acc.push(full);
    }
  }
  return acc;
}

/** Module specifiers a file imports, resolved to source files when local. */
function localImports(file: string): string[] {
  const source = readFileSync(file, 'utf8');
  const specifiers = [
    ...source.matchAll(/from\s+['"]([^'"]+)['"]/g),
    ...source.matchAll(/import\s*\(\s*['"]([^'"]+)['"]\s*\)/g),
  ].map((match) => match[1]!);
  const resolved: string[] = [];
  for (const spec of specifiers) {
    const candidates = spec.startsWith('@/')
      ? [join(srcDir, `${spec.slice(2)}.ts`), join(srcDir, `${spec.slice(2)}.tsx`)]
      : spec.startsWith('.')
        ? [join(file, '..', `${spec}.ts`), join(file, '..', `${spec}.tsx`)]
        : [];
    const hit = candidates.find((candidate) => {
      try {
        return statSync(candidate).isFile();
      } catch {
        return false;
      }
    });
    if (hit) resolved.push(hit);
  }
  return resolved;
}

function routeOf(file: string): string {
  const segments = relative(appDir, file)
    .split(sep)
    /* Route groups are organisational and contribute nothing to the URL. */
    .filter((segment) => !segment.startsWith('('))
    .slice(0, -1);
  return `/${segments.join('/')}`;
}

/**
 * Routes a caller file obliges the matcher to cover. A page obliges its own
 * route; a layout runs on every request under its directory, so it obliges
 * every page route beneath it — including pages that never call `withAuth`
 * themselves.
 */
function obligedRoutes(file: string): string[] {
  if (file.endsWith('page.tsx')) return [routeOf(file)];
  const pages: string[] = [];
  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (entry === 'page.tsx') pages.push(routeOf(full));
    }
  };
  walk(join(file, '..'));
  return pages;
}

function isCovered(matcher: readonly string[], route: string): boolean {
  return matcher.some((pattern) => {
    if (pattern.endsWith('/:path*')) {
      const prefix = pattern.slice(0, -'/:path*'.length);
      return route === prefix || route.startsWith(`${prefix}/`);
    }
    return route === pattern;
  });
}

describe('proxy matcher', () => {
  it('covers every route that can reach a withAuth call', () => {
    const matcher = readMatcher();
    expect(matcher.length).toBeGreaterThan(0);

    /* Every app page/layout that can reach a `withAuth` call — directly or
       through a helper (the return-page verifier, the checkout action, the
       API client) — obliges its routes. Forward reachability from each app
       file through the import graph, so pages that never name `withAuth`
       are covered too. */
    const callers = new Set(collectCallers(srcDir));
    const reachable = (file: string): boolean => {
      const seen = new Set<string>();
      const stack = [file];
      while (stack.length > 0) {
        const current = stack.pop()!;
        if (seen.has(current)) continue;
        seen.add(current);
        if (callers.has(current)) return true;
        stack.push(...localImports(current));
      }
      return false;
    };

    const uncovered: { file: string; route: string }[] = [];
    const walkApp = (dir: string): void => {
      for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) {
          walkApp(full);
        } else if (entry === 'page.tsx' || entry === 'layout.tsx') {
          if (reachable(full)) {
            for (const route of obligedRoutes(full)) {
              if (!isCovered(matcher, route)) {
                uncovered.push({ file: relative(process.cwd(), full), route });
              }
            }
          }
        }
      }
    };
    walkApp(appDir);
    uncovered.sort((a, b) => a.route.localeCompare(b.route) || a.file.localeCompare(b.file));

    expect(uncovered).toEqual([]);
  });
});
