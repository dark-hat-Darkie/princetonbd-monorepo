import Image from 'next/image';

import { cn } from '@/lib/cn';

/**
 * A photograph with the offset accent block behind it.
 *
 * Was an arched frame with a thin gold outline. The arch was the single most
 * dated thing in the old system, and the outline cannot survive the repalette
 * — a yellow hairline is invisible on white. The block does the same job the
 * outline did (anchor the picture, give it a side to lean on) with a shape that
 * belongs to the new language, and it is the one place on the page where yellow
 * appears at scale.
 *
 * The block is a second, offset box rather than a border on the image, which is
 * what lets it sit proud on two sides while the image stays clipped to its own
 * radius.
 */
export function ArchImage({
  src,
  alt,
  /** Mirrors the offset block for an image sitting on the right of a layout. */
  side = 'left',
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  side?: 'left' | 'right';
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute top-6 bottom-[-16px] rounded-lg bg-accent',
          side === 'left' ? 'right-8 left-[-16px]' : 'right-[-16px] left-8',
        )}
      />
      <div className="relative overflow-hidden rounded-lg shadow-lift">
        <div className="relative aspect-[4/5]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1080px) 36vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
