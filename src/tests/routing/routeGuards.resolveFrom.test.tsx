/* @vitest-environment jsdom */
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { InitialEntry } from 'history';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { resetCertificationState } from '@/mocks/handlers/certification';
import LoginPage from '@/pages/Auth/LoginPage';
import EmailCertPage from '@/pages/EmailCert/EmailCertPage';
import MyPage from '@/pages/My/MyPage';
import { registerNotifier } from '@/pages/notifications/notify';
import { PublicRoute, ProtectedRoute, VerifiedRoute } from '@/routes/Guards';
import { useAppStore } from '@/stores/appStore';
import { useSessionStore } from '@/stores/sessionStore';
import { theme } from '@/theme';

let queryClient: QueryClient;

const renderRoutes = (initialPath: string, state?: unknown) => {
  const entries: InitialEntry[] = [{ pathname: initialPath, state }];
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 0 }, mutations: { retry: 0 } },
  });

  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={entries}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/email-cert" element={<EmailCertPage />} />
              <Route element={<VerifiedRoute />}>
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

const resetStores = () => {
  localStorage.removeItem('session-store-v1');
  localStorage.removeItem('app-store-v1');
  useSessionStore.setState((state) => ({
    ...state,
    hasHydrated: true,
    accessToken: null,
    refreshToken: null,
  }));
  useAppStore.setState((state) => ({
    ...state,
    hasHydrated: true,
    user: null,
    emailVerified: true,
    emailCertBypassed: false,
    sessionExpired: false,
  }));
};

describe('Route Guards × resolveFrom', () => {
  beforeEach(() => {
    registerNotifier({
      error: vi.fn(),
      info: vi.fn(),
      success: vi.fn(),
      warning: vi.fn(),
    });
    resetCertificationState();
    resetStores();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('미인증 사용자가 /my 접근 → /login (from=/my)로 리다이렉트', () => {
    renderRoutes('/my');
    expect(screen.getByLabelText('login-page')).toBeInTheDocument();
  });

  it('/login에서 성공 시 from 유지(/my?tab=1)', () => {
    renderRoutes('/login', { from: { pathname: '/my', search: '?tab=1' } });
    fireEvent.click(screen.getByLabelText('login-submit'));
    expect(screen.getByLabelText('my-page')).toBeInTheDocument();
  });

  it('이메일 미검증 → /email-cert 유도', async () => {
    useSessionStore.setState((state) => ({
      ...state,
      accessToken: 'token',
      hasHydrated: true,
    }));
    useAppStore.setState((state) => ({
      ...state,
      emailVerified: false,
      emailCertBypassed: false,
      hasHydrated: true,
    }));
    renderRoutes('/my');
    await waitFor(() => {
      expect(screen.getByLabelText('email-cert-page')).toBeInTheDocument();
    });
  });

  it('PublicRoute: 로그인 유저가 /login 접근 시 from 또는 /my로 이동', () => {
    useSessionStore.setState((state) => ({
      ...state,
      accessToken: 'token',
      hasHydrated: true,
    }));
    renderRoutes('/login', { from: { pathname: '/my' } });
    expect(screen.queryByLabelText('login-page')).not.toBeInTheDocument();
  });

  it('resolveFrom: 상대경로/외부 URL은 무시하고 fallback 사용', () => {
    useSessionStore.setState((state) => ({
      ...state,
      accessToken: 'token',
      hasHydrated: true,
    }));
    renderRoutes('/login', { from: { pathname: 'http://evil.com' } });
    expect(screen.queryByLabelText('login-page')).not.toBeInTheDocument();
  });
});
