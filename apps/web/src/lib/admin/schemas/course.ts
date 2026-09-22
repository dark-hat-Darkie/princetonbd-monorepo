import { z } from 'zod';

import { courseStatuses, deliveryModes } from '@/lib/cms-enums';
import {
  lines,
  nullableInt,
  nullableText,
  nullableUrl,
  optionalText,
  requiredInt,
  requiredText,
  slugField,
  sortOrderField,
} from './shared';

export const courseSchema = z.object({
  slug: slugField,
  name: requiredText('Name', 120),
  description: optionalText(2000),
  thumbnailUrl: nullableUrl,
  priceAmount: requiredInt('Price'),
  priceUnit: requiredText('Price unit', 80),
  feeIncludes: lines(20),
  modes: z.array(z.enum(deliveryModes)).min(1, 'Pick at least one delivery mode'),
  status: z.enum(courseStatuses),
  durationWeeks: nullableInt('Weeks'),
  taughtHours: nullableInt('Taught hours'),
  mockCount: nullableInt('Mocks'),
  classSize: nullableText(40),
  outcomes: lines(20),
  sortOrder: sortOrderField,
});

export type CourseInput = z.infer<typeof courseSchema>;

export const courseFormOptions = {
  arrays: ['modes'],
  lines: ['feeIncludes', 'outcomes'],
  numbers: ['priceAmount', 'durationWeeks', 'taughtHours', 'mockCount', 'sortOrder'],
} as const;
