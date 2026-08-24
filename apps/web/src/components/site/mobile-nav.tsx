'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

import type { NavGroup } from '@/content/site/nav';
import { BrandMark } from '@/components/ui/brand-mark';
import { CtaButton } from '@/components/ui/cta-button';

/**
 * The drawer behind the header's hamburger.
 *
 * The design renders the button but defines no menu, so this is built from the
 * design's own vocabulary — canvas ground, gold hairlines, the same 11.5px
 * uppercase nav type — rather than invented from scratch.
 *
 * Each section is a native `<details>`: the drawer already owns enough state,
 * and the browser's own disclosure gives correct roles and keyboard handling
 * for free.
 *
 * The overlay is portalled to <body> rather than rendered in place. The header
 * sets `backdrop-filter`, and a backdrop-filter (like transform and filter)
 * makes an element a containing block for `position: fixed` descendants — so
 * an in-place `fixed inset-0` would resolve against the 86px header instead of
 * the viewport, collapsing the drawer to a sliver.
 */
export function MobileNav({ groups }: { groups: readonly NavGroup[] }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    /* Lock the page behind the drawer, restoring whatever overflow was there. */
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;

      /* Keep focus inside the drawer: without this, tabbing walks into the
         page behind it, which a screen reader still announces. */
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), summary',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector<HTMLElement>('a[href], button')?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => {
          setOpen((value) => !value);
        }}
        className="inline-flex size-[42px] cursor-pointer items-center justify-center rounded-[2px] border border-[rgba(27,36,54,.2)] text-ink nav:hidden"
      >
        <span aria-hidden className="flex flex-col gap-1">
          <span className="h-[1.5px] w-4 bg-current" />
          <span className="h-[1.5px] w-4 bg-current" />
          <span className="h-[1.5px] w-4 bg-current" />
        </span>
      </button>

      {/* No SSR guard needed: `open` only becomes true from a click, which
          cannot happen before hydration, so document.body always exists here. */}
      {open
        ? createPortal(
            <div className="fixed inset-0 z-[70] nav:hidden">
              <button
                type="button"
                aria-label="Close menu"
                tabIndex={-1}
                onClick={close}
                className="absolute inset-0 h-full w-full cursor-default bg-ink/40 backdrop-blur-[2px]"
              />

              <div
                ref={panelRef}
                id="mobile-nav-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
                className="absolute inset-y-0 right-0 flex w-full max-w-[380px] flex-col bg-canvas shadow-[0_0_80px_-20px_rgba(27,36,54,.5)]"
              >
                <div className="flex h-[86px] flex-none items-center justify-between border-b border-b-[rgba(27,36,54,.09)] px-6">
                  <BrandMark />
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={close}
                    className="inline-flex size-[42px] cursor-pointer items-center justify-center rounded-[2px] border border-[rgba(27,36,54,.2)] text-[19px] leading-none text-ink"
                  >
                    <span aria-hidden>&times;</span>
                  </button>
                </div>

                <nav aria-label="Site" className="flex-1 overflow-y-auto px-6 py-2">
                  {groups.map((group) => (
                    <details
                      key={group.label}
                      className="group border-b border-b-[rgba(27,36,54,.09)] [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[11.5px] font-semibold tracking-[.11em] text-ink-nav uppercase marker:content-['']">
                        {group.label}
                        <span
                          aria-hidden
                          className="relative size-3 flex-none text-gold-deep before:absolute before:top-1/2 before:left-0 before:h-[1.5px] before:w-full before:-translate-y-1/2 before:bg-current before:content-[''] after:absolute after:top-1/2 after:left-0 after:h-[1.5px] after:w-full after:-translate-y-1/2 after:rotate-90 after:bg-current after:transition-transform after:duration-200 after:content-[''] group-open:after:rotate-0"
                        />
                      </summary>

                      <div className="pb-5">
                        <Link
                          href={group.href}
                          onClick={close}
                          className="mb-4 inline-flex items-center gap-2 border-b-[1.5px] border-b-gold pb-1 font-display text-[16px] text-ink-deep"
                        >
                          {group.hubLabel}
                          <span aria-hidden className="text-gold-mid">
                            &rarr;
                          </span>
                        </Link>

                        {group.columns.map((column) => (
                          <div key={column.title} className="mt-4">
                            <div className="mb-2.5 text-[10px] font-bold tracking-[.16em] text-gold-deep uppercase">
                              {column.title}
                            </div>
                            <ul className="flex flex-col gap-2.5">
                              {column.links.map((link) => (
                                <li key={link.href + link.label}>
                                  <Link
                                    href={link.href}
                                    onClick={close}
                                    className="text-[14.5px] text-ink-nav"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </details>
                  ))}
                </nav>

                <div className="flex flex-none flex-col gap-3 border-t border-t-[rgba(27,36,54,.09)] px-6 py-6">
                  <Link
                    href="/sign-in"
                    onClick={close}
                    className="text-[11px] font-bold tracking-[.11em] text-ink uppercase"
                  >
                    Log in
                  </Link>
                  <CtaButton href="/contact" size="sm" className="w-full" onClick={close}>
                    Book a consultation
                  </CtaButton>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
