import { z } from 'zod';

/**
 * Building blocks for the admin form schemas.
 *
 * These describe what `readForm` hands over (see `lib/admin/form-data.ts`):
 * trimmed strings, `string[]` for lists, `number | null` for numeric boxes,
 * real booleans for checkboxes. Each helper turns the HTML idea of "empty"
 * into what the API expects — `''` becomes `null` for a nullable column and
 * `undefined` for "let the server decide".
 *
 * Validation here is a courtesy round-trip saver. The API re-validates every
 * request and its messages are mapped back onto the same fields, so nothing
 * the form misses gets through.
 */

/** kebab-case, or empty to let the server derive one from the name. */
export const slugField = z
  .string()
  .max(80, 'Keep the slug under 80 characters')
  .regex(/^(?:[a-z0-9]+(?:-[a-z0-9]+)*)?$/, 'Lower-case letters, digits and single hyphens only')
  .transform((v) => v || undefined);

export const requiredText = (label: string, max: number) =>
  z
    .string()
    .min(1, `${label} is required`)
    .max(max, `Keep ${label.toLowerCase()} under ${String(max)} characters`);

export const optionalText = (max: number) => z.string().max(max);

/** Empty box → null (clears the column). */
export const nullableText = (max: number) =>
  z
    .string()
    .max(max)
    .transform((v) => v || null);

export const nullableUrl = z
  .string()
  .max(1024)
  .transform((v) => v || null)
  .pipe(z.url('Must be a full URL').nullable());

/** Empty select → null. */
export const nullableUuid = z
  .string()
  .transform((v) => v || null)
  .pipe(z.uuid('Pick one of the listed options').nullable());

export const requiredInt = (label: string) =>
  z
    .number({ error: `${label} must be a whole number` })
    .int(`${label} must be a whole number`)
    .min(0, `${label} cannot be negative`);

export const nullableInt = (label: string) => requiredInt(label).nullable();

export const sortOrderField = z
  .number()
  .int()
  .nullable()
  .transform((v) => v ?? 0);

/** One-per-line lists, already split by `readForm`. */
export const lines = (max: number) =>
  z.array(z.string().max(300)).max(max, `At most ${String(max)} entries`);
