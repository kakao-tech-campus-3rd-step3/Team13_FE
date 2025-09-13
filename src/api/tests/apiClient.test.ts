import { describe, expect, it } from 'vitest';

import { fetchGreeting } from '@/api/apiClient';

describe('fetchGreeting', () => {
  it('returns mocked greeting', async () => {
    const data = await fetchGreeting();
    expect(data.greeting).toBe('hello');
  });
});
