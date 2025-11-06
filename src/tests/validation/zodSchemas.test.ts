import { describe, expect, it } from 'vitest';

import { profileFormSchema } from '@/libs/validation/zodSchemas';

describe('profileFormSchema', () => {
  it('유효한 값은 통과', () => {
    const result = profileFormSchema.safeParse({
      nickname: '홍길동',
      description: '안녕하세요',
      email: 'hong@example.com',
      imageUrl: 'https://img.example.com/a.png',
    });

    expect(result.success).toBe(true);
  });

  it('잘못된 이메일은 실패', () => {
    const result = profileFormSchema.safeParse({
      nickname: '홍길동',
      description: '',
      email: 'not-email',
      imageUrl: 'https://x.io',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        '유효한 이메일 주소가 아닙니다.',
      );
    }
  });
});
