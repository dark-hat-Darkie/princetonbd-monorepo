import { CtaButton } from '@/components/ui/cta-button';

/** What a list shows before anything has been created. */
export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="rounded-lg border border-dashed border-line-strong bg-subtle px-8 py-14 text-center">
      <p className="mb-2 font-display text-[22px] font-semibold text-ink">{title}</p>
      <p className="mx-auto mb-7 max-w-[440px] text-[15px] leading-[1.6] text-muted">{body}</p>
      {action ? (
        <CtaButton href={action.href} variant="outline">
          {action.label}
        </CtaButton>
      ) : null}
    </div>
  );
}
