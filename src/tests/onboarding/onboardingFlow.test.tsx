/* @vitest-environment jsdom */
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import MyPage from '@/pages/My/MyPage';
import SportSelectPage from '@/pages/Onboarding/SportSelectPage';
import TimeSelectPage from '@/pages/Onboarding/TimeSelectPage';
import { ProtectedRoute, PublicRoute, VerifiedRoute } from '@/routes/Guards';
import OnboardingGuard from '@/routes/OnboardingGuard';
import { useAppStore } from '@/stores/appStore';
import { usePreferencesStore } from '@/stores/preferencesStore';
import { useSessionStore } from '@/stores/sessionStore';
import { theme } from '@/theme';

function renderApp(initialPath = '/my') {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 0 }, mutations: { retry: 0 } },
  });

  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<div>login</div>} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/email-cert" element={<div>email-cert</div>} />
              <Route element={<VerifiedRoute />}>
                <Route
                  path="/onboarding/sports"
                  element={<SportSelectPage />}
                />
                <Route path="/onboarding/times" element={<TimeSelectPage />} />
                <Route element={<OnboardingGuard />}>
                  <Route path="/my" element={<MyPage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>,
  );
}

describe('Onboarding flow', () => {
  beforeEach(() => {
    localStorage.clear();
    useSessionStore.setState((state) => ({
      ...state,
      hasHydrated: true,
      accessToken: 'token',
    }));
    useAppStore.setState((state) => ({
      ...state,
      hasHydrated: true,
      emailVerified: true,
      emailCertBypassed: false,
      user: {
        id: 1,
        name: '테스터',
        email: 'tester@example.com',
        avatarUrl: 'https://via.placeholder.com/120',
      },
    }));
    usePreferencesStore.setState((state) => ({
      ...state,
      hasHydrated: true,
      sports: [],
      timeSlots: [],
    }));
  });

  it('가드에 의해 /my → 종목 → 시간대 → /my 순서로 이동한다', async () => {
    renderApp('/my');

    expect(
      await screen.findByLabelText('sport-select-page'),
    ).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: /풋살|농구/ })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'next' }));

    expect(
      await screen.findByLabelText('time-select-page'),
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getAllByRole('button', { name: /아침|오전|점심 이후/ })[0],
    );
    fireEvent.click(screen.getByRole('button', { name: 'next' }));

    expect(await screen.findByLabelText('my-page')).toBeInTheDocument();
  });
});
