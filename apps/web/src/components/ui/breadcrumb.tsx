import Link from 'next/link';

import { cn } from '@/lib/cn';

export interface Crumb {
  label: string;
  /** Omitted on the final crumb, which is the current page. */
  href?: string;
}

/**
 * Trail above an inner-page heading.
 *
 * An ordered list inside a labelled `<nav>` — the structure assistive tech
 * expects — with the last crumb rendered as plain text carrying
 * `aria-current="page"` rather than a link back to where the reader already is.
 */
export function Breadcrumb({ items, className }: { items: readonly Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11.5px] font-semibold tracking-[.12em] text-warm uppercase">
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={crumb.label} className="flex items-center gap-2.5">
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="transition-colors duration-200 hover:text-gold-deep"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={cn(isLast && 'text-ink-nav')}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {crumb.label}
                </span>
              )}
              {isLast ? null : (
                <span aria-hidden className="text-gold-mid">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
