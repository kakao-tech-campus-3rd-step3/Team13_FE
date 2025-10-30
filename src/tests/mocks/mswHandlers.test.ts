import { beforeEach, describe, expect, it, vi } from 'vitest';

import { resetCertificationState } from '@/mocks/handlers/certification';
import { resetProfileState } from '@/mocks/handlers/profile';

const baseUrl = 'http://localhost';

type RequestInitWithJson = Omit<RequestInit, 'body'> & { body?: unknown };

const requestJson = async <T>(path: string, init?: RequestInitWithJson) => {
  const { body, headers, ...rest } = init ?? {};
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body:
      body === undefined || typeof body === 'string'
        ? (body as BodyInit | undefined)
        : JSON.stringify(body),
    ...rest,
  });
  const data = (await response.json()) as T;

  return { status: response.status, data };
};

describe('MSW 인증 핸들러', () => {
  beforeEach(() => {
    resetCertificationState();
    resetProfileState();
  });

  it('카카오 OAuth URL을 반환한다', async () => {
    const { status, data } = await requestJson<{ url: string }>(
      '/api/v1/auth/kakao?redirectUri=https://kan.example.com/auth/kakao',
    );

    expect(status).toBe(200);
    expect(data.url).toContain(
      'redirect_uri=https://kan.example.com/auth/kakao',
    );
  });

  it('인가 코드가 없으면 오류를 반환한다', async () => {
    const { status, data } = await requestJson<{ error: { code: string } }>(
      '/api/v1/auth/kakao/callback',
    );

    expect(status).toBe(400);
    expect(data.error.code).toBe('AUTH_MISSING_CODE');
  });

  it('잘못된 인가 코드는 401 오류를 반환한다', async () => {
    const { status, data } = await requestJson<{ error: { code: string } }>(
      '/api/v1/auth/kakao/callback?code=invalid',
    );

    expect(status).toBe(401);
    expect(data.error.code).toBe('AUTH_INVALID_CODE');
  });

  it('성공한 콜백은 토큰과 신규 회원 여부를 제공한다', async () => {
    const { status, data } = await requestJson<{
      accessToken: string;
      refreshToken: string;
      isNewMember: boolean;
    }>('/api/v1/auth/kakao/callback?code=signup');

    expect(status).toBe(200);
    expect(data).toEqual({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      isNewMember: true,
    });
  });

  it('기존 부산대학교 농구 회원은 로그인 시 신규 회원이 아니다', async () => {
    const { status, data } = await requestJson<{
      accessToken: string;
      refreshToken: string;
      isNewMember: boolean;
    }>('/api/v1/auth/kakao/callback?code=signin');

    expect(status).toBe(200);
    expect(data).toEqual({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      isNewMember: false,
    });
  });
});

