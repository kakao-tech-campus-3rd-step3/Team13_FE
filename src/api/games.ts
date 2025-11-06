import { apiClient } from '@/api/core/axiosInstance';
import type { GameDetailResponse, GamesResponse } from '@/types/game.types';

/**
 * 게임 목록 조회
 * @param sportId - 스포츠 ID (1: 농구, 2: 풋살)
 */
export async function fetchGamesList(sportId: number) {
  const res = await apiClient.get<GamesResponse>('/api/v1/games', {
    params: { sportId },
  });
  return res.data;
}

/**
 * 게임 상세 정보 조회
 * @param gameId - 게임 ID
 */
export async function fetchGameDetail(gameId: number) {
  const res = await apiClient.get<GameDetailResponse>(
    `/api/v1/games/${gameId}`,
  );
  return res.data;
}
