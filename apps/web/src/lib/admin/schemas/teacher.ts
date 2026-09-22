import { z } from 'zod';

import {
  nullableUrl,
  nullableUuid,
  optionalText,
  requiredText,
  slugField,
  sortOrderField,
} from './shared';

export const teacherSchema = z.object({
  slug: slugField,
  name: requiredText('Name', 120),
  designation: requiredText('Designation', 120),
  bio: optionalText(1000),
  imageUrl: nullableUrl,
  branchId: nullableUuid,
  isActive: z.boolean(),
  sortOrder: sortOrderField,
});

export type TeacherInput = z.infer<typeof teacherSchema>;

export const teacherFormOptions = { booleans: ['isActive'], numbers: ['sortOrder'] } as const;
