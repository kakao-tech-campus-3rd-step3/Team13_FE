/**
 * 게임 생성 mutation hook
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createGame } from '@/api/games';
import type { CreateGameRequest, CreateGameResponse } from '@/types/game.types';

interface UseCreateGameParams {
  game: CreateGameRequest;
  image?: File | null;
}

/**
 * 게임 생성 mutation hook
 */
export function useCreateGame() {
  const queryClient = useQueryClient();

  return useMutation<CreateGameResponse, Error, UseCreateGameParams>({
    mutationFn: ({ game, image }) => createGame(game, image),
    onSuccess: () => {
      // 게임 목록 쿼리 무효화 (새로고침)
      void queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
}
