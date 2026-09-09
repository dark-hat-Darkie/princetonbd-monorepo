import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { batches } from '@/content/batches';
import { submitLead } from './lead';
import { initialLeadState } from './lead-shape';

function form(overrides: Record<string, string> = {}): FormData {
  const data = new FormData();
  const values = {
    name: 'Nafisa Rahman',
    email: 'nafisa@example.com',
    phone: '01700-000000',
    interest: 'IELTS / TOEFL',
    campus: '',
    batch: '',
    message: '',
    ...overrides,
  };
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

describe('submitLead', () => {
  beforeEach(() => {
    vi.stubEnv('LEAD_WEBHOOK_URL', '');
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('accepts a complete enquiry with no batch', async () => {
    const state = await submitLead(initialLeadState, form());
    expect(state.status).toBe('success');
  });

  it('accepts a batch that is on the schedule and forwards it', async () => {
    const batch = batches[0]!;
    const state = await submitLead(initialLeadState, form({ batch: batch.id }));

    expect(state.status).toBe('success');
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('not delivered'),
      expect.objectContaining({ batch: batch.id }),
    );
  });

  it('rejects a batch id that is no longer listed', async () => {
    const state = await submitLead(initialLeadState, form({ batch: 'ielts-1999-01-nowhere' }));

    expect(state.status).toBe('error');
    expect(state.errors?.batch).toBeTruthy();
    expect(state.values?.batch).toBe('ielts-1999-01-nowhere');
  });
});
