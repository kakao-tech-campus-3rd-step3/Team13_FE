import { beforeEach, describe, expect, it } from 'vitest';

import { resetCertificationState } from '@/mocks/handlers/certification';
import { resetGamesState } from '@/mocks/handlers/games';
import { resetProfileState } from '@/mocks/handlers/profile';
import { resetReportsState } from '@/mocks/handlers/reports';
import type { ApiErrorResponse } from '@/mocks/sharedErrors';

type ProfileResponse = {
  name: string;
  email: string;
  imageUrl: string;
  description: string;
};
type CertificationResponse = { isVerified: boolean };
type GameDetailResponse = {
  gameId: number;
  sportId: number;
  name: string;
  playerCount: number;
  gameStatus: 'ON_MATCHING' | 'END';
  startTime: string;
  duration: number;
  description: string;
};
type GameSummary = Omit<GameDetailResponse, 'description'>;
type GamesResponse = { games: GameSummary[] };
type SchoolResponse = { id: number; name: string; domain: string };
type SchoolsResponse = { schools: SchoolResponse[] };
type ReportResponse = {
  id: number;
  gameId: number;
  reporterId: number;
  reportedId: number;
  reasonText: string;
  status: 'OPEN' | 'RESOLVED';
  createdAt: string;
};

// BodyInit 오류 방지: RequestInit 대신 간단한 JSON 전용 타입 사용
type JsonInit = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
};

const baseUrl = 'http://localhost';

const requestJson = async <T>(path: string, init?: JsonInit) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(init?.headers ?? {}),
  };
  const method = init?.method ?? 'GET';
  const body =
    init?.body === undefined
      ? undefined
      : typeof init.body === 'string'
        ? init.body
        : JSON.stringify(init.body);

  const res = await fetch(`${baseUrl}${path}`, { method, headers, body });
  const data = (await res.json()) as T;
  return { status: res.status, data };
};

describe('Auth 핸들러', () => {
  beforeEach(() => {
    resetCertificationState();
    resetProfileState();
    resetGamesState();
    resetReportsState();
  });

  it('카카오 OAuth URL 응답 키는 authUrl', async () => {
    const { status, data } = await requestJson<{ authUrl: string }>(
      '/api/v1/auth/kakao?redirectUri=https://kan.example.com/auth/kakao',
    );
    expect(status).toBe(200);
    const url = new URL(data.authUrl);
    expect(url.origin + url.pathname).toBe(
      'https://kauth.kakao.com/oauth/authorize',
    );
    expect(url.searchParams.get('redirect_uri')).toBe(
      'https://kan.example.com/auth/kakao',
    );
  });

  it('인가 코드 누락 → code+message 단언', async () => {
    const { status, data } = await requestJson<ApiErrorResponse>(
      '/api/v1/auth/kakao/callback',
    );
    expect(status).toBe(400);
    expect(data.error).toEqual({
      code: 'AUTH_MISSING_CODE',
      message: '인가 코드를 찾을 수 없습니다.',
    });
  });

  it('성공 콜백 → { token } 반환', async () => {
    const { status, data } = await requestJson<{ token: string }>(
      '/api/v1/auth/kakao/callback?code=signin',
    );
    expect(status).toBe(200);
    expect(data.token).toBeTruthy();
  });
  it('유효하지 않은 코드 → 401 AUTH_INVALID_CODE', async () => {
    const { status, data } = await requestJson<ApiErrorResponse>(
      '/api/v1/auth/kakao/callback?code=invalid',
    );
    expect(status).toBe(401);
    expect(data.error).toEqual({
      code: 'AUTH_INVALID_CODE',
      message: '유효하지 않은 카카오 인가 코드입니다.',
    });
  });
});

describe('Certification 핸들러', () => {
  beforeEach(() => resetCertificationState());

  it('요청 → 검증(실패) → 검증(성공) → 상태', async () => {
    const req = await requestJson<CertificationResponse>(
      '/api/v1/members/me/certification/email',
      { method: 'POST', body: { email: 'user@pusan.ac.kr' } },
    );
    expect(req.status).toBe(200);
    expect(req.data.isVerified).toBe(false);

    const bad = await requestJson<ApiErrorResponse>(
      '/api/v1/members/me/certification/verify',
      {
        method: 'POST',
        body: { email: 'user@pusan.ac.kr', code: '123456' },
      },
    );
    expect(bad.status).toBe(400);
    expect(bad.data.error).toEqual({
      code: 'CERT_INVALID_TOKEN',
      message: '잘못된 인증 코드입니다.',
    });

    const ok = await requestJson<CertificationResponse>(
      '/api/v1/members/me/certification/verify',
      {
        method: 'POST',
        body: { email: 'user@pusan.ac.kr', code: '000000' },
      },
    );
    expect(ok.status).toBe(200);
    expect(ok.data.isVerified).toBe(true);

    const statusRes = await requestJson<CertificationResponse>(
      '/api/v1/members/me/certification/status',
    );
    expect(statusRes.data.isVerified).toBe(true);
  });
});

