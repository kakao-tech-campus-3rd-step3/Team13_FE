import { describe, expect, it } from 'vitest';

import { fetchGreeting } from '@/api/apiClient';

describe('fetchGreeting 함수', () => {
  it('모킹된 인사말을 반환한다', async () => {
    const data = await fetchGreeting();
    expect(data.greeting).toBe('안녕하세요');
  });
});
