/**
 * The one-line confirmation an admin sees after a redirect.
 *
 * Carried in the URL (`?flash=Saved`) rather than a cookie or client state:
 * the write happened in a Server Action that then redirected, and a query
 * parameter survives that hop with nothing to hydrate. A reload keeps
 * showing it, which is fine — it is a confirmation, not a notification.
 */
export function Flash({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p
      role="status"
      className="mb-7 rounded-sm border border-brand/25 border-l-[3px] border-l-brand bg-brand-soft px-5 py-3.5 text-[14.5px] leading-[1.55] text-ink-soft"
    >
      {message}
    </p>
  );
}

/** Form-level error, shown above the fields. */
export function FormAlert({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className="mb-7 rounded-sm border border-danger/30 border-l-[3px] border-l-danger bg-danger-soft px-5 py-4 text-[14.5px] leading-[1.55] text-ink-soft"
    >
      {message}
    </p>
  );
}

/** The first value of a repeated query key, or nothing. */
export function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
