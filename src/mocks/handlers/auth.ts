import { http, HttpResponse } from 'msw';

import { createErrorResponse } from '../sharedErrors';
import type { ApiErrorResponse } from '../sharedErrors';

type OAuthUrlResponse = { authUrl: string };
type AuthResponse = { token: string };

const getKakaoAuthUrl = http.get<never, never, OAuthUrlResponse>(
  '*/api/v1/auth/kakao',
  ({ request }) => {
    const redirectUri = new URL(request.url).searchParams.get('redirectUri');
    const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=mockClientId&redirect_uri=${
      redirectUri ?? 'https://localhost:5173/auth/kakao'
    }&response_type=code`;
    return HttpResponse.json<OAuthUrlResponse>({ authUrl });
  },
);

const kakaoCallback = http.get<never, never, AuthResponse | ApiErrorResponse>(
  '*/api/v1/auth/kakao/callback',
  ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    if (!code) return createErrorResponse('AUTH_MISSING_CODE');
    if (code === 'invalid') return createErrorResponse('AUTH_INVALID_CODE');
    return HttpResponse.json<AuthResponse>({ token: 'mock-token' });
  },
);

export const authHandlers = [getKakaoAuthUrl, kakaoCallback];
