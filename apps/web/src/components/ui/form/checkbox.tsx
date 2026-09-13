import { cn } from '@/lib/cn';

type Props = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> & {
  id: string;
  label: React.ReactNode;
  description?: React.ReactNode;
};

/**
 * A labelled checkbox. Submits as `on` when checked and nothing when not,
 * which is what `readForm`'s `booleans` option expects.
 */
export function Checkbox({ id, label, description, className, ...props }: Props) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-sm border border-line px-4 py-3 text-[14.5px] text-ink transition-colors duration-200 hover:border-line-strong has-checked:border-brand has-checked:bg-brand-soft/60',
        className,
      )}
    >
      <input
        {...props}
        id={id}
        type="checkbox"
        className="mt-[3px] size-4 flex-none cursor-pointer accent-brand-ink"
      />
      <span className="min-w-0">
        <span className="block font-semibold">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-[13px] leading-[1.5] text-muted">{description}</span>
        ) : null}
      </span>
    </label>
  );
}
