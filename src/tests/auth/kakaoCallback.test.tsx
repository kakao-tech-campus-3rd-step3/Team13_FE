/* @vitest-environment jsdom */
import { ThemeProvider } from '@emotion/react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { buildOAuthState } from '@/features/auth/utils/oauthState';
import KakaoCallbackPage from '@/pages/Auth/KakaoCallbackPage';
import MyPage from '@/pages/My/MyPage';
import { useAppStore } from '@/stores/appStore';
import { useSessionStore } from '@/stores/sessionStore';
import { theme } from '@/theme';

const renderWithRouter = (initialEntry: string) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/auth/kakao/callback" element={<KakaoCallbackPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route
            path="/login"
            element={<div aria-label="login-page">Login</div>}
          />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );

describe('KakaoCallbackPage', () => {
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
      sessionExpired: false,
    }));
  });

  it('유효한 code/state가 있으면 세션/유저를 설정하고 원래 위치로 이동한다', async () => {
    const state = buildOAuthState('/my?tab=1');

    renderWithRouter(`/auth/kakao/callback?code=good-code&state=${state}`);

    await waitFor(() => {
      expect(screen.getByLabelText('my-page')).toBeInTheDocument();
    });

    expect(useSessionStore.getState().accessToken).toBe('mock-token');
    expect(useAppStore.getState().user?.email).toBe('kimdy@pusan.ac.kr');
  });

  it('code가 없으면 로그인 페이지로 이동한다', async () => {
    renderWithRouter('/auth/kakao/callback');

    await waitFor(() => {
      expect(screen.getByLabelText('login-page')).toBeInTheDocument();
    });
  });
});
