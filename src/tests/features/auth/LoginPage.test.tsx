/* @vitest-environment jsdom */
import { ThemeProvider } from '@emotion/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { registerNotifier } from '@/pages/notifications/notify';
import { theme } from '@/theme';

const redirectMock = vi.fn();

vi.mock('@/utils/navigation', () => ({
  redirectTo: redirectMock,
}));

const server = setupServer(
  http.get('*/api/v1/auth/google', () =>
    HttpResponse.json({ authUrl: 'https://accounts.google.com/mock' }),
  ),
  http.get('*/api/v1/auth/kakao', () =>
    HttpResponse.json({ authUrl: 'https://kauth.kakao.com/mock' }),
  ),
);

let LoginPage: typeof import('@/pages/Auth/LoginPage').default;

beforeAll(async () => {
  server.listen();
  registerNotifier({ error: vi.fn(), info: vi.fn() });
  ({ default: LoginPage } = await import('@/pages/Auth/LoginPage'));
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

const renderLoginPage = () =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </ThemeProvider>,
  );

describe('<LoginPage />', () => {
  it('구글 버튼 클릭 시 OAuth URL 로 이동을 시도한다', async () => {
    redirectMock.mockClear();
    renderLoginPage();

    fireEvent.click(screen.getByRole('button', { name: /google로 계속하기/i }));

    await waitFor(() => {
      expect(redirectMock).toHaveBeenCalled();
    });
    expect(redirectMock.mock.calls[0]?.[0]).toContain(
      'https://accounts.google.com/',
    );
  });
});