describe('Profile 핸들러', () => {
  beforeEach(() => resetProfileState());

  it('내 프로필 조회: ProfileResponse', async () => {
    const { status, data } = await requestJson<ProfileResponse>(
      '/api/v2/members/me/profile',
    );
    expect(status).toBe(200);
    const { name, email, imageUrl, description } = data;
    expect(typeof name).toBe('string');
    expect(typeof email).toBe('string');
    expect(typeof imageUrl).toBe('string');
    expect(typeof description).toBe('string');
  });

  it('유효하지 않은 닉네임(32자) → code+message', async () => {
    const { status, data } = await requestJson<ApiErrorResponse>(
      '/api/v2/members/me/profile/name',
      { method: 'PATCH', body: { name: 'a'.repeat(32) } },
    );
    expect(status).toBe(400);
    expect(data.error).toEqual({
      code: 'PROFILE_INVALID_NAME',
      message: '닉네임은 최대 31자까지 가능합니다.',
    });
  });
});

describe('Sports 핸들러', () => {
  it('리스트 응답: recommededPlayerCount 키 유지', async () => {
    const { status, data } = await requestJson<{
      sports: {
        sportId: number;
        name: string;
        recommededPlayerCount: number;
      }[];
    }>('/api/v1/sports');
    expect(status).toBe(200);
    expect(Array.isArray(data.sports)).toBe(true);
    expect(data.sports[0]).toHaveProperty('recommededPlayerCount');
  });
});

describe('Games 핸들러', () => {
  beforeEach(() => resetGamesState());

  it('생성 422: fields 포함', async () => {
    const { status, data } = await requestJson<ApiErrorResponse>(
      '/api/v1/games',
      { method: 'POST', body: { sportId: 1 } },
    );
    expect(status).toBe(422);
    expect(data.error).toEqual({
      code: 'VALIDATION_ERROR',
      message: '입력값을 확인해 주세요.',
      fields: {
        name: '이름을 입력해 주세요.',
        playerCount: '인원 수를 선택해 주세요.',
      },
    });
  });

  it('생성 성공 → detail 반환, 리스트에는 description 제외', async () => {
    const start = new Date().toISOString();
    const create = await requestJson<GameDetailResponse>('/api/v1/games', {
      method: 'POST',
      body: {
        sportId: 1,
        name: '테스트 매치',
        playerCount: 10,
        startTime: start,
        duration: 60,
        description: '설명',
      },
    });
    expect(create.status).toBe(200);
    expect(create.data).toMatchObject({
      name: '테스트 매치',
      description: '설명',
    });

    const list = await requestJson<GamesResponse>('/api/v1/games?sportId=1');
    expect(list.status).toBe(200);
    expect(list.data.games[0]).not.toHaveProperty('description');
  });

  it('매치 상태가 종료되면 참여 불가', async () => {
    const join = await requestJson<GameDetailResponse>('/api/v1/games/5001', {
      method: 'POST',
    });
    expect(join.status).toBe(200);
    expect(join.data.gameStatus).toBe('END');

    const finished = await requestJson<ApiErrorResponse>('/api/v1/games/5001', {
      method: 'POST',
    });
    expect(finished.status).toBe(409);
    expect(finished.data.error).toEqual({
      code: 'GAME_JOIN_NOT_ALLOWED',
      message: '해당 매치에는 참여할 수 없습니다.',
    });
  });
});

describe('Schools/Reports 핸들러', () => {
  beforeEach(() => {
    resetReportsState();
  });

  it('학교 선택 & 조회', async () => {
    const list = await requestJson<SchoolsResponse>('/api/v1/schools');
    expect(list.status).toBe(200);
    expect(list.data.schools.length).toBeGreaterThan(0);

    const busanUniversity = list.data.schools.find(
      (school) => school.name === '부산대학교',
    );
    expect(busanUniversity).toBeDefined();
    const sel = await requestJson<SchoolResponse>(
      `/api/v1/members/me/school/${busanUniversity!.id}`,
      { method: 'POST' },
    );
    expect(sel.status).toBe(200);
    expect(sel.data).toMatchObject({ id: busanUniversity!.id });
  });

  it('신고 생성 → 상태 변경 INVALID → message 단언', async () => {
    const create = await requestJson<ReportResponse>('/api/v1/reports', {
      method: 'POST',
      body: { gameId: 5001, reportedId: 102, reasonText: '거친 플레이' },
    });
    expect(create.status).toBe(200);
    const id = create.data.id;

    const invalidStatus = { status: 'WRONG' };
    const bad = await requestJson<ApiErrorResponse>(
      `/api/v1/reports/${id}/status`,
      {
        method: 'PATCH',
        body: invalidStatus,
      },
    );
    expect(bad.status).toBe(400);
    expect(bad.data.error).toEqual({
      code: 'REPORT_INVALID_STATUS',
      message: '잘못된 신고 상태 값입니다.',
    });
  });
  it('없는 신고 ID → REPORT_NOT_FOUND', async () => {
    const bad = await requestJson<ApiErrorResponse>(
      '/api/v1/reports/9999/status',
      { method: 'PATCH', body: { status: 'OPEN' } },
    );
    expect(bad.status).toBe(404);
    expect(bad.data.error).toEqual({
      code: 'REPORT_NOT_FOUND',
      message: '요청한 신고를 찾을 수 없습니다.',
    });
  });
});
