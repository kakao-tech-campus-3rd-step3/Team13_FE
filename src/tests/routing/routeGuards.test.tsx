/* @vitest-environment jsdom */
import { ThemeProvider } from '@emotion/react';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import LoginPage from '@/pages/Auth/LoginPage';
import EmailCertPage from '@/pages/EmailCert/EmailCertPage';
import MyPage from '@/pages/My/MyPage';
import {
  ProtectedRoute,
  PublicRoute,
  VerifiedRoute,
} from '@/routes/ProtectedRoute';
import { useAppStore } from '@/stores/appStore';
import { theme } from '@/theme';

const renderRoutes = (initialEntries: string[]) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={initialEntries}>
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
    </ThemeProvider>,
  );

const resetStore = () => {
  localStorage.removeItem('app-store-v1');
  useAppStore.setState((state) => ({
    ...state,
    hasHydrated: true,
    user: null,
    notificationsEnabled: true,
    emailVerified: true,
    sessionExpired: false,
  }));
};

describe('Route Guards', () => {
  beforeEach(() => {
    resetStore();
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

  it('이메일 미인증 사용자는 /email-cert 로 유도된다', () => {
    useAppStore.setState((state) => ({
      ...state,
      user: {
        id: 1,
        name: '홍길동',
        email: 'hong@example.com',
        avatarUrl: 'https://example.com/avatar.png',
      },
      emailVerified: false,
    }));

    renderRoutes(['/my']);

    expect(screen.getByLabelText('email-cert-page')).toBeInTheDocument();
  });

  it('/email-cert 에서 인증 완료 시 /my 로 이동한다', () => {
    useAppStore.setState((state) => ({
      ...state,
      user: {
        id: 2,
        name: '성춘향',
        email: 'seong@example.com',
        avatarUrl: 'https://example.com/avatar.png',
      },
      emailVerified: false,
    }));

    renderRoutes(['/email-cert']);

    fireEvent.click(screen.getByLabelText('email-verify-complete'));

    expect(screen.getByLabelText('my-page')).toBeInTheDocument();
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
});
