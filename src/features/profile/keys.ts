export const PROFILE_QUERY_ROOT = ['profile'] as const;

export const PROFILE_ME_KEY = [...PROFILE_QUERY_ROOT, 'me'] as const;

export const PROFILE_KEYS = {
  root: PROFILE_QUERY_ROOT,
  me: PROFILE_ME_KEY,
} as const;
