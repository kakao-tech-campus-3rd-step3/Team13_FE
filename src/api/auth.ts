import { apiClient } from '@/api/core/axiosInstance';

type NestedOAuthUrlResponse = {
  authUrl?: string;
  url?: string;
  href?: string;
  location?: string;
  redirectUrl?: string;
  redirectUri?: string;
  authorizeUrl?: string;
  loginUrl?: string;
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
const urlKeys = [
  'authUrl',
  'url',
  'href',
  'location',
  'redirectUrl',
  'redirectUri',
  'authorizeUrl',
  'loginUrl',
] as const satisfies readonly (keyof NestedOAuthUrlResponse)[];

function sanitizeUrl(candidate: string): string | null {
  const trimmed = candidate.trim();
  if (!trimmed) return null;

  const lowered = trimmed.toLowerCase();
  if (lowered === 'undefined' || lowered === 'null') {
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.toString();
  } catch {
    return /^https?:\/\//i.test(trimmed) ? trimmed : null;
  }
}

function extractAuthUrl(raw: unknown): string | null {
  if (!raw) return null;
  if (typeof raw === 'string') return sanitizeUrl(raw);
  if (typeof raw !== 'object') return null;

  for (const key of urlKeys) {
    const candidate = (raw as NestedOAuthUrlResponse)[key];
    if (typeof candidate === 'string') {
      const sanitized = sanitizeUrl(candidate);
      if (sanitized) return sanitized;
    }
    if (candidate) {
      const nestedCandidate = extractAuthUrl(candidate);
      if (nestedCandidate) return nestedCandidate;
    }
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

export async function exchangeKakaoCode(
  code: string,
  redirectUri?: string,
): Promise<{
  token: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}> {
  const params: Record<string, string> = { code };
  if (redirectUri) {
    params.redirectUri = redirectUri;
  }
  const { data } = await apiClient.get<NestedAuthResponse>(
    '/api/v1/auth/kakao/callback',
    {
      params,
    },
  );

  return extractTokens(data);
}
