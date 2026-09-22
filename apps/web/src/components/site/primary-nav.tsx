'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

import type { NavGroup, NavLink } from '@/content/site/nav';
import { cn } from '@/lib/cn';

/**
 * The desktop nav dropdowns.
 *
 * The only new client component on the marketing site — the panels are the one
 * piece of the header that genuinely needs state. Everything it renders comes
 * in as a serialisable prop from the RSC header, so the nav tree itself is not
 * shipped twice.
 *
 * Each top-level entry is a `<button>`, not a link. A control that is both a
 * link and a disclosure is ambiguous to operate: a keyboard user pressing Enter
 * cannot tell whether they will open the panel or leave the page. The hub is
 * instead the first row inside the panel, where it is unmissable and only ever
 * does one thing.
 *
 * The panel is a normal-width card anchored to its own trigger, not a
 * full-bleed mega-menu: each section now carries a single column, so a panel
 * spanning the page would be mostly empty. It is positioned against the group
 * wrapper — hence `relative` there — rather than against the sticky `<header>`.
 * No portal is needed; unlike the mobile drawer, which has to portal because
 * the header's `backdrop-filter` makes it a containing block for
 * `position: fixed`.
 *
 * The card is inset from the bar by a transparent `pt-[42px]` on the
 * positioned wrapper rather than by an offset, so the gap between trigger and
 * card is still part of the panel's hover area and the pointer can cross it.
 */

/** Hover grace period, in ms, so the pointer can cross the gap to the panel. */
const CLOSE_DELAY = 120;

/* Shared by the group triggers and the standalone links so the bar reads as
   one row of entries — same type, same accent underline on hover — whether
   an entry opens a panel or goes straight to a page. */
const entryClass =
  "relative flex cursor-pointer items-center gap-1 rounded-sm text-[11.5px] font-bold tracking-[.11em] whitespace-nowrap text-ink-soft uppercase transition-colors duration-200 after:absolute after:right-full after:-bottom-2 after:left-0 after:h-[2.5px] after:rounded-full after:bg-accent after:transition-[right] after:duration-[280ms] after:ease-[ease] after:content-[''] hover:text-ink hover:after:right-0";

export function PrimaryNav({
  groups,
  links = [],
}: {
  groups: readonly NavGroup[];
  /** Plain links rendered after the groups; see `navStandalone`. */
  links?: readonly NavLink[];
}) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setOpenLabel(null);
    }, CLOSE_DELAY);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  /* A navigation should never leave a panel hanging over the new page. Closing
     on the link's own click rather than on a pathname effect: the click is the
     thing that causes the navigation, so there is no render to cascade from,
     and a navigation started anywhere else is already caught by the
     pointerdown-outside handler below. */
  const close = () => {
    setOpenLabel(null);
  };

  useEffect(() => {
    if (!openLabel) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpenLabel(null);
      /* Return focus to the trigger the reader opened, not to the top of the
         document — otherwise Escape silently loses their place. */
      rootRef.current
        ?.querySelector<HTMLButtonElement>(`[data-nav-trigger="${CSS.escape(openLabel)}"]`)
        ?.focus();
    };

    /* `pointerdown` rather than `click`: closing on mousedown matches how every
       other menu on the platform behaves, and it fires before the click lands
       on whatever is underneath. */
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setOpenLabel(null);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [openLabel]);

  return (
    <nav
      aria-label="Primary"
      ref={rootRef}
      className="hidden flex-none items-center gap-[22px] nav:flex"
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
      onBlur={(event) => {
        /* Tabbing out of the last link in a panel should close it. `null`
           relatedTarget means focus left the document entirely — leave the
           panel alone in that case so it is still there on return. */
        const next = event.relatedTarget;
        if (next && !event.currentTarget.contains(next)) setOpenLabel(null);
      }}
    >
      {groups.map((group) => {
        const open = openLabel === group.label;

        return (
          <div
            key={group.label}
            className="relative"
            onMouseEnter={() => {
              cancelClose();
              setOpenLabel(group.label);
            }}
          >
            <button
              type="button"
              data-nav-trigger={group.label}
              aria-expanded={open}
              aria-controls={`nav-panel-${group.href.replace(/\W+/g, '-')}`}
              onClick={() => {
                setOpenLabel(open ? null : group.label);
              }}
              className={cn(entryClass, open && 'text-ink after:right-0')}
            >
              {group.label}
              <ChevronDown
                aria-hidden
                className={cn(
                  'size-3.5 transition-transform duration-200 motion-reduce:transition-none',
                  open && 'rotate-180',
                )}
              />
            </button>

            {open ? (
              <div
                id={`nav-panel-${group.href.replace(/\W+/g, '-')}`}
                className="absolute top-full left-0 z-[59] pt-[42px]"
              >
                <div className="w-[288px] animate-rise overflow-hidden rounded-md border border-line bg-canvas shadow-lift motion-reduce:animate-none">
                  <div aria-hidden className="h-[3px] bg-accent" />
                  <div className="p-[18px]">
                    <Link
                      href={group.href}
                      onClick={close}
                      className="group mb-5 flex items-center justify-between gap-3 rounded-sm bg-subtle px-4 py-2.5 font-display text-[15px] font-semibold tracking-[-.02em] text-ink transition-colors duration-200 hover:bg-accent hover:text-on-accent"
                    >
                      {group.hubLabel}
                      <ArrowRight
                        aria-hidden
                        className="size-4 flex-none transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                      />
                    </Link>

                    <div className="flex flex-col gap-6">
                      {group.columns.map((column) => (
                        <div key={column.title}>
                          <div className="mb-3 text-[10.5px] font-bold tracking-[.16em] text-brand-ink uppercase">
                            {column.title}
                          </div>
                          <ul className="flex flex-col gap-[11px]">
                            {column.links.map((link) => (
                              <li key={link.href + link.label}>
                                <Link
                                  href={link.href}
                                  onClick={close}
                                  className="rounded-sm text-[14.5px] leading-[1.4] text-muted transition-colors duration-200 hover:text-brand-ink"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {group.featured?.length ? (
                      <div className="mt-5 flex flex-col gap-3 border-t border-t-line pt-4">
                        {group.featured.map((link) => (
                          <Link
                            key={link.href + link.label}
                            href={link.href}
                            onClick={close}
                            className="group inline-flex items-center gap-2 rounded-sm text-[11.5px] font-bold tracking-[.08em] text-ink uppercase transition-colors duration-200 hover:text-brand-ink"
                          >
                            {link.label}
                            <ArrowRight
                              aria-hidden
                              className="size-3.5 flex-none transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                            />
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}

      {links.map((link) => (
        <Link
          key={link.href + link.label}
          href={link.href}
          onClick={close}
          onMouseEnter={scheduleClose}
          className={entryClass}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
