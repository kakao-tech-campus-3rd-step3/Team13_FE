import { apiClient } from '@/api/core/axiosInstance';
import type {
  CreateGameRequest,
  CreateGameResponse,
  GameDetailResponse,
  GamesResponse,
} from '@/types/game.types';

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

/**
 * 게임 생성
 * @param game - 게임 생성 요청 데이터
 * @param image - 게임 이미지 파일 (선택 사항)
 */
export async function createGame(game: CreateGameRequest, image?: File | null) {
  const formData = new FormData();

  // game 데이터를 JSON Blob으로 추가
  const gameBlob = new Blob([JSON.stringify(game)], {
    type: 'application/json',
  });
  formData.append('game', gameBlob);

  // 이미지 파일이 있으면 추가
  if (image) {
    formData.append('image', image);
  }

  const res = await apiClient.post<CreateGameResponse>(
    '/api/v1/games',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return res.data;
}
