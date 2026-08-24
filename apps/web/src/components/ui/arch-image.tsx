import Image from 'next/image';

import { cn } from '@/lib/cn';

/**
 * A photograph in the design's arched frame.
 *
 * The gold rule behind the picture is a second, offset box rather than a border
 * on the image — that is what lets it sit proud on two sides while the image
 * itself stays clipped to the arch.
 *
 * The landing page's hero and split-feature sections predate this and draw
 * their own arches at their own radii; this is for everything added since, so
 * a new photograph gets the same treatment without re-deriving it.
 */
export function ArchImage({
  src,
  alt,
  /** Mirrors the offset frame for an image sitting on the right of a layout. */
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
          'pointer-events-none absolute top-[-18px] bottom-4 rounded-t-[180px] rounded-b-[4px] border border-[rgba(184,147,78,.45)]',
          side === 'left' ? 'right-4 left-[-18px]' : 'right-[-18px] left-4',
        )}
      />
      <div className="relative overflow-hidden rounded-t-[180px] rounded-b-[4px] border border-[rgba(27,36,54,.14)] shadow-[0_50px_90px_-55px_rgba(27,36,54,.5)]">
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
