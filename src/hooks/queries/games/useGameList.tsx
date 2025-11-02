import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type GameStatus = 'ON_MATCHING' | 'END';
export type GameResponse = {
  gameId: number;
  sportId: number;
  name: string;
  playerCount: number;
  gameStatus: GameStatus;
  startTime: string; // ISO
  duration: number; // minutes
};

export type GamesResponse = { games: GameResponse[] };
export type TimePeriod = 'MORNING' | 'NOON' | 'EVENING';

export type GameListParams = {
  sportId?: number;
  timePeriod?: string; // 대소문자 무관 입력 → 내부에서 upper
};

export const buildGamesKey = (params: GameListParams) => {
  const time = (params.timePeriod ?? '').toUpperCase() || null;
  const sid = params.sportId ?? null;
  return ['games', { sportId: sid, timePeriod: time }] as const;
};

/**
 * GameList 훅
 * - staleTime: 15초 (실시간성 vs. 요청비용 균형)
 * - refetchOnWindowFocus: 'always' (모바일에서 포그라운드 복귀 시 최신값 보장)
 * - keepPreviousData: true (필터 전환 시 스켈레톤 대신 이전 데이터 유지)
 */
export function useGameList(params: GameListParams) {
  const queryKey = buildGamesKey(params);

  return useQuery<GamesResponse>({
    queryKey,
    queryFn: async () => {
      const qp = new URLSearchParams();
      if (params.sportId != null) qp.set('sportId', String(params.sportId));
      if (params.timePeriod)
        qp.set('timePeriod', String(params.timePeriod).toUpperCase());
      const res = await fetch(`/api/v1/games?${qp.toString()}`);
      if (!res.ok) throw await res.json();
      return (await res.json()) as GamesResponse;
    },
    staleTime: 15 * 1000,
    refetchOnWindowFocus: 'always',
    // React Query v5: keepPreviousData 플래그 대신 placeholderData 헬퍼 사용
    placeholderData: keepPreviousData,
  });
}
