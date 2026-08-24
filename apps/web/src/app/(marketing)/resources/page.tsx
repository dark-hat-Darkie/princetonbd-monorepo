import type { Metadata } from 'next';
import Link from 'next/link';

import { CtaSection } from '@/components/sections/cta-section';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Pill } from '@/components/ui/pill';
import { articleCategories, articlesByDate } from '@/content/resources/articles';
import { breadcrumbFor } from '@/content/site/routes';
import { defaultClosing } from '@/content/shared';

export const metadata: Metadata = {
  title: 'Advice & resources — test prep, admissions and study abroad',
  description:
    'Practical guidance for Bangladeshi students applying abroad: when to start preparing, how funding actually works, and how to build a shortlist you can afford.',
};

/**
 * The advice index.
 *
 * Category filtering is a `searchParams` read rather than client state, for the
 * same reason the university finder is: every filtered view gets a URL, and
 * there is no bundle to ship for something a link can do.
 */
export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params.category;
  const category = Array.isArray(raw) ? (raw[0] ?? '') : (raw ?? '');

  const visible = category
    ? articlesByDate.filter((article) => article.category === category)
    : articlesByDate;

  return (
    <>
      <PageHero
        breadcrumb={breadcrumbFor('/resources')}
        eyebrow="Advice & resources"
        title="The things we end up explaining twice a week."
        intro="Written by the counselors and instructors who answer these questions in person, for students who would rather read it first."
      />

      <Container as="section" className="py-16 lg:py-20">
        <div className="mb-10 flex flex-wrap gap-2.5">
          <Pill href="/resources" active={!category}>
            All
          </Pill>
          {articleCategories.map((name) => (
            <Pill
              key={name}
              href={`/resources?category=${encodeURIComponent(name)}`}
              active={category === name}
            >
              {name}
            </Pill>
          ))}
        </div>

        <ul className="grid grid-cols-1 gap-px border border-[rgba(27,36,54,.09)] bg-[rgba(27,36,54,.09)] md:grid-cols-2 lg:grid-cols-3">
          {visible.map((article) => (
            <li key={article.slug} className="flex bg-surface">
              <Link
                href={`/resources/${article.slug}`}
                className="group flex flex-1 translate-y-0 flex-col px-8 pt-9 pb-[30px] transition-[background-color,translate] duration-200 hover:-translate-y-[3px] hover:bg-canvas"
              >
                <div className="mb-[22px] flex items-center justify-between gap-4">
                  <span className="text-[10.5px] font-bold tracking-[.14em] text-gold-deep uppercase">
                    {article.category}
                  </span>
                  <span className="text-[12px] whitespace-nowrap text-warm">
                    {article.readingMinutes} min read
                  </span>
                </div>

                <div
                  aria-hidden
                  className="mb-[18px] h-0.5 w-[26px] bg-gold transition-[width] duration-[280ms] group-hover:w-[44px]"
                />

                <h2 className="mb-[11px] font-display text-[23px] leading-[1.25] font-normal text-ink-deep">
                  {article.title}
                </h2>
                <p className="mb-[26px] flex-1 text-[14.5px] leading-[1.6] text-muted">
                  {article.description}
                </p>

                <div className="flex items-center justify-between border-t border-t-[rgba(27,36,54,.09)] pt-[18px]">
                  <time
                    dateTime={article.published}
                    className="text-[12.5px] font-medium tracking-[.02em] text-warm"
                  >
                    {formatDate(article.published)}
                  </time>
                  <span aria-hidden className="text-[15px] text-gold-mid">
                    &rarr;
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <CtaSection
        eyebrow="Still deciding"
        title="Reading only gets you so far."
        body={defaultClosing.body}
        action={defaultClosing.action}
      />
    </>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
