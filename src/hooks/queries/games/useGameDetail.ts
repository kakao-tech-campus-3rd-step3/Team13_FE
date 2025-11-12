import { useQuery } from '@tanstack/react-query';

import { fetchGameDetail } from '@/api/games';
import type { GameDetailResponse } from '@/types/game.types';

/**
 * 게임 상세 정보 조회 훅
 *
 * @param gameId - 게임 ID
 * @returns 게임 상세 정보 쿼리 결과
 *
 * @example
 * ```tsx
 * const { data: gameDetail, isLoading } = useGameDetail(20);
 * ```
 */
export function useGameDetail(gameId: number) {
  return useQuery<GameDetailResponse>({
    queryKey: ['games', 'detail', gameId],
    queryFn: () => fetchGameDetail(gameId),
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재조회 안 함
    enabled: !!gameId, // gameId가 있을 때만 쿼리 실행
  });
}
