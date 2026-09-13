import type { z } from 'zod';

/**
 * Turn a submitted `FormData` into the plain object a zod schema expects.
 *
 * HTML forms speak only strings. The options say which fields are something
 * else: `arrays` are repeated controls (checkbox lists) read with `getAll`,
 * `lines` are one-per-line textareas, `numbers` are numeric inputs (an empty
 * box becomes `null`, never `0`), `booleans` are single checkboxes (absent
 * means `false`), and `json` is a hidden field a client editor serialised.
 * Everything else is a trimmed string. Next's own `$ACTION_*` fields and any
 * file inputs are ignored.
 */
export interface ReadFormOptions {
  arrays?: readonly string[];
  lines?: readonly string[];
  numbers?: readonly string[];
  booleans?: readonly string[];
  json?: readonly string[];
}

export function readForm(
  formData: FormData,
  options: ReadFormOptions = {},
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const arrays = new Set(options.arrays ?? []);
  const lines = new Set(options.lines ?? []);
  const numbers = new Set(options.numbers ?? []);
  const booleans = new Set(options.booleans ?? []);
  const json = new Set(options.json ?? []);

  for (const key of new Set(formData.keys())) {
    if (key.startsWith('$ACTION')) continue;

    if (arrays.has(key)) {
      out[key] = formData.getAll(key).filter((v): v is string => typeof v === 'string');
      continue;
    }

    const raw = formData.get(key);
    if (typeof raw !== 'string') continue;
    const value = raw.trim();

    if (lines.has(key)) {
      out[key] = value
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
    } else if (numbers.has(key)) {
      out[key] = value === '' ? null : Number(value);
    } else if (booleans.has(key)) {
      out[key] = value === 'on' || value === 'true';
    } else if (json.has(key)) {
      try {
        out[key] = value === '' ? undefined : (JSON.parse(value) as unknown);
      } catch {
        out[key] = value;
      }
    } else {
      out[key] = value;
    }
  }

  /* A checkbox list with nothing ticked and an unticked checkbox both send
     no field at all; the schema still needs to see them. */
  for (const key of arrays) out[key] ??= [];
  for (const key of booleans) out[key] ??= false;

  return out;
}

/** The submitted values as strings, for repopulating a rejected form. */
export function echoValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const key of new Set(formData.keys())) {
    if (key.startsWith('$ACTION')) continue;
    const all = formData.getAll(key).filter((v): v is string => typeof v === 'string');
    if (all.length > 0) values[key] = all.join(',');
  }
  return values;
}

/**
 * The first message for each failing path, keyed the way the forms address
 * their inputs (`name`, `modules.2.title`). `z.flattenError` stops at the
 * top level, which loses the row index the curriculum editor needs.
 */
export function firstErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.map(String).join('.') || '_';
    errors[key] ??= issue.message;
  }
  return errors;
}
