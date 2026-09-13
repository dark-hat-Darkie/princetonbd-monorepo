import { CheckList } from '@/components/ui/check-list';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { ModeChip } from '@/components/ui/mode-chip';
import { enrolHref } from '@/lib/batches';
import type { BatchView, CourseView } from '@/lib/course-view';
import { formatDayMonth } from '@/lib/dates';
import { formatPrice } from '@/lib/money';

/**
 * The fee panel in a course page's hero — the one thing a learner scrolls to
 * find, so it sits beside the h1 rather than four screens down.
 *
 * Deliberately not sticky. It shares the page with an ink stats band and the
 * ink closing panel, and a white card riding over either looks like a bug.
 */
export function CourseFeeCard({ course, next }: { course: CourseView; next?: BatchView }) {
  return (
    <aside
      aria-labelledby="course-fee"
      className="rounded-lg border border-line bg-surface p-6 shadow-lift sm:p-7"
    >
      <Eyebrow className="mb-3">Course fee</Eyebrow>

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span
          id="course-fee"
          className="font-display text-[clamp(34px,3.6vw,44px)] leading-none font-extrabold tracking-[-.03em] text-ink"
        >
          {formatPrice(course.fee.price)}
        </span>
        <span className="text-[13.5px] text-muted-2">{course.fee.unit}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {course.modes.map((mode) => (
          <ModeChip key={mode} mode={mode} />
        ))}
      </div>

      <div className="mt-5 rounded-md bg-panel px-4 py-3 text-[13.5px] leading-[1.5]">
        {next ? (
          <>
            <span className="font-semibold text-ink">Next batch</span>
            <span className="text-muted">
              {' '}
              · starts{' '}
              <time dateTime={next.startsOn} className="text-ink-soft">
                {formatDayMonth(next.startsOn)}
              </time>{' '}
              · {next.place}
              {next.seatsLeft !== null && next.status === 'filling'
                ? ` · ${String(next.seatsLeft)} seats left`
                : null}
            </span>
          </>
        ) : (
          <>
            <span className="font-semibold text-ink">Dates coming soon</span>
            <span className="text-muted"> · register interest and we will call you first.</span>
          </>
        )}
      </div>

      {course.fee.includes.length > 0 ? (
        <CheckList items={course.fee.includes} dense className="mt-5" />
      ) : null}

      <div className="mt-6 flex flex-col gap-2.5">
        <CtaButton
          href={enrolHref({ interest: course.interest, batch: next })}
          arrow
          className="w-full"
        >
          {next ? 'Reserve a seat' : 'Register interest'}
        </CtaButton>
        <CtaButton href="/free-diagnostic" variant="outline" className="w-full">
          Book a free diagnostic
        </CtaButton>
      </div>

      {course.fee.notes?.length ? (
        <ul className="mt-5 flex flex-col gap-1 border-t border-t-line pt-4">
          {course.fee.notes.map((note) => (
            <li key={note} className="text-[12px] leading-[1.5] text-muted-2">
              {note}
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}
