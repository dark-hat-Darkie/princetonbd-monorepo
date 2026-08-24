import type { Block } from '@/content/types';
import { cn } from '@/lib/cn';

/** Long-form body copy for guides, articles and legal pages. */

/** Slug used for the heading anchor and the matching table-of-contents link. */
export function headingId(block: Extract<Block, { type: 'heading' }>): string {
  return (
    block.id ??
    block.text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  );
}

export function Prose({ blocks, className }: { blocks: readonly Block[]; className?: string }) {
  return (
    <div className={cn('max-w-[760px]', className)}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2
                key={index}
                id={headingId(block)}
                /* `scroll-mt` clears the 86px sticky header, so an anchored
                   heading is not hidden behind the bar it scrolls under. */
                className="mt-14 mb-4 scroll-mt-[110px] font-display text-[26px] leading-[1.25] font-normal text-ink-deep first:mt-0"
              >
                {block.text}
              </h2>
            );

          case 'paragraph':
            return (
              <p key={index} className="mb-5 text-[16.5px] leading-[1.75] text-muted">
                {block.text}
              </p>
            );

          case 'list': {
            const List = block.ordered ? 'ol' : 'ul';
            return (
              <List key={index} className="mb-6 flex flex-col gap-3">
                {block.items.map((item, itemIndex) => (
                  <li key={item} className="flex gap-3.5 text-[16px] leading-[1.65] text-ink-soft">
                    {block.ordered ? (
                      <span
                        aria-hidden
                        className="flex-none font-display text-[15px] text-gold-deep"
                      >
                        {String(itemIndex + 1).padStart(2, '0')}
                      </span>
                    ) : (
                      <span
                        aria-hidden
                        className="mt-[9px] size-1.5 flex-none rounded-full bg-gold"
                      />
                    )}
                    {item}
                  </li>
                ))}
              </List>
            );
          }

          case 'callout':
            return (
              <aside
                key={index}
                className="mb-7 border border-[rgba(27,36,54,.1)] border-l-[3px] border-l-gold bg-cream px-7 py-6"
              >
                {block.title ? (
                  <div className="mb-2 text-[10.5px] font-bold tracking-[.16em] text-gold-deep uppercase">
                    {block.title}
                  </div>
                ) : null}
                <p className="text-[15.5px] leading-[1.65] text-ink-soft">{block.text}</p>
              </aside>
            );

          case 'table':
            return (
              /* Wide tables scroll inside their own box; the page body must
                 never scroll horizontally. */
              <div key={index} className="mb-8 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr>
                      {block.head.map((cell) => (
                        <th
                          key={cell}
                          scope="col"
                          className="border-b border-b-gold px-4 py-3 text-[10.5px] font-bold tracking-[.14em] text-gold-deep uppercase"
                        >
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row.join('|')}>
                        {row.map((cell) => (
                          <td
                            key={cell}
                            className="border-b border-b-[rgba(27,36,54,.09)] px-4 py-3.5 text-[14.5px] leading-[1.5] text-ink-soft"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
