/* @vitest-environment jsdom */
import { ThemeProvider } from '@emotion/react';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from '@tanstack/react-query';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { ReactElement, ReactNode } from 'react';
import type { MemoryRouterProps } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import GameListPage from '@/features/games/pages/GameListPage';
import SportsPage from '@/features/sports/pages/SportsPage';
import { resetGamesState } from '@/mocks/handlers/games';
import { server } from '@/mocks/server';
import { createErrorResponse } from '@/mocks/sharedErrors';
import { theme } from '@/theme';

const makeClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

type RenderOptions = {
  initialEntries?: MemoryRouterProps['initialEntries'];
};

const renderWithProviders = (
  ui: ReactElement,
  { initialEntries = ['/test'] }: RenderOptions = {},
) => {
  const client = makeClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
  return render(ui, { wrapper });
};
const renderSportsPage = () =>
  renderWithProviders(<SportsPage />, { initialEntries: ['/test/sports'] });

const renderGameListPage = (options?: RenderOptions) =>
  renderWithProviders(<GameListPage />, {
    initialEntries: ['/test/games'],
    ...options,
  });

describe('useSports × UI', () => {
  it('스켈레톤 → 데이터 전환', async () => {
    renderSportsPage();
    // 스켈레톤 보임
    expect(screen.getByTestId('sports-skeleton')).toBeInTheDocument();

    // 데이터 로드
    expect(await screen.findByTestId('sports-list')).toBeInTheDocument();
    expect(screen.getByText('농구')).toBeInTheDocument();
    // 스켈레톤 숨김
    await waitFor(() => {
      expect(screen.queryByTestId('sports-skeleton')).toBeNull();
    });
  });

  it('빈 상태 표시', async () => {
    server.use(
      http.get('*/api/v1/sports', () => HttpResponse.json({ sports: [] })),
    );
    renderSportsPage();
    expect(await screen.findByTestId('sports-empty')).toBeInTheDocument();
    expect(screen.getByLabelText('cta-add-sport')).toBeInTheDocument();
  });

  it('에러 상태 + 재시도', async () => {
    // 1차 에러
    server.use(
      http.get('*/api/v1/sports', () =>
        createErrorResponse('INTERNAL_SERVER_ERROR'),
      ),
    );
    renderSportsPage();
    expect(await screen.findByTestId('sports-error')).toBeInTheDocument();
    // 2차 성공으로 변경
    server.use(
      http.get('*/api/v1/sports', () =>
        HttpResponse.json({
          sports: [{ sportId: 99, name: '탁구', recommededPlayerCount: 2 }],
        }),
      ),
    );
    fireEvent.click(screen.getByLabelText('retry'));

    expect(await screen.findByText('탁구')).toBeInTheDocument();
  });
});

describe('useGameList × UI', () => {
  beforeEach(() => {
    resetGamesState();
  });

  it('모바일: 스켈레톤 → 데이터 전환', async () => {
    renderGameListPage();
    expect(screen.getByTestId('gamelist-skeleton')).toBeInTheDocument();
    expect(await screen.findByTestId('gamelist')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId('gamelist-skeleton')).toBeNull();
    });
  });

  it('빈 리스트일 때 안내/CTA 노출', async () => {
    server.use(
      http.get('*/api/v1/games', () => HttpResponse.json({ games: [] })),
    );
    renderGameListPage();
    expect(await screen.findByTestId('gamelist-empty')).toBeInTheDocument();
    expect(screen.getByLabelText('cta-create-game')).toBeInTheDocument();
  });

  it('파라미터 변경 시 URL 쿼리와 동기화', async () => {
    // sportId=1&timePeriod=morning (소문자) → 내부적으로 upper 처리
    renderGameListPage({
      initialEntries: ['/test/games?sportId=1&timePeriod=morning'],
    });

    // 필터 적용 결과: 농구 아침 매치만 보일 수 있음
    expect(await screen.findByTestId('gamelist')).toBeInTheDocument();
    expect(screen.getByTestId('current-search').textContent).toMatch(
      /sportId=1/,
    );
    expect(screen.getByTestId('current-search').textContent).toMatch(
      /timePeriod=morning|timePeriod=MORNING/,
    );

    // 스포츠=2, 시간대=EVENING으로 변경 → 저녁 풋볼 등장
    fireEvent.change(screen.getByLabelText('select-sport'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByLabelText('select-period'), {
      target: { value: 'EVENING' },
    });

    // URL 쿼리 반영 확인
    expect(screen.getByTestId('current-search').textContent).toMatch(
      /sportId=2/,
    );
    expect(screen.getByTestId('current-search').textContent).toMatch(
      /timePeriod=EVENING/,
    );

    // 데이터 확인(시드 상 '저녁 소셜 풋볼')
    expect(await screen.findByText(/저녁 소셜 풋볼/)).toBeInTheDocument();
  });

  it('refetchOnWindowFocus="always" → 포커스 시 최신 데이터 반영', async () => {
    renderGameListPage();

    // 1차 로드
    expect(await screen.findByTestId('gamelist')).toBeInTheDocument();

    // 2차 응답을 업데이트로 교체
    server.use(
      http.get('*/api/v1/games', () =>
        HttpResponse.json({
          games: [
            {
              gameId: 9999,
              sportId: 1,
              name: '업데이트 매치',
              playerCount: 10,
              gameStatus: 'ON_MATCHING',
              startTime: new Date().toISOString(),
              duration: 60,
            },
          ],
        }),
      ),
    );

    // window focus 이벤트로 강제 refetch
    act(() => {
      focusManager.setFocused(false);
      focusManager.setFocused(true);
    });
    expect(await screen.findByText('업데이트 매치')).toBeInTheDocument();
  });

  it('에러 상태 + 재시도', async () => {
    server.use(
      http.get('*/api/v1/games', () =>
        createErrorResponse('INTERNAL_SERVER_ERROR'),
      ),
    );
    renderGameListPage();

    expect(await screen.findByTestId('gamelist-error')).toBeInTheDocument();

    // 성공으로 변경 후 재시도
    server.use(
      http.get('*/api/v1/games', () =>
        HttpResponse.json({
          games: [
            {
              gameId: 7000,
              sportId: 1,
              name: '복구된 매치',
              playerCount: 8,
              gameStatus: 'ON_MATCHING',
              startTime: new Date().toISOString(),
              duration: 60,
            },
          ],
        }),
      ),
    );
    fireEvent.click(screen.getByLabelText('retry-games'));
    expect(await screen.findByText('복구된 매치')).toBeInTheDocument();
  });
});
