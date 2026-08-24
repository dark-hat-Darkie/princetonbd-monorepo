import { cn } from '@/lib/cn';

interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Renders as this element, so a section keeps its own semantics. */
  as?: 'div' | 'section' | 'header' | 'footer';
}

/**
 * The shared content column: 1240px wide with 44px gutters, exactly as the
 * design specifies from `lg` up. Below that the gutters tighten — the design
 * never addressed those widths.
 */
export function Container({ as: Tag = 'div', className, children, ...rest }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto max-w-page px-5 sm:px-8 lg:px-11', className)} {...rest}>
      {children}
    </Tag>
  );
}
