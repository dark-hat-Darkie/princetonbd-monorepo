import type { ValidationError } from '@nestjs/common';
import { describe, expect, it } from 'vitest';

import {
  flattenValidationErrors,
  validationExceptionFactory,
} from './validation-exception.factory.js';

describe('flattenValidationErrors', () => {
  it('keeps top-level fields flat', () => {
    const errors: ValidationError[] = [
      { property: 'name', constraints: { isNotEmpty: 'name should not be empty' } },
      {
        property: 'priceAmount',
        constraints: { isInt: 'must be an integer', min: 'must be >= 0' },
      },
    ];

    expect(flattenValidationErrors(errors)).toEqual({
      name: ['name should not be empty'],
      priceAmount: ['must be an integer', 'must be >= 0'],
    });
  });

  it('dots nested paths, including array indexes', () => {
    const errors: ValidationError[] = [
      {
        property: 'modules',
        children: [
          {
            property: '2',
            children: [{ property: 'title', constraints: { isString: 'title must be a string' } }],
          },
        ],
      },
    ];

    expect(flattenValidationErrors(errors)).toEqual({
      'modules.2.title': ['title must be a string'],
    });
  });

  it('produces a 400 whose body carries the map', () => {
    const exception = validationExceptionFactory([
      { property: 'slug', constraints: { matches: 'slug must be kebab-case' } },
    ]);

    expect(exception.getStatus()).toBe(400);
    expect(exception.getResponse()).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation failed',
      errors: { slug: ['slug must be kebab-case'] },
    });
  });
});
