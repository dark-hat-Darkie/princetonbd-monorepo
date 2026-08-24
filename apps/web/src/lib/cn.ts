import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Join class names, letting later Tailwind utilities beat earlier conflicting
 * ones. Without the merge step, a `className` prop that overrides a component's
 * default padding produces two competing utilities and the winner is decided by
 * stylesheet order rather than call order — which is invisible until it isn't.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
