import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * The body every non-2xx response carries.
 *
 * This is Nest's default HttpException shape, declared as a class so the
 * OpenAPI document — and therefore the generated client — types error
 * responses instead of leaving them `unknown`.
 */
export class ErrorResponseDto {
  @ApiProperty({ example: 404 })
  statusCode!: number;

  @ApiProperty({ example: 'Course not found' })
  message!: string;

  @ApiPropertyOptional({ example: 'Not Found' })
  error?: string;
}

/**
 * A 400 from request validation. `errors` maps a field path to the messages
 * for it, so a form can put each message under the input it belongs to.
 * Nested paths are dotted: `modules.2.title`.
 */
export class ValidationErrorResponseDto extends ErrorResponseDto {
  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'array', items: { type: 'string' } },
    example: { name: ['name should not be empty'], 'modules.0.title': ['title must be a string'] },
  })
  errors!: Record<string, string[]>;
}
