/* @vitest-environment jsdom */
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { resetCertificationState } from '@/mocks/handlers/certification';
import EmailCertPage from '@/pages/EmailCert/EmailCertPage';
import { registerNotifier } from '@/pages/notifications/notify';
import { useAppStore } from '@/stores/appStore';
import { useSessionStore } from '@/stores/sessionStore';
import { theme } from '@/theme';

let queryClient: QueryClient;

const renderEmailCertPage = (initialEntry = '/email-cert') => {
  queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 0 },
      mutations: { retry: 0 },
    },
  });

  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialEntry]}>
          <Routes>
            <Route path="/email-cert" element={<EmailCertPage />} />
            <Route
              path="/my"
              element={<div aria-label="my-page">My Page</div>}
            />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>,
  );
};

beforeEach(() => {
  resetCertificationState();
  registerNotifier({
    error: vi.fn(),
    info: vi.fn(),
    success: vi.fn(),
    warning: vi.fn(),
  });
  useSessionStore.setState((state) => ({
    ...state,
    hasHydrated: true,
    accessToken: 'token',
    refreshToken: null,
  }));
  useAppStore.setState((state) => ({
    ...state,
    hasHydrated: true,
    emailVerified: false,
    user: {
      id: 1,
      name: '홍길동',
      email: 'hong@pusan.ac.kr',
      avatarUrl: 'https://example.com/avatar.png',
    },
  }));
});

afterEach(() => {
  queryClient.clear();
});

describe('EmailCertPage', () => {
  it('이메일 전송 후 쿨다운 시간을 표시한다', async () => {
    renderEmailCertPage();

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
  });

  it('429 응답 시에도 쿨다운을 적용한다', async () => {
    renderEmailCertPage();

    await waitFor(() => {
      expect(screen.getByLabelText('email-cert-page')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('학교 이메일 주소'), {
      target: { value: 'limit@pusan.ac.kr' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'send-cert-code' }));

    await waitFor(() => {
      expect(screen.getByText(/재전송 대기/)).toBeInTheDocument();
    });
  });

  it('인증 성공 시 /my 로 이동한다', async () => {
    renderEmailCertPage();

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
      expect(screen.getByLabelText('my-page')).toBeInTheDocument();
    });
  });
});
