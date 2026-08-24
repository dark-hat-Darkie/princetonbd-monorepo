import type { Block } from '@/content/types';
import { headingId } from './prose';

/**
 * In-page contents for a long guide, derived from the body blocks rather than
 * maintained alongside them — so a new heading cannot be missing from the list.
 *
 * Sticky on wide screens only; below `lg` it renders above the body as a plain
 * list, where a sticky rail would eat most of the viewport.
 */
export function Toc({ blocks }: { blocks: readonly Block[] }) {
  const headings = blocks.filter((block) => block.type === 'heading');

  if (headings.length < 2) return null;

  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-[110px]">
      <div className="mb-4 text-[10.5px] font-bold tracking-[.16em] text-gold-deep uppercase">
        On this page
      </div>
      <ol className="flex flex-col gap-3 border-l border-l-[rgba(27,36,54,.12)]">
        {headings.map((heading) => (
          <li key={heading.text}>
            <a
              href={`#${headingId(heading)}`}
              className="-ml-px block border-l border-l-transparent pl-4 text-[14px] leading-[1.45] text-muted transition-colors duration-200 hover:border-l-gold hover:text-ink"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
