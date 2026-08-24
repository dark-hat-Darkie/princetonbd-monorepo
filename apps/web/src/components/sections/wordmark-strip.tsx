import { Container } from '@/components/ui/container';

/**
 * The banded strip of exam wordmarks under the landing hero, generalised so
 * any hub page can list what it covers in the same display face.
 */
export function WordmarkStrip({ kicker, items }: { kicker: string; items: readonly string[] }) {
  return (
    <section className="border-y border-y-[rgba(27,36,54,.08)] bg-band">
      <Container className="flex flex-wrap items-center gap-x-[42px] gap-y-4 py-[26px]">
        <span className="text-[11px] font-semibold tracking-[.2em] whitespace-nowrap text-warm uppercase">
          {kicker}
        </span>
        <div className="flex flex-wrap items-center gap-x-[46px] gap-y-3 font-display text-[19px] text-slate">
          {items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </Container>
    </section>
  );
}
