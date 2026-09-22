import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * The root layout self-hosts its typefaces through `next/font/local` so
 * `next build` never fetches from fonts.googleapis.com. That fetch used to
 * fail the production build in offline build environments — and stays one
 * Google Fonts outage away from failing it on Vercel too.
 *
 * This test pins the hermeticity: the font binaries must be checked in, and
 * no `next/font/google` import may reappear under `src/`.
 */
const srcDir = join(process.cwd(), 'src');

const fontFiles = [
  'fonts/bricolage-grotesque-latin-standard-normal.woff2',
  'fonts/hanken-grotesk-latin-wght-normal.woff2',
];

describe('self-hosted fonts', () => {
  for (const file of fontFiles) {
    it(`checks in ${file}`, () => {
      const path = join(srcDir, file);
      expect(existsSync(path), `${file} must be committed for next/font/local`).toBe(true);
      expect(statSync(path).size).toBeGreaterThan(0);
    });
  }

  it('loads no fonts from Google at build time', async () => {
    const { readdirSync } = await import('node:fs');
    const offenders: string[] = [];
    const walk = (dir: string): void => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.name === 'node_modules') continue;
        const path = join(dir, entry.name);
        if (entry.isDirectory()) walk(path);
        else if (/\.(ts|tsx|mts)$/.test(entry.name)) {
          const content = readFileSync(path, 'utf8');
          /* Match real imports only — comments may mention the module name. */
          if (
            /from\s+['"]next\/font\/google['"]|require\(\s*['"]next\/font\/google['"]/.test(content)
          ) {
            offenders.push(path);
          }
        }
      }
    };
    walk(srcDir);
    expect(offenders).toEqual([]);
  });
});
