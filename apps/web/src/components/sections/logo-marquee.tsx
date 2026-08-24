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
          className="px-[34px] font-display text-[24px] whitespace-nowrap text-slate"
        >
          {name}
        </span>
      ))}
    </div>
  );

  return (
    <section className="overflow-hidden border-y border-y-[rgba(27,36,54,.08)] bg-band">
      <Container className="pt-[38px] pb-3.5 text-center">
        <span className="text-[11px] font-semibold tracking-[.2em] text-warm uppercase">
          {kicker}
        </span>
      </Container>

      <div className="pt-[22px] pb-10 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {group}
          <div aria-hidden>{group}</div>
        </div>
      </div>
    </section>
  );
}
