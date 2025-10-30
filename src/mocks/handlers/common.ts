import type { HttpHandler } from 'msw';
import { http, HttpResponse } from 'msw';

const GREETING_RESPONSE = Object.freeze({ greeting: '안녕하세요' });

export const commonHandlers: readonly HttpHandler[] = [
  http.get('*/api/greeting', () => HttpResponse.json(GREETING_RESPONSE)),
];
