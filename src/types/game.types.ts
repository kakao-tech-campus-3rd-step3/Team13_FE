/**
 * 게임/매치 관련 타입 정의
 */

/**
 * 게임 상태
 */
export type GameStatus = 'ON_RECRUITING' | 'RECRUITING_DONE' | 'GAME_FINISHED';

/**
 * 스포츠 ID
 */
export const SPORT_ID = {
  BASKETBALL: 1,
  FUTSAL: 2,
} as const;

export type SportId = (typeof SPORT_ID)[keyof typeof SPORT_ID];

/**
 * 게임 응답 타입
 */
export interface GameResponse {
  gameId: number;
  sportId: SportId;
  gameLocation: string;
  playerCount: number;
  currentPlayerCount: number;
  gameStatus: GameStatus;
  startTime: string; // ISO 8601 형식
  duration: number; // 분 단위
  imageUrl: string | null;
}

/**
 * 게임 목록 응답 타입
 */
export interface GamesResponse {
  games: GameResponse[];
}

/**
 * 게임 상세 응답 타입
 */
export interface GameDetailResponse {
  gameId: number;
  sportId: SportId;
  gameLocation: string;
  playerCount: number;
  currentPlayerCount: number;
  gameStatus: GameStatus;
  startTime: string; // ISO 8601 형식
  duration: number; // 분 단위
  description: string; // 게임 설명
  imageUrl: string | null;
}