describe('MSW 이메일 인증 핸들러', () => {
  beforeEach(() => {
    resetCertificationState();
  });

  it('이메일 없이 요청하면 오류를 반환한다', async () => {
    const { status, data } = await requestJson<{ error: { code: string } }>(
      '/api/v1/members/me/certification/email',
      { method: 'POST', body: {} },
    );

    expect(status).toBe(400);
    expect(data.error.code).toBe('EMAIL_REQUIRED');
  });

  it('인증 이메일 요청 후 상태를 조회할 수 있다', async () => {
    vi.useFakeTimers();
    const sentAt = new Date('2024-01-01T10:00:00.000Z');
    vi.setSystemTime(sentAt);

    try {
      const requestResult = await requestJson<{
        email: string;
        sentAt: string;
      }>('/api/v1/members/me/certification/email', {
        method: 'POST',
        body: { email: 'user@kan.com' },
      });

      expect(requestResult.status).toBe(200);
      expect(requestResult.data).toEqual({
        email: 'user@kan.com',
        sentAt: sentAt.toISOString(),
      });

      const statusResult = await requestJson<{
        email: string | null;
        verified: boolean;
        lastSentAt: string | null;
        verifiedAt: string | null;
      }>('/api/v1/members/me/certification/status');

      expect(statusResult.data).toEqual({
        email: 'user@kan.com',
        verified: false,
        lastSentAt: sentAt.toISOString(),
        verifiedAt: null,
      });
    } finally {
      vi.useRealTimers();
    }
  });

  it('요청 없이 인증을 시도하면 오류를 반환한다', async () => {
    const { status, data } = await requestJson<{ error: { code: string } }>(
      '/api/v1/members/me/certification/verify',
      { method: 'POST', body: { code: '000000' } },
    );

    expect(status).toBe(400);
    expect(data.error.code).toBe('EMAIL_NOT_REQUESTED');
  });

  it('잘못된 인증 코드는 오류를 반환한다', async () => {
    await requestJson('/api/v1/members/me/certification/email', {
      method: 'POST',
      body: { email: 'user@kan.com' },
    });

    const { status, data } = await requestJson<{ error: { code: string } }>(
      '/api/v1/members/me/certification/verify',
      { method: 'POST', body: { code: '123456' } },
    );

    expect(status).toBe(400);
    expect(data.error.code).toBe('EMAIL_INVALID_TOKEN');
  });

  it('이미 인증된 이메일은 재요청 시 오류를 반환한다', async () => {
    await requestJson('/api/v1/members/me/certification/email', {
      method: 'POST',
      body: { email: 'already@kan.com' },
    });
    await requestJson('/api/v1/members/me/certification/verify', {
      method: 'POST',
      body: { code: '000000' },
    });

    const { status, data } = await requestJson<{ error: { code: string } }>(
      '/api/v1/members/me/certification/email',
      { method: 'POST', body: { email: 'already@kan.com' } },
    );

    expect(status).toBe(409);
    expect(data.error.code).toBe('EMAIL_ALREADY_VERIFIED');
  });

  it('발송 제한 이메일은 429 오류를 반환한다', async () => {
    const { status, data } = await requestJson<{ error: { code: string } }>(
      '/api/v1/members/me/certification/email',
      { method: 'POST', body: { email: 'limit@kan.com' } },
    );

    expect(status).toBe(429);
    expect(data.error.code).toBe('EMAIL_RATE_LIMITED');
  });

  it('인증에 성공하면 상태가 업데이트된다', async () => {
    vi.useFakeTimers();
    const sentAt = new Date('2024-01-01T10:00:00.000Z');
    vi.setSystemTime(sentAt);

    try {
      await requestJson('/api/v1/members/me/certification/email', {
        method: 'POST',
        body: { email: 'user@kan.com' },
      });

      const verifiedAt = new Date('2024-01-01T10:05:00.000Z');
      vi.setSystemTime(verifiedAt);

      const verifyResult = await requestJson<{
        email: string;
        verifiedAt: string;
      }>('/api/v1/members/me/certification/verify', {
        method: 'POST',
        body: { code: '000000' },
      });

      expect(verifyResult.status).toBe(200);
      expect(verifyResult.data).toEqual({
        email: 'user@kan.com',
        verifiedAt: verifiedAt.toISOString(),
      });

      const statusResult = await requestJson<{
        email: string | null;
        verified: boolean;
        lastSentAt: string | null;
        verifiedAt: string | null;
      }>('/api/v1/members/me/certification/status');

      expect(statusResult.data).toEqual({
        email: 'user@kan.com',
        verified: true,
        lastSentAt: sentAt.toISOString(),
        verifiedAt: verifiedAt.toISOString(),
      });
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('MSW 프로필 핸들러', () => {
  beforeEach(() => {
    resetProfileState();
  });

  it('내 프로필을 조회할 수 있다', async () => {
    const { status, data } = await requestJson<{
      memberId: number;
      name: string;
    }>('/api/v2/members/me/profile');

    expect(status).toBe(200);
    expect(data).toMatchObject({
      memberId: 101,
      name: '김대영',
    });
  });

  it('다른 사용자의 프로필을 조회할 수 있다', async () => {
    const { status, data } = await requestJson<{
      memberId: number;
      name: string;
    }>('/api/v2/members/102/profile');

    expect(status).toBe(200);
    expect(data).toMatchObject({
      memberId: 102,
      name: '부산대학교 리그',
    });
  });

  it('존재하지 않는 사용자는 오류를 반환한다', async () => {
    const { status, data } = await requestJson<{ error: { code: string } }>(
      '/api/v2/members/999/profile',
    );

    expect(status).toBe(404);
    expect(data.error.code).toBe('PROFILE_NOT_FOUND');
  });

  it('닉네임 업데이트에 성공하면 상태가 갱신된다', async () => {
    const updateResult = await requestJson<{ name: string }>(
      '/api/v2/members/me/profile/name',
      { method: 'PATCH', body: { name: '부산대학교 농구 에이스' } },
    );

    expect(updateResult.status).toBe(200);
    expect(updateResult.data.name).toBe('부산대학교 농구 에이스');

    const profileResult = await requestJson<{ name: string }>(
      '/api/v2/members/me/profile',
    );

    expect(profileResult.data.name).toBe('부산대학교 농구 에이스');
  });

  it('유효하지 않은 닉네임은 오류를 반환한다', async () => {
    const { status, data } = await requestJson<{ error: { code: string } }>(
      '/api/v2/members/me/profile/name',
      { method: 'PATCH', body: { name: 'a' } },
    );

    expect(status).toBe(400);
    expect(data.error.code).toBe('PROFILE_INVALID_NAME');
  });

  it('소개글은 150자 이하만 허용한다', async () => {
    const { status, data } = await requestJson<{ error: { code: string } }>(
      '/api/v2/members/me/profile/description',
      { method: 'PATCH', body: { description: 'a'.repeat(151) } },
    );

    expect(status).toBe(400);
    expect(data.error.code).toBe('PROFILE_INVALID_DESCRIPTION');
  });

  it('프로필 이미지는 유효한 URL만 허용한다', async () => {
    const { status, data } = await requestJson<{ error: { code: string } }>(
      '/api/v2/members/me/profile/image-url',
      { method: 'PATCH', body: { imageUrl: 'invalid-url' } },
    );

    expect(status).toBe(400);
    expect(data.error.code).toBe('PROFILE_INVALID_IMAGE_URL');
  });

  it('프로필 이미지를 업데이트하면 저장된다', async () => {
    const updateResult = await requestJson<{ imageUrl: string }>(
      '/api/v2/members/me/profile/image-url',
      {
        method: 'PATCH',
        body: { imageUrl: 'https://example.com/avatar/new.png' },
      },
    );

    expect(updateResult.status).toBe(200);
    expect(updateResult.data.imageUrl).toBe(
      'https://example.com/avatar/new.png',
    );

    const profileResult = await requestJson<{ imageUrl: string }>(
      '/api/v2/members/me/profile',
    );

    expect(profileResult.data.imageUrl).toBe(
      'https://example.com/avatar/new.png',
    );
  });
});
