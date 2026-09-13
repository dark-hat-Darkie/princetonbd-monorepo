import { z } from 'zod';

import { batchStatuses, deliveryModes, weekdays } from '@/lib/cms-enums';
import { nullableInt, nullableUuid } from './shared';

const clock = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

export const batchSchema = z
  .object({
    mode: z.enum(deliveryModes, { error: 'Pick a delivery mode' }),
    branchId: nullableUuid,
    teacherId: nullableUuid,
    startsOn: z.iso.date('Pick a start date'),
    endsOn: z.iso.date('Pick an end date'),
    days: z.array(z.enum(weekdays)).min(1, 'Pick at least one day of the week'),
    startTime: z.string().regex(clock, 'Pick a start time'),
    endTime: z.string().regex(clock, 'Pick an end time'),
    status: z.enum(batchStatuses),
    seatsLeft: nullableInt('Seats left'),
    feeAmount: nullableInt('Fee'),
  })
  .check((ctx) => {
    const { mode, branchId, startsOn, endsOn, startTime, endTime } = ctx.value;
    if (mode === 'classroom' && !branchId) {
      ctx.issues.push({
        code: 'custom',
        path: ['branchId'],
        message: 'Choose a branch for a classroom batch',
        input: branchId,
      });
    }
    if (mode === 'live_online' && branchId) {
      ctx.issues.push({
        code: 'custom',
        path: ['branchId'],
        message: 'A live-online batch has no branch',
        input: branchId,
      });
    }
    if (endsOn < startsOn) {
      ctx.issues.push({
        code: 'custom',
        path: ['endsOn'],
        message: 'The end date must be on or after the start date',
        input: endsOn,
      });
    }
    if (endTime <= startTime) {
      ctx.issues.push({
        code: 'custom',
        path: ['endTime'],
        message: 'The end time must be after the start time',
        input: endTime,
      });
    }
  });

export type BatchInput = z.infer<typeof batchSchema>;

export const batchFormOptions = {
  arrays: ['days'],
  numbers: ['seatsLeft', 'feeAmount'],
} as const;
