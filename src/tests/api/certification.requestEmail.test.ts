import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it } from 'vitest';

import { requestCertificationEmail } from '@/api/certification';
import { resetCertificationState } from '@/mocks/handlers/certification';
import { server } from '@/mocks/server';

describe('requestCertificationEmail', () => {
  beforeEach(() => {
    resetCertificationState();
  });

  it('이미 인증이 완료된 경우 성공 응답으로 간주한다', async () => {
    server.use(
      http.post('*/api/v1/members/me/certification/email', () =>
        HttpResponse.json(
          {
            error: {
              code: 'CERT_ALREADY_VERIFIED',
              message: '이미 인증이 완료되었습니다.',
            },
          },
          { status: 409 },
        ),
      ),
    );

    const result = await requestCertificationEmail({
      email: 'student@pusan.ac.kr',
    });

    expect(result).toEqual({ isVerified: true });
  });

  it('다른 오류 상태는 예외로 유지한다', async () => {
    server.use(
      http.post('*/api/v1/members/me/certification/email', () =>
        HttpResponse.json(
          {
            error: {
              code: 'CERT_RATE_LIMITED',
              message: '요청이 너무 잦습니다.',
            },
          },
          { status: 429 },
        ),
      ),
    );

    await expect(
      requestCertificationEmail({ email: 'student@pusan.ac.kr' }),
    ).rejects.toThrowError();
  });
});
