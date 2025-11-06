import { useQuery } from '@tanstack/react-query';

import { getMyProfile, type ProfileResponse } from '@/api/profile';

export const myProfileQueryKey = ['profile', 'me'] as const;

export function useMyProfileQuery(enabled = true) {
  return useQuery<ProfileResponse>({
    queryKey: myProfileQueryKey,
    queryFn: getMyProfile,
    enabled,
    staleTime: 60 * 1000,
  });
}
