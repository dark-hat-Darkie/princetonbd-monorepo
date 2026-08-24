import type { Feature, PageBase } from '@/content/types';
import { LeadForm } from '@/components/forms/lead-form';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { breadcrumbFor } from '@/content/site/routes';
import { campuses, contact, telHref } from '@/content/site/contact';

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
export function LeadPage({ content }: { content: LeadPageContent }) {
  return (
    <>
      <PageHero breadcrumb={breadcrumbFor(content.path)} {...content.hero} />

      <Container as="section" className="py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-[70px]">
          <LeadForm interestDefault={content.interestDefault} />

          <div>
            <div className="mb-9 border-t border-t-[rgba(27,36,54,.12)]">
              {content.reassurance.map((item, index) => (
                <div
                  key={item.title}
                  className="flex gap-4 border-b border-b-[rgba(27,36,54,.12)] py-5"
                >
                  <span aria-hidden className="font-display text-[15px] text-gold-deep">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="mb-1 text-[15px] font-bold text-ink-deep">{item.title}</div>
                    <p className="text-[14.5px] leading-[1.6] text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <div className="mb-4 text-[10.5px] font-bold tracking-[.16em] text-gold-deep uppercase">
                Prefer to talk now
              </div>
              <a
                href={telHref(contact.phone)}
                className="font-display text-[28px] text-ink-deep transition-colors duration-200 hover:text-gold-deep"
              >
                {contact.phone}
              </a>
              <div className="mt-1.5 text-[13.5px] text-muted">
                Enrolment advisors, 9am&ndash;8pm, seven days a week.
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="mt-4 inline-block text-[15px] text-ink underline decoration-gold underline-offset-4"
              >
                {contact.email}
              </a>
            </div>

            <div>
              <div className="mb-4 text-[10.5px] font-bold tracking-[.16em] text-gold-deep uppercase">
                Or come in
              </div>
              <div className="grid grid-cols-1 gap-px border border-[rgba(27,36,54,.09)] bg-[rgba(27,36,54,.09)] sm:grid-cols-3">
                {campuses.map((campus) => (
                  <div key={campus.name} className="bg-surface px-5 py-5">
                    <div className="mb-1.5 font-display text-[17px] text-ink-deep">
                      {campus.name}
                    </div>
                    <address className="text-[13.5px] leading-[1.6] text-muted not-italic">
                      {campus.address}
                      <br />
                      <a href={telHref(campus.phone)} className="text-ink">
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
