/* @vitest-environment jsdom */
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { InitialEntry } from 'history';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { resetCertificationState } from '@/mocks/handlers/certification';
import LoginPage from '@/pages/Auth/LoginPage';
import EmailCertPage from '@/pages/EmailCert/EmailCertPage';
import HomePage from '@/pages/Home/HomePage';
import MyPage from '@/pages/My/MyPage';
import { registerNotifier } from '@/pages/notifications/notify';
import { ProtectedRoute, PublicRoute, VerifiedRoute } from '@/routes/Guards';
import { useAppStore } from '@/stores/appStore';
import { useSessionStore } from '@/stores/sessionStore';
import { theme } from '@/theme';

let queryClient: QueryClient;

const renderRoutes = (initialEntries: InitialEntry[]) => {
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 0 }, mutations: { retry: 0 } },
  });

  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/email-cert" element={<EmailCertPage />} />
              <Route element={<VerifiedRoute />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/my" element={<MyPage />} />
              </Route>
            </Route>

            <Route path="*" element={<div>404</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>,
  );
};

const resetStore = () => {
  localStorage.removeItem('app-store-v1');
  localStorage.removeItem('session-store-v1');
  useAppStore.setState((state) => ({
    ...state,
    hasHydrated: true,
    user: null,
    notificationsEnabled: true,
    emailVerified: true,
    emailCertBypassed: false,
    sessionExpired: false,
  }));
  useSessionStore.setState((state) => ({
    ...state,
    hasHydrated: true,
    accessToken: null,
    refreshToken: null,
  }));
};

describe('Route Guards', () => {
  beforeEach(() => {
    registerNotifier({
      error: vi.fn(),
      info: vi.fn(),
      success: vi.fn(),
      warning: vi.fn(),
    });
    resetCertificationState();
    resetStore();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('/my 진입 시 미로그인 사용자는 /login 으로 이동한다', () => {
    renderRoutes(['/my']);

    expect(screen.getByLabelText('login-page')).toBeInTheDocument();
  });

  it('로그인 성공 시 원래 방문하려던 경로로 복귀한다', () => {
    renderRoutes(['/my']);

    fireEvent.click(screen.getByLabelText('login-submit'));

    expect(screen.getByLabelText('my-page')).toBeInTheDocument();
  });

  it('이메일 미인증 사용자는 /email-cert 로 유도된다', async () => {
    useAppStore.setState((state) => ({
      ...state,
      user: {
        id: 1,
        name: '홍길동',
        email: 'hong@example.com',
        avatarUrl: 'https://example.com/avatar.png',
      },
      emailVerified: false,
      emailCertBypassed: false,
    }));

    renderRoutes(['/my']);

    await waitFor(() => {
      expect(screen.getByLabelText('email-cert-page')).toBeInTheDocument();
    });
  });

  it('/email-cert 에서 인증 완료 시 /home 으로 이동한다', async () => {
    useAppStore.setState((state) => ({
      ...state,
      user: {
        id: 2,
        name: '성춘향',
        email: 'seong@example.com',
        avatarUrl: 'https://example.com/avatar.png',
      },
      emailVerified: false,
      emailCertBypassed: false,
    }));

    renderRoutes(['/email-cert']);

    await waitFor(() => {
      expect(screen.getByLabelText('email-cert-page')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('학교 이메일 주소'), {
      target: { value: 'user@pusan.ac.kr' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'send-cert-code' }));

    await waitFor(() => {
      expect(screen.getByText(/재전송 대기/)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('인증 코드 6자리'), {
      target: { value: '000000' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'submit-certification' }),
    );

    await waitFor(() => {
      expect(screen.getByLabelText('home-page')).toBeInTheDocument();
    });
  });

  it('/email-cert 에서 나중에 하기 선택 시에도 /home 으로 이동한다', async () => {
    useAppStore.setState((state) => ({
      ...state,
      user: {
        id: 4,
        name: '나중',
        email: 'later@example.com',
        avatarUrl: 'https://example.com/avatar.png',
      },
      emailVerified: false,
      emailCertBypassed: false,
    }));

    renderRoutes(['/email-cert']);

    await waitFor(() => {
      expect(screen.getByLabelText('email-cert-page')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'email-cert-go-back' }));

    await waitFor(() => {
      expect(screen.getByLabelText('home-page')).toBeInTheDocument();
    });
  });

  it('세션 만료 사용자는 /login?expired=1 로 이동하고 토스트를 본다', () => {
    useAppStore.setState((state) => ({
      ...state,
      sessionExpired: true,
    }));

    renderRoutes(['/my']);

    expect(screen.getByLabelText('login-page')).toBeInTheDocument();
    expect(screen.getByTestId('toast')).toBeInTheDocument();
  });

  it('로그인된 사용자가 /login 접근 시 루프 없이 보호 페이지로 되돌린다', () => {
    useAppStore.setState((state) => ({
      ...state,
      user: {
        id: 3,
        name: '이몽룡',
        email: 'lee@example.com',
        avatarUrl: 'https://example.com/avatar.png',
      },
      emailVerified: true,
    }));

    renderRoutes(['/login']);

    expect(screen.queryByLabelText('login-page')).not.toBeInTheDocument();
    expect(screen.getByLabelText('my-page')).toBeInTheDocument();
  });

  it('로그인된 사용자가 /login?expired=1 으로 리다이렉트된 상태라면 기본 페이지로 이동한다', () => {
    useAppStore.setState((state) => ({
      ...state,
      user: {
        id: 4,
        name: '변사또',
        email: 'byeon@example.com',
        avatarUrl: 'https://example.com/avatar.png',
      },
      emailVerified: true,
    }));

    renderRoutes([
      {
        pathname: '/login',
        search: '?expired=1',
        state: { from: '/login?expired=1' },
      },
    ]);

    expect(screen.queryByLabelText('login-page')).not.toBeInTheDocument();
    expect(screen.getByLabelText('my-page')).toBeInTheDocument();
  });
});
