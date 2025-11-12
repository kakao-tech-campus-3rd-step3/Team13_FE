import type { ProfileResponse } from '@/api/profile';

export const DEFAULT_PROFILE_NAME = '새로운 사용자';
export const DEFAULT_PROFILE_IMAGE_URL =
  'https://busanillustfair.cafe24.com/wp-content/uploads/2024/07/PNUMALL1.jpg';

export function ensureProfileDefaults(
  profile: ProfileResponse,
): ProfileResponse {
  const name = profile.name?.trim() || DEFAULT_PROFILE_NAME;
  const imageUrl = profile.imageUrl?.trim() || DEFAULT_PROFILE_IMAGE_URL;
  const description = profile.description ?? '';

  return {
    ...profile,
    name,
    imageUrl,
    description,
  };
}
