import { announcement } from '@/content/site/announcement';
import { telHref } from '@/content/site/contact';

/**
 * Thin promo strip above the header.
 *
 * The design gated this on a `showAnnouncement` editor prop. It now renders
 * unconditionally from the marketing layout; drop it from there to hide it.
 */
export function AnnouncementBar() {
  return (
    <div className="border-b border-b-[rgba(27,36,54,.07)] bg-bar text-[12.5px] tracking-[.02em] text-warm-ink">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-5 py-2.5 sm:px-6 lg:px-8 nav:px-11">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="inline-block size-[5px] flex-none rounded-full bg-gold" />
          <span>
            {announcement.headline}{' '}
            <span className="font-semibold text-ink">{announcement.emphasis}</span>
          </span>
        </div>
        <div className="flex items-center gap-6 text-warm">
          <span className="hidden tracking-[.06em] sm:inline">{announcement.locations}</span>
          <a href={telHref(announcement.phone)} className="whitespace-nowrap text-warm-ink">
            {announcement.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
