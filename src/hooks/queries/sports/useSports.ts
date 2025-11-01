import { useQuery } from '@tanstack/react-query';

export type Sport = {
  sportId: number;
  name: string;
  recommededPlayerCount: number;
};

export type SportsResponse = { sports: Sport[] };

export const SPORTS_QUERY_KEY = ['sports'] as const;

/**
 * Sports 목록 훅
 * - staleTime: 10분 (자주 변동되지 않는 정보)
 * - refetchOnWindowFocus: false (모바일 UX에서 불필요한 깜빡임 방지)
 */
export function useSports() {
  return useQuery<SportsResponse>({
    queryKey: SPORTS_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch('/api/v1/sports');
      if (!res.ok) throw await res.json();
      return (await res.json()) as SportsResponse;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
