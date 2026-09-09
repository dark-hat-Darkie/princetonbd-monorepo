import type { CourseFormat } from '@/content/types';
import { cn } from '@/lib/cn';
import { formatPrice } from '@/lib/money';
import { CtaButton } from './cta-button';

/**
 * One course-format option. Exam and programme pages show three or four side
 * by side, so the card sizes itself from the grid rather than fixing a width.
 */
export function PriceCard({ format }: { format: CourseFormat }) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-md border px-8 py-9',
        format.featured
          ? 'border-brand/40 bg-brand-soft shadow-lift'
          : 'border-line bg-surface shadow-card',
      )}
    >
      {format.featured ? (
        <span className="mb-4 self-start rounded-full bg-accent px-3 py-1.5 text-[10.5px] font-bold tracking-[.12em] text-on-accent uppercase">
          Most chosen
        </span>
      ) : null}

      <h3 className="mb-2 font-display text-[25px] font-semibold tracking-[-.02em] text-ink">
        {format.name}
      </h3>
      <p className="mb-7 text-[14.5px] leading-[1.6] text-muted">{format.pitch}</p>

      <div className="mb-7 border-y border-line py-5">
        <div className="font-display text-[32px] leading-none font-extrabold tracking-[-.02em] text-ink">
          {formatPrice(format.price)}
        </div>
        <div className="mt-2 text-[12.5px] tracking-[.02em] text-muted-2">{format.priceUnit}</div>
      </div>

      <ul className="mb-7 flex flex-wrap gap-x-5 gap-y-1.5">
        {format.facts.map((fact) => (
          <li key={fact} className="text-[12.5px] font-medium tracking-[.02em] text-muted-2">
            {fact}
          </li>
        ))}
      </ul>

      <ul className="mb-8 flex flex-1 flex-col gap-3">
        {format.includes.map((item) => (
          <li key={item} className="flex gap-3 text-[14.5px] leading-[1.5] text-ink-soft">
            <span aria-hidden className="mt-[7px] size-1.5 flex-none rounded-full bg-brand" />
            {item}
          </li>
        ))}
      </ul>

      <CtaButton
        href={format.href}
        variant={format.featured ? 'solid' : 'outline'}
        className="w-full"
      >
        Enrol in {format.name}
      </CtaButton>
    </div>
  );
}
