import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * The marketing site is fully on the semantic tokens in globals.css. The
 * retired warm-gold names still exist there as aliases — only because the
 * student portal has not been re-themed yet — so nothing stops a new marketing
 * component from reaching for `text-gold-deep` and quietly rendering green.
 * This test does.
 *
 * Scope is the marketing route group and the shared component trees. The
 * portal (`app/(app)`, `components/dashboard`) is deliberately not walked.
 */
const srcDir = join(process.cwd(), 'src');

const scope = [
  'app/(marketing)',
  'components/ui',
  'components/sections',
  'components/templates',
  'components/forms',
  'components/site',
  'components/landing',
  'components/motion',
];

const legacyNames = [
  'cream',
  'band',
  'bar',
  'ink-deep',
  'ink-hover',
  'ink-nav',
  'ink-quote',
  'muted-badge',
  'muted-stat',
  'muted-rate',
  'muted-step',
  'slate',
  'gold',
  'gold-deep',
  'gold-mid',
  'gold-light',
  'gold-pale',
  'warm',
  'warm-ink',
  'foot-bright',
  'foot-text',
  'foot-muted',
  'foot-dim',
].join('|');

const utilityPrefixes =
  'bg|text|border|border-[xytlbr]|decoration|outline|fill|stroke|from|to|via|ring|divide|placeholder|accent|caret';

const legacy = new RegExp(
  `(?:^|[\\s"'\`:/(\\[])(?:[a-z-]+:)*(?:${utilityPrefixes})-(?:${legacyNames})(?:/\\d+)?(?=[\\s"'\`\\]]|$)` +
    `|rgba\\(27,\\s?36,\\s?54|rgba\\(198,\\s?163,\\s?95|rgba\\(244,\\s?241,\\s?232|#a8452f|rounded-\\[2px\\]`,
);

function collect(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      collect(full, acc);
    } else if (/\.tsx?$/.test(entry) && !/\.test\.tsx?$/.test(entry)) {
      acc.push(full);
    }
  }
  return acc;
}

describe('marketing components use only the semantic tokens', () => {
  it('reference no retired colour name or hard-coded legacy colour', () => {
    const offenders: string[] = [];

    for (const file of scope.flatMap((dir) => collect(join(srcDir, dir)))) {
      readFileSync(file, 'utf8')
        .split('\n')
        .forEach((line, index) => {
          if (legacy.test(line)) {
            offenders.push(`${relative(srcDir, file)}:${String(index + 1)}  ${line.trim()}`);
          }
        });
    }

    expect(offenders).toEqual([]);
  });
});
