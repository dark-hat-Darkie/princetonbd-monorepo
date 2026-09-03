import { Container } from '@/components/ui/container';

/**
 * The strip of exam wordmarks under the landing hero, generalised so any hub
 * page can list what it covers.
 *
 * The names used to be bare display text on a tinted band. As chips they read
 * as the navigable things they are, and they survive the move to a white ground
 * where a tinted band and bare text both went flat.
 */
export function WordmarkStrip({ kicker, items }: { kicker: string; items: readonly string[] }) {
  return (
    <section className="border-y border-y-line bg-subtle">
      <Container className="flex flex-wrap items-center gap-x-8 gap-y-4 py-7">
        <span className="text-[11px] font-bold tracking-[.18em] whitespace-nowrap text-muted-2 uppercase">
          {kicker}
        </span>
        <div className="flex flex-wrap items-center gap-2.5">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-line bg-surface px-4 py-2 font-display text-[14.5px] font-semibold tracking-[-.01em] whitespace-nowrap text-ink-soft"
            >
              {item}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
