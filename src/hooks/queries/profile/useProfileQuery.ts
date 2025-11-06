import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getMyProfile, type ProfileResponse } from '@/api/profile';
import { ensureProfileDefaults } from '@/features/profile/constants';
import { PROFILE_ME_KEY } from '@/features/profile/keys';
import { useActions, useAppStore, type User } from '@/stores/appStore';

type UseProfileQueryOptions = {
  enabled?: boolean;
};

export function useProfileQuery(options: UseProfileQueryOptions = {}) {
  const { setUser } = useActions();

  const query = useQuery<ProfileResponse>({
    queryKey: PROFILE_ME_KEY,
    queryFn: getMyProfile,
    enabled: options.enabled ?? true,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    select: ensureProfileDefaults,
  });

  useEffect(() => {
    if (!query.data) return;

    const profile: ProfileResponse = query.data;
    const currentUser = useAppStore.getState().user;
    const id = currentUser?.id ?? 0;
    const nextUser: User = {
      id,
      name: profile.name,
      email: profile.email,
      avatarUrl: profile.imageUrl,
    };

    setUser(nextUser);
  }, [query.data, setUser]);

  return query;
}
