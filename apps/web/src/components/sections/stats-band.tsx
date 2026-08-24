import type { Stat } from '@/content/types';
import { Container } from '@/components/ui/container';

export function StatsBand({ stats }: { stats: readonly Stat[] }) {
  return (
    <section className="border-y border-y-[rgba(27,36,54,.08)] bg-band">
      <Container className="grid grid-cols-2 gap-y-10 py-20 lg:grid-cols-4 lg:gap-y-0">
        {stats.map((stat) => (
          /* Every cell carries the left rule, including the first — as authored. */
          <div
            key={stat.label}
            className="border-l border-l-[rgba(27,36,54,.12)] px-5 py-1.5 text-center"
          >
            <div className="mb-3.5 font-display text-[clamp(34px,4.4vw,54px)] leading-none text-gold-deep">
              {stat.value}
            </div>
            <div className="text-[13.5px] leading-[1.5] tracking-[.01em] text-muted-stat">
              {stat.label}
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
