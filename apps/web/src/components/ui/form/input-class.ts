import { cn } from '@/lib/cn';

/**
 * The one text-control style: enquiry form, admin forms, anything with an
 * `<input>`. Kept as a function of validity so an invalid field is a colour
 * change on the same control, not a second control.
 */
export function inputClass(invalid: boolean, className?: string): string {
  return cn(
    'w-full rounded-sm border bg-canvas px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-200 focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:bg-subtle disabled:text-muted',
    invalid ? 'border-danger bg-danger-soft/40' : 'border-line-strong',
    className,
  );
}

export const labelClass = 'text-[11px] font-bold tracking-[.12em] text-ink-soft uppercase';

/** Where a control's error message lives, so `aria-describedby` can point at it. */
export function errorIdFor(id: string): string {
  return `${id}-error`;
}
