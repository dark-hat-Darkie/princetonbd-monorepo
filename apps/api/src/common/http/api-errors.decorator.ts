import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ErrorResponseDto, ValidationErrorResponseDto } from '../dto/error-response.dto.js';

/**
 * Shorthands so every controller documents its error responses the same way.
 * Documented errors become typed error unions in the generated client, which
 * is what lets the web app map a 400 back onto form fields.
 */

/** 401 + 403, for every admin route. */
export function ApiAdminErrors(): MethodDecorator & ClassDecorator {
  return applyDecorators(
    ApiUnauthorizedResponse({ type: ErrorResponseDto, description: 'Missing or invalid token' }),
    ApiForbiddenResponse({ type: ErrorResponseDto, description: 'Caller is not an admin' }),
  );
}

export function ApiValidationErrors(): MethodDecorator & ClassDecorator {
  return ApiBadRequestResponse({
    type: ValidationErrorResponseDto,
    description: 'Validation failed; `errors` maps field paths to messages',
  });
}

export function ApiNotFound(what: string): MethodDecorator & ClassDecorator {
  return ApiNotFoundResponse({ type: ErrorResponseDto, description: `${what} not found` });
}

export function ApiConflict(description: string): MethodDecorator & ClassDecorator {
  return ApiConflictResponse({ type: ErrorResponseDto, description });
}
