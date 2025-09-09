import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/greeting', () => HttpResponse.json({ greeting: 'hello' })),
];
