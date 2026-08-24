export * from './client.js';
export * as schema from './schema/index.js';
export { users, type User, type NewUser } from './schema/index.js';

/* Re-exported so consumers compose queries without depending on drizzle-orm
   directly and risking a second, mismatched copy in the tree. */
export { and, asc, desc, eq, ilike, inArray, isNull, not, or, sql } from 'drizzle-orm';
