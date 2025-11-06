import { http, HttpResponse } from 'msw';

import { createErrorResponse } from '../sharedErrors';
import type { ApiErrorResponse } from '../sharedErrors';

type Sport = { sportId: number; name: string; recommededPlayerCount: number };
type SportsResponse = { sports: Sport[] };

const sports: Sport[] = [
  { sportId: 1, name: '농구', recommededPlayerCount: 10 },
  { sportId: 2, name: '축구', recommededPlayerCount: 22 },
];

const list = http.get<never, never, SportsResponse>('*/api/v1/sports', () =>
  HttpResponse.json<SportsResponse>({ sports }),
);

const getOne = http.get<{ sportId: string }, never, Sport | ApiErrorResponse>(
  '*/api/v1/sports/:sportId',
  ({ params }) => {
    const id = Number(params.sportId);
    const s = sports.find((x) => x.sportId === id);
    if (!s) return createErrorResponse('SPORTS_NOT_FOUND');
    return HttpResponse.json<Sport>(s);
  },
);

export const sportsHandlers = [list, getOne];
export const resetSportsState = () => void 0;
