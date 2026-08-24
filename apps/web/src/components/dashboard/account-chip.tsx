import { signOutAction } from '@/lib/actions/sign-out';

/**
 * Who you are signed in as, and the way out.
 *
 * Rendered on the server so it can be handed to the drawer as a slot rather
 * than re-implemented there. The sign-out action lives in its own module so it
 * is testable and so this component stays presentational.
 */
export function AccountChip({ name, email }: { name: string; email: string }) {
  const initials =
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') || '·';

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <span
          aria-hidden
          className="flex size-9 flex-none items-center justify-center rounded-full border border-gold-light font-display text-[14px] text-gold-pale"
        >
          {initials}
        </span>
        <div className="min-w-0">
          <div className="truncate text-[13.5px] font-bold text-foot-bright">{name}</div>
          <div className="truncate text-[12px] text-foot-muted">{email}</div>
        </div>
      </div>

      <form action={signOutAction}>
        <button
          type="submit"
          className="w-full cursor-pointer rounded-[2px] border border-[rgba(244,241,232,.25)] px-4 py-2 text-[11px] font-bold tracking-[.11em] text-foot-text uppercase transition-colors duration-200 hover:border-gold-light hover:text-foot-bright"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
