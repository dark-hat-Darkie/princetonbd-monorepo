import { BatchStatusBadge } from '@/components/ui/batch-status-badge';
import { CtaButton } from '@/components/ui/cta-button';
import { ModeChip } from '@/components/ui/mode-chip';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { enrolHref } from '@/lib/batches';
import type { BatchView, CourseView } from '@/lib/course-view';
import { enrollHref } from '@/lib/enroll';
import { formatDayMonth, formatFullDate } from '@/lib/dates';
import { formatPrice } from '@/lib/money';

function EnrolAction({
  course,
  batch,
  size,
}: {
  course: CourseView;
  batch: BatchView;
  size: 'sm' | 'md';
}) {
  const waitlist = batch.status === 'waitlist';

  return (
    <CtaButton
      href={enrollHref({ courseSlug: course.slug, batchId: batch.id })}
      size={size}
      variant={waitlist ? 'outline' : 'solid'}
      className={size === 'md' ? 'w-full' : undefined}
    >
      {waitlist ? 'Join waitlist' : 'Enrol'}
    </CtaButton>
  );
}

function Fee({ course, batch }: { course: CourseView; batch: BatchView }) {
  const price = batch.fee ?? course.fee.price;
  const overridden = batch.fee !== null && batch.fee.amount !== course.fee.price.amount;

  return (
    <>
      <span className="font-display text-[17px] font-semibold text-ink tabular-nums">
        {formatPrice(price)}
      </span>
      {overridden ? (
        <span className="block text-[12px] text-muted-2">
          {batch.mode === 'live_online' ? 'online rate' : 'this batch'}
        </span>
      ) : null}
    </>
  );
}

/**
 * When and where the course next runs.
 *
 * A table from `lg` up, where seven columns fit; stacked cards below it,
 * where a table would either scroll sideways or shrink to unreadable. Both
 * render from the same rows, so nothing can differ between the two.
 */
export function BatchList({
  course,
  batches,
}: {
  course: CourseView;
  batches: readonly BatchView[];
}) {
  const headings = ['Starts', 'Ends', 'Schedule', 'Mode & campus', 'Seats', 'Fee', ''];

  return (
    <Section id="batches" className="scroll-mt-[104px]">
      <SectionHeading
        eyebrow="Upcoming batches"
        title={`Next ${course.name} batches.`}
        intro="Dates and times are Dhaka time. Every batch teaches the full curriculum and includes the mocks and materials; a live-online run is priced lower because it carries no campus cost."
        className="mb-12"
      />

      {batches.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line-strong bg-subtle px-8 py-14 text-center">
          <p className="mb-2 font-display text-[22px] font-semibold text-ink">
            No dates published yet.
          </p>
          <p className="mx-auto mb-7 max-w-[440px] text-[15px] leading-[1.6] text-muted">
            The next {course.name} batch is being scheduled. Register your interest and an enrolment
            advisor will call you before the dates go public.
          </p>
          <CtaButton href={enrolHref({ interest: course.interest })} variant="outline">
            Register interest
          </CtaButton>
        </div>
      ) : (
        <>
          {/* Wide layout */}
          <div className="hidden overflow-hidden rounded-lg border border-line bg-surface lg:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-subtle">
                  {headings.map((heading, index) => (
                    <th
                      key={heading || `col-${String(index)}`}
                      scope="col"
                      className="border-b border-b-line-strong px-5 py-3.5 text-[10.5px] font-bold tracking-[.14em] text-muted-2 uppercase first:pl-6 last:pr-6"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {batches.map((batch) => (
                  <tr key={batch.id} className="border-b border-b-line align-top last:border-b-0">
                    <td className="px-5 py-5 pl-6 whitespace-nowrap">
                      <time
                        dateTime={batch.startsOn}
                        className="font-display text-[17px] font-semibold text-ink"
                      >
                        {formatDayMonth(batch.startsOn)}
                      </time>
                    </td>
                    <td className="px-5 py-5 whitespace-nowrap">
                      <time dateTime={batch.endsOn} className="text-[14.5px] text-ink-soft">
                        {formatDayMonth(batch.endsOn)}
                      </time>
                    </td>
                    <td className="px-5 py-5">
                      <span className="block text-[14.5px] leading-[1.5] text-ink-soft">
                        {batch.schedule}
                      </span>
                      {batch.teacherName ? (
                        <span className="mt-1 block text-[12.5px] text-muted-2">
                          with {batch.teacherName}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex flex-col items-start gap-2">
                        <ModeChip mode={batch.mode} />
                        <span className="text-[14px] leading-[1.4] text-ink-soft">
                          {batch.place}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <BatchStatusBadge batch={batch} />
                    </td>
                    <td className="px-5 py-5 whitespace-nowrap">
                      <Fee course={course} batch={batch} />
                    </td>
                    <td className="px-5 py-5 pr-6 text-right whitespace-nowrap">
                      <EnrolAction course={course} batch={batch} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Narrow layout */}
          <ul className="flex flex-col gap-4 lg:hidden">
            {batches.map((batch) => (
              <li
                key={batch.id}
                className="rounded-md border border-line bg-surface p-6 shadow-card"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <ModeChip mode={batch.mode} />
                  <BatchStatusBadge batch={batch} />
                </div>

                <div className="mb-4 flex items-baseline justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold tracking-[.14em] text-muted-2 uppercase">
                      Starts
                    </div>
                    <time
                      dateTime={batch.startsOn}
                      className="font-display text-[22px] font-semibold text-ink"
                    >
                      {formatFullDate(batch.startsOn)}
                    </time>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] font-bold tracking-[.14em] text-muted-2 uppercase">
                      Fee
                    </div>
                    <Fee course={course} batch={batch} />
                  </div>
                </div>

                <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-t-line pt-4 text-[14px]">
                  <dt className="text-muted-2">Ends</dt>
                  <dd className="text-ink-soft">
                    <time dateTime={batch.endsOn}>{formatFullDate(batch.endsOn)}</time>
                  </dd>
                  <dt className="text-muted-2">Schedule</dt>
                  <dd className="text-ink-soft">{batch.schedule}</dd>
                  <dt className="text-muted-2">Where</dt>
                  <dd className="text-ink-soft">{batch.place}</dd>
                  {batch.teacherName ? (
                    <>
                      <dt className="text-muted-2">Instructor</dt>
                      <dd className="text-ink-soft">{batch.teacherName}</dd>
                    </>
                  ) : null}
                </dl>

                <div className="mt-5">
                  <EnrolAction course={course} batch={batch} size="md" />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}
