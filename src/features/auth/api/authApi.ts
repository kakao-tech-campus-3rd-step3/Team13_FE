import { apiClient } from '@/api/core/axiosInstance';

export type OAuthProvider = 'google' | 'kakao';

export type OAuthUrlResponse = {
  authUrl: string;
};

export const getOAuthUrl = async (
  provider: OAuthProvider,
  redirectUri?: string,
): Promise<string> => {
  const { data } = await apiClient.get<OAuthUrlResponse>(
    `/api/v1/auth/${provider}`,
    {
      params: redirectUri ? { redirectUri } : undefined,
    },
  );
  return data.authUrl;
};
