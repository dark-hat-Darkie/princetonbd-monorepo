import { Container } from '@/components/ui/container';

/**
 * Infinite scroller of university names.
 *
 * The track holds the list twice and translates by exactly -50%, so at the end
 * of each cycle the second copy lands where the first began. Rendering the
 * duplicate as a separate `aria-hidden` group keeps that geometry while
 * stopping a screen reader from reading every name twice.
 */
export function LogoMarquee({ kicker, items }: { kicker: string; items: readonly string[] }) {
  const group = (
    <div className="flex">
      {items.map((name) => (
        <span
          key={name}
          className="px-8 font-display text-[22px] font-semibold tracking-[-.02em] whitespace-nowrap text-muted-2"
        >
          {name}
        </span>
      ))}
    </div>
  );

  return (
    <section className="overflow-hidden border-y border-y-line bg-subtle">
      <Container className="pt-10 text-center">
        <span className="text-[11px] font-bold tracking-[.18em] text-muted-2 uppercase">
          {kicker}
        </span>
      </Container>

      <div className="pt-6 pb-10 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {group}
          <div aria-hidden>{group}</div>
        </div>
      </div>
    </section>
  );
}
