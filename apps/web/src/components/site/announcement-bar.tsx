import { MapPin, Phone } from 'lucide-react';

import { announcement } from '@/content/site/announcement';
import { telHref } from '@/content/site/contact';

/**
 * Thin promo strip above the header.
 *
 * Ink rather than the old tinted band: on a white page a barely-tinted strip
 * above a white header read as a rendering artefact. Dark, it frames the header
 * and gives the page a deliberate top edge.
 *
 * The design gated this on a `showAnnouncement` editor prop. It now renders
 * unconditionally from the marketing layout; drop it from there to hide it.
 */
export function AnnouncementBar() {
  return (
    <div className="bg-ink text-[12.5px] tracking-[.01em] text-on-ink/75">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-5 py-2.5 sm:px-6 lg:px-8 nav:px-11">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="inline-block size-1.5 flex-none rounded-full bg-accent" />
          <span>
            {announcement.headline}{' '}
            <span className="font-semibold text-on-ink">{announcement.emphasis}</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden items-center gap-1.5 tracking-[.06em] sm:flex">
            <MapPin aria-hidden className="size-3.5" />
            {announcement.locations}
          </span>
          <a
            href={telHref(announcement.phone)}
            className="flex items-center gap-1.5 whitespace-nowrap transition-colors duration-200 hover:text-accent"
          >
            <Phone aria-hidden className="size-3.5" />
            {announcement.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
