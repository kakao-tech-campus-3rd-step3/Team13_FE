import axios, { type AxiosError } from 'axios';
import { beforeEach, describe, expect, it } from 'vitest';

import { resetCertificationState } from '@/mocks/handlers/certification';
import { resetGamesState } from '@/mocks/handlers/games';
import { resetProfileState } from '@/mocks/handlers/profile';
import { resetReportsState } from '@/mocks/handlers/reports';
import type { ApiErrorResponse } from '@/mocks/sharedErrors';

const client = axios.create({
  baseURL: 'http://localhost',
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
});

const expectAxiosError = async <T>(
  request: Promise<unknown>,
  assertions: (error: AxiosError<T>) => void,
) => {
  await expect(request).rejects.toSatisfy((e: unknown) => {
    if (!axios.isAxiosError<T>(e)) return false;
    assertions(e);
    return true;
  });
};

describe('MSW × axios 통합', () => {
  beforeEach(() => {
    resetCertificationState();
    resetProfileState();
    resetGamesState();
    resetReportsState();
  });

  it('카카오 OAuth URL: authUrl 키로 응답', async () => {
    const res = await client.get<{ authUrl: string }>('/api/v1/auth/kakao', {
      params: { redirectUri: 'https://kan.example.com/auth/kakao' },
    });
    expect(res.status).toBe(200);
    const url = new URL(res.data.authUrl);
    expect(url.origin + url.pathname).toBe(
      'https://kauth.kakao.com/oauth/authorize',
    );
    expect(url.searchParams.get('redirect_uri')).toBe(
      'https://kan.example.com/auth/kakao',
    );
  });

  it('인증 이메일 요청: localPart 누락 → code+message 단언', async () => {
    await expectAxiosError<ApiErrorResponse>(
      client.post('/api/v1/members/me/certification/email', {}),
      ({ response }) => {
        expect(response?.status).toBe(400);
        expect(response?.data.error).toEqual({
          code: 'CERT_LOCAL_PART_REQUIRED',
          message: '학교 이메일 localPart가 필요합니다.',
        });
      },
    );
  });

  it('프로필 이름 수정 성공: ProfileResponse 반환', async () => {
    const res = await client.patch<{
      name: string;
      email: string;
      imageUrl: string;
      description: string;
    }>('/api/v2/members/me/profile/name', { name: '부산대 농구 에이스' });

    expect(res.status).toBe(200);
    const { name, email, imageUrl, description } = res.data;
    expect(name).toBe('부산대 농구 에이스');
    expect(typeof email).toBe('string');
    expect(typeof imageUrl).toBe('string');
    expect(typeof description).toBe('string');
  });
});
