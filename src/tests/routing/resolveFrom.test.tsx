import { describe, it, expect } from 'vitest';

import { resolveFrom } from '@/routes/resolveFrom';

describe('resolveFrom', () => {
  it('state 없음 → fallback', () => {
    expect(resolveFrom(undefined, '/my')).toBe('/my');
  });

  it('유효한 from(path만) → path 반환', () => {
    const state = { from: { pathname: '/my' } };
    expect(resolveFrom(state, '/fallback')).toBe('/my');
  });

  it('path + search → 합성', () => {
    const state = { from: { pathname: '/my', search: '?tab=profile' } };
    expect(resolveFrom(state, '/fallback')).toBe('/my?tab=profile');
  });

  it('상대경로/외부URL 차단 → fallback', () => {
    expect(resolveFrom({ from: { pathname: 'me' } }, '/f')).toBe('/f');
    expect(resolveFrom({ from: { pathname: 'http://evil.com' } }, '/f')).toBe(
      '/f',
    );
  });

  it('search가 ?로 시작하지 않으면 무시', () => {
    const state = { from: { pathname: '/my', search: 'tab=1' } };
    expect(resolveFrom(state, '/fallback')).toBe('/my');
  });
});
