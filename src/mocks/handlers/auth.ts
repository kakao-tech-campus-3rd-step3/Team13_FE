import { http, HttpResponse } from 'msw';

import { createErrorResponse } from '../sharedErrors';
import type { ApiErrorResponse } from '../sharedErrors';

type OAuthUrlResponse = { authUrl: string };
type AuthResponse = { token: string };

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

const refreshHandler = http.post<
  never,
  { refreshToken: string },
  RefreshResponse | ApiErrorResponse
>('*/api/v1/auth/refresh', async ({ request }) => {
  const body = await request.json();
  if (!body.refreshToken) {
    return createErrorResponse('AUTH_INVALID_REFRESH_TOKEN');
  }

  return HttpResponse.json<RefreshResponse>({
    accessToken: 'refreshed-access-token',
    refreshToken: 'refreshed-refresh-token',
  });
});

const createOAuthUrl = (
  baseUrl: string,
  params: Record<string, string | undefined>,
) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      search.set(key, value);
    }
  });
  return `${baseUrl}?${search.toString()}`;
};

const getGoogleAuthUrl = http.get<never, never, OAuthUrlResponse>(
  '*/api/v1/auth/google',
  ({ request }) => {
    const redirectUri = new URL(request.url).searchParams.get('redirectUri');
    const authUrl = createOAuthUrl(
      'https://accounts.google.com/o/oauth2/v2/auth',
      {
        client_id: 'mock-google-client-id',
        redirect_uri: redirectUri ?? 'https://localhost:5173/auth/google',
        response_type: 'code',
        scope: 'openid email profile',
      },
    );
    return HttpResponse.json<OAuthUrlResponse>({ authUrl });
  },
);

const getKakaoAuthUrl = http.get<never, never, OAuthUrlResponse>(
  '*/api/v1/auth/kakao',
  ({ request }) => {
    const url = new URL(request.url);
    const redirectUri = url.searchParams.get('redirectUri');
    const state = url.searchParams.get('state') ?? undefined;
    const authUrl = createOAuthUrl('https://kauth.kakao.com/oauth/authorize', {
      client_id: 'mock-kakao-client-id',
      redirect_uri: redirectUri ?? 'https://localhost:5173/auth/kakao/callback',
      response_type: 'code',
      state,
    });
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

export const authHandlers = [
  refreshHandler,
  getGoogleAuthUrl,
  getKakaoAuthUrl,
  kakaoCallback,
];
