import type { Metadata } from 'next';

import { CtaSection } from '@/components/sections/cta-section';
import { Container } from '@/components/ui/container';
import { CtaButton } from '@/components/ui/cta-button';
import { PageHero } from '@/components/ui/page-hero';
import { campuses, telHref } from '@/content/site/contact';
import { instructors } from '@/content/people';
import { breadcrumbFor } from '@/content/site/routes';
import { defaultClosing } from '@/content/shared';

export const metadata: Metadata = {
  title: 'Our campuses — Gulshan, Dhanmondi and Chattogram',
  description:
    'Where we teach: three campuses across Dhaka and Chattogram, with the same syllabus taught live online for students anywhere in Bangladesh.',
};

const openingHours = [
  { day: 'Saturday — Thursday', hours: '9:00am — 8:00pm' },
  { day: 'Friday', hours: '2:00pm — 8:00pm' },
];

export default function CampusesPage() {
  return (
    <>
      <PageHero
        breadcrumb={breadcrumbFor('/about/campuses')}
        eyebrow="Campuses"
        title="Three addresses, and one that is wherever you are."
        intro="Classroom courses run at Gulshan, Dhanmondi and Chattogram. Every one of them is also taught live online, to the same syllabus by the same instructors."
        facts={[
          { label: 'Campuses', value: '3' },
          { label: 'Cities', value: 'Dhaka · Chattogram' },
          { label: 'Also', value: 'Live online, nationwide' },
          { label: 'Open', value: 'Seven days a week' },
        ]}
      />

      <Container as="section" className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-px border border-[rgba(27,36,54,.09)] bg-[rgba(27,36,54,.09)] lg:grid-cols-3">
          {campuses.map((campus) => {
            const faculty = instructors.filter((instructor) => instructor.campus === campus.name);

            return (
              <div key={campus.name} className="flex flex-col bg-surface px-8 py-9">
                <div aria-hidden className="mb-5 h-0.5 w-[26px] bg-gold" />
                <h2 className="mb-4 font-display text-[25px] font-normal text-ink-deep">
                  {campus.name}
                </h2>

                <address className="mb-6 text-[15px] leading-[1.7] text-muted not-italic">
                  {campus.address}
                  <br />
                  <a
                    href={telHref(campus.phone)}
                    className="text-ink transition-colors duration-200 hover:text-gold-deep"
                  >
                    {campus.phone}
                  </a>
                </address>

                <dl className="mb-6 border-t border-t-[rgba(27,36,54,.09)] pt-4">
                  {openingHours.map((entry) => (
                    <div key={entry.day} className="flex justify-between gap-4 py-1.5">
                      <dt className="text-[13.5px] text-warm">{entry.day}</dt>
                      <dd className="text-[13.5px] whitespace-nowrap text-ink-soft">
                        {entry.hours}
                      </dd>
                    </div>
                  ))}
                </dl>

                {faculty.length > 0 ? (
                  <div className="mb-7 flex-1">
                    <div className="mb-3 text-[10.5px] font-bold tracking-[.16em] text-gold-deep uppercase">
                      Teaching here
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {faculty.map((instructor) => (
                        <li key={instructor.name} className="text-[14px] text-ink-soft">
                          {instructor.name}{' '}
                          <span className="text-warm">&mdash; {instructor.role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="flex-1" />
                )}

                <CtaButton
                  href="/contact"
                  variant="outline"
                  className="w-full px-6 py-[14px] text-[14px]"
                >
                  Visit this campus
                </CtaButton>
              </div>
            );
          })}
        </div>

        <p className="mt-10 max-w-[720px] border-l-[3px] border-l-gold bg-cream px-6 py-5 text-[14.5px] leading-[1.65] text-ink-soft">
          Addresses shown are placeholders pending the final leases. Call{' '}
          <a href={telHref(campuses[0]?.phone ?? '')} className="text-ink underline">
            {campuses[0]?.phone}
          </a>{' '}
          before travelling and we will confirm exactly where to come.
        </p>
      </Container>

      <CtaSection
        eyebrow="Come in"
        title="Sit a free diagnostic at any campus."
        body={defaultClosing.body}
        action={{ label: 'Book a diagnostic', href: '/free-diagnostic' }}
      />
    </>
  );
}
