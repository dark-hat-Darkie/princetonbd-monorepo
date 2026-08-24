import type { FaqItem } from '@/content/types';

/**
 * Frequently-asked questions.
 *
 * Built on native `<details>`/`<summary>` rather than a JavaScript disclosure:
 * it stays a Server Component, opens with no hydration, works with JavaScript
 * disabled, and browsers already give it the right role and keyboard handling.
 * The marker is suppressed and replaced with a rotating rule so the chevron
 * animates without a client component.
 */
export function Faq({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="border-t border-t-[rgba(27,36,54,.12)]">
      {items.map((item) => (
        <details
          key={item.question}
          className="group border-b border-b-[rgba(27,36,54,.12)] [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-[22px] font-display text-[19px] leading-[1.35] text-ink-deep marker:content-['']">
            {item.question}
            <span
              aria-hidden
              className="relative mt-2 size-3.5 flex-none text-gold-deep before:absolute before:top-1/2 before:left-0 before:h-[1.5px] before:w-full before:-translate-y-1/2 before:bg-current before:content-[''] after:absolute after:top-1/2 after:left-0 after:h-[1.5px] after:w-full after:-translate-y-1/2 after:rotate-90 after:bg-current after:transition-transform after:duration-200 after:content-[''] group-open:after:rotate-0"
            />
          </summary>
          <p className="max-w-[760px] pb-[26px] text-[15.5px] leading-[1.68] text-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
