/* @vitest-environment jsdom */
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  resetCertificationState,
  seedCertificationState,
} from '@/mocks/handlers/certification';
import { server } from '@/mocks/server';
import EmailCertPage from '@/pages/EmailCert/EmailCertPage';
import HomePage from '@/pages/Home/HomePage';
import { registerNotifier } from '@/pages/notifications/notify';
import { useAppStore } from '@/stores/appStore';
import { useSessionStore } from '@/stores/sessionStore';
import { theme } from '@/theme';

let queryClient: QueryClient;

const notifyMocks = {
  error: vi.fn(),
  info: vi.fn(),
  success: vi.fn(),
  warning: vi.fn(),
};

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
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>,
  );
};

beforeEach(() => {
  resetCertificationState();
  seedCertificationState({});
  Object.values(notifyMocks).forEach((mock) => mock.mockReset());
  registerNotifier({
    error: notifyMocks.error,
    info: notifyMocks.info,
    success: notifyMocks.success,
    warning: notifyMocks.warning,
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
    emailCertBypassed: false,
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

  it('인증 성공 시 /home 으로 이동한다', async () => {
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
      expect(screen.getByLabelText('home-page')).toBeInTheDocument();
    });
  });

  it('나중에 하기 버튼을 누르면 홈으로 이동한다', async () => {
    renderEmailCertPage();

    await waitFor(() => {
      expect(screen.getByLabelText('email-cert-page')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'email-cert-go-back' }));

    await waitFor(() => {
      expect(screen.getByLabelText('home-page')).toBeInTheDocument();
    });
  });

  it('이미 인증된 상태면 페이지 진입 시 즉시 홈으로 이동한다', async () => {
    seedCertificationState({
      localPart: 'user',
      requested: true,
      isVerified: true,
    });

    renderEmailCertPage();

    await waitFor(() => {
      expect(screen.getByLabelText('home-page')).toBeInTheDocument();
    });
  });

  it('이메일 재전송 409 응답을 성공으로 처리하고 리다이렉트한다', async () => {
    seedCertificationState({
      localPart: 'user',
      requested: true,
      isVerified: true,
    });

    server.use(
      http.get('*/api/v1/members/me/certification/status', () =>
        HttpResponse.json({ isVerified: false }),
      ),
    );

    renderEmailCertPage();

    await waitFor(() => {
      expect(screen.getByLabelText('email-cert-page')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('학교 이메일 주소'), {
      target: { value: 'user@pusan.ac.kr' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'send-cert-code' }));

    await waitFor(() => {
      expect(screen.getByLabelText('home-page')).toBeInTheDocument();
    });

    expect(notifyMocks.success).toHaveBeenCalledWith(
      '이미 이메일 인증이 완료되어 있습니다. 다음 단계로 이동합니다.',
    );
  });
});
