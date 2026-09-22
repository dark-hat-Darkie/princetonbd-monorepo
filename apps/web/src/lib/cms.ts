import 'server-only';

import {
  createApiClient,
  getBatchById,
  getCourseBySlug,
  listBatches,
  listBranches,
  listCourses,
  listTeachers,
  type BatchDto,
  type BranchDto,
  type Client,
  type CourseDetailDto,
  type CourseSummaryDto,
  type TeacherWithCoursesDto,
} from '@repo/api-client';
import { getWebClientEnv } from '@repo/env/web';

import {
  BATCHES_TAG,
  BRANCHES_TAG,
  CMS_TAG,
  COURSES_TAG,
  TEACHERS_TAG,
  courseTag,
} from './cms-tags';

/**
 * What the public site reads from the CMS, and how it is cached.
 *
 * Every request goes through a client whose `fetch` is wrapped to attach
 * Next's cache tags and a revalidation window. The generated SDK cannot pass
 * those per call — it builds a `Request` and drops unknown init keys — but
 * Next's patched `fetch` keeps `init.next` when a `Request` is passed with a
 * second argument, which is exactly what the wrapper does.
 *
 * Pages using these are statically rendered and refreshed daily; an admin
 * save expires the tags (see `lib/admin/revalidate.ts`) so the change shows
 * on the next visit rather than the next day.
 *
 * No token: these endpoints are public, and a token-less client is safe to
 * share across requests.
 */

const ONE_DAY = 86_400;
const ONE_HOUR = 3_600;

/* A hung API must fail fast. `next build` prerenders dozens of pages that
   each read the CMS; one connection that never answers stalls its page past
   Next's static-generation timeout and, repeated across workers, the deploy.
   Ten seconds is generous for an API on the same network and bounds both the
   build and the runtime revalidation path, which degrades to the same
   fallbacks below. */
const FETCH_TIMEOUT_MS = 10_000;

/* True while `next build` prerenders pages. Transport failures then mean
   "the API is not reachable from the build", not "this slug is gone", so the
   single-item readers below return null instead of throwing: the build
   succeeds, unlisted slugs render on their first visit, and ISR (plus the
   admin revalidation hook) heals the rest. At runtime the throw stays — while
   serving traffic it keeps the last good copy instead of caching a 404. */
function isBuildPhase(): boolean {
  return process.env.NEXT_PHASE === 'phase-production-build';
}

function cmsClient(tags: readonly string[], revalidate = ONE_DAY): Client {
  const { NEXT_PUBLIC_API_URL } = getWebClientEnv();

  return createApiClient({
    baseUrl: NEXT_PUBLIC_API_URL,
    fetch: (input, init) =>
      fetch(input, {
        ...init,
        signal: init?.signal ?? AbortSignal.timeout(FETCH_TIMEOUT_MS),
        next: { tags: [CMS_TAG, ...tags], revalidate },
      }),
  });
}

function describe(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String(error.message);
  }
  return String(error);
}

/**
 * Every published course, for listings. Empty on any failure: a listing
 * with no courses is a degraded page, a build that cannot list them is a
 * failed deploy, and the former is the better outcome for a transient API
 * problem.
 */
export async function getPublishedCourses(): Promise<CourseSummaryDto[]> {
  try {
    const { data, error } = await listCourses({ client: cmsClient([COURSES_TAG]) });
    if (data) return data;
    console.warn('[cms] listCourses failed:', describe(error));
  } catch (error) {
    console.warn('[cms] listCourses unreachable:', describe(error));
  }
  return [];
}

/**
 * One published course with everything its page renders.
 *
 * `null` for a 404 — an unknown or unpublished slug, which the page turns
 * into a not-found — and, while `next build` prerenders, for any other
 * failure too (see `isBuildPhase`). Anything else throws on purpose: during
 * revalidation a thrown error keeps the last good copy of the page, whereas
 * returning null would cache a 404 in its place.
 */
export async function getCourse(slug: string): Promise<CourseDetailDto | null> {
  try {
    const { data, error, response } = await getCourseBySlug({
      client: cmsClient([COURSES_TAG, courseTag(slug)]),
      path: { slug },
    });
    if (data) return data;
    if (response?.status === 404) return null;
    if (isBuildPhase()) {
      console.warn(`[cms] getCourseBySlug(${slug}) unreachable at build time: ${describe(error)}`);
      return null;
    }
    throw new Error(`[cms] getCourseBySlug(${slug}) failed: ${describe(error)}`);
  } catch (error) {
    if (isBuildPhase()) {
      console.warn(`[cms] getCourseBySlug(${slug}) unreachable at build time: ${describe(error)}`);
      return null;
    }
    throw error;
  }
}

/**
 * A batch for the enquiry form to echo. `null` means it no longer exists (or
 * its course was unpublished); a transport failure throws, so the enquiry
 * flow can tell "withdrawn" from "could not check" and not reject a lead
 * because the API blinked. While `next build` prerenders the failure also
 * reads as null (see `isBuildPhase`) so a sick API cannot fail the deploy.
 */
export async function getBatch(id: string): Promise<BatchDto | null> {
  try {
    const { data, error, response } = await getBatchById({
      client: cmsClient([BATCHES_TAG], ONE_HOUR),
      path: { id },
    });
    if (data) return data;
    if (response?.status === 404) return null;
    if (isBuildPhase()) {
      console.warn(`[cms] getBatchById(${id}) unreachable at build time: ${describe(error)}`);
      return null;
    }
    throw new Error(`[cms] getBatchById(${id}) failed: ${describe(error)}`);
  } catch (error) {
    if (isBuildPhase()) {
      console.warn(`[cms] getBatchById(${id}) unreachable at build time: ${describe(error)}`);
      return null;
    }
    throw error;
  }
}

/**
 * Every batch a visitor can still join, across every published course, for
 * the batch-schedule page. Empty on failure for the same reason as the
 * course list: a finder with nothing to find is a degraded page, not a
 * failed build.
 */
export async function getUpcomingBatches(): Promise<BatchDto[]> {
  try {
    const { data, error } = await listBatches({
      client: cmsClient([BATCHES_TAG, COURSES_TAG, BRANCHES_TAG]),
    });
    if (data) return data;
    console.warn('[cms] listBatches failed:', describe(error));
  } catch (error) {
    console.warn('[cms] listBatches unreachable:', describe(error));
  }
  return [];
}

export async function getBranches(): Promise<BranchDto[]> {
  try {
    const { data, error } = await listBranches({ client: cmsClient([BRANCHES_TAG]) });
    if (data) return data;
    console.warn('[cms] listBranches failed:', describe(error));
  } catch (error) {
    console.warn('[cms] listBranches unreachable:', describe(error));
  }
  return [];
}

export async function getTeachers(): Promise<TeacherWithCoursesDto[]> {
  try {
    const { data, error } = await listTeachers({ client: cmsClient([TEACHERS_TAG]) });
    if (data) return data;
    console.warn('[cms] listTeachers failed:', describe(error));
  } catch (error) {
    console.warn('[cms] listTeachers unreachable:', describe(error));
  }
  return [];
}
