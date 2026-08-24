'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { BrandMark } from '@/components/ui/brand-mark';
import type { PortalLink } from './portal-nav';
import { PortalLinks } from './portal-links';

/**
 * The portal's navigation below `lg`, where the sidebar is hidden.
 *
 * Portalled to <body> for the same reason the marketing drawer is: the bar
 * above it sets `backdrop-filter`, which makes an element a containing block
 * for `position: fixed` descendants, so an in-place `fixed inset-0` would
 * resolve against the 64px bar instead of the viewport.
 */
export function PortalDrawer({
  links,
  footer,
}: {
  links: readonly PortalLink[];
  /** Server-rendered slot — the account chip and its sign-out form. */
  footer: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
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
        aria-controls="portal-drawer"
        onClick={() => {
          setOpen((value) => !value);
        }}
        className="inline-flex size-10 cursor-pointer items-center justify-center rounded-[2px] border border-[rgba(27,36,54,.2)] text-ink lg:hidden"
      >
        <span aria-hidden className="flex flex-col gap-[3px]">
          <span className="h-[1.5px] w-4 bg-current" />
          <span className="h-[1.5px] w-4 bg-current" />
          <span className="h-[1.5px] w-4 bg-current" />
        </span>
      </button>

      {open
        ? createPortal(
            <div className="fixed inset-0 z-[70] lg:hidden">
              <button
                type="button"
                aria-label="Close menu"
                tabIndex={-1}
                onClick={close}
                className="absolute inset-0 h-full w-full cursor-default bg-ink/50 backdrop-blur-[2px]"
              />

              <div
                ref={panelRef}
                id="portal-drawer"
                role="dialog"
                aria-modal="true"
                aria-label="Portal menu"
                className="absolute inset-y-0 left-0 flex w-full max-w-[280px] flex-col bg-ink"
              >
                <div className="flex h-[86px] flex-none items-center justify-between border-b border-b-[rgba(244,241,232,.12)] px-6">
                  <BrandMark variant="footer" />
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={close}
                    className="inline-flex size-9 cursor-pointer items-center justify-center rounded-[2px] border border-[rgba(244,241,232,.25)] text-[18px] leading-none text-foot-bright"
                  >
                    <span aria-hidden>&times;</span>
                  </button>
                </div>

                <nav aria-label="Portal" className="flex-1 overflow-y-auto px-4 py-5">
                  <PortalLinks links={links} onNavigate={close} />
                </nav>

                <div className="flex-none border-t border-t-[rgba(244,241,232,.12)] px-6 py-5">
                  {footer}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
