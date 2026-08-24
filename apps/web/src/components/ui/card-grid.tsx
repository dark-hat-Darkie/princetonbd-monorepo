import Link from 'next/link';

import type { GridCard } from '@/content/types';
import { cn } from '@/lib/cn';

/**
 * The bordered card grid the landing page uses for its six programs.
 *
 * The hairlines between cards are the 1px grid gap showing the container
 * colour through — not borders on the cards themselves. Keep `gap-px` and the
 * container background together or the rules disappear.
 */
export function CardGrid({
  cards,
  columns = 3,
  className,
}: {
  cards: readonly GridCard[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const columnClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-px border border-[rgba(27,36,54,.09)] bg-[rgba(27,36,54,.09)]',
        columnClass,
        className,
      )}
    >
      {cards.map((card) => {
        const body = (
          <>
            {(card.tag ?? card.no) ? (
              <div className="mb-[26px] flex items-center justify-between">
                <span className="text-[10.5px] font-bold tracking-[.14em] text-gold-deep uppercase">
                  {card.tag}
                </span>
                {card.no ? (
                  <span className="font-display text-[15px] text-[rgba(27,36,54,.25)]">
                    {card.no}
                  </span>
                ) : null}
              </div>
            ) : null}

            <div
              aria-hidden
              className="mb-[18px] h-0.5 w-[26px] bg-gold transition-[width] duration-[280ms] group-hover:w-[44px]"
            />

            <h3 className="mb-[11px] font-display text-[25px] font-normal text-ink-deep">
              {card.title}
            </h3>
            <p className="mb-[26px] flex-1 text-[14.5px] leading-[1.6] text-muted">{card.desc}</p>

            {(card.meta ?? card.href) ? (
              <div className="flex items-center justify-between border-t border-t-[rgba(27,36,54,.09)] pt-[18px]">
                <span className="text-[12.5px] font-medium tracking-[.02em] text-warm">
                  {card.meta}
                </span>
                {card.href ? (
                  <span aria-hidden className="text-[15px] text-gold-mid">
                    &rarr;
                  </span>
                ) : null}
              </div>
            ) : null}
          </>
        );

        /* Transitions `translate`, NOT `transform`. Tailwind v4 compiles
           `-translate-y-*` to the standalone `translate` property, so
           transitioning `transform` animates nothing and the lift snaps
           instantly while the background still fades. */
        const shell =
          'group flex translate-y-0 flex-col bg-surface px-8 pt-9 pb-[30px] transition-[background-color,translate] duration-200';

        return card.href ? (
          <Link
            key={card.title}
            href={card.href}
            className={cn(shell, 'hover:-translate-y-[3px] hover:bg-canvas')}
          >
            {body}
          </Link>
        ) : (
          <div key={card.title} className={shell}>
            {body}
          </div>
        );
      })}
    </div>
  );
}
