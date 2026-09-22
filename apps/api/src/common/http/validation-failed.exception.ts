import { BadRequestException } from '@nestjs/common';

/**
 * A 400 whose body follows `ValidationErrorResponseDto`.
 *
 * Thrown by the ValidationPipe's exception factory for decorator failures
 * and by services for the rules a single decorator cannot express (a
 * classroom batch needs a branch, a referenced id must exist). One shape for
 * both means the web app has exactly one way to render a field error.
 */
export class ValidationFailedException extends BadRequestException {
  constructor(public readonly errors: Record<string, string[]>) {
    super({ statusCode: 400, error: 'Bad Request', message: 'Validation failed', errors });
  }

  /** Convenience for the common single-field case. */
  static forField(field: string, message: string): ValidationFailedException {
    return new ValidationFailedException({ [field]: [message] });
  }
}
