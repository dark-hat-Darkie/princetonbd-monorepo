import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { echoValues, firstErrors, readForm } from './form-data';

function form(entries: [string, string][]): FormData {
  const data = new FormData();
  for (const [key, value] of entries) data.append(key, value);
  return data;
}

describe('readForm', () => {
  it('trims strings and drops Next internals', () => {
    const data = form([
      ['name', '  Ada '],
      ['$ACTION_ID_1', 'x'],
    ]);
    expect(readForm(data)).toEqual({ name: 'Ada' });
  });

  it('reads repeated controls as arrays and defaults an empty list', () => {
    const data = form([
      ['days', 'sat'],
      ['days', 'mon'],
    ]);
    expect(readForm(data, { arrays: ['days', 'modes'] })).toEqual({
      days: ['sat', 'mon'],
      modes: [],
    });
  });

  it('splits one-per-line textareas and ignores blank lines', () => {
    const data = form([['feeIncludes', ' Mocks \n\n  Materials\r\n']]);
    expect(readForm(data, { lines: ['feeIncludes'] })).toEqual({
      feeIncludes: ['Mocks', 'Materials'],
    });
  });

  it('turns an empty number box into null, never zero', () => {
    const data = form([
      ['priceAmount', '45000'],
      ['seatsLeft', ''],
    ]);
    expect(readForm(data, { numbers: ['priceAmount', 'seatsLeft'] })).toEqual({
      priceAmount: 45000,
      seatsLeft: null,
    });
  });

  it('reads a checkbox as a real boolean, absent meaning false', () => {
    expect(readForm(form([['isActive', 'on']]), { booleans: ['isActive'] })).toEqual({
      isActive: true,
    });
    expect(readForm(form([]), { booleans: ['isActive'] })).toEqual({ isActive: false });
  });

  it('parses a JSON hidden field and leaves malformed JSON for the schema to reject', () => {
    expect(readForm(form([['modules', '[{"title":"One"}]']]), { json: ['modules'] })).toEqual({
      modules: [{ title: 'One' }],
    });
    expect(readForm(form([['modules', '{oops']]), { json: ['modules'] })).toEqual({
      modules: '{oops',
    });
  });
});

describe('firstErrors', () => {
  it('keys the first message by dotted path, keeping array indexes', () => {
    const schema = z.object({
      name: z.string().min(1, 'Give it a name'),
      modules: z.array(z.object({ title: z.string().min(1, 'Title required') })),
    });
    const result = schema.safeParse({ name: '', modules: [{ title: 'ok' }, { title: '' }] });
    expect(result.success).toBe(false);
    if (result.success) return;

    expect(firstErrors(result.error)).toEqual({
      name: 'Give it a name',
      'modules.1.title': 'Title required',
    });
  });
});

describe('echoValues', () => {
  it('returns every submitted string, joining repeated controls', () => {
    const data = form([
      ['name', 'Ada'],
      ['days', 'sat'],
      ['days', 'mon'],
    ]);
    expect(echoValues(data)).toEqual({ name: 'Ada', days: 'sat,mon' });
  });
});
