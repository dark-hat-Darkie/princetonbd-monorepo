import { pgEnum } from 'drizzle-orm/pg-core';

/**
 * Every Postgres enum the CMS uses, in one place.
 *
 * Each `enumValues` tuple is re-exported under a plain name so the API can
 * feed the same list to class-validator (`@IsIn(courseStatuses, ...)`) and to
 * `@ApiProperty({ enum })`, and the web app inherits the union through the
 * generated client. One definition, three consumers, no drift.
 */
export const userRoleEnum = pgEnum('user_role', ['student', 'admin']);
export const courseStatusEnum = pgEnum('course_status', ['draft', 'published', 'archived']);
export const deliveryModeEnum = pgEnum('delivery_mode', ['classroom', 'live_online']);
export const batchStatusEnum = pgEnum('batch_status', ['open', 'filling', 'waitlist', 'closed']);
/** Bangladeshi working week starts on Saturday, so the list does too. */
export const weekdayEnum = pgEnum('weekday', ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri']);

export const userRoles = userRoleEnum.enumValues;
export const courseStatuses = courseStatusEnum.enumValues;
export const deliveryModes = deliveryModeEnum.enumValues;
export const batchStatuses = batchStatusEnum.enumValues;
export const weekdays = weekdayEnum.enumValues;

export type UserRole = (typeof userRoles)[number];
export type CourseStatus = (typeof courseStatuses)[number];
export type DeliveryMode = (typeof deliveryModes)[number];
export type BatchStatus = (typeof batchStatuses)[number];
export type Weekday = (typeof weekdays)[number];
