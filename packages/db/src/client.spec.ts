import { describe, expect, it } from 'vitest';

import { shouldUseSsl } from './client.js';

describe('shouldUseSsl', () => {
  it('requires TLS for Neon hosts', () => {
    expect(
      shouldUseSsl('postgresql://u:p@ep-cool-rain-1-pooler.us-east-2.aws.neon.tech/neondb'),
    ).toBe(true);
  });

  it.each([
    'postgresql://u:p@localhost:5432/db',
    'postgresql://u:p@127.0.0.1:5432/db',
    'postgresql://u:p@postgres:5432/db',
  ])('skips TLS for local/compose host: %s', (url) => {
    expect(shouldUseSsl(url)).toBe(false);
  });

  it('honours an explicit sslmode=disable', () => {
    expect(shouldUseSsl('postgresql://u:p@db.example.com:5432/db?sslmode=disable')).toBe(false);
  });

  it('fails safe to TLS when the string will not parse', () => {
    expect(shouldUseSsl('not a url')).toBe(true);
  });
});
