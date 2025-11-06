import { http, HttpResponse } from 'msw';

import { createErrorResponse, createValidationError } from '../sharedErrors';
import type { ApiErrorResponse } from '../sharedErrors';

type GameStatus = 'ON_MATCHING' | 'END';

type GameDetailResponse = {
  gameId: number;
  sportId: number;
  name: string;
  playerCount: number;
  gameStatus: GameStatus;
  startTime: string; // ISO
  duration: number; // minutes
  description: string;
};

type GameResponse = Omit<GameDetailResponse, 'description'>;
type GamesResponse = { games: GameResponse[] };

type CreateGameRequest = {
  sportId?: number;
  name?: string;
  playerCount?: number;
  startTime?: string;
  duration?: number;
  description?: string;
};

let nextGameId = 5000;
const games = new Map<number, GameDetailResponse>();
const finishedGames = new Set<number>();

const iso = (d: Date) => d.toISOString();

const seedGames = () => {
  games.clear();
  finishedGames.clear();
  const now = new Date();
  const g1: GameDetailResponse = {
    gameId: ++nextGameId,
    sportId: 1,
    name: '아침 번개 농구',
    playerCount: 10,
    gameStatus: 'ON_MATCHING',
    startTime: iso(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0),
    ),
    duration: 90,
    description: '체육관 A',
  };
  const g2: GameDetailResponse = {
    gameId: ++nextGameId,
    sportId: 2,
    name: '저녁 소셜 풋볼',
    playerCount: 14,
    gameStatus: 'ON_MATCHING',
    startTime: iso(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 30, 0),
    ),
    duration: 120,
    description: '운동장 B',
  };
  games.set(g1.gameId, g1);
  games.set(g2.gameId, g2);
};
seedGames();

export const resetGamesState = () => {
  nextGameId = 5000;
  seedGames();
};

type TimePeriod = 'MORNING' | 'NOON' | 'EVENING';
const classify = (isoStr: string): TimePeriod => {
  const h = new Date(isoStr).getHours();
  if (h >= 5 && h < 12) return 'MORNING';
  if (h >= 12 && h < 17) return 'NOON';
  return 'EVENING';
};

// POST /api/v1/games → GameDetailResponse (또는 422/400 등)
const createGame = http.post<
  never,
  CreateGameRequest,
  GameDetailResponse | ApiErrorResponse
>('*/api/v1/games', async ({ request }) => {
  const body = await request.json();

  // 422: 폼 에러
  const fields: Record<string, string> = {};
  if (!body?.name) fields.name = '이름을 입력해 주세요.';
  if (!body?.playerCount) fields.playerCount = '인원 수를 선택해 주세요.';
  if (Object.keys(fields).length) return createValidationError(fields);

  if (!body?.sportId || !body?.startTime || !body?.duration)
    return createErrorResponse('GAME_INVALID_INPUT');

  const g: GameDetailResponse = {
    gameId: ++nextGameId,
    sportId: Number(body.sportId),
    name: String(body.name),
    playerCount: Number(body.playerCount),
    gameStatus: 'ON_MATCHING',
    startTime: String(body.startTime),
    duration: Number(body.duration),
    description: String(body.description ?? ''),
  };
  games.set(g.gameId, g);
  return HttpResponse.json<GameDetailResponse>(g);
});

// POST /api/v1/games/:gameId (참여) → GameDetailResponse
const joinGame = http.post<
  { gameId: string },
  never,
  GameDetailResponse | ApiErrorResponse
>('*/api/v1/games/:gameId', ({ params }) => {
  const id = Number(params.gameId);
  const g = games.get(id);
  if (!g) return createErrorResponse('GAME_NOT_FOUND');
  if (finishedGames.has(id) || g.gameStatus !== 'ON_MATCHING')
    return createErrorResponse('GAME_JOIN_NOT_ALLOWED');

  const updated: GameDetailResponse = { ...g, gameStatus: 'END' };
  games.set(id, updated);
  finishedGames.add(id);

  return HttpResponse.json<GameDetailResponse>(updated);
});

// GET /api/v1/games?sportId=&timePeriod= → GamesResponse { games: GameResponse[] }
const listGames = http.get<never, never, GamesResponse>(
  '*/api/v1/games',
  ({ request }) => {
    const url = new URL(request.url);
    const sportId = url.searchParams.get('sportId');
    const timePeriod = url.searchParams.get('timePeriod');

    let list = Array.from(games.values()).filter(
      (g) => g.gameStatus === 'ON_MATCHING',
    );

    if (sportId) list = list.filter((g) => g.sportId === Number(sportId));
    if (timePeriod) {
      const target = timePeriod.toUpperCase();
      list = list.filter(
        (g) => classify(g.startTime) === (target as TimePeriod),
      );
    }

    // ⚠️ no-unused-vars 회피: 명시적 매핑으로 description 제거
    const gamesSummary: GameResponse[] = list.map((g) => ({
      gameId: g.gameId,
      sportId: g.sportId,
      name: g.name,
      playerCount: g.playerCount,
      gameStatus: g.gameStatus,
      startTime: g.startTime,
      duration: g.duration,
    }));

    return HttpResponse.json<GamesResponse>({ games: gamesSummary });
  },
);

// GET /api/v1/games/:gameId → GameDetailResponse
const gameDetail = http.get<
  { gameId: string },
  never,
  GameDetailResponse | ApiErrorResponse
>('*/api/v1/games/:gameId', ({ params }) => {
  const id = Number(params.gameId);
  const g = games.get(id);
  if (!g) return createErrorResponse('GAME_NOT_FOUND');
  return HttpResponse.json<GameDetailResponse>(g);
});

export const gamesHandlers = [createGame, joinGame, listGames, gameDetail];
