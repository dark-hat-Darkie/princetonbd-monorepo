import type { Feature, PageBase } from '@/content/types';
import { LeadForm } from '@/components/forms/lead-form';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { PageHero } from '@/components/ui/page-hero';
import { breadcrumbFor } from '@/content/site/routes';
import { campuses, contact, telHref } from '@/content/site/contact';
import type { LeadPrefill } from '@/lib/actions/lead-shape';

export interface LeadPageContent extends PageBase {
  /** Pre-selects the enquiry dropdown, e.g. from the IELTS page. */
  interestDefault?: string;
  /** Reassurance shown beside the form: what happens after they submit. */
  reassurance: readonly Feature[];
}

/**
 * The contact page and the two free-offer pages.
 *
 * The form sits on the left at the top of the page rather than below a wall of
 * copy: someone who arrived by clicking "book a consultation" has already been
 * persuaded, and making them scroll past the argument again loses them.
 */
export function LeadPage({
  content,
  prefill,
}: {
  content: LeadPageContent;
  /** From the URL, when an exam page sent the visitor here; else the page's own default. */
  prefill?: LeadPrefill;
}) {
  return (
    <>
      <PageHero breadcrumb={breadcrumbFor(content.path)} {...content.hero} />

      <Container as="section" className="py-(--section-y-sm) lg:py-(--section-y)">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-[70px]">
          <LeadForm prefill={prefill ?? { interest: content.interestDefault }} />

          <div>
            <div className="mb-9 border-t border-t-line">
              {content.reassurance.map((item, index) => (
                <div key={item.title} className="flex gap-4 border-b border-b-line py-5">
                  <span
                    aria-hidden
                    className="flex size-7 flex-none items-center justify-center rounded-sm bg-accent font-display text-[12.5px] font-extrabold text-on-accent tabular-nums"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="mb-1 text-[15px] font-bold text-ink">{item.title}</div>
                    <p className="text-[14.5px] leading-[1.6] text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <Eyebrow className="mb-4">Prefer to talk now</Eyebrow>
              <a
                href={telHref(contact.phone)}
                className="font-display text-[28px] font-semibold tracking-[-.02em] text-ink transition-colors duration-200 hover:text-brand-ink"
              >
                {contact.phone}
              </a>
              <div className="mt-1.5 text-[13.5px] text-muted">
                Enrolment advisors, 9am&ndash;8pm, seven days a week.
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="mt-4 inline-block text-[15px] text-ink underline decoration-brand underline-offset-4 transition-colors duration-200 hover:text-brand-ink"
              >
                {contact.email}
              </a>
            </div>

            <div>
              <Eyebrow className="mb-4">Or come in</Eyebrow>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {campuses.map((campus) => (
                  <div
                    key={campus.name}
                    className="rounded-md border border-line bg-surface px-5 py-5 shadow-card"
                  >
                    <div className="mb-1.5 font-display text-[17px] font-semibold text-ink">
                      {campus.name}
                    </div>
                    <address className="text-[13.5px] leading-[1.6] text-muted not-italic">
                      {campus.address}
                      <br />
                      <a
                        href={telHref(campus.phone)}
                        className="text-ink transition-colors duration-200 hover:text-brand-ink"
                      >
                        {campus.phone}
                      </a>
                    </address>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
