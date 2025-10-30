import { http, HttpResponse } from 'msw';

import { createErrorResponse } from '../sharedErrors';

export const authHandlers = [
  http.get('*/api/v1/auth/kakao', ({ request }) => {
    const redirectUri = new URL(request.url).searchParams.get('redirectUri');

    return HttpResponse.json({
      url: `https://kauth.kakao.com/oauth/authorize?client_id=mockClientId&redirect_uri=${
        redirectUri ?? 'https://localhost:5173/auth/kakao'
      }&response_type=code`,
    });
  }),
  http.get('*/api/v1/auth/kakao/callback', ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return createErrorResponse('AUTH_MISSING_CODE');
    }

    if (code === 'invalid') {
      return createErrorResponse('AUTH_INVALID_CODE');
    }

    return HttpResponse.json({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      isNewMember: code === 'signup',
    });
  }),
];
