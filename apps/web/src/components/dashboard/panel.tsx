import Link from 'next/link';

import { cn } from '@/lib/cn';

/**
 * The portal's card. One border weight, one ground, a gold hairline under the
 * heading — the marketing pages' vocabulary at the density an app screen needs.
 */
export function Panel({
  title,
  meta,
  action,
  children,
  className,
}: {
  title?: string;
  /** Small right-aligned note in the header row, e.g. a count or a date. */
  meta?: string;
  action?: { label: string; href: string };
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('border border-[rgba(27,36,54,.1)] bg-surface', className)}>
      {title ? (
        <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-b-[rgba(27,36,54,.09)] px-6 py-4">
          <h2 className="font-display text-[19px] leading-none font-normal text-ink-deep">
            {title}
          </h2>
          {meta ? <span className="text-[12.5px] text-warm">{meta}</span> : null}
          {action ? (
            <Link
              href={action.href}
              className="group inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[.08em] text-ink-nav uppercase transition-colors duration-200 hover:text-gold-deep"
            >
              {action.label}
              <span aria-hidden>&rarr;</span>
            </Link>
          ) : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}

/** A row inside a Panel, hairline-separated from its neighbours. */
export function PanelRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-4 border-b border-b-[rgba(27,36,54,.07)] px-6 py-4 last:border-b-0',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Shown in place of rows when a panel has nothing to list. */
export function PanelEmpty({ children }: { children: React.ReactNode }) {
  return <p className="px-6 py-8 text-[14.5px] leading-[1.6] text-muted">{children}</p>;
}
