import { apiClient } from '@/api/core/axiosInstance';

type NestedOAuthUrlResponse = {
  authUrl?: string;
  url?: string;
  data?: NestedOAuthUrlResponse;
  result?: NestedOAuthUrlResponse;
  payload?: NestedOAuthUrlResponse;
};

type NestedAuthResponse = {
  token?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  data?: NestedAuthResponse;
  result?: NestedAuthResponse;
  payload?: NestedAuthResponse;
};
const nestedKeys = ['data', 'result', 'payload'] as const;

function extractAuthUrl(raw: unknown): string | null {
  if (!raw) return null;
  if (typeof raw === 'string') return raw;
  if (typeof raw !== 'object') return null;

  const candidate =
    (raw as NestedOAuthUrlResponse).authUrl ??
    (raw as NestedOAuthUrlResponse).url ??
    null;

  if (typeof candidate === 'string' && candidate.length > 0) {
    return candidate;
  }

  for (const key of nestedKeys) {
    const nested = (raw as NestedOAuthUrlResponse)[key];
    const nestedUrl = extractAuthUrl(nested);
    if (nestedUrl) return nestedUrl;
  }

  return null;
}

function extractTokens(raw: unknown): {
  token: string | null;
  accessToken: string | null;
  refreshToken: string | null;
} {
  if (!raw || typeof raw !== 'object') {
    return { token: null, accessToken: null, refreshToken: null };
  }

  const source = raw as NestedAuthResponse;
  const token = typeof source.token === 'string' ? source.token : null;
  const accessToken =
    typeof source.accessToken === 'string' ? source.accessToken : null;
  const refreshToken =
    typeof source.refreshToken === 'string' ? source.refreshToken : null;

  if (token || accessToken || refreshToken) {
    return { token, accessToken, refreshToken };
  }

  for (const key of nestedKeys) {
    const nested = source[key];
    const extracted = extractTokens(nested);
    if (extracted.token || extracted.accessToken || extracted.refreshToken) {
      return extracted;
    }
  }

  return { token: null, accessToken: null, refreshToken: null };
}

export async function getKakaoOAuthUrl(params?: {
  state?: string;
  redirectUri?: string;
}): Promise<string | null> {
  const { data } = await apiClient.get<NestedOAuthUrlResponse>(
    '/api/v1/auth/kakao',
    {
      params,
    },
  );

  return extractAuthUrl(data);
}

export async function exchangeKakaoCode(code: string): Promise<{
  token: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}> {
  const { data } = await apiClient.get<NestedAuthResponse>(
    '/api/v1/auth/kakao/callback',
    {
      params: { code },
    },
  );

  return extractTokens(data);
}
