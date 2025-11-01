import { apiClient } from '@/api/core/axiosInstance';

export type OAuthUrlResponse = { authUrl: string };
export type AuthResponse = { token: string };

export async function getKakaoOAuthUrl(params?: { state?: string }) {
  const { data } = await apiClient.get<OAuthUrlResponse>('/api/v1/auth/kakao', {
    params,
  });

  return data;
}

export async function exchangeKakaoCode(code: string) {
  const { data } = await apiClient.get<AuthResponse>(
    '/api/v1/auth/kakao/callback',
    {
      params: { code },
    },
  );

  return data;
}
