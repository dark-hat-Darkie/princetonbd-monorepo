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
        'flex flex-col border px-8 py-9',
        format.featured
          ? 'border-[rgba(27,36,54,.1)] border-t-[3px] border-t-gold bg-cream shadow-[0_40px_80px_-50px_rgba(27,36,54,.4)]'
          : 'border-[rgba(27,36,54,.09)] bg-surface',
      )}
    >
      {format.featured ? (
        <span className="mb-4 self-start text-[10px] font-bold tracking-[.2em] text-gold-deep uppercase">
          Most chosen
        </span>
      ) : null}

      <h3 className="mb-2 font-display text-[25px] font-normal text-ink-deep">{format.name}</h3>
      <p className="mb-7 text-[14.5px] leading-[1.6] text-muted">{format.pitch}</p>

      <div className="mb-7 border-y border-[rgba(27,36,54,.1)] py-5">
        <div className="font-display text-[32px] leading-none text-gold-deep">
          {formatPrice(format.price)}
        </div>
        <div className="mt-2 text-[12.5px] tracking-[.02em] text-warm">{format.priceUnit}</div>
      </div>

      <ul className="mb-7 flex flex-wrap gap-x-5 gap-y-1.5">
        {format.facts.map((fact) => (
          <li key={fact} className="text-[12.5px] font-medium tracking-[.02em] text-warm">
            {fact}
          </li>
        ))}
      </ul>

      <ul className="mb-8 flex flex-1 flex-col gap-3">
        {format.includes.map((item) => (
          <li key={item} className="flex gap-3 text-[14.5px] leading-[1.5] text-ink-soft">
            <span aria-hidden className="mt-[7px] size-1.5 flex-none rounded-full bg-gold" />
            {item}
          </li>
        ))}
      </ul>

      <CtaButton
        href={format.href}
        variant={format.featured ? 'solid' : 'outline'}
        className="w-full px-6 py-[15px] text-[15px] shadow-none"
      >
        Enrol in {format.name}
      </CtaButton>
    </div>
  );
}
