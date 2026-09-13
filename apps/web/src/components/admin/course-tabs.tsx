import Link from 'next/link';

import { cn } from '@/lib/cn';

export type CourseTab = 'details' | 'curriculum' | 'batches' | 'teachers';

const tabs: { key: CourseTab; label: string; path: (id: string) => string }[] = [
  { key: 'details', label: 'Details', path: (id) => `/admin/courses/${id}` },
  { key: 'curriculum', label: 'Curriculum', path: (id) => `/admin/courses/${id}/curriculum` },
  { key: 'batches', label: 'Batches', path: (id) => `/admin/courses/${id}/batches` },
  { key: 'teachers', label: 'Teachers', path: (id) => `/admin/courses/${id}/teachers` },
];

/** The sub-navigation under a course's header. Each page says which tab it is. */
export function CourseTabs({ courseId, active }: { courseId: string; active: CourseTab }) {
  return (
    <nav aria-label="Course sections" className="mb-8 border-b border-b-line">
      <ul className="-mb-px flex flex-wrap gap-6">
        {tabs.map((tab) => {
          const current = tab.key === active;
          return (
            <li key={tab.key}>
              <Link
                href={tab.path(courseId)}
                aria-current={current ? 'page' : undefined}
                className={cn(
                  'block border-b-2 pb-3 text-[13px] font-bold tracking-[.08em] uppercase transition-colors duration-200',
                  current
                    ? 'border-b-brand text-brand-ink'
                    : 'border-b-transparent text-muted hover:text-ink',
                )}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
