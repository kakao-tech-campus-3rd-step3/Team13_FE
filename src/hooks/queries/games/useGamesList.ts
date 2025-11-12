import { useQuery } from '@tanstack/react-query';

import type { GamesResponse, SportId } from '@/types/game.types';

/**
 * 게임 목록 조회 훅
 *
 * @param sportId - 스포츠 ID (1: 농구, 2: 풋살)
 * @returns 게임 목록 쿼리 결과
 *
 * @example
 * ```tsx
 * const { data: games, isLoading } = useGamesList(1); // 농구 게임 목록
 * ```
 */
export function useGamesList(sportId: SportId) {
  return useQuery<GamesResponse>({
    queryKey: ['games', 'list', sportId],
    queryFn: async () => {
      const url = `https://p-ting.yunseong.shop/api/v1/games?sportId=${sportId}`;
      console.log('Fetching games from:', url);

      const res = await fetch(url);

      if (!res.ok) {
        console.error('API Error:', res.status, res.statusText);
        throw await res.json();
      }

      const data = (await res.json()) as GamesResponse;
      console.log('Games data received:', data);
      return data;
    },
    staleTime: 1000 * 60, // 1분간 캐시 유지
    refetchOnWindowFocus: true, // 윈도우 포커스 시 재조회
  });
}
