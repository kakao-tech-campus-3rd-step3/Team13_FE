import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  type ProfileResponse,
  type UpdateProfileRequest,
  updateMyProfile,
} from '@/api/profile';
import { myProfileQueryKey } from '@/hooks/queries/profile';

export function useUpdateMyProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    ProfileResponse,
    AxiosError,
    UpdateProfileRequest,
    { previous?: ProfileResponse }
  >({
    mutationFn: updateMyProfile,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: myProfileQueryKey });

      const previous =
        queryClient.getQueryData<ProfileResponse>(myProfileQueryKey);

      if (previous) {
        const optimistic: ProfileResponse = {
          ...previous,
          name: variables.name ?? previous.name,
          imageUrl: variables.imageUrl ?? previous.imageUrl,
          description: variables.description ?? previous.description,
        };

        queryClient.setQueryData(myProfileQueryKey, optimistic);
      }

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(myProfileQueryKey, context.previous);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(myProfileQueryKey, data);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
    },
  });
}
