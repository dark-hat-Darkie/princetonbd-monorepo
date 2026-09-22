import { cn } from '@/lib/cn';

type Variant = 'solid' | 'outline' | 'danger' | 'ghost';
type Size = 'sm' | 'md';

type Props = React.ComponentPropsWithoutRef<'button'> & {
  variant?: Variant;
  size?: Size;
  /** Disables the button and signals a submission in flight. */
  pending?: boolean;
  /** Shown instead of `children` while pending, e.g. "Saving…". */
  pendingLabel?: React.ReactNode;
};

const sizeClass: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-[11px] font-bold tracking-[.11em] uppercase',
  md: 'px-[26px] py-[13px] text-[15px] font-semibold tracking-[-.005em]',
};

const variantClass: Record<Variant, string> = {
  solid: 'border-transparent bg-ink text-on-ink shadow-cta hover:bg-ink-soft',
  outline: 'border-line-strong bg-transparent text-ink hover:border-brand hover:text-brand-ink',
  danger: 'border-danger/40 bg-transparent text-danger hover:bg-danger-soft',
  ghost: 'border-transparent bg-transparent text-ink-soft hover:bg-subtle hover:text-ink',
};

/**
 * A real `<button>`, for forms. `CtaButton` is a link and stays one; this is
 * the same shape, weight and radius so the two sit together in a toolbar
 * without one looking borrowed.
 */
export function Button({
  variant = 'solid',
  size = 'md',
  pending = false,
  pendingLabel,
  type = 'button',
  disabled,
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled ?? pending}
      aria-busy={pending || undefined}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border whitespace-nowrap transition-[background-color,border-color,color] duration-200 disabled:cursor-not-allowed disabled:opacity-60 aria-busy:cursor-progress',
        sizeClass[size],
        variantClass[variant],
        className,
      )}
    >
      {pending && pendingLabel ? pendingLabel : children}
    </button>
  );
}
