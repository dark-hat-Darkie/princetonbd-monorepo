import { errorIdFor, inputClass } from './input-class';

type Props = React.ComponentPropsWithoutRef<'select'> & {
  id: string;
  invalid?: boolean;
};

/** Native select, styled like the text controls. Options are the children. */
export function Select({ id, invalid = false, className, children, ...props }: Props) {
  return (
    <select
      {...props}
      id={id}
      aria-invalid={invalid ? true : undefined}
      aria-describedby={invalid ? errorIdFor(id) : props['aria-describedby']}
      className={inputClass(invalid, className)}
    >
      {children}
    </select>
  );
}
