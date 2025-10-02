import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/greeting', () =>
    HttpResponse.json({ greeting: '안녕하세요' }),
  ),
];
