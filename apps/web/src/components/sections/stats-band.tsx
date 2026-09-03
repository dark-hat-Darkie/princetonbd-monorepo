import type { Stat } from '@/content/types';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';

/**
 * The outcome figures, on the page's one dark band.
 *
 * On the old cream canvas this was a slightly-tinted strip that barely
 * registered. A white page needs at least one dark beat to break the scroll,
 * and the figures are the right thing to give it to — the ink ground is also
 * the only place the brand yellow can be used as *type* rather than as a fill,
 * at 14.9:1.
 */
export function StatsBand({ stats }: { stats: readonly Stat[] }) {
  return (
    <section className="bg-ink text-on-ink">
      <Container className="grid grid-cols-2 gap-y-12 py-20 lg:grid-cols-4 lg:gap-y-0 lg:py-24">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 0.08}
            className="px-5 text-center lg:border-l lg:border-l-line-invert lg:first:border-l-0"
          >
            <div className="mb-3 font-display text-[clamp(36px,4.6vw,56px)] leading-none font-extrabold tracking-[-.04em] text-accent">
              {stat.value}
            </div>
            <div className="text-[13.5px] leading-[1.5] tracking-[.01em] text-on-ink/65">
              {stat.label}
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
