/* @vitest-environment jsdom */
import { ThemeProvider } from '@emotion/react';
import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { buildOAuthState } from '@/features/auth/utils/oauthState';
import { server } from '@/mocks/server';
import GoogleCallbackPage from '@/pages/Auth/GoogleCallbackPage';
import MyPage from '@/pages/My/MyPage';
import { useAppStore } from '@/stores/appStore';
import { useSessionStore } from '@/stores/sessionStore';
import { theme } from '@/theme';

const renderWithRouter = (initialEntry: string) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route
            path="/auth/google/callback"
            element={<GoogleCallbackPage />}
          />
          <Route path="/my" element={<MyPage />} />
          <Route
            path="/email-cert"
            element={<div aria-label="email-cert-page">Email Cert</div>}
          />
          <Route
            path="/login"
            element={<div aria-label="login-page">Login</div>}
          />
          <Route
            path="/home"
            element={<div aria-label="home-page">Home</div>}
          />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );

describe('GoogleCallbackPage', () => {
  beforeEach(() => {
    localStorage.clear();
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
      emailCertBypassed: false,
      sessionExpired: false,
    }));
  });

  it('유효한 code/state가 있으면 세션과 유저를 설정하고 인증 상태에 따라 이동한다', async () => {
    const state = buildOAuthState('/home?section=feed');
    renderWithRouter(`/auth/google/callback?code=good-code&state=${state}`);

    await waitFor(() => {
      expect(screen.getByLabelText('email-cert-page')).toBeInTheDocument();
    });

    expect(useSessionStore.getState().accessToken).toBe('mock-token');
    expect(useAppStore.getState().user?.avatarUrl).toBeTruthy();
    expect(useAppStore.getState().emailVerified).toBe(false);
  });

  it('인증이 이미 완료된 경우 원래 위치로 이동한다', async () => {
    server.use(
      http.get('*/api/v1/members/me/certification/status', () =>
        HttpResponse.json({ isVerified: true }),
      ),
    );

    const state = buildOAuthState('/home?tab=games');
    renderWithRouter(`/auth/google/callback?code=good-code&state=${state}`);

    await waitFor(() => {
      expect(screen.getByLabelText('home-page')).toBeInTheDocument();
    });

    expect(useAppStore.getState().emailVerified).toBe(true);
  });

  it('code가 없으면 로그인 페이지로 이동한다', async () => {
    renderWithRouter('/auth/google/callback');

    await waitFor(() => {
      expect(screen.getByLabelText('login-page')).toBeInTheDocument();
    });
  });
});
