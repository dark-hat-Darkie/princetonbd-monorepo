import type { LegalContent } from '@/content/types';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Prose } from '@/components/ui/prose';
import { Toc } from '@/components/ui/toc';
import { breadcrumbFor } from '@/content/site/routes';
import { contact } from '@/content/site/contact';

/**
 * Privacy, terms, refund and accessibility statements.
 *
 * Quieter than every other template on purpose: no closing call to action, no
 * testimonials. Someone reading this is checking a fact, and the page should
 * help them find it and leave.
 */
export function LegalPage({ content }: { content: LegalContent }) {
  const updated = new Date(content.updated).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <PageHero
        breadcrumb={breadcrumbFor(content.path)}
        eyebrow="Legal"
        title={content.title}
        intro={`Last updated ${updated}.`}
      />

      <Container as="section" className="py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-[70px]">
          <Toc blocks={content.body} />
          <div>
            <Prose blocks={content.body} />

            <div className="mt-14 max-w-[760px] border border-[rgba(27,36,54,.1)] border-l-[3px] border-l-gold bg-cream px-7 py-6">
              <div className="mb-2 text-[10.5px] font-bold tracking-[.16em] text-gold-deep uppercase">
                Questions about this policy
              </div>
              <p className="text-[15.5px] leading-[1.65] text-ink-soft">
                Write to{' '}
                <a href={`mailto:${contact.email}`} className="text-ink underline">
                  {contact.email}
                </a>{' '}
                or visit us at {contact.address}.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
