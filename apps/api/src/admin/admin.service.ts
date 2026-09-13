import { Injectable } from '@nestjs/common';
import {
  and,
  batches,
  branches,
  count,
  courses,
  gte,
  ne,
  teachers,
  testimonials,
  type Database,
} from '@repo/db';

import { dhakaToday } from '../common/dhaka-date.js';
import { InjectDb } from '../database/database.module.js';
import { AdminOverviewDto } from './dto/admin-overview.dto.js';

@Injectable()
export class AdminService {
  constructor(@InjectDb() private readonly db: Database) {}

  async overview(): Promise<AdminOverviewDto> {
    const today = dhakaToday();

    const [
      courseCounts,
      upcomingBatchesResult,
      teachersResult,
      branchesResult,
      testimonialsResult,
    ] = await Promise.all([
      this.db
        .select({ status: courses.status, value: count() })
        .from(courses)
        .groupBy(courses.status),
      this.db
        .select({ value: count() })
        .from(batches)
        .where(and(ne(batches.status, 'closed'), gte(batches.endsOn, today))),
      this.db.select({ value: count() }).from(teachers),
      this.db.select({ value: count() }).from(branches),
      this.db.select({ value: count() }).from(testimonials),
    ]);

    const byStatus: Record<string, number> = {};
    for (const row of courseCounts) {
      byStatus[row.status] = row.value;
    }

    const upcomingBatches = upcomingBatchesResult[0]?.value ?? 0;
    const teachersCount = teachersResult[0]?.value ?? 0;
    const branchesCount = branchesResult[0]?.value ?? 0;
    const testimonialsCount = testimonialsResult[0]?.value ?? 0;

    return {
      courses: {
        total: (byStatus.published ?? 0) + (byStatus.draft ?? 0) + (byStatus.archived ?? 0),
        published: byStatus.published ?? 0,
        draft: byStatus.draft ?? 0,
        archived: byStatus.archived ?? 0,
      },
      upcomingBatches,
      teachers: teachersCount,
      branches: branchesCount,
      testimonials: testimonialsCount,
    };
  }
}
