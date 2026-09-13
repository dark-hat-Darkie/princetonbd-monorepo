import { errorIdFor, inputClass } from './input-class';

type Props = React.ComponentPropsWithoutRef<'input'> & {
  id: string;
  /** Marks the control invalid and points assistive tech at its error. */
  invalid?: boolean;
};

export function Input({ id, invalid = false, className, ...props }: Props) {
  return (
    <input
      {...props}
      id={id}
      aria-invalid={invalid ? true : undefined}
      aria-describedby={invalid ? errorIdFor(id) : props['aria-describedby']}
      className={inputClass(invalid, className)}
    />
  );
}
