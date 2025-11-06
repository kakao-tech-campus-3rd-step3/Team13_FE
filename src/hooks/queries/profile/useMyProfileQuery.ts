import { PROFILE_ME_KEY } from '@/features/profile/keys';

import { useProfileQuery } from './useProfileQuery';

export const myProfileQueryKey = PROFILE_ME_KEY;

export function useMyProfileQuery(enabled = true) {
  return useProfileQuery({ enabled });
}
