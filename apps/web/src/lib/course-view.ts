import type { BatchDto, CourseDetailDto } from '@repo/api-client';

import type {
  ClosingContent,
  CourseFee,
  Curriculum,
  ExamEditorial,
  FaqItem,
  FeaturesBlock,
  HeroContent,
  PageSeo,
  Stat,
  Testimonial,
} from '@/content/types';
import { commonFaq, standardFeeNotes, whyUs } from '@/content/shared';
import type { LeadInterest } from '@/lib/actions/lead-shape';
import { batchPlace, formatSchedule } from '@/lib/batches';
import type { BatchStatus, DeliveryMode, Weekday } from '@/lib/cms-enums';
import { bdtPrice, type Price } from '@/lib/money';

/**
 * What a course page renders: the CMS record merged with its editorial
 * overlay, in the shapes the section components already take.
 *
 * Pure and dependency-free (no `server-only`), so it is unit-testable and
 * so the mapping is the same whether the record came from the API at
 * request time or from a fixture in a test.
 */

export interface BatchView {
  id: string;
  mode: DeliveryMode;
  branch: { name: string; address: string | null } | null;
  /** The branch name, or the live-online label. */
  place: string;
  startsOn: string;
  endsOn: string;
  days: readonly Weekday[];
  startTime: string;
  endTime: string;
  /** "Sat · Mon · Wed, 6:30–8:30 pm" */
  schedule: string;
  status: BatchStatus;
  seatsLeft: number | null;
  teacherName: string | null;
  /** This run's own price, when it differs from the course's. */
  fee: Price | null;
}

export interface TeacherView {
  id: string;
  name: string;
  initials: string;
  designation: string;
  bio: string;
  imageUrl: string | null;
  branchName: string | null;
}

export interface CourseView {
  id: string;
  slug: string;
  name: string;
  /** Site-relative page path. */
  path: string;
  description: string;
  thumbnailUrl: string | null;
  interest: LeadInterest;
  fee: CourseFee;
  modes: readonly DeliveryMode[];
  curriculum: Curriculum;
  batches: readonly BatchView[];
  teachers: readonly TeacherView[];
  testimonials: readonly Testimonial[];
  hero: HeroContent;
  includes: FeaturesBlock;
  stats?: readonly Stat[];
  faq: readonly FaqItem[];
  seo: PageSeo;
  closing?: ClosingContent;
}

/** "Farzana Haque" → "FH"; a monogram for records without a photo. */
export function initialsOf(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter((part) => /^[\p{L}\p{N}]/u.test(part))
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') || '·'
  );
}

export function coursePath(slug: string): string {
  return `/test-prep/${slug}`;
}

export function toBatchView(batch: BatchDto): BatchView {
  return {
    id: batch.id,
    mode: batch.mode,
    branch: batch.branch ? { name: batch.branch.name, address: batch.branch.address } : null,
    place: batchPlace(batch),
    startsOn: batch.startsOn,
    endsOn: batch.endsOn,
    days: batch.days,
    startTime: batch.startTime,
    endTime: batch.endTime,
    schedule: formatSchedule(batch.days, batch.startTime, batch.endTime),
    status: batch.status,
    seatsLeft: batch.seatsLeft,
    teacherName: batch.teacher?.name ?? null,
    fee: batch.feeAmount === null ? null : bdtPrice(batch.feeAmount),
  };
}

/** The defaults a course gets when nobody has written its page yet. */
function defaultHero(course: CourseDetailDto): HeroContent {
  return {
    eyebrow: 'Test preparation',
    title: `${course.name} preparation.`,
    intro: course.description,
    actions: [
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
  };
}

function defaultIncludes(): FeaturesBlock {
  return {
    eyebrow: 'What you get',
    title: 'Preparation built around the real exam.',
    items: whyUs,
  };
}

function defaultSeo(course: CourseDetailDto): PageSeo {
  return {
    title: `${course.name} preparation in Bangladesh — courses, batches & fees`,
    description:
      course.description ||
      `${course.name} courses in Dhaka and Chattogram, plus live online cohorts, with full-length mocks and a written score guarantee.`,
  };
}

export function toCourseView(course: CourseDetailDto, overlay?: ExamEditorial): CourseView {
  return {
    id: course.id,
    slug: course.slug,
    name: course.name,
    path: coursePath(course.slug),
    description: course.description,
    thumbnailUrl: course.thumbnailUrl,
    interest: overlay?.interest ?? 'Something else',
    fee: {
      price: bdtPrice(course.priceAmount),
      unit: course.priceUnit,
      includes: course.feeIncludes,
      notes: standardFeeNotes,
    },
    modes: course.modes,
    curriculum: {
      eyebrow: overlay?.curriculum?.eyebrow ?? 'Curriculum',
      title: overlay?.curriculum?.title ?? `${course.name}, module by module.`,
      intro: overlay?.curriculum?.intro,
      modules: course.modules.map((module) => ({
        no: String(module.position).padStart(2, '0'),
        title: module.title,
        summary: module.summary,
        topics: module.topics,
        hours: module.hours ?? undefined,
        outcome: module.outcome ?? undefined,
      })),
      totals: {
        weeks: course.durationWeeks,
        taughtHours: course.taughtHours,
        mocks: course.mockCount,
        classSize: course.classSize,
      },
      outcomes: course.outcomes.length > 0 ? course.outcomes : undefined,
    },
    batches: course.batches.map(toBatchView),
    teachers: course.teachers.map((teacher) => ({
      id: teacher.id,
      name: teacher.name,
      initials: initialsOf(teacher.name),
      designation: teacher.designation,
      bio: teacher.bio,
      imageUrl: teacher.imageUrl,
      branchName: teacher.branch?.name ?? null,
    })),
    testimonials: course.testimonials.map((quote) => ({
      initials: initialsOf(quote.name),
      name: quote.name,
      result: quote.result,
      quote: quote.quote,
    })),
    hero: overlay?.hero ?? defaultHero(course),
    includes: overlay?.includes ?? defaultIncludes(),
    stats: overlay?.stats,
    faq: overlay?.faq ?? commonFaq,
    seo: overlay?.seo ?? defaultSeo(course),
    closing: overlay?.closing,
  };
}
