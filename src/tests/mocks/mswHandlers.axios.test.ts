import axios, { type AxiosError } from 'axios';
import { beforeEach, describe, expect, it } from 'vitest';

import { resetCertificationState } from '@/mocks/handlers/certification';
import { resetProfileState } from '@/mocks/handlers/profile';
import type { ApiErrorResponse } from '@/mocks/sharedErrors';

const client = axios.create({
  baseURL: 'http://localhost',
  headers: {
    'Content-Type': 'application/json',
  },
});

const expectAxiosError = async <T>(
  request: Promise<unknown>,
  assertions: (error: AxiosError<T>) => void,
) => {
  await expect(request).rejects.toSatisfy((error: unknown) => {
    if (!axios.isAxiosError<T>(error)) {
      return false;
    }

    assertions(error);
    return true;
  });
};

describe('MSW와 axios 통합 동작', () => {
  beforeEach(() => {
    resetCertificationState();
    resetProfileState();
  });

  it('카카오 OAuth URL 요청을 msw가 가로채어 응답한다', async () => {
    const response = await client.get<{ url: string }>('/api/v1/auth/kakao', {
      params: { redirectUri: 'https://kan.example.com/auth/kakao' },
    });

    expect(response.status).toBe(200);
    expect(response.data.url).toContain(
      'redirect_uri=https://kan.example.com/auth/kakao',
    );
  });

  it('axios POST 요청에서도 에러 응답을 재현할 수 있다', async () => {
    await expectAxiosError<ApiErrorResponse>(
      client.post('/api/v1/members/me/certification/email', {}),
      (error) => {
        const { response } = error;

        expect(response?.status).toBe(400);
        expect(response?.data.error.code).toBe('EMAIL_REQUIRED');
      },
    );
  });

  it('프로필 수정 요청이 axios를 통해 성공적으로 처리된다', async () => {
    const response = await client.patch<{ name: string }>(
      '/api/v2/members/me/profile/name',
      { name: '부산대학교 농구 주장' },
    );

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ name: '부산대학교 농구 주장' });

    const profile = await client.get<{
      memberId: number;
      name: string;
      description: string;
      imageUrl: string;
    }>('/api/v2/members/me/profile');

    expect(profile.status).toBe(200);
    expect(profile.data).toMatchObject({ name: '부산대학교 농구 주장' });
  });
});
