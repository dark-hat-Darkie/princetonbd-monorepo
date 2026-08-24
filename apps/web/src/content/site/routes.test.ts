import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { describe, expect, it } from 'vitest';

import { footerColumns, legalLinks } from './footer';
import { navGroups } from './nav';
import { breadcrumbFor, routes } from './routes';

/**
 * Link integrity, enforced against the filesystem.
 *
 * `typedRoutes` is enabled in next.config.ts, but the generated route union is
 * not applied to link hrefs in this project's TypeScript setup — a
 * `<Link href="/does-not-exist">` compiles and builds clean. That is exactly
 * the class of mistake that is invisible until a visitor hits it, and with
 * sixty-odd routes it is the mistake most likely to happen.
 *
 * So this test does what the compiler is not: it reads the real files under
 * `src/app`, derives the routes they define, and checks every href the
 * navigation and footer can produce against that set.
 */

/* Resolved from the working directory rather than `import.meta.url`: the
   jsdom environment does not give this module a file: URL, so `fileURLToPath`
   throws. Vitest always runs with the app package as its root. */
const srcDir = join(process.cwd(), 'src');
const appDir = join(srcDir, 'app');

/** Every route the App Router actually serves a page for. */
function collectRoutes(dir: string, acc = new Set<string>()): Set<string> {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    if (entry === 'node_modules') continue;

    if (readdirSync(full).includes('page.tsx')) {
      const segments = relative(appDir, full)
        .split(sep)
        /* Route groups — `(marketing)` — are organisational and contribute
           nothing to the URL. */
        .filter((segment) => !segment.startsWith('('));
      acc.add(`/${segments.join('/')}`);
    }

    collectRoutes(full, acc);
  }

  return acc;
}

const fileRoutes = collectRoutes(appDir);
/* The root page lives at src/app/(marketing)/page.tsx, which reduces to "". */
if (fileRoutes.has('/')) fileRoutes.delete('');
fileRoutes.add('/');

/** Dynamic segments cannot be matched literally; check the parent instead. */
const staticFileRoutes = new Set([...fileRoutes].filter((route) => !route.includes('[')));

const navHrefs = navGroups.flatMap((group) => [
  { where: `nav group "${group.label}"`, href: group.href },
  ...group.columns.flatMap((column) =>
    column.links.map((link) => ({
      where: `nav "${group.label}" › ${column.title} › ${link.label}`,
      href: link.href,
    })),
  ),
  ...(group.featured ?? []).map((link) => ({
    where: `nav "${group.label}" › featured › ${link.label}`,
    href: link.href,
  })),
]);

const footerHrefs = [
  ...footerColumns.flatMap((column) =>
    column.links.map((link) => ({
      where: `footer "${column.title}" › ${link.label}`,
      href: link.href,
    })),
  ),
  ...legalLinks.map((link) => ({ where: `footer legal › ${link.label}`, href: link.href })),
];

describe('route registry', () => {
  it('has a real page file for every registered route', () => {
    const missing = routes.filter((route) => !staticFileRoutes.has(route.path));

    expect(missing.map((route) => route.path)).toEqual([]);
  });

  /**
   * The registry drives `sitemap.xml`, so a page belongs in it only if it
   * should be crawled. Two kinds of page should not be: anything behind a
   * session, and the pages that exist purely to carry someone through the
   * sign-in flow. Both are excluded here rather than registered and then
   * filtered back out at sitemap time.
   */
  const notCrawlable = ['/dashboard', '/auth/'];

  it('registers every crawlable page file that exists', () => {
    const registered = new Set(routes.map((route) => route.path));
    const unregistered = [...staticFileRoutes].filter(
      (route) => !registered.has(route) && !notCrawlable.some((prefix) => route.startsWith(prefix)),
    );

    expect(unregistered).toEqual([]);
  });

  it('declares a parent that exists, for every route that declares one', () => {
    const known = new Set(routes.map((route) => route.path));
    const orphans = routes.filter((route) => route.parent && !known.has(route.parent));

    expect(orphans.map((route) => `${route.path} → ${String(route.parent)}`)).toEqual([]);
  });

  it('builds a breadcrumb trail that starts at Home and ends unlinked', () => {
    for (const route of routes) {
      const trail = breadcrumbFor(route.path);
      const last = trail[trail.length - 1];

      expect(trail[0]?.label).toBe('Home');
      expect(last?.href).toBeUndefined();
      expect(last?.label).toBe(route.label);
    }
  });
});

describe('navigation links', () => {
  it.each(navHrefs)('$where points at a real page ($href)', ({ href }) => {
    expect(staticFileRoutes.has(href)).toBe(true);
  });

  it.each(footerHrefs)('$where points at a real page ($href)', ({ href }) => {
    expect(staticFileRoutes.has(href)).toBe(true);
  });

  it('lists every nav destination in the route registry', () => {
    const registered = new Set(routes.map((route) => route.path));
    const missing = navHrefs.filter((entry) => !registered.has(entry.href));

    expect(missing.map((entry) => entry.where)).toEqual([]);
  });
});

describe('no placeholder links remain', () => {
  /** Every .tsx under src, so a stray `href="#"` anywhere is caught. */
  function collectSources(dir: string, acc: string[] = []): string[] {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        collectSources(full, acc);
      } else if (entry.endsWith('.tsx')) {
        acc.push(full);
      }
    }
    return acc;
  }

  it('has no href="#" left in any component or page', () => {
    const offenders = collectSources(srcDir).filter((file) =>
      /href=["']#["']/.test(readFileSync(file, 'utf8')),
    );

    expect(offenders.map((file) => relative(srcDir, file))).toEqual([]);
  });
});
