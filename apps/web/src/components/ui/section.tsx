import { cn } from '@/lib/cn';
import { Container } from './container';

/**
 * The section shell every page below the landing page is built from.
 *
 * The landing page hand-rolls this eleven times: a `<section>` carrying a tone
 * and optional hairline rules, wrapping a `Container` at one of two vertical
 * rhythms. Naming it means a new page picks a tone instead of re-deriving the
 * padding, and the rhythm stays identical across sixty pages.
 */

/**
 * Ground colours for full-bleed bands.
 *
 * `ink` is new: on a white canvas the page needs at least one dark beat or it
 * reads as an undifferentiated scroll. It sets its own text colour, so callers
 * do not have to remember to invert.
 */
type Tone = 'canvas' | 'subtle' | 'surface' | 'panel' | 'ink';

const toneClass: Record<Tone, string> = {
  canvas: 'bg-canvas',
  subtle: 'bg-subtle',
  surface: 'bg-surface',
  panel: 'bg-panel',
  ink: 'bg-ink text-on-ink',
};

/* `default` reads the page rhythm from `--section-y-sm` / `--section-y`
   (globals.css), so an inner page and the landing page can differ without
   the section knowing; `tight` is the `py-20` of the stats band; `flush` is
   for sections that own their own padding. */
const spaceClass = {
  default: 'py-(--section-y-sm) lg:py-(--section-y)',
  tight: 'py-20',
  flush: '',
} as const;

interface SectionProps extends Omit<React.ComponentPropsWithoutRef<'section'>, 'title'> {
  tone?: Tone;
  space?: keyof typeof spaceClass;
  /** Adds the hairline rules the band sections carry above and below. */
  bordered?: boolean;
  /** Applied to the inner `Container`, not the full-bleed `<section>`. */
  containerClassName?: string;
}

export function Section({
  tone = 'canvas',
  space = 'default',
  bordered = false,
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        toneClass[tone],
        bordered && (tone === 'ink' ? 'border-y border-y-line-invert' : 'border-y border-y-line'),
        className,
      )}
      {...rest}
    >
      <Container className={cn(spaceClass[space], containerClassName)}>{children}</Container>
    </section>
  );
}
