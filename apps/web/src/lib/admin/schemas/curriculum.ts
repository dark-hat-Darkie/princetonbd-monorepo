import { z } from 'zod';

/**
 * The curriculum editor serialises its rows as JSON into one hidden field,
 * so the schema validates the parsed array. Row errors come back as
 * `modules.<index>.<field>` and the editor shows them beside the row.
 */
export const curriculumModuleSchema = z.object({
  title: z.string().trim().min(1, 'Give the module a title').max(160),
  summary: z.string().trim().max(1000),
  topics: z.array(z.string().trim().min(1).max(300)).max(30),
  hours: z.number().int().min(0).nullable(),
  outcome: z
    .string()
    .trim()
    .max(500)
    .transform((v) => v || null),
});

export const curriculumSchema = z.object({
  modules: z.array(curriculumModuleSchema).max(40, 'At most 40 modules'),
});

export type CurriculumInput = z.infer<typeof curriculumSchema>;
export type CurriculumModuleInput = z.infer<typeof curriculumModuleSchema>;

export const curriculumFormOptions = { json: ['modules'] } as const;
