import { cn } from '@/lib/cn';
import { errorIdFor, labelClass } from './input-class';

/**
 * Label, control, hint and error in the order a screen reader expects.
 *
 * The control goes in as a child and takes the same `id`; it derives its own
 * `aria-describedby` from that id via `errorIdFor`, so the association holds
 * without this component having to reach into its children.
 */
export function Field({
  id,
  label,
  hint,
  error,
  optional = false,
  className,
  children,
}: {
  id: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: string;
  /** Appends "(optional)"; required is the default in an admin form. */
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {optional ? <span className="ml-1 font-normal text-muted-2">(optional)</span> : null}
      </label>
      {children}
      {hint ? <span className="text-[12.5px] leading-[1.5] text-muted-2">{hint}</span> : null}
      <FieldError id={errorIdFor(id)} message={error} />
    </div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <span id={id} role="alert" className="block text-[13px] leading-[1.4] text-danger">
      {message}
    </span>
  );
}

/** Groups related controls (a checkbox list, a day picker) under one legend. */
export function Fieldset({
  legend,
  hint,
  error,
  errorId,
  className,
  children,
}: {
  legend: React.ReactNode;
  hint?: React.ReactNode;
  error?: string;
  errorId: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset
      aria-describedby={error ? errorId : undefined}
      aria-invalid={error ? true : undefined}
      className={cn('flex flex-col gap-2', className)}
    >
      <legend className={cn(labelClass, 'mb-2')}>{legend}</legend>
      {children}
      {hint ? <span className="text-[12.5px] leading-[1.5] text-muted-2">{hint}</span> : null}
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}
