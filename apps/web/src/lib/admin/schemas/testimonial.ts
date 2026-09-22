import { z } from 'zod';

import { nullableUrl, requiredText, sortOrderField } from './shared';

export const testimonialSchema = z.object({
  name: requiredText('Name', 120),
  result: requiredText('Result', 160),
  quote: requiredText('Quote', 1000),
  imageUrl: nullableUrl,
  isActive: z.boolean(),
  sortOrder: sortOrderField,
  courseIds: z.array(z.uuid()).max(50),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;

export const testimonialFormOptions = {
  arrays: ['courseIds'],
  booleans: ['isActive'],
  numbers: ['sortOrder'],
} as const;
