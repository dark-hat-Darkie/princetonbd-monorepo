import { z } from 'zod';

import { nullableText, requiredText, slugField, sortOrderField } from './shared';

export const branchSchema = z.object({
  slug: slugField,
  name: requiredText('Name', 120),
  address: nullableText(300),
  phone: nullableText(40),
  isActive: z.boolean(),
  sortOrder: sortOrderField,
});

export type BranchInput = z.infer<typeof branchSchema>;

/** The `readForm` options that match this schema. */
export const branchFormOptions = { booleans: ['isActive'], numbers: ['sortOrder'] } as const;
