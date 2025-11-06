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
const startKakaoLoginMock = vi.fn<(redirect: string) => Promise<void>>(
  async () => {},
);

vi.mock('@/utils/navigation', () => ({
  redirectTo: redirectMock,
}));

vi.mock('@/features/auth/services/kakao', () => ({
  startKakaoLogin: (redirect: string) => startKakaoLoginMock(redirect),
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

const renderLoginPage = (initialEntries: string[] = ['/login']) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={initialEntries}>
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
    expect(screen.getByTestId('oauth-status')).toHaveTextContent(
      '연결 중이에요',
    );
  });

  it('구글 로그인 실패 시 오류 메시지와 재시도 버튼을 제공한다', async () => {
    redirectMock.mockClear();
    const authApi = await import('@/features/auth/api/authApi');
    const getOAuthUrlSpy = vi.spyOn(authApi, 'getOAuthUrl');
    getOAuthUrlSpy.mockRejectedValueOnce(new Error('network-error'));

    renderLoginPage();

    fireEvent.click(screen.getByRole('button', { name: /google로 계속하기/i }));

    await waitFor(() => {
      expect(screen.getByTestId('oauth-error')).toBeInTheDocument();
    });
    expect(redirectMock).not.toHaveBeenCalled();

    getOAuthUrlSpy.mockResolvedValueOnce(
      'https://accounts.google.com/mock-retry',
    );

    fireEvent.click(screen.getByRole('button', { name: '다시 시도' }));

    await waitFor(() => {
      expect(redirectMock).toHaveBeenCalledWith(
        expect.stringContaining('mock-retry'),
      );
    });

    getOAuthUrlSpy.mockRestore();
  });

  it('redirect 파라미터를 OAuth 요청에 전달한다', async () => {
    redirectMock.mockClear();
    const authApi = await import('@/features/auth/api/authApi');
    const getOAuthUrlSpy = vi.spyOn(authApi, 'getOAuthUrl');
    getOAuthUrlSpy.mockResolvedValueOnce(
      'https://accounts.google.com/mock-redirect',
    );

    renderLoginPage(['/login?redirect=/my%3Ftab%3Dteam']);

    fireEvent.click(screen.getByRole('button', { name: /google로 계속하기/i }));

    await waitFor(() => {
      expect(redirectMock).toHaveBeenCalled();
    });
    expect(getOAuthUrlSpy).toHaveBeenCalledWith('google', '/my?tab=team');

    getOAuthUrlSpy.mockRestore();
  });

  it('카카오 로그인 진행 상태를 노출하고 재시도를 연결한다', async () => {
    startKakaoLoginMock.mockClear();
    startKakaoLoginMock.mockRejectedValueOnce(new Error('network error'));
    renderLoginPage(['/login']);

    fireEvent.click(screen.getByRole('button', { name: 'kakao-login' }));

    await waitFor(() => {
      expect(screen.getByTestId('oauth-error')).toBeInTheDocument();
    });
    expect(startKakaoLoginMock).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: '다시 시도' }));

    await waitFor(() => {
      expect(startKakaoLoginMock).toHaveBeenCalledTimes(2);
    });
  });
});
