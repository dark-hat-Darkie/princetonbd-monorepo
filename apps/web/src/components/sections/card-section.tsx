import type { GridCard } from '@/content/types';
import { CardGrid } from '@/components/ui/card-grid';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/cn';

/**
 * A section heading above the bordered card grid — the landing page's
 * "Our programs" block, reusable by every hub page.
 */
export function CardSection({
  id,
  eyebrow,
  title,
  intro,
  action,
  cards,
  columns = 3,
  className,
}: {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  action?: { label: string; href: string };
  cards: readonly GridCard[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  return (
    <Container as="section" id={id} className={cn('pt-24 pb-6 lg:pt-[120px]', className)}>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        action={action}
        className="mb-14"
      />
      <CardGrid cards={cards} columns={columns} />
    </Container>
  );
}
