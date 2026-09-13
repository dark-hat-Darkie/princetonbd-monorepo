import { cn } from '@/lib/cn';
import { errorIdFor, inputClass } from './input-class';

type Props = React.ComponentPropsWithoutRef<'textarea'> & {
  id: string;
  invalid?: boolean;
};

export function Textarea({ id, invalid = false, className, rows = 4, ...props }: Props) {
  return (
    <textarea
      {...props}
      id={id}
      rows={rows}
      aria-invalid={invalid ? true : undefined}
      aria-describedby={invalid ? errorIdFor(id) : props['aria-describedby']}
      className={inputClass(invalid, cn('resize-y', className))}
    />
  );
}
