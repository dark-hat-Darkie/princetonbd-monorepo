import Link from 'next/link';

import { cn } from '@/lib/cn';

/**
 * Small uppercase tag. Used for article categories, exam families and filter
 * chips. Renders as a link when given an href, otherwise as a static label.
 */
export function Pill({
  children,
  href,
  active = false,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  active?: boolean;
  className?: string;
}) {
  const shell = cn(
    'inline-flex items-center rounded-full border px-3.5 py-2 text-[11px] font-bold tracking-[.11em] uppercase transition-colors duration-200',
    active
      ? 'border-brand bg-brand-soft text-brand-ink'
      : 'border-line-strong text-ink-soft hover:border-brand hover:text-brand-ink',
    className,
  );

  return href ? (
    <Link href={href} className={shell}>
      {children}
    </Link>
  ) : (
    <span className={shell}>{children}</span>
  );
}
