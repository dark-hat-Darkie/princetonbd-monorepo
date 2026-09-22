import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getBatch, getBranches } from '@/lib/cms';
import { submitLead } from './lead';
import { initialLeadState } from './lead-shape';

/* `lib/cms` is `server-only` and talks to the API; both are stubbed here. */
vi.mock('@/lib/cms', () => ({
  getBatch: vi.fn(),
  getBranches: vi.fn(),
}));

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

const listedBatch = { id: 'b1', courseSlug: 'ielts', courseName: 'IELTS' };

describe('submitLead', () => {
  beforeEach(() => {
    vi.stubEnv('LEAD_WEBHOOK_URL', '');
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    vi.mocked(getBranches).mockResolvedValue([]);
    vi.mocked(getBatch).mockResolvedValue(null);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('accepts a complete enquiry with no batch', async () => {
    const state = await submitLead(initialLeadState, form());
    expect(state.status).toBe('success');
    expect(getBatch).not.toHaveBeenCalled();
  });

  it('accepts a batch the CMS still lists and forwards it', async () => {
    vi.mocked(getBatch).mockResolvedValue(listedBatch as never);
    const state = await submitLead(initialLeadState, form({ batch: 'b1' }));

    expect(state.status).toBe('success');
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('not delivered'),
      expect.objectContaining({ batch: 'b1' }),
    );
  });

  it('rejects a batch id that is no longer listed', async () => {
    const state = await submitLead(initialLeadState, form({ batch: 'withdrawn' }));

    expect(state.status).toBe('error');
    expect(state.errors?.batch).toBeTruthy();
    expect(state.values?.batch).toBe('withdrawn');
  });

  it('does not lose a lead when the CMS cannot be reached', async () => {
    vi.mocked(getBatch).mockRejectedValue(new Error('fetch failed'));
    const state = await submitLead(initialLeadState, form({ batch: 'b1' }));
    expect(state.status).toBe('success');
  });

  it('validates the campus against the branch list when one is available', async () => {
    vi.mocked(getBranches).mockResolvedValue([{ name: 'Dhaka — Gulshan' }] as never);

    const wrong = await submitLead(initialLeadState, form({ campus: 'Mars' }));
    expect(wrong.status).toBe('error');
    expect(wrong.errors?.campus).toBeTruthy();

    const right = await submitLead(initialLeadState, form({ campus: 'Dhaka — Gulshan' }));
    expect(right.status).toBe('success');
  });
});
