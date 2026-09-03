import Image from 'next/image';

import { cn } from '@/lib/cn';

/** Intrinsic pixel size of `public/logo.png`, needed so Next can reserve the box. */
const LOGO_W = 4064;
const LOGO_H = 2730;

interface BrandMarkProps {
  /** `header` sits on a light ground; `footer` on the ink ground. */
  variant?: 'header' | 'footer';
  className?: string;
}

/**
 * The Princeton Review Bangladesh logo.
 *
 * This replaced a typographic lockup — a yellow "P" tile beside the words set
 * in the display face. The artwork already contains the full lockup ("The
 * Princeton Review" over "BANGLADESH", with the yellow corner wedge), so
 * setting any of that in HTML alongside it would say the same thing twice.
 *
 * THE ARTWORK ONLY WORKS ON A LIGHT GROUND. Inside the black keyline the plate
 * is transparent, not white — 59% of the file is fully transparent pixels — so
 * the wordmark is black-on-whatever-is-behind-it. Dropped straight onto the ink
 * footer it is black on #0e1211 and effectively invisible. The `footer` variant
 * therefore carries its own white plate rather than trying to recolour the
 * image: a filter that lightened the wordmark would also spin the yellow wedge
 * to blue, and the wedge is the one piece of the mark that must not move.
 *
 * It is also a STACKED lockup — four lines inside a 1.49:1 box, with the ink
 * filling 89% x 92% of the frame, so there is no dead space to crop away. The
 * only lever on legibility is display height, which is why the header bar is
 * 92px rather than the 76px a single-line wordmark would need. Below about
 * 60px the "BANGLADESH" line stops resolving.
 */
export function BrandMark({ variant = 'header', className }: BrandMarkProps) {
  const isHeader = variant === 'header';

  const logo = (
    <Image
      src="/logo.png"
      alt="Princeton Review Bangladesh"
      width={LOGO_W}
      height={LOGO_H}
      /* In the header on every page and above the fold, so it is fetched with
         the document rather than after hydration. */
      priority={isHeader}
      sizes="180px"
      className={cn('w-auto', isHeader ? 'h-16' : 'h-[52px]')}
    />
  );

  if (isHeader) return <span className={cn('flex items-center', className)}>{logo}</span>;

  return (
    <span className={cn('inline-flex rounded-sm bg-white px-3 py-2.5', className)}>{logo}</span>
  );
}
