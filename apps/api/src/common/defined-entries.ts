/**
 * The keys a PATCH body actually carried.
 *
 * `UpdateXDto` classes make every field optional, and the ValidationPipe only
 * materialises the properties that were sent. Filtering `undefined` out means
 * an omitted field is left untouched by `UPDATE … SET`, while an explicit
 * `null` still clears a nullable column.
 */
export function definedEntries<T extends object>(
  dto: T,
): { [K in keyof T]?: Exclude<T[K], undefined> } {
  return Object.fromEntries(Object.entries(dto).filter(([, value]) => value !== undefined)) as {
    [K in keyof T]?: Exclude<T[K], undefined>;
  };
}
