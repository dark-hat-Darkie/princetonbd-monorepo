/**
 * The CMS enums as the web app needs them: runtime lists for form controls
 * and validation, and the labels a visitor reads. The API is the source of
 * the values (see `packages/db/src/schema/enums.ts`); the generated client
 * carries them as types only, so the arrays are restated here.
 */

export const deliveryModes = ['classroom', 'live_online'] as const;
export type DeliveryMode = (typeof deliveryModes)[number];

export const courseStatuses = ['draft', 'published', 'archived'] as const;
export type CourseStatus = (typeof courseStatuses)[number];

export const batchStatuses = ['open', 'filling', 'waitlist', 'closed'] as const;
export type BatchStatus = (typeof batchStatuses)[number];

/** Saturday first: the Bangladeshi working week. */
export const weekdays = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'] as const;
export type Weekday = (typeof weekdays)[number];

export const deliveryModeLabels: Record<DeliveryMode, string> = {
  classroom: 'Classroom',
  live_online: 'Live online',
};

export const courseStatusLabels: Record<CourseStatus, string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
};

export const batchStatusLabels: Record<BatchStatus, string> = {
  open: 'Seats open',
  filling: 'Filling fast',
  waitlist: 'Waitlist',
  closed: 'Closed',
};

export const weekdayLabels: Record<Weekday, { short: string; long: string }> = {
  sat: { short: 'Sat', long: 'Saturday' },
  sun: { short: 'Sun', long: 'Sunday' },
  mon: { short: 'Mon', long: 'Monday' },
  tue: { short: 'Tue', long: 'Tuesday' },
  wed: { short: 'Wed', long: 'Wednesday' },
  thu: { short: 'Thu', long: 'Thursday' },
  fri: { short: 'Fri', long: 'Friday' },
};
