import { z } from 'zod';

export const courseTeachersSchema = z.object({
  teacherIds: z.array(z.uuid()).max(50),
});

export const courseTeachersFormOptions = { arrays: ['teacherIds'] } as const;
