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
    'inline-flex items-center rounded-[2px] border px-3.5 py-2 text-[11px] font-bold tracking-[.11em] uppercase transition-colors duration-200',
    active
      ? 'border-gold bg-cream text-gold-deep'
      : 'border-[rgba(27,36,54,.16)] text-ink-nav hover:border-gold hover:text-gold-deep',
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
