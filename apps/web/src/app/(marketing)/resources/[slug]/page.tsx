import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CtaSection } from '@/components/sections/cta-section';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { JsonLd } from '@/components/ui/json-ld';
import { Prose } from '@/components/ui/prose';
import { Toc } from '@/components/ui/toc';
import { articleBySlug, articles, articlesByDate } from '@/content/resources/articles';
import { defaultClosing } from '@/content/shared';
import { absoluteUrl, siteName } from '@/lib/site';

/**
 * The one dynamic route on the marketing site.
 *
 * `generateStaticParams` prerenders every article at build time, so this is a
 * static page in practice; `dynamicParams = false` makes an unknown slug a 404
 * rather than an attempt to render an article that does not exist.
 */
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: absoluteUrl(`/resources/${article.slug}`) },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      publishedTime: article.published,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);

  if (!article) notFound();

  const related = articlesByDate.filter((candidate) => candidate.slug !== article.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.description,
          datePublished: article.published,
          author: { '@type': 'Organization', name: siteName },
          publisher: { '@type': 'Organization', name: siteName },
          mainEntityOfPage: absoluteUrl(`/resources/${article.slug}`),
        }}
      />

      <Container as="section" className="border-b border-b-[rgba(27,36,54,.08)] py-14 lg:py-[70px]">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Resources', href: '/resources' },
            { label: article.category },
          ]}
          className="mb-8"
        />

        <h1 className="max-w-[820px] font-display text-[clamp(30px,4.2vw,50px)] leading-[1.08] font-normal tracking-[-.02em] text-ink-deep">
          {article.title}
        </h1>
        <p className="mt-[22px] max-w-[600px] text-[17px] leading-[1.65] text-muted">
          {article.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] font-medium tracking-[.02em] text-warm">
          <span className="text-gold-deep uppercase">{article.category}</span>
          <span aria-hidden className="h-3 w-px bg-[rgba(27,36,54,.18)]" />
          <time dateTime={article.published}>
            {new Date(article.published).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          <span aria-hidden className="h-3 w-px bg-[rgba(27,36,54,.18)]" />
          <span>{article.readingMinutes} min read</span>
        </div>
      </Container>

      <Container as="section" className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-[70px]">
          <Toc blocks={article.body} />
          <Prose blocks={article.body} />
        </div>
      </Container>

      <Container as="section" className="pb-16 lg:pb-20">
        <h2 className="mb-8 font-display text-[26px] font-normal text-ink-deep">Keep reading</h2>
        <ul className="grid grid-cols-1 gap-px border border-[rgba(27,36,54,.09)] bg-[rgba(27,36,54,.09)] md:grid-cols-3">
          {related.map((candidate) => (
            <li key={candidate.slug} className="flex bg-surface">
              <Link
                href={`/resources/${candidate.slug}`}
                className="group flex flex-1 flex-col px-7 py-7 transition-colors duration-200 hover:bg-canvas"
              >
                <span className="mb-3 text-[10.5px] font-bold tracking-[.14em] text-gold-deep uppercase">
                  {candidate.category}
                </span>
                <span className="font-display text-[19px] leading-[1.3] text-ink-deep">
                  {candidate.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <CtaSection
        eyebrow="Next step"
        title="Turn the reading into a plan."
        body={defaultClosing.body}
        action={defaultClosing.action}
      />
    </>
  );
}
