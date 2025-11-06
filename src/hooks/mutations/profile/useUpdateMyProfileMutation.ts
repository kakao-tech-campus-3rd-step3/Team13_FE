import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  type ProfileResponse,
  type UpdateProfileRequest,
  updateMyProfile,
} from '@/api/profile';
import { PROFILE_ME_KEY } from '@/features/profile/keys';
import { notify } from '@/pages/notifications/notify';
import { useActions, useAppStore, type User } from '@/stores/appStore';

type MutationContext = {
  profileSnapshot?: ProfileResponse;
  userSnapshot?: User | null;
};

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { setUser } = useActions();

  return useMutation<
    ProfileResponse,
    AxiosError,
    UpdateProfileRequest,
    MutationContext
  >({
    mutationFn: updateMyProfile,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: PROFILE_ME_KEY });

      const previous =
        queryClient.getQueryData<ProfileResponse>(PROFILE_ME_KEY);
      const userSnapshot = useAppStore.getState().user;

      if (previous) {
        const optimistic: ProfileResponse = {
          ...previous,
          name: variables.name ?? previous.name,
          imageUrl: variables.imageUrl ?? previous.imageUrl,
          description: variables.description ?? previous.description,
        };

        queryClient.setQueryData(PROFILE_ME_KEY, optimistic);

        if (userSnapshot) {
          setUser({
            ...userSnapshot,
            name: optimistic.name,
            email: optimistic.email,
            avatarUrl: optimistic.imageUrl,
          });
        }
      }

      return { profileSnapshot: previous, userSnapshot };
    },
    onError: (_error, _variables, context) => {
      if (context?.profileSnapshot) {
        queryClient.setQueryData(PROFILE_ME_KEY, context.profileSnapshot);
      }

      if (context?.userSnapshot) {
        setUser(context.userSnapshot);
      }

      notify.error('저장에 실패했어요. 네트워크 상태를 확인해 주세요.');
    },
    onSuccess: (data) => {
      queryClient.setQueryData(PROFILE_ME_KEY, data);

      const currentUser = useAppStore.getState().user;
      const id = currentUser?.id ?? 0;

      setUser({
        id,
        name: data.name,
        email: data.email,
        avatarUrl: data.imageUrl,
      });

      notify.success('저장 완료!');
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: PROFILE_ME_KEY });
    },
  });
}

export const useUpdateMyProfileMutation = useUpdateProfile;
