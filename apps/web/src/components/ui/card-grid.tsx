import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import type { GridCard } from '@/content/types';
import { cn } from '@/lib/cn';

/**
 * The card grid the landing page uses for its six programs.
 *
 * This used to be a single bordered block whose hairlines were the 1px grid gap
 * showing the container colour through. That trick only works on a tinted
 * ground: on the white canvas the "hairlines" and the cards were the same
 * colour and the grid disappeared. These are separate rounded cards now, each
 * carrying its own border.
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
    <div className={cn('grid grid-cols-1 gap-5', columnClass, className)}>
      {cards.map((card) => {
        const body = (
          <>
            {(card.tag ?? card.no) ? (
              <div className="mb-6 flex items-center justify-between gap-3">
                <span className="rounded-full bg-brand-soft px-3 py-1.5 text-[10.5px] font-bold tracking-[.12em] text-brand-ink uppercase">
                  {card.tag}
                </span>
                {card.no ? (
                  <span className="font-display text-[15px] font-semibold text-muted-2 tabular-nums">
                    {card.no}
                  </span>
                ) : null}
              </div>
            ) : null}

            {/* The one place yellow appears on the card. It is a fill, not a
                rule — at 1.41:1 on white a 1px yellow line is invisible, but a
                3px block reads fine as decoration. */}
            <div
              aria-hidden
              className="mb-5 h-[3px] w-7 rounded-full bg-accent transition-[width] duration-[280ms] group-hover:w-12 motion-reduce:transition-none"
            />

            <h3 className="mb-2.5 font-display text-[23px] leading-[1.15] font-semibold tracking-[-.02em] text-ink">
              {card.title}
            </h3>
            <p className="mb-7 flex-1 text-[14.5px] leading-[1.6] text-muted">{card.desc}</p>

            {(card.meta ?? card.href) ? (
              <div className="flex items-center justify-between gap-3 border-t border-t-line pt-[18px]">
                <span className="text-[12.5px] font-medium tracking-[.02em] text-muted-2">
                  {card.meta}
                </span>
                {card.href ? (
                  <span
                    aria-hidden
                    className="flex size-8 flex-none items-center justify-center rounded-full bg-subtle text-brand-ink transition-colors duration-200 group-hover:bg-accent group-hover:text-on-accent"
                  >
                    <ArrowUpRight className="size-[18px]" />
                  </span>
                ) : null}
              </div>
            ) : null}
          </>
        );

        /* Transitions `translate`, NOT `transform`. Tailwind v4 compiles
           `-translate-y-*` to the standalone `translate` property, so
           transitioning `transform` animates nothing and the lift snaps
           instantly while the shadow still fades. */
        const shell =
          'group flex translate-y-0 flex-col rounded-md border border-line bg-surface px-7 pt-7 pb-6 transition-[translate,box-shadow,border-color] duration-200';

        return card.href ? (
          <Link
            key={card.title}
            href={card.href}
            className={cn(
              shell,
              'hover:-translate-y-1 hover:border-line-strong hover:shadow-lift motion-reduce:hover:translate-y-0',
            )}
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
