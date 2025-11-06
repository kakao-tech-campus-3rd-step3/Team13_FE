import { describe, expect, it } from 'vitest';

import {
  ALLOWED_MIME_TYPES,
  MAX_IMAGE_SIZE,
} from '@/features/upload/utils/limits';

describe('upload limits', () => {
  it('이미지 기본 제한값을 제공한다', () => {
    expect(MAX_IMAGE_SIZE).toBe(10 * 1024 * 1024);
    expect(ALLOWED_MIME_TYPES).toEqual([
      'image/jpeg',
      'image/png',
      'image/webp',
    ]);
  });
});
