import type { ValidationError } from '@nestjs/common';

import { ValidationFailedException } from './validation-failed.exception.js';

/**
 * Turn class-validator's error tree into a flat `path → messages` map.
 *
 * class-validator reports nested DTOs (`@ValidateNested`) as `children`, so an
 * error on the title of the third module arrives as
 * `modules → 2 → title`. Flattening it to `modules.2.title` lets the web
 * form address that exact input, and keeps the top-level case
 * (`name → ['name should not be empty']`) as simple as it looks.
 */
export function flattenValidationErrors(
  errors: readonly ValidationError[],
  prefix = '',
): Record<string, string[]> {
  const flat: Record<string, string[]> = {};

  for (const error of errors) {
    const key = prefix ? `${prefix}.${error.property}` : error.property;

    if (error.constraints) {
      flat[key] = Object.values(error.constraints);
    }

    if (error.children?.length) {
      Object.assign(flat, flattenValidationErrors(error.children, key));
    }
  }

  return flat;
}

/** Plugged into the global ValidationPipe in configure-app.ts. */
export function validationExceptionFactory(errors: ValidationError[]): ValidationFailedException {
  return new ValidationFailedException(flattenValidationErrors(errors));
}
