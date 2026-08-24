'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { PortalLink } from './portal-nav';
import { cn } from '@/lib/cn';

/**
 * The link list, shared by the sidebar and the mobile drawer.
 *
 * Client-side only because the active item is derived from the current path.
 * Matched exactly rather than by prefix: every portal route is a leaf, and a
 * `startsWith` test would light up Overview on all of them.
 */
export function PortalLinks({
  links,
  onNavigate,
}: {
  links: readonly PortalLink[];
  /** Lets the drawer close itself when a link is followed. */
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-0.5">
      {links.map((link) => {
        const active = pathname === link.href;

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative block rounded-[2px] py-2.5 pr-3 pl-5 text-[14px] transition-colors duration-200',
                'before:absolute before:top-1/2 before:left-0 before:h-4 before:w-[2px] before:-translate-y-1/2 before:content-[""]',
                active
                  ? 'bg-[rgba(244,241,232,.07)] text-foot-bright before:bg-gold-light'
                  : 'text-foot-text before:bg-transparent hover:text-foot-bright',
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
