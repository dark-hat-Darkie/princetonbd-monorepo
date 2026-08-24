'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import type { NavGroup } from '@/content/site/nav';
import { cn } from '@/lib/cn';

/**
 * The desktop mega-menu.
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
 * The panel is positioned against the sticky `<header>`, which is already a
 * positioned ancestor. No portal is needed — unlike the mobile drawer, which
 * has to portal because the header's `backdrop-filter` makes it a containing
 * block for `position: fixed`.
 */

/** Hover grace period, in ms, so the pointer can cross the gap to the panel. */
const CLOSE_DELAY = 120;

export function PrimaryNav({ groups }: { groups: readonly NavGroup[] }) {
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
              className={cn(
                "relative cursor-pointer text-[11.5px] font-semibold tracking-[.11em] whitespace-nowrap text-ink-nav uppercase after:absolute after:right-full after:-bottom-1.5 after:left-0 after:h-[1.5px] after:bg-gold after:transition-[right] after:duration-[280ms] after:ease-[ease] after:content-[''] hover:after:right-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
                open && 'after:right-0',
              )}
            >
              {group.label}
            </button>

            {open ? (
              <div
                id={`nav-panel-${group.href.replace(/\W+/g, '-')}`}
                /* `top-full` resolves against the sticky header, so the panel
                   hangs from the bar's lower edge at full page width. */
                className="absolute inset-x-0 top-full z-[59] animate-rise border-b border-b-[rgba(27,36,54,.1)] border-t-gold bg-canvas shadow-[0_30px_60px_-30px_rgba(27,36,54,.35)] motion-reduce:animate-none"
              >
                <div aria-hidden className="h-[2px] bg-gold" />
                <div className="mx-auto max-w-page px-5 py-10 sm:px-8 lg:px-11">
                  <Link
                    href={group.href}
                    onClick={close}
                    className="group mb-8 inline-flex items-center gap-2.5 border-b-[1.5px] border-b-gold pb-[6px] font-display text-[19px] text-ink-deep transition-[gap] duration-200 hover:gap-3.5"
                  >
                    {group.hubLabel}
                    <span aria-hidden className="text-gold-mid">
                      &rarr;
                    </span>
                  </Link>

                  <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
                    {group.columns.map((column) => (
                      <div key={column.title}>
                        <div className="mb-[18px] text-[10.5px] font-bold tracking-[.16em] text-gold-deep uppercase">
                          {column.title}
                        </div>
                        <ul className="flex flex-col gap-[11px]">
                          {column.links.map((link) => (
                            <li key={link.href + link.label}>
                              <Link
                                href={link.href}
                                onClick={close}
                                className="text-[14.5px] leading-[1.4] text-ink-nav transition-colors duration-200 hover:text-gold-deep"
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
                    <div className="mt-9 flex flex-wrap gap-x-9 gap-y-3 border-t border-t-[rgba(27,36,54,.1)] pt-6">
                      {group.featured.map((link) => (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          onClick={close}
                          className="group inline-flex items-center gap-2 text-[13px] font-bold tracking-[.08em] text-ink uppercase transition-[gap] duration-200 hover:gap-3 hover:text-gold-deep"
                        >
                          {link.label}
                          <span aria-hidden className="text-gold-mid">
                            &rarr;
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
